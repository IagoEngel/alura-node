import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:<password>@alura.g7sogo0.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;