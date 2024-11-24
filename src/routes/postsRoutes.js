import cors from "cors";
import multer from "multer";
import {
  atualizarNovoPost,
  listarPosts,
  postarNovoPost,
  uploadImg,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(cors(corsOptions));

  app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
  });

  app.get("/posts", listarPosts);
  app.post("/posts", postarNovoPost);
  app.post("/upload", upload.single("img"), uploadImg);
  app.put("/upload/:id", atualizarNovoPost);

  const getPostById = (id) => {
    return posts.find((post) => post.id === Number(id));
  };

  app.get("/posts/:id", (req, res) => {
    res.status(200).json(getPostById(req.params.id), uploadImg);
  });
};
export default routes;
