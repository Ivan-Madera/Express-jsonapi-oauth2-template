import { Router } from 'express'
import { diaries, diariesCreate } from '../controllers/diaries.controller'
import { checkOAuth2, jsonAPIValidator } from '../middlewares/authentication'
const router = Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    OAuth2:            # arbitrary name for the security scheme
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/diaries:
 *   get:
 *     security:
 *     - OAuth2: []
 *     tags: [Diaries]
 *     summary: Obtener informacion de los viajes
 *     description: Obtiene la información relevante de los viajes.
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.get('/diaries', [checkOAuth2], diaries)

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     security:
 *     - OAuth2: []
 *     tags: [Diaries]
 *     summary: Crea una nuevo diario de viaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     default: diaries
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       weather:
 *                         type: string
 *                       visibility:
 *                         type: string
 *                       comment:
 *                         type: string
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.post('/diaries', [jsonAPIValidator, checkOAuth2], diariesCreate)

export default router
