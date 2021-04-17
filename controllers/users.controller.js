const { response } = require("express");

const getUsers = (req, res = response) => {
  const params = req.query;
  
  res.json({
    msg: 'Get Api - Controlador',
    params
  });
}

const postUsers = (req, res = response) => {
  const { nombre, edad } = req.body;
  
  res.json({
    msg: 'Post Api - Controlador',
    nombre,
    edad
  });
}

const putUsers = (req, res = response) => {
  const id = req.params.id;
  
  res.json({
    msg: 'Put Api - Controlador',
    id
  });
}

const deleteUsers = (req, res = response) => {
  res.json({
    msg: 'Delete Api - Controlador'
  });
}

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'Patch Api - Controlador'
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers
}