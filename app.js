import express from 'express';
import Control from './services/controls';
import API from './LgApi';

API.pair();
const app = express();

app.post('/command/change-input', (req, res) => Control.changeInput(req, res));
app.post('/command/:control', (req, res) => Control.handle(req, res));
app.get('/list', (req, res) => Control.listCommands(req, res));

app.listen(1234, () => console.log('Listening on port 1234'));
