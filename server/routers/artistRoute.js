const { Router } = require("express");
const {
  addArt,
  updateArt,
  addCategory,
} = require("../controllers/artistController");
const {
  authorizationIsOwnArt,
} = require("../middleware/authorizationIsOwnCheck");
const { authorizationRoleArtist } = require("../middleware/authorizationRole");

const router = Router();

// middleware klo rolenya artist
router.use(authorizationRoleArtist);
router.post("/art/add", addArt);
router.post("/art/category/add", addCategory);
router.put("/art/update/:artId", authorizationIsOwnArt, updateArt);

module.exports = router;
