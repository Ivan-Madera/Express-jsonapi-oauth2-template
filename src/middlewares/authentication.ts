import { Codes } from '../utils/CodeStatus'
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

export const checkOAuth2 = async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  const url = req.originalUrl
  const status = Codes.unauthorized

  try {
    req.headers['content-type'] = 'application/x-www-form-urlencoded'

    const request = new Request(req)
    const response = new Response(res)

    await OAuth2.authenticate(request, response)

    req.headers['content-type'] = 'application/vnd.api+json'
    return next()
  } catch (error) {
    return res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
