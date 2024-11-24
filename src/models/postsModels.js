import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbgonfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);

const getTodosPosts = () => {
  const db = conexao.db("imersão-instabyte");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
};

const criarPost = async (novoPost) => {
  const db = conexao.db("imersão-instabyte");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
};

const atualizarPost = async (id, novoPost) => {
  const db = conexao.db("imersão-instabyte");
  const colecao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
};

export { atualizarPost, criarPost, getTodosPosts };
