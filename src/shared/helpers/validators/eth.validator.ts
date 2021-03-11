import jsSHA from 'jssha';

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isEthereumAddress = function (address: string) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return true
      return true;
  } else {
      // hardcoded for test tetworks
      return /^(0x)?[0-9a-fA-F]{40}$/.test(address)
      // Otherwise check each case
      // return isChecksumAddress(address);
  }
};

/**
* Checks if the given string is a checksummed address
*
* @method isChecksumAddress
* @param {String} address the given HEX adress
* @return {Boolean}
*/
const isChecksumAddress = function (address: string) {
  let addressHash: string;
  const shaObj = new jsSHA('SHA-512', "TEXT", { encoding: "UTF8" });
  
  address = address.replace('0x','');
  shaObj.update(address.toLowerCase());
  addressHash = shaObj.getHash('HEX');

  for (var i = 0; i < 40; i++ ) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
          return false;
      }
  }
  return true;
};