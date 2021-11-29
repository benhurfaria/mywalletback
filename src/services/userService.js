import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as userRepository from "../repositories/userRepository.js";

async function createUser({ name, email, password }) {
  const hashPassword = bcrypt.hashSync(password, 10);
  return await userRepository.createUser({
    name,
    email,
    password: hashPassword,
  });
}

async function validateUser({ email, password }) {
  const user = await userRepository.verifyUser({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    return { userId: user.id, name: user.nome };
  } else {
    return false;
  }
}
async function createSession(userId) {
  const token = uuid();
  const result = await userRepository.createSession({ token, userId });
  return { token, rowCount: result.rowCount };
}
export { createUser, validateUser, createSession };
