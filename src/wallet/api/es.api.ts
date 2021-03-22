import { Transaction } from 'wallet/state/models/transaction'

const k = 'MCTF6EHW28WGXZN21USVHDIAVFN9WC2IH7'
const getUrl = (address: string) =>
  'https://api-kovan.etherscan.io/api?module=account&action=txlist&address=' +
  address +
  '&startblock=0&endblock=99999999&sort=asc&apikey=' +
  k

export const getEthTransactions = (address: string) =>
  fetch(getUrl(address)).then((val) =>
    val
      .clone()
      .json()
      .then((response) => response.result)
      .then((data) =>
        data.map(
          (tr: any) =>
            ({
              hash: tr.hash,
              blockHash: tr.blockHash,
              status: 0,
              amount: tr.value,
              from: tr.from,
              to: tr.to,
              timestamp: +tr.timeStamp,
            } as Transaction)
        )
      )
  )
