import {
  type INewDiaryEntry,
  type IDiaryObject
} from '../interfaces/diaries.dtos'
import { type IJsonResponseApiGeneric } from '../interfaces/jsonResponseApi.dtos'
import { Codes } from '../utils/CodeStatus'
import { ErrorSugestions } from '../utils/ErrorSugestions'
import {
  JsonResponseApiData,
  JsonResponseApiError,
  JsonResponseApiGeneric
} from '../utils/JsonResponseApi'
import diariesData from './../json/diaries.json'

export const getDiaries = (url: string): IJsonResponseApiGeneric => {
  let status = Codes.errorServer

  try {
    const diaries = diariesData as IDiaryObject[]

    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('diaries', diaries, url)
    )
  } catch (error) {
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const createDiaries = (
  url: string,
  newDiaryEntry: INewDiaryEntry
): IJsonResponseApiGeneric => {
  let status = Codes.errorServer

  try {
    const newDiary = {
      id: diariesData.length + 1,
      ...newDiaryEntry
    }

    diariesData.push(newDiary)

    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('diaries', newDiary, url)
    )
  } catch (error) {
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}
