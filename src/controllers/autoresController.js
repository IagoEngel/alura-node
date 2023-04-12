import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findById(id);

      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno de servidor" });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);

      const resultado = await autor.save();

      res.status(201).send(resultado.toJSON());
    } catch (error) {
      res.status(500).send({ message: `${error.message} - falha ao cadastrar autor.` });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

}

export default AutorController;