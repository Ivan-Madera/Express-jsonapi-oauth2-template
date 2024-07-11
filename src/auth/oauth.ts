import OAuth2Server from '@node-oauth/oauth2-server'
import Token from '../database/models/token.model'
import User from '../database/models/user.model'

const OAuth2 = new OAuth2Server({
  model: {
    getAccessToken: async (accessToken) => {
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
        client: {
          id: usuario.id_usuario.toString(),
          grants: ['password']
        },
        user: {}
      }
    },
    getClient: async (clientId, clientSecret) => {
      console.log(clientSecret)
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
      await Token.create({
        id_usuario: +client.id,
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
