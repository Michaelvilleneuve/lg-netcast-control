import API from '../LgApi.js';

const controls = {
  handle(req, res) {
    API.command(req.params.control)
      .then(apiRes => res.json(apiRes))
      .catch(err => res.json(err));
  }
};

export default controls;
