const Role = require("../models/role");
const Usuario = require("../models/usuario");

const rolValido = async (rol = "") => {
  const rolExiste = await Role.findOne({ rol });
  if (!rolExiste) {
    throw new Error(`El rol ${rol} no es valido`);
  }
};

const correoExiste = async (correo) => {
  const correoExiste = await Usuario.findOne({ correo });
  if (correoExiste) throw new Error("El correo ya está en uso");
};

const usuarioExistePorId = async (_id) => {
  const usuarioExiste = await Usuario.findOne({ _id });
  if (!usuarioExiste) throw new Error("El usuario no existe");
};

module.exports = {
  rolValido,
  correoExiste,
  usuarioExistePorId,
};
