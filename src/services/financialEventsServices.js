import * as financialEventsRepository from "../repositories/financialEventsRepository.js";

async function getInfo(token) {
  const result = await financialEventsRepository.getInfo(token);
  let soma = 0;
  result.rows.forEach((res) => {
    if (res.operacao === "entrada") soma += Number(res.valor);
    else soma -= Number(res.valor);
  });
  return { dados: result.rows, soma };
}

async function postInfo({ userid, operacao, valor, descricao }) {
  return await financialEventsRepository.postInfo({
    userid,
    operacao,
    valor,
    descricao,
  });
}

async function getSession(token) {
  const userid = await financialEventsRepository.getSession(token);
  return userid;
}

export { getInfo, postInfo, getSession };
