import express from 'express';
import CheckAuth from '../../middlewares/authMiddleware.js';
import { agregarUrl, obtenerUrl, actualizarUrl, eliminarUrl, pagination } from '../../controllers/urlController.js';

const router = express.Router();

router
    .route('/')
    .post(CheckAuth, agregarUrl)
    .get(CheckAuth,  pagination)

router
    .route('/:id')
    .get(CheckAuth, obtenerUrl)
    .put(CheckAuth, actualizarUrl)
    .delete(CheckAuth, eliminarUrl)

export default router;