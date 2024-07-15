import {
  commitTrasaction,
  manageTransaction,
  rollbackTrasaction
} from '../database/transactions'
import { type IUserObj } from '../interfaces/user.dtos'
import { createUser } from '../repositories/mutations/user.mutations'
import { findAllUsers } from '../repositories/queries/user.queries'
import { Codes } from '../utils/CodeStatus'
import { encode } from '../utils/Encode'
import { type IJsonResponseApiGeneric } from '../interfaces/jsonResponseApi.dtos'
import {
  JsonResponseApiData,
  JsonResponseApiError,
  JsonResponseApiGeneric
} from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'

export const getUsersService = async (
  url: string
): Promise<IJsonResponseApiGeneric> => {
  let status = Codes.errorServer

  try {
    const findUser = await findAllUsers()

    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('users', findUser, url)
    )
  } catch (error) {
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const createUserService = async (
  url: string,
  userObj: IUserObj
): Promise<IJsonResponseApiGeneric> => {
  let status = Codes.errorServer
  const t = await manageTransaction()

  try {
    const createUser_ = await createUser(
      {
        nombres: userObj.nombres,
        apellido_paterno: userObj.apellido_paterno,
        apellido_materno: userObj.apellido_materno,
        usuario: userObj.correo.split('@')[0],
        contrasenia: encode(userObj.contrasenia),
        correo: userObj.correo,
        telefono: userObj.telefono,
        genero: userObj.genero,
        estado_civil: userObj.estado_civil
      },
      t
    )

    await commitTrasaction(t)
    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('users', createUser_, url)
    )
  } catch (error) {
    await rollbackTrasaction(t, 'createUserService')
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}
