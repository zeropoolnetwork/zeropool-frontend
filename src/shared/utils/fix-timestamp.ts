export const fixTimestamp = (timestamp: string | number) => {
  let num = +timestamp
  let str = timestamp.toString()

  if (str.length < 13) {
    num = num * 1000 // add milliseconds
  } else if (str.length > 13) {
    num = +str.slice(0, 13) // remove extras
  }

  return num
}
