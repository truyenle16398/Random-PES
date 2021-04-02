import { AuthAction } from "./auth.action";

export const actionGetData = () => ({
  type: AuthAction.GET_DATA
})

export const actionAddNew = (payload) => ({
  type: AuthAction.ADD_NEW,
  payload
})