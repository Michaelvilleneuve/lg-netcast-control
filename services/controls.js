import API from '../LgApi.js';
import controlList from '../controls.json';

const controls = {
  handle(req, res) {
    API.command(req.params.control)
      .then(apiStatus => res.sendStatus(apiStatus))
      .catch(err => res.json(err));
  },

  changeSound(req, res, operator) {
    for (let i = 0; i < req.params.value; i++) {
      setTimeout(() => API.command(`sound-${operator}`), i * 500);
    }
    res.sendStatus(200);
  },

  changeInput(req, res) {
    API.command('exit');
    setTimeout(() => API.command('input'), 1500);
    setTimeout(() => API.command('input'), 3000);
    setTimeout(() => API.command('ok'), 4300);
    res.sendStatus(200);
  },

  changeChannel(req, res) {
    const numbers = req.params.channel.split('');
    let time = 0;
    numbers.forEach((n) => {
      setTimeout(() => API.command(n), time);
      time += 1500;
    });
    res.sendStatus(200);
  },

  netflix(req, res) {
    API.command('exit');
    setTimeout(() => API.command('home'), 2500);
    setTimeout(() => API.command('right'), 5000);
    setTimeout(() => API.command('bottom'), 6500);
    setTimeout(() => API.command('ok'), 8000);
    res.sendStatus(200);
  },

  listCommands(req, res) {
    res.json(controlList);
  },

  isAlive(req, res) {
    API.isAlive().then(reachable => res.send(reachable));
  }
};

export default controls;
