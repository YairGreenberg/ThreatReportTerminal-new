import express from "express";
import router from "./routers/routerCRUD.js";
import "dotenv/config";

const PORT = process.env.PORT ||3027;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
