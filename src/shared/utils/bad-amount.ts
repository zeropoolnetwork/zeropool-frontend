export const badAmount = (
  ...amounts: (string | number)[]
) => {
  const badValues = [0, '0', '0.']
  
  for(const amount of amounts) {
    if (!amount || isNaN(+amount)) {
      return true
    }

    if (+amount < 0) {
      return true
    }

    if (badValues.includes(amount)) {
      return true
    }
  }

  return false
}