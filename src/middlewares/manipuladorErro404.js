import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorErro404(req, res, next){
  const erro404 = new NaoEncontrado();
  
  next(erro404);
}

export default manipuladorErro404;