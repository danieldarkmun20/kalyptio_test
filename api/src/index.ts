import express from "express";
import routerParking from "./routes/parkings";

const app = express();

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
