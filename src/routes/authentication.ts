import { Router } from 'express'
import { getAccessToken } from '../controllers/authentication.controller'
const router = Router()

/**
 * @swagger
 * /api/auth/accesstoken:
 *   post:
 *     tags: [Authentication]
 *     summary: Obtener el access token del usuario
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
 *                     default: auth-accesstoken
 *                   attributes:
 *                      type: object
 *                      properties:
 *                        grant_type:
 *                          type: string
 *                          default: password
 *                        username:
 *                          type: string
 *                          default: user-example
 *                        password:
 *                          type: string
 *                          default: password-example
 *                        client_id:
 *                          type: string
 *                          default: 1
 *                        client_secret:
 *                          type: string
 *                          default: secret
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
router.post('/auth/accesstoken', [], getAccessToken)

export default router
