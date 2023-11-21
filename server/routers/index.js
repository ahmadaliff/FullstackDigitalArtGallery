const { Router } = require("express");

const {
  login,
  register,
  editProfile,
  forgotPassword,
  setResetPassword,
  getProfile,
  verifyEmail,
  setVerifyEmail,
} = require("../controllers/userController");
const { RefreshToken } = require("../controllers/refreshToken");

const {
  authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");
const {
  verifySendResetMiddleware,
} = require("../middleware/sendResetPassMiddleware");

const artistRoute = require("./artistRoute");
const adminRoute = require("./adminRoute");
const {
  deleteArt,
  addArtToFavorit,
  deleteArtFromFavorit,
  getAllArt,
  getDetailArt,
} = require("../controllers/artController");
const {
  verifyEmailMiddleware,
} = require("../middleware/verifyEmailMiddleware");
const {
  authorizationIsOwnFavorit,
  authorizationIsOwnArt,
} = require("../middleware/authorizationIsOwnCheck");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/set-reset-password", verifySendResetMiddleware, setResetPassword);
router.get("/art", getAllArt);
router.get("/art/:artId", getDetailArt);
router.get("/refresh", RefreshToken);

// must login
router.use(authenticationMiddleware);

router.get("/get-profile", getProfile);
router.put("/edit-profile", editProfile);
router.post("/verify-email", verifyEmail);
router.patch("/set-verify-email/:token", verifyEmailMiddleware, setVerifyEmail);
router.delete("/art/delete/:artId", authorizationIsOwnArt, deleteArt);
router.post(
  "/art/add-to-favorit/:artId",
  authorizationIsOwnFavorit,
  addArtToFavorit
);
router.delete(
  "/art/delete-from-favorit/:artId",
  authorizationIsOwnFavorit,
  deleteArtFromFavorit
);

router.use("/artist", artistRoute);
router.use("/admin", adminRoute);

module.exports = router;
