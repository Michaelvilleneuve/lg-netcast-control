import API from '../LgApi.js';
import controlList from '../controls.json';

const controls = {
  handle(req, res) {
    API.command(req.params.control)
      .then(apiStatus => res.sendStatus(apiStatus))
      .catch(err => res.json(err));
  },

  changeSound(req, res) {
    for (let i = 0; i < req.params.value; i++) {
      setTimeout(() => API.command('sound-minus'), i * 400);
    }
    res.sendStatus(200);
  },

  changeInput(req, res) {
    API.command('input');
    setTimeout(() => API.command('input'), 1500);
    setTimeout(() => API.command('ok'), 3000);
    res.sendStatus(200);
  },

  netflix(req, res) {
    API.command('home');
    setTimeout(() => API.command('right'), 4000);
    setTimeout(() => API.command('bottom'), 5500);
    setTimeout(() => API.command('ok'), 6500);
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
