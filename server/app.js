import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';


const app = express();

db.setUpConnection();

app.use( bodyParser.json() );
app.use(cors({ origin: '*' }));

// RESTful api
app.get('/messages', (req, res) => {
    db.listMessages().then(data => res.send(data));
});

app.post('/messages', (req, res) => {
    db.createMessage(req.body).then(data => res.send(data));
});

app.delete('/messages/:id', (req, res) => {
    db.deleteMessage(req.params.id).then(data => res.send(data));
});


// console.log(db.listUsers());

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort} `);
});
