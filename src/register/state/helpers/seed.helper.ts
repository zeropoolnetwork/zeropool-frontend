const { randomBytes } = require("crypto");
const { Mnemonic } = require("wallet.ts");

export const generateSeed = () => {
  return (Mnemonic.generate(randomBytes(32)).words as string[])
    .reduce((accu: string[], value: string): string[] => {
      if (accu.length < 12 && !accu.includes(value)) {
        accu.push(value);
      }

      return accu;
    }, []);
}