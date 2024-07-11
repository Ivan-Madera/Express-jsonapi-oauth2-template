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

  try {
    const request = new Request(req)
    const response = new Response(res)

    const tokenizado = await OAuth2.token(request, response)

    status = Codes.success
    res.status(status).json({ data: tokenizado })
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
