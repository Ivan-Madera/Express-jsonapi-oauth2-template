import OAuth2Server from '@node-oauth/oauth2-server'
import Token from '../database/models/token.model'
import User from '../database/models/user.model'

const OAuth2 = new OAuth2Server({
  model: {
    getAccessToken: async (accessToken) => {
      console.log('ejecutando getAccessToken')
      const token = await Token.findOne({
        where: {
          token: accessToken
        }
      })

      if (!token) {
        throw new Error(`No existe nada asociado al token ${accessToken}`)
      }

      const usuario = await User.findOne({
        where: {
          id_usuario: token.id_usuario
        }
      })

      if (!usuario) {
        throw new Error(
          `No existe ningun usuario con el id ${token.id_usuario}`
        )
      }

      return {
        accessToken,
        accessTokenExpiresAt: new Date('2024-07-12T17:13:40.785Z'),
        client: {
          id: usuario.id_usuario.toString(),
          grants: ['password']
        },
        user: usuario
      }
    },
    getClient: async (clientId, clientSecret) => {
      console.log('ejecutando getClient')
      const usuario = await User.findOne({
        where: {
          id_usuario: clientId
        }
      })

      if (!usuario) {
        throw new Error(`No existe ningun usuario con el id ${clientId}`)
      }

      return {
        id: usuario.id_usuario.toString(),
        grants: ['password']
      }
    },
    saveToken: async (token, client, user) => {
      console.log('ejecutando saveToken')
      await Token.create({
        id_usuario: +user.id_usuario,
        token: token.accessToken
      })

      return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        client,
        user
      }
    },
    getUser: async (username, password) => {
      console.log('ejecutando getUser')
      return await User.findOne({
        where: {
          contrasenia: password,
          usuario: username
        }
      })
    }
  },
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
})

export default OAuth2
