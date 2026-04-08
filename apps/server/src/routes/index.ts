import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router: Router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/user", userRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Axonix API" });
});

export default router;
