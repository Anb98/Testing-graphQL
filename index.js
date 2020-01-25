const {https} = require('firebase-functions');
const server = require('./graphql/server')();

const api = https.onRequest(server);

module.exports = {api};