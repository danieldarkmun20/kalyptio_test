import express from "express";
import routerParking from "./routes/parkings";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const PORT = 3000;

app.use("/api/parkings", routerParking);

app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.send(`/images/${imageName}`);
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
