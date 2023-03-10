import {
  EVMChainInfo,
  CosmosChainInfo,
  SwapperMetaDto,
  SwapperMeta,
  BlockchainMetaBase,
  EvmBlockchainMeta,
  CosmosBlockchainMeta,
  TransferBlockchainMeta,
  BlockchainMeta,
  MessagingProtocol,
  MessagingProtocolsResponse,
} from '../shared'

export {
  EVMChainInfo,
  CosmosChainInfo,
  SwapperMetaDto,
  SwapperMeta,
  BlockchainMetaBase,
  EvmBlockchainMeta,
  CosmosBlockchainMeta,
  TransferBlockchainMeta,
  BlockchainMeta,
  MessagingProtocol,
  MessagingProtocolsResponse,
}

/**
 * All metadata info for a token, unique by (blockchain, symbol, address) tuple
 *
 * @property {string} blockchain - The blockchain which this token belongs to
 * @property {string | null} chainId - The chainId which this token belongs to, e.g. 1 for ETH, 56 for BSC and ...
 * @property {string | null} address - Smart contract address of token, null for native tokens
 * @property {string} symbol - The token symbol, e.g: ADA
 * @property {string} name - The token name, e.g: Binance Pegged ETH
 * @property {number} decimals - Decimals of token in blockchain, example: 18
 * @property {string} image - Url of its image, example: https://api.rango.exchange/tokens/ETH/ETH.png
 * @property {number | null} usdPrice - The token unit price
 *
 */
export type Token = {
  blockchain: string
  chainId: string | null
  address: string | null
  symbol: string
  name: string
  decimals: number
  image: string
  usdPrice: number | null
}

/**
 * Metadata info for all blockchains and tokens supported
 *
 * @property {BlockchainMeta[]} blockchains - List of all supported blockchains
 * @property {Token[]} tokens - List of all tokens
 * @property {SwapperMeta[]} swappers - List of all DEXes & Bridges
 *
 */
export type MetaResponse = {
  blockchains: BlockchainMeta[]
  tokens: Token[]
  swappers: SwapperMeta[]
}
