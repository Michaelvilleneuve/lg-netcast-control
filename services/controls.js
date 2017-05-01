import API from '../LgApi.js';

const controls = {
  handle(req, res) {
    API.command(req.params.control)
      .then(apiStatus => res.sendStatus(apiStatus))
      .catch(err => res.json(err));
  }
};

export default controls;
