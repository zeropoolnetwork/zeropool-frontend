import axios from 'axios'

let API: string
let TOKEN: string

if (process.env.NODE_ENV === 'development') {
  API = process.env.REACT_APP_NETWORK_FAUCET as string
  TOKEN = process.env.REACT_APP_TOKEN as string
} else if (process.env.NODE_ENV === 'production') {
  API = REACT_APP_NETWORK_FAUCET
  TOKEN = REACT_APP_TOKEN
}

export const callFaucet = async ({
  userAmount,
  address,
  amount,
}: {
  userAmount: string
  address: string
  amount: string
}): Promise<any> => {
  const http = axios.create({
    baseURL: API,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })

  return http
    .post(`${API}/${TOKEN}/${address}`, { amount })
    .then((response) => {
      return Promise.resolve(`Successfuly requested ${userAmount} ${TOKEN} from faucet`)
    })
    .catch((error) => {
      return Promise.reject(error.response?.data?.error || 'Something went wrong')
    })
}

