import axios from 'axios'

let URL: string
let TOKEN: string

if (process.env.NODE_ENV === 'development') {
  URL = process.env.REACT_APP_FAUCET_URL as string
  TOKEN = process.env.REACT_APP_TOKEN as string
} else if (process.env.NODE_ENV === 'production') {
  URL = REACT_APP_FAUCET_URL
  TOKEN = REACT_APP_TOKEN
}

export const callFaucet = ({
  address,
  amount,
}: {
  address: string
  amount: string
}): Promise<string> => {
  const http = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(`Successfuly requested ${amount} ${TOKEN} from faucet`)
    }, 3000)
  })

  return http
    .post('/faucet', {
      address,
      amount,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

