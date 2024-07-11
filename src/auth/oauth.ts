import OAuth2Server from '@node-oauth/oauth2-server'
import Token from '../database/models/token.model'
import User from '../database/models/user.model'
import { encode } from '../utils/Encode'
import Client from '../database/models/client.model'

const OAuth2 = new OAuth2Server({
  model: {
    getAccessToken: async (accessToken) => {
      console.log('Ejecutando getAccessToken')
      const token = await Token.findOne({
        where: {
          accessToken
        }
      })

      if (!token) {
        throw new Error(`No se encuentra registrado el token ingresado`)
      }

      const cliente = await Client.findOne({
        where: {
          id_cliente: token.id_cliente
        }
      })

      if (!cliente) {
        throw new Error(`No existe ningun cliente asociado al clientID`)
      }

      const usuario = await User.findOne({
        where: {
          id_usuario: token.id_usuario
        }
      })

      if (!usuario) {
        throw new Error(`No existe ningun usuario asociado al token`)
      }

      return {
        accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt ?? new Date(),
        client: {
          id: cliente.id_cliente.toString(),
          grants: ['password']
        },
        user: usuario.dataValues
      }
    },
    getClient: async (clientId, _clientSecret) => {
      console.log('Ejecutando getClient')
      const cliente = await Client.findOne({
        where: {
          id_cliente: +clientId
        }
      })

      if (!cliente) {
        throw new Error(`No existe ningun cliente asociado al clientID`)
      }

      return {
        id: cliente.id_cliente.toString(),
        grants: ['password']
      }
    },
    saveToken: async (token, client, user) => {
      console.log('Ejecutando saveToken')
      await Token.destroy({
        where: {
          id_usuario: +user.id_usuario,
          id_cliente: +client.id
        }
      })

      await Token.create({
        id_usuario: +user.id_usuario,
        id_cliente: +client.id,
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt
      })

      return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        client,
        user
      }
    },
    getUser: async (username, password) => {
      console.log('Ejecutando getUser')
      return await User.findOne({
        where: {
          contrasenia: encode(password),
          usuario: username
        }
      })
    }
  },
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
})

export default OAuth2
