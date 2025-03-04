const { register, login, getAllUsers } = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getAllUsers); // Protected route

module.exports = router;
 