export const timeout = (delay: number) =>
  new Promise( res => setTimeout(res, delay));
