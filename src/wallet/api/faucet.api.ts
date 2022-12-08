import axios from 'axios'
import { promiceErrorHandler } from 'wallet/api/error.handlers'

let API: string
let TOKEN: string

if (process.env.NODE_ENV === 'development') {
  API = process.env.REACT_APP_NETWORK_FAUCET as string
  TOKEN = process.env.REACT_APP_TOKEN as string
} else if (process.env.NODE_ENV === 'production') {
  API = REACT_APP_NETWORK_FAUCET
  TOKEN = REACT_APP_TOKEN
}

export const callFaucet = ({
  address,
  amount,
}: {
  address: string
  amount: string
}): Promise<string> => {
  // const http = axios.create({
  //   baseURL: API,
  //   headers: { 'Content-Type': 'application/json' },
  //   withCredentials: false,
  // })

  const url = `${API}/${TOKEN}/${address}`

  // return new Promise<string>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(`Successfuly requested ${amount} ${TOKEN} from faucet`)
  //   }, 3000)
  // })

  return fetch(url, {
    method: 'post',
    body: JSON.stringify({ amount }),
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      return Promise.reject(error.message)
    })
}

