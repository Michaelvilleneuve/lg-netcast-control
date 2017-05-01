import express from 'express';
import Control from './services/controls';
import API from './LgApi';

API.pair();
const app = express();

app.post('/command/:control', (req, res) => Control.handle(req, res));

app.listen(1234, () => console.log('Listening on port 1234'));
