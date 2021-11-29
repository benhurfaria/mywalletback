import { connection } from "../database.js";

async function createUser({ name, email, password }) {
  const result = await connection.query(
    `
        INSERT INTO usuarios (nome, email, password) VALUES ($1, $2, $3);
    `,
    [name, email, password]
  );
  return result.rowCount;
}

async function verifyUser({ email }) {
  const result = await connection.query(
    `
        SELECT * FROM usuarios WHERE email = $1;
    `,
    [email]
  );

  return result.rows[0];
}

async function createSession({ token, userId }) {
  const result = await connection.query(
    `
        INSERT INTO sessoes (userid, token) VALUES ($1, $2);`,
    [userId, token]
  );
  return result;
}

export { createUser, createSession, verifyUser };
