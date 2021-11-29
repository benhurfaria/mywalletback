import express from "express";
import cors from "cors";
import { connection } from "./database.js";
import * as userController from "./controllers/userController.js";
import * as financialEventsController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", userController.signUp);
app.post("/signin", userController.signIn);
app.get("/infos", financialEventsController.getInfo);
app.post("/infos", financialEventsController.postInfo);

app.delete("/signout", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    await connection.query(
      `
            DELETE FROM sessoes WHERE token = $1; 
        `,
      [token]
    );
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

export default app;
