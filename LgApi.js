import fetch from 'node-fetch';
import parse from 'xml-parser';
import isReachable from 'is-reachable';
import controls from './controls.json';
import config from './config.json';
/* eslint max-len: 0 */

const API = {
  tv: `http://${config.ip}:8080/udap/api/`,
  code: config.code,

  headers: {
    'User-Agent': 'Apple iOS UDAP/2.0 Connect SDK',
    'Content-Type': 'text/xml'
  },

  command(name) {
    const body = `<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleKeyInput</name><value>${controls[name]}</value></api></envelope>`;
    return this.send(body, 'command')
    .then((res) => (res.status === 401) ? API.authenticate(this.command.bind(this, name)) : res.status);
  },

  info(name) {
    return fetch(`${this.tv}data?target=${name}`, {
      headers: this.headers
    })
    .then((res) => res.text())
    .then((xml) => parse(xml).root.children[0]);
  },

  pair() {
    const body = '<?xml version="1.0" encoding="utf-8"?> <envelope> <api type="pairing"> <name>showKey</name> </api> </envelope>';
    return API.sendRequest(body, 'pairing').then(() => {
      setTimeout(API.finishPairing, 1000);
    });
  },

  finishPairing() {
    const body = `<?xml version="1.0" encoding="utf-8"?><envelope> <api type="pairing"> <name>hello</name><value>${this.code}</value> <port>8080</port> </api> </envelope>`;
    return API.sendRequest(body, 'pairing');
  },

  authenticate(callback) {
    const body = `<?xml version="1.0" encoding="utf-8"?> <envelope> <api type="pairing"> <name>hello</name> <value>${this.code}</value> <port>8080</port> </api> </envelope>`;
    return API.sendRequest(body, 'pairing')
      .then((res) => {
        if (res.status === 200) {
          return callback();
        }
      });
  },

  sendRequest(body, path) {
    return fetch(`${this.tv}${path}`, {
      method: 'POST',
      headers: this.headers,
      body
    });
  },

  isAlive() {
    return isReachable(this.tv)
      .then(reachable => reachable);
  }
};

export default API;
