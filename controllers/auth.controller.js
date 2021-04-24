const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res) => {
  const { correo, password } = req.body;
  
  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if(!usuario) return res.status(400).json({ msg: 'Correo o contraseña invalidos - correo' });

    // Si el usuario está activo
    if(usuario.estado === false) return res.status(400).json({ msg: 'Correo o contraseña invalidos - estado: false' })

    // Verificar la constraseña
    const passValida = bcryptjs.compareSync(password, usuario.password);
    if(!passValida) return res.status(400).json({ msg: 'Correo o contraseña invalidos - Password' })

    // Genera JWT
    const token = await generarJWT( usuario._id );
        
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
}

module.exports = {
  login
}