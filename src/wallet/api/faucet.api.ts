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
  network,
}: {
  userAmount: string
  address: string
  amount: Promise<string>
  network: string
}): Promise<any> => {
  const http = axios.create({
    baseURL: API,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })

  const amountString = await amount

  return http
    .post(`${API}/${network}/${TOKEN}`, { amount: amountString, to: address })
    .then((response) => {
      return Promise.resolve(`Successfuly requested ${userAmount} ${TOKEN} from faucet`)
    })
    .catch((error) => {
      return Promise.reject(error.response?.data?.error || 'Something went wrong')
    })
}
