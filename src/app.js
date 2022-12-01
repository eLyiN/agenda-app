import express from 'express';
import path from 'path';
import { getDates, getDate, insertDate, updateDate, deleteDate  } from './db';

const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/citas', async (req, res) => {
    const citas = await getDates();
    res.json(citas);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;