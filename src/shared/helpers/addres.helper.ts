import { Address } from 'shared/models/address';
import { isEthereumAddress } from 'shared/helpers/validators/eth.validator';

export const validateAddress = (address: Address): boolean | undefined => {
  let result;
  const supportedSymbols = ['ETH', 'WAWES', 'NEAR'];
  
  if (!supportedSymbols.includes(address.symbol)) {
    return undefined;
  }

  switch (address.symbol) {
    case 'ETH':
      result = isEthereumAddress(address.value);
      break;
    
    case 'WAVES':
      result = true;
      break;

    case 'NEAR': 
      result = true;
      break;
  }
  
  return result;
};
