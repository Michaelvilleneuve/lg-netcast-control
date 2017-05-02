LG Netcast TV API remote control
===============================

This repo is just a wrapper around the XML LG Netcast API that allows you to control your TV with external apps.

Why should I use it ?
---------------------

The LG specification is a very basic XML API so you might wonder "Why would I need an API to use another API ??".
Well, even if the LG api is simple, it forces you to deal with things like XML, authentication, pairing, etc.

With this wrapper, you can with very little configuration query your TV API with an HTTP request, without having to pass the correct headers, value, http status, etc.


Install
------

Edit config.json and replace ip value with your TV IP address

Then run
`npm install`
`npm start`

When the pairing code appears on your TV, update config.json with the given value

Then run `npm start` again and your good to go.

Usage
-----

Examples :

| Action  | Command |
| ------------- | ------------- |
| List actions  | `curl http://localhost:1234/commands/list`  |
| Mute  | `curl -X POST http://localhost:1234/command/mute`  |
| Turn off  | `curl -X POST http://localhost:1234/command/off`  |
| Volume UP  | `curl -X POST http://localhost:1234/command/sound-plus`  |
| Volume DOWN  | `curl -X POST http://localhost:1234/command/sound-minus`  |
| Left  | `curl -X POST http://localhost:1234/command/left`  |
| Right  | `curl -X POST http://localhost:1234/command/right`  |

Well you've got the idea. See `curl http://localhost:1234/commands/list` to get the list of actions.


Create custom action flows
-------------------------

Add an express route, and see the "netflix" example.
Basically, it's just about sending commands one after the other.

```javascript
netflix(req, res) {
  API.command('home');
  setTimeout(() => API.command('right'), 4000);
  setTimeout(() => API.command('bottom'), 5500);
  setTimeout(() => API.command('ok'), 6500);
  res.sendStatus(200);
},
```
