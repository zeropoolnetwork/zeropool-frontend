export const fixTimestamp = (timestamp: string | number) =>
  (timestamp + '').length < 13
    ? +timestamp * 1000 // add milliseconds
    : +timestamp
