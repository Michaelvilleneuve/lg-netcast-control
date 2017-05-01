import fetch from 'node-fetch';
import controls from './controls.json';
/* eslint max-len: 0 */

const API = {
  tv: 'http://192.168.1.10:8080/udap/api/',
  headers: {
    'User-Agent': 'Apple iOS UDAP/2.0 Connect SDK',
    'Content-Type': 'text/xml'
  },

  command(name) {
    const body = `<?xml version="1.0" encoding="utf-8"?><envelope><api type="command"><name>HandleKeyInput</name><value>${controls[name]}</value></api></envelope>`;
    return fetch(`${this.tv}command`, {
      method: 'POST',
      headers: this.headers,
      body
    })
    .then((res) => {
      if (res.status === 401) return API.authenticate(this.command.bind(this, name));
      return res.status;
    });
  },

  pair() {
    const body = '<?xml version="1.0" encoding="utf-8"?> <envelope> <api type="pairing"> <name>showKey</name> </api> </envelope>';
    return fetch(`${this.tv}pairing`, {
      method: 'POST',
      headers: this.headers,
      body
    })
    .then(() => API.finishPairing());
  },

  finishPairing() {
    const body = '<?xml version="1.0" encoding="utf-8"?> <envelope> <api type="pairing"> <name>hello</name> <value>272905</value> <port>8080</port> </api> </envelope>';
    return fetch(`${this.tv}pairing`, {
      method: 'POST',
      headers: this.headers,
      body
    });
  },

  authenticate(callback) {
    const body = '<?xml version="1.0" encoding="utf-8"?> <envelope> <api type="pairing"> <name>hello</name> <value>272905</value> <port>8080</port> </api> </envelope>';

    return fetch(`${this.tv}command`, {
      method: 'POST',
      headers: this.headers,
      body
    })
    .then((res) => {
      if (res.status === 200) {
        return callback();
      }
    });
  }
};

export default API;
