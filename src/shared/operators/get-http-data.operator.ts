import { map } from 'rxjs/operators'

import { AxiosResponse } from 'axios'

export const getHTTPData = <T>() => map((response: AxiosResponse<T>) => response.data)
