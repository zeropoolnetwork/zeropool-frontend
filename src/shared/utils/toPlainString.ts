export const toPlainString = (num: number): string => {
  return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function(a,b,c,d,e) {
      return e < 0
        ? b + '0.' + Array(1-e-c.length).join('0') + c + d
        : b + c + d + Array(e-d.length+1).join('0');
    });
}