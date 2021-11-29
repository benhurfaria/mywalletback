import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import { connection } from "../src/database.js";
//testes da entidade usuarios
afterAll(() => {
  connection.end();
});
describe("POST/ signup", () => {
  const emailTest = "bhfaria@gmail.com";
  afterAll(async () => {
    await connection.query(
      `DELETE FROM usuarios WHERE email = '${emailTest}';`
    );
  });
  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app).post("/signup").send({
      nome: "ben",
      email: "benhurfaria3@gmail.com",
      password: "xablau",
    });

    expect(result.status).toEqual(400);
  });
  it("returns status 200 for valid account", async () => {
    const resultOK = await supertest(app).post("/signup").send({
      nome: "ben",
      email: emailTest,
      password: "xablau",
    });
    expect(resultOK.status).toEqual(200);
  });
});

describe("POST/ signin", () => {
  let token;
  afterAll(async () => {
    await connection.query(`DELETE FROM sessoes WHERE token = '${token}';`);
  });
  it("returns status 200 and property", async () => {
    const result = await supertest(app).post("/signin").send({
      email: "benhu@mail.com",
      password: "123456",
    });
    token = result.body.token;

    expect(result.body).toHaveProperty("token");
  });
});
