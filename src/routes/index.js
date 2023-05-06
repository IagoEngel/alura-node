import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de Node" });
  });

  app.use(
    express.json(), // express.json(): esse é um middleware nativo do Express que converte os dados de uma requisição para o formato JSON;
    livros, // roteador que pode ser utilizado como middleware
  );

  app.use(
    express.json(),
    autores,
  );
};

export default routes;