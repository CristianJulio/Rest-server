const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users.controller");

const router = Router();

// /api/users

router.get("/", getUsers);

router.post("/", postUsers);

router.put("/:id", putUsers);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

module.exports = router;
