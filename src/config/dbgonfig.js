import { MongoClient } from "mongodb";

const conectarAoBanco = async (stringConnection) => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConnection);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    return mongoClient;
  } catch (error) {
    console.error(`Falha na conexão com o banco de dados! ${error}`);
    process.exit();
  }
};

export default conectarAoBanco;
