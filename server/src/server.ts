import path from 'path';
import ws from 'ws';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, '../static')))

