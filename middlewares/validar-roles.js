const Usuario = require('../models/usuario');

const esAdminRole = (req, res, next) => {
  if(!req.usuario)
    return res.status(500).json({ msg: 'Se quiere verificar el role sin validar el token primero' })

  const { rol, nombre } = req.usuario;
  if( rol !== 'ADMIN_ROLE' )
    return res.status(401).json({ msg: `${ nombre } no es administrador` });

  next();
};

const tieneRole = ( ...roles ) => {
  return (req, res, next) => {
    if (!req.usuario)
      return res
        .status(500)
        .json({
          msg: "Se quiere verificar el role sin validar el token primero",
        });
    
    if(!roles.includes( req.usuario.rol )) return res.status(401).json({ msg: 'Este usuario no tiene permiso para realizar esta acción'});
        
    next();
  }
}

module.exports = {
  esAdminRole,
  tieneRole
};
