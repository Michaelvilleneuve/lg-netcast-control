import express from 'express';
import Control from './services/controls';
import API from './LgApi';

API.pair();
const app = express();

app.post('/command/change-input', (req, res) => Control.changeInput(req, res));
app.post('/command/netflix', (req, res) => Control.netflix(req, res));
app.post('/command/:control', (req, res) => Control.handle(req, res));

app.post('/command/sound/up/:value', (req, res) => Control.changeSound(req, res, 'plus'));
app.post('/command/sound/down/:value', (req, res) => Control.changeSound(req, res, 'minus'));
app.post('/command/channel/:channel', (req, res) => Control.changeChannel(req, res));

app.get('/commands/list', (req, res) => Control.listCommands(req, res));
app.get('/ping', (req, res) => Control.isAlive(req, res));

app.listen(1234, () => console.log('Listening on port 1234'));
