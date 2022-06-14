export const roundNumber = (num: number, decimals: number) => {
  const result = Number(num + '').toFixed(parseInt(decimals + '', undefined))

  return parseFloat(result)
}

export const round = (num: number) => roundNumber(num, 12)
