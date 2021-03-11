import { map } from "rxjs/operators";
import { PayloadAction } from "typesafe-actions";

export const getPayload = <T>() => 
  map((action: PayloadAction<string, T>) => action.payload);