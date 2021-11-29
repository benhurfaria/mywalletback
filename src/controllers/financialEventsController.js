import * as financialEventsServices from "../services/financialEventsServices.js";

async function getInfo(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const result = await financialEventsServices.getInfo(token);
    res.status(200).send(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function postInfo(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  const { operacao, valor, descricao } = req.body;

  try {
    const userid = await financialEventsServices.getSession(token);
    const result = await financialEventsServices.postInfo({
      userid,
      operacao,
      valor,
      descricao,
    });
    if (result.rowCount === 1) return res.sendStatus(200);
    else return res.sendStatus(400);
  } catch {
    res.sendStatus(500);
  }
}

export { getInfo, postInfo };
