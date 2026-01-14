import express from "express";
import { createPublicUrl } from "../../controllers/urlController.js";

const router = express.Router();

// Ruta pública para usuarios no autenticados
router.post('/shorten', createPublicUrl);

export default router;