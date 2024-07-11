import { Codes } from '../utils/CodeStatus'
import env from '../config/callenv'
import { verify } from 'jsonwebtoken'
import { JsonResponseApiError } from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'
import { Request, Response } from '@node-oauth/oauth2-server'
import OAuth2 from '../auth/oauth'

export const jsonAPIValidator = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const content = req.get('Content-Type')

    if (content === 'application/vnd.api+json') {
      return next()
    }

    status = Codes.unsupportedMedia
    throw new Error('El header Content-type es incorrecto')
  } catch (error) {
    return res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}

export const checkAuth = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const token = req.get('token')

    if (token === env.TOKEN) {
      return next()
    }

    status = Codes.unauthorized
    throw new Error('Usuario no autorizado')
  } catch (error) {
    return res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}

export const checkBearer = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const auth = req.get('Authorization')
    const secret = env.SECRET_KEY as string

    if (!auth || !secret || !auth.startsWith('Bearer ')) {
      status = Codes.unauthorized
      throw new Error('Usuario no autorizado')
    }

    const token = auth.slice(7)

    verify(token, secret, (error: any) => {
      if (error) {
        status = Codes.unauthorized
        throw new Error('Usuario no autorizado')
      }
    })

    return next()
  } catch (error) {
    return res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}

export const checkOAuth2 = async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const auth = req.get('Authorization')
    const secret = env.SECRET_KEY as string

    if (!auth || !secret || !auth.startsWith('Bearer ')) {
      status = Codes.unauthorized
      throw new Error('Usuario no autorizado')
    }

    const token = auth.slice(7)
    console.log(token)

    const request = new Request(req)
    const response = new Response(res)

    const a = await OAuth2.authenticate(request, response)
    console.log(a)

    return next()
  } catch (error) {
    return res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
