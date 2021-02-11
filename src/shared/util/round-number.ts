export const roundNumber = (number: number, decimals: number) => {
  const result = Number(number+'').toFixed(parseInt(decimals+''));
  
  return parseFloat(result); 
}

export const round = (number: number) => roundNumber(number, 12);