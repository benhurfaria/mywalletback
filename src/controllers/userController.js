import * as userSchema from "../schemas/userSchema.js";
import * as userService from "../services/userService.js";

async function signUp(req, res) {
  const validation = userSchema.signUpSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const result = await userService.createUser(req.body);
    if (result !== 1) {
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  } catch (error) {
    if (error.code === "23505") return res.sendStatus(409);
    res.sendStatus(500);
  }
}

async function signIn(req, res) {
  const validation = userSchema.signInSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const user = await userService.validateUser(req.body);
    if (user) {
      const result = await userService.createSession(user.userId);

      if (result.rowCount !== 1) {
        return res.sendStatus(400);
      }
      return res.status(200).send({ token: result.token, nome: user.name });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signUp, signIn };
