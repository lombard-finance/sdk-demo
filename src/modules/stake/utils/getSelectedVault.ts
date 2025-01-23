import { getStakeAndBakeVaults, TChainId } from '@lombard.finance/sdk';

export function getSelectedVault(chainId: number, vaultKey: string) {
  const vaults = getStakeAndBakeVaults(chainId as TChainId);

  const selectedVault = vaults.find(vault => vault.key === vaultKey);

  return selectedVault;
}
