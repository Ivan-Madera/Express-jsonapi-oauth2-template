import { Router } from 'express'
import { createUser, getUsers } from '../controllers/users.controller'
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
 * /api/users:
 *   get:
 *     security:
 *     - OAuth2: []
 *     tags: [Users]
 *     summary: Obtener informacion de los usuarios
 *     description: Obtiene la información relevante de los usuarios.
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
router.get('/users', [checkOAuth2], getUsers)

/**
 * @swagger
 * /api/user:
 *   post:
 *     security:
 *     - OAuth2: []
 *     tags: [Users]
 *     summary: Crea un nuevo usuario
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
 *                     default: create-user
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       nombres:
 *                         type: string
 *                       apellido_paterno:
 *                         type: string
 *                       apellido_materno:
 *                         type: string
 *                       contrasenia:
 *                         type: string
 *                       correo:
 *                         type: string
 *                       telefono:
 *                         type: string
 *                       genero:
 *                         type: string
 *                       estado_civil:
 *                         type: string
 *             required:
 *               - nombres
 *               - apellido_paterno
 *               - apellido_materno
 *               - contrasenia
 *               - correo
 *               - telefono
 *               - genero
 *               - estado_civil
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
router.post('/user', [jsonAPIValidator, checkOAuth2], createUser)

export default router
