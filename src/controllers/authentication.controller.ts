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
    req.headers['content-type'] = 'application/x-www-form-urlencoded'

    const {
      body: {
        data: { attributes }
      }
    } = req

    const requestRequired = {
      method: req.method,
      query: req.query,
      headers: {
        ...req.headers
      },
      body: {
        ...attributes
      }
    }

    console.log(req.query)
    const request = new Request(requestRequired)
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
