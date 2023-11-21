const { Router } = require("express");
const {
  accArt,
  refuseArt,
  deleteCategory,
  deleteUser,
  changeRole,
  getAllUser,
} = require("../controllers/adminController");
const { authorizationRoleAdmin } = require("../middleware/authorizationRole");

const router = Router();

// middleware klo role admin
router.use(authorizationRoleAdmin);

router.get("/user", getAllUser);
router.patch("/art/acc/:artId", accArt);
router.patch("/art/refuse/:artId", refuseArt);
router.delete("/category/delete/:categoryId", deleteCategory);
router.delete("/user/delete/:userId", deleteUser);
router.patch("/user/change-role/:userId", changeRole);

module.exports = router;
