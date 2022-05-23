export function isEvmBased(network: string): boolean {
  return ['ethereum', 'aurora', 'xdai'].includes(network)
}

export function isSubstrateBased(network: string): boolean {
  return ['polkadot', 'kusama'].includes(network)
}
