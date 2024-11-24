import express from "express";
import routes from "./routes/postsRoutes.js";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
