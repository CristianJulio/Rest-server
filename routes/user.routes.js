const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  rolValido,
  correoExiste,
  usuarioExistePorId,
} = require("../helpers/db-validator");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users.controller");

const router = Router();

// /api/users

router.get("/", getUsers);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Ingresa un correo valido").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExistePorId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExistePorId),
    validarCampos,
  ],
  deleteUsers
);

module.exports = router;
