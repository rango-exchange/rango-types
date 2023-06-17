import {
  CosmosBlockchainMeta,
  EvmBlockchainMeta,
  BlockchainMeta,
  SolanaBlockchainMeta,
  StarkNetBlockchainMeta,
  TransferBlockchainMeta,
  TronBlockchainMeta,
  ProviderMeta,
  EvmProviderMeta,
  CosmosProviderMeta,
  SolanaProviderMeta,
  StarkNetProviderMeta,
  TronProviderMeta,
} from './meta'

export const isEvmBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchainMeta: T
): blockchainMeta is T & (EvmBlockchainMeta | EvmProviderMeta) =>
  blockchainMeta.type === 'EVM'

export const isCosmosBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchainMeta: T
): blockchainMeta is T & (CosmosBlockchainMeta | CosmosProviderMeta) =>
  blockchainMeta.type === 'COSMOS'

export const isSolanaBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchainMeta: T
): blockchainMeta is T & (SolanaBlockchainMeta | SolanaProviderMeta) =>
  blockchainMeta.type === 'SOLANA'

export const isTronBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchainMeta: T
): blockchainMeta is T & (TronBlockchainMeta | TronProviderMeta) =>
  blockchainMeta.type === 'TRON'

export const isTransferBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is TransferBlockchainMeta =>
  blockchainMeta.type === 'TRANSFER'

export const isStarknetBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchainMeta: T
): blockchainMeta is T & (StarkNetBlockchainMeta | StarkNetProviderMeta) =>
  blockchainMeta.type === 'STARKNET'

export const evmBlockchains = <T extends BlockchainMeta | ProviderMeta>(
  blockchains: T[]
): (T & (EvmBlockchainMeta | EvmProviderMeta))[] =>
  blockchains.filter(isEvmBlockchain)

export const solanaBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchains: T[]
): (T & (SolanaBlockchainMeta | SolanaProviderMeta))[] =>
  blockchains.filter(isSolanaBlockchain)

export const starknetBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchains: T[]
): (T & (StarkNetBlockchainMeta | StarkNetProviderMeta))[] =>
  blockchains.filter(isStarknetBlockchain)

export const tronBlockchain = <T extends BlockchainMeta | ProviderMeta>(
  blockchains: T[]
): (T & (TronBlockchainMeta | TronProviderMeta))[] =>
  blockchains.filter(isTronBlockchain)

export const cosmosBlockchains = <T extends BlockchainMeta | ProviderMeta>(
  blockchains: T[]
): (T & (CosmosBlockchainMeta | CosmosProviderMeta))[] =>
  blockchains.filter(isCosmosBlockchain)

export const transferBlockchains = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isTransferBlockchain)
