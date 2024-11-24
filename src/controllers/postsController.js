import fs from "fs";
import {
  atualizarPost,
  criarPost,
  getTodosPosts,
} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminaiService.js";

const listarPosts = async (req, res) => {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
};

const postarNovoPost = async (req, res) => {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição!" });
  }
};
//

const uploadImg = async (req, res) => {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  try {
    const postCriado = await criarPost(novoPost);
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imgAtualizada);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição!" });
  }
};

const atualizarNovoPost = async (req, res) => {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const novoPost = {
      imgUrl: urlImg,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, novoPost);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição!" });
  }
};
export { atualizarNovoPost, listarPosts, postarNovoPost, uploadImg };
