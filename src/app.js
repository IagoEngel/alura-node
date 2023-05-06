import express from "express";
import db from "./config/dbConnection.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipuladorErro404 from "./middlewares/manipuladorErro404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

// app.use((req, res) => {
//   res.status(200).send({ mensagem: "Resposta do novo middleware" });
// }); // --> somente esse middleware é feito
// Isso porque a ordem em que os middlewares são registrados na aplicação é importante. Como o middleware acima foi registrado antes dos métodos dos controladores, seu código será executado primeiro para qualquer requisição. E se um middleware enviar uma resposta para o cliente (nesse caso, com o método send), o fluxo da requisição encerra nessa resposta, e quaisquer middlewares registrados depois desse não serão executados. Afinal, apenas uma resposta pode ser enviada para cada requisição.

// app.use((req, res, next) => {
//   console.log("Código de um novo middleware");
//   next(); // --> o próximo middleware é executado por causa deste comando
// });

// app.get("/livros", (req, res, next) => {
//   console.log("Middleware registrado no GET da rota /livros");
//   next();
// });


routes(app);

app.use(manipuladorErro404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;