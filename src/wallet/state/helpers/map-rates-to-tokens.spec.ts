import { Token } from 'shared/models/token';
import { mapRatesToTokens } from './map-rates-to-tokens';

fdescribe('`mapRatesToTokens` helper', () => {
  it('maps rates to tokens and returns apropriate record', () => {
    const rates = [
      {
        'id': 1,
        'name': 'Bitcoin',
        'symbol': 'BTC',
        'quote': {
          'USD': {
            'price': 18361.83383635072,
          }
        }
      },
      {
        'id': 1027,
        'name': 'Ethereum',
        'symbol': 'ETH',
        'quote': {
          'USD': {
            'price': 568.7484600532758,
          }
        }
      },
      {
        'id': 2,
        'name': 'Litecoin',
        'symbol': 'LTC',
        'quote': {
          'USD': {
            'price': 76.19626443544232,
          }
        }
      }
    ];

    const tokens: Token[] = [
      { id: 1027, name: 'Ethereum', symbol: 'ETH' },
      { id: 1, name: 'Bitcoin', symbol: 'BTC' }
    ];

    const expectedResult: Record<Token['name'], number> = {
      Ethereum: 568.7484600532758,
      Bitcoin: 18361.83383635072,
    };

    expect(mapRatesToTokens(rates, tokens)).toStrictEqual(expectedResult);
  });
});