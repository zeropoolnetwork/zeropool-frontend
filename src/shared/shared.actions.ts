import { createAction as create } from 'typesafe-actions'

export const navigate = {
  to: create('@shared/navigate')<string>(),
}
