import {
  BlockchainMeta,
  CosmosBlockchainMeta,
  EvmBlockchainMeta,
  SolanaBlockchainMeta,
  StarkNetBlockchainMeta,
  TransferBlockchainMeta,
  TronBlockchainMeta,
} from './meta'

export const isEvmBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is EvmBlockchainMeta => blockchainMeta.type === 'EVM'

export const isCosmosBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is CosmosBlockchainMeta => blockchainMeta.type === 'COSMOS'

export const isSolanaBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is SolanaBlockchainMeta => blockchainMeta.type === 'SOLANA'

export const isTronBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is TronBlockchainMeta => blockchainMeta.type === 'TRON'

export const isTransferBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is TransferBlockchainMeta =>
  blockchainMeta.type === 'TRANSFER'

export const isStarknetBlockchain = (
  blockchainMeta: BlockchainMeta
): blockchainMeta is StarkNetBlockchainMeta =>
  blockchainMeta.type === 'STARKNET'

export const evmBlockchains = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isEvmBlockchain)

export const solanaBlockchain = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isSolanaBlockchain)

export const starknetBlockchain = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isStarknetBlockchain)

export const tronBlockchain = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isTronBlockchain)

export const cosmosBlockchains = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isCosmosBlockchain)

export const transferBlockchains = (blockchains: BlockchainMeta[]) =>
  blockchains.filter(isTransferBlockchain)
