import express from "express";
import { Filter } from "../../types";
import upload from "../middlewares/uploadMiddleware";
import * as parkingsServices from "../services/parkingsServices";
const router = express.Router();

router.get("/", (req, res) => {
  const { max_price, min_price, type, amenities } = req.query
  // console.log(max_price)
  res.send(parkingsServices.getAll( { max_price, min_price, type, amenities } as Filter ));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(parkingsServices.getOne(Number(id)));
});
router.post("/", upload.array("images", 12), async (req, res) => {
  const {
    address,
    amenities,
    score,
    type,
    description,
    price_total,
    price_month,
  } = req.body;

  const images = (req.files as Array<Express.Multer.File>).map((f) => {
    return {
      path: f.filename,
    };
  });

  const newParkingEntry = {
    address,
    amenities,
    score,
    type,
    images,
    description,
    price_total,
    price_month,
  };
  const newParking = parkingsServices.post(newParkingEntry);
  res.send(newParking);
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(parkingsServices.deleteParking(Number(id)));
});

export default router;
