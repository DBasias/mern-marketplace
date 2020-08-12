import express from "express";
import authCtrl from "./../controllers/auth.controller";
import shopCtrl from "./../controllers/shop.controller";
import productCtrl from "./../controllers/product.controller";

const router = express.Router();

router
  .route("/api/products/by/:shopId")
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByShop);

router.route("/api/products/latest").get(productCtrl.listLatest);

router
  .route("/api/product/image/:productId")
  .get(productCtrl.photo, productCtrl.defaultPhoto);
router.route("/api/product/defaultphoto").get(productCtrl.defaultPhoto);

router.param("shopId", shopCtrl.shopByID);
router.param("productId", productCtrl.productByID);

export default router;
