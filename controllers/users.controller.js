const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsers = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

const postUsers = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });

    // Ecriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Guardar en la base de datos
    await user.save();

    res.json({ msg: "Usuario creado", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...rest } = req.body;

  try {
    // Validar contra base de datos
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      rest.password = await bcryptjs.hash(password, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, rest);

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;
  // Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuarioAutenticado = req.usuario;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({ usuario, usuarioAutenticado });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
