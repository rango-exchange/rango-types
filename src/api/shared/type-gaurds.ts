import {
  CosmosProviderMeta,
  EvmProviderMeta,
  ProviderMeta,
  SolanaProviderMeta,
  StarkNetProviderMeta,
  TransferProviderMeta,
  TronProviderMeta,
} from './meta'

export const isEvmBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is EvmProviderMeta => blockchainMeta.type === 'EVM'

export const isCosmosBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is CosmosProviderMeta => blockchainMeta.type === 'COSMOS'

export const isSolanaBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is SolanaProviderMeta => blockchainMeta.type === 'SOLANA'

export const isTronBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is TronProviderMeta => blockchainMeta.type === 'TRON'

export const isTransferBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is TransferProviderMeta => blockchainMeta.type === 'TRANSFER'

export const isStarknetBlockchain = (
  blockchainMeta: ProviderMeta
): blockchainMeta is StarkNetProviderMeta => blockchainMeta.type === 'STARKNET'

export const evmBlockchains = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isEvmBlockchain)

export const solanaBlockchain = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isSolanaBlockchain)

export const starknetBlockchain = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isStarknetBlockchain)

export const tronBlockchain = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isTronBlockchain)

export const cosmosBlockchains = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isCosmosBlockchain)

export const transferBlockchains = (blockchains: ProviderMeta[]) =>
  blockchains.filter(isTransferBlockchain)
