import {
  getStakeAndBakeVaults,
  IStakeAndBakeVault,
  TChainId,
} from '@lombard.finance/sdk';

export function getSelectedVault(chainId: number, vaultKey: string) {
  let vaults: IStakeAndBakeVault[] = [];

  try {
    vaults = getStakeAndBakeVaults(chainId as TChainId);
  } catch (error) {}

  const selectedVault = vaults.find(vault => vault.key === vaultKey);

  return selectedVault;
}
