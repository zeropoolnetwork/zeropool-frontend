import { map } from 'rxjs/operators'
import { PayloadAction } from '@reduxjs/toolkit'

export const getPayload = <T>() =>
  map((action: PayloadAction<T, string>) => action.payload)
