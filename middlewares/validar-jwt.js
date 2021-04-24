const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");

const validarJWT = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token)
    return res.status(401).json({ msg: "No hay token en la petición" });
  try {
    // Extraigo el uid del token
    const { uid } = jwt.verify(token, process.env.SECRETA);
    
    // Obtengo el usuario de la request
    const usuarioAutenticado =  await usuario.findOne({ _id: uid, estado: true });

    // Verificar si el usuario está activo
    if(!usuarioAutenticado) return res.status(401).json({ msg: 'Token no valido' });
    
    // Guardo el usuario de la petición en la request
    req.usuario = usuarioAutenticado;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = {
  validarJWT,
};
