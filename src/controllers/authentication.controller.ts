import { type Handler } from 'express'
import { Codes } from '../utils/CodeStatus'
import { Request, Response } from '@node-oauth/oauth2-server'
import OAuth2 from '../auth/oauth'
import {
  JsonResponseApiData,
  JsonResponseApiError
} from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'

export const getAccessToken: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const {
      body: {
        data: { attributes }
      }
    } = req

    req.headers['content-type'] = 'application/x-www-form-urlencoded'
    req.body = attributes

    const request = new Request(req)
    const response = new Response(res)

    const tokenizado = await OAuth2.token(request, response)

    status = Codes.success
    res
      .status(status)
      .json(JsonResponseApiData('auth-accesstoken', tokenizado, url))
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
