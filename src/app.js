import express from "express";
import db from "./config/db_connection.js";
import livros from "./models/Livro.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

// const livros = [
//     {id: 1, "titulo": "Senhor do Áneis"},
//     {id: 2, "titulo": "O Hobbit"},
// ];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros);
    });
});

app.get('/livros/:id', (req, res) => {
    let index = buscarLivro(req.params.id);

    res.json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso!');
});

app.put('/livros/:id', (req, res) => {
    let index = buscarLivro(req.params.id);

    livros[index].titulo = req.body.titulo;

    res.json(livros);
});

app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;

    let index = buscarLivro(id);

    livros.splice(index, 1);

    res.send(`Livro ${id} removido com sucesso`);
});

function buscarLivro(id) {
    return livros.findIndex(livro => livro.id == id);
}

export default app;