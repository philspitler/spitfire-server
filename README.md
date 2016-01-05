# Spitfire Server

## Standard Express generated application + the spitfire-express middlware.

### Requirements
- Node.js
- MongoDB

### Installation
```bash
$ git clone https://github.com/spitfireio/spitfire-server.git
$ cd spitfire-server
$ npm install
```

### Usage
Please checkout the [spitfire-express repository](https://github.com/spitfireio/spitfire-express) for more documentation.

###NOTE: Will NOT generate endpoints on the fly when the environment is set to 'production'.  This is a security measure so people can't hit your API and generate endpoints "willy-nilly" when in production.
