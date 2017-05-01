import API from '../LgApi.js';
import controlList from '../controls.json';

const controls = {
  handle(req, res) {
    API.command(req.params.control)
      .then(apiStatus => res.sendStatus(apiStatus))
      .catch(err => res.json(err));
  },

  changeInput(req, res) {
    API.command('input');
    setTimeout(() => {
      API.command('input');
    }, 1500);
    setTimeout(() => {
      API.command('ok');
    }, 3000);
    res.sendStatus(200);
  },

  listCommands(req, res) {
    res.json(controlList);
  }
};

export default controls;
