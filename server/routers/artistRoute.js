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
const { multerMiddleware } = require("../utils/multer");

const router = Router();

// middleware klo rolenya artist
router.use(authorizationRoleArtist);
router.post("/art/add", multerMiddleware, addArt);
router.post("/art/category/add", addCategory);
router.put(
  "/art/update/:artId",
  authorizationIsOwnArt,
  multerMiddleware,
  updateArt
);

module.exports = router;
