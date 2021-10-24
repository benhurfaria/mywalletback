import express from 'express';
import cors from 'cors';
import pg from 'pg';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';


const app = express();
app.use(cors());
app.use(express.json());

const {Pool} = pg;

const connection = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'mywallet'
});

app.post("/signup", async (req,res)=>{
    const {
        nome, 
        email,
        password
    } = req.body;
   
    try{
        const hash = bcrypt.hashSync(password,10);
        const result = await connection.query(`
            SELECT * FROM usuarios WHERE email = $1;
        `, [email]);

        
        if(result.rowCount >= 1){
            return res.sendStatus(400);
            
        }
        console.log(email);
        await connection.query(`
            INSERT INTO usuarios (nome, email, password) VALUES ($1, $2, $3);
        `, [nome, email, hash]);

        return res.sendStatus(200);
        
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(4000);