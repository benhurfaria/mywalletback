import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

const {Pool} = pg;

const connection = new Pool({
    user: 'bootcamp_role',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'boardcamp'
});

app.listen(4000);