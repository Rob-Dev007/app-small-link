import express from "express";
import { createPublicUrl } from "../../controllers/urlController.js";

const router = express.Router();

// Ruta pública para usuarios no autenticados
router.post('/shorten', createPublicUrl);
//Redirreción url pública

export default router;