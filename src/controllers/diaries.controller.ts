import { type Handler } from 'express'
import { getDiaries } from '../services/diaries.service'
import { Codes } from '../utils/CodeStatus'
import { JsonResponseApiError } from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'
import OAuth2 from '../auth/oauth'
import { Request, Response } from '@node-oauth/oauth2-server'

export const diaries: Handler = (req, res) => {
  return res.send(getDiaries())
}

export const diariesCreate: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer
  console.log(0)

  try {
    const request = new Request(req)
    console.log(request)
    const response = new Response(res)

    console.log(1)
    OAuth2.token(request, response)
      .then((token) => {
        console.log(2)
        console.log('token', token)
        return token
      })
      .catch((err) => {
        console.log(3)
        throw new Error(err || 'Mamo el tokenizado')
      })

    status = Codes.success
    res.status(status).json({})
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
