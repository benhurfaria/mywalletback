import { connection } from "../database.js";

async function getInfo(token) {
  const result = await connection.query(
    `SELECT * FROM sessoes JOIN infos ON sessoes.userid = infos.userid WHERE sessoes.token = $1;`,
    [token]
  );
  return result;
}

async function postInfo({ userid, operacao, valor, descricao }) {
  return await connection.query(
    `
    INSERT INTO infos (userid, operacao, dataoperacao, valor, descricao) VALUES ($1, $2, NOW(), $3, $4);
`,
    [userid, operacao, valor, descricao]
  );
}

async function getSession(token) {
  const result = await connection.query(
    `SELECT * FROM sessoes WHERE token = $1;`,
    [token]
  );
  return result.rows[0].userid;
}

export { getInfo, postInfo, getSession };
