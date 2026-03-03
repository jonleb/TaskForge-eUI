const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

function createApp(dbPath) {
    const app = express();
    const adapter = new FileAsync(dbPath || 'mock/db/db.json');
    const db = low(adapter);

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./app/routes')(app, db);

    return { app, db };
}

module.exports = createApp;
