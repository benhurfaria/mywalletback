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

app.post("/signin", async (req,res)=>{
    const {
        email,
        password
    } = req.body;
    try{
        const result = await connection.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        const user = result.rows[0];
        console.log(user && bcrypt.compareSync(password, user.password));
        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            const nome = user.nome;
            
            await connection.query(`
            INSERT INTO sessoes (userid, token) VALUES ($1, $2);`,[user.id, token]
            );
            res.send({token, nome});
        } else{
            res.sendStatus(401);
        }
    }catch{
        res.sendStatus(500);
    }
});

app.get("/infos", async (req, res)=>{
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log(token);
    let soma = 0;
    try{
        const result = await connection.query(`SELECT * FROM sessoes JOIN infos ON sessoes.userid = infos.userid WHERE sessoes.token = $1;`, [token]);
        for(let i = 0; i < result.rowCount; i++){
            console.log(result.rows[i].operacao);
            if(result.rows[i].operacao === "entrada"){
                soma += Number(result.rows[i].valor);
            } else{
                soma -= Number(result.rows[i].valor);
            }
        }
        res.send({dados:result.rows, soma});
    }catch{
        res.sendStatus(500);
    }
});
app.post("/infos", async (req, res)=>{
    const token = req.headers.authorization?.replace('Bearer ', '');

    const {
        operacao,
        valor, 
        descricao
    } = req.body;

    try{
        const result  = await connection.query(`SELECT * FROM sessoes WHERE token = $1`, [token]);
        const userid = result.rows[0].userid;
        console.log(userid);
        await connection.query(`
            INSERT INTO infos (userid, operacao, dataoperacao, valor, descricao) VALUES ($1, $2, NOW(), $3, $4);
        `, [userid, operacao, valor, descricao]);
        res.sendStatus(200);
    } catch{
        res.sendStatus(500);
    }
});

app.delete("/signout", async (req, res)=>{
    const token = req.headers.authorization?.replace('Bearer ', '');

    try{
        await connection.query(`
            DELETE FROM sessoes WHERE token = $1; 
        `,[token])
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }

});

app.listen(4000);