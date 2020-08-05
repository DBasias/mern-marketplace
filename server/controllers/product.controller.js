import fs from "fs";
import Product from "./../models/product.model";
import formidable from "formidable";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }

    let product = new Product(fields);
    product.shop = req.shop;

    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    try {
      let result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

export default { create };
