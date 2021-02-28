// import models
import { Router } from "express";
import { v4 } from "uuid";
const router = Router();

router.get("/", (req, res) => {
  console.log("example route");
  res.status(200).json({
    example: true
  });
});

router.post("/start/", (req, res) => {
  const { username, created } = req.body;
  const id = v4();
  res.status(200).json({
    surface: {
      title: "scratch pad",
      history: [],
      username,
      owner: id,
      created,
      id,
    }
  });
});

export default router;
