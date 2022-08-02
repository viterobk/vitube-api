import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())