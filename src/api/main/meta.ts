import {
  EVMChainInfo,
  CosmosChainInfo,
  SwapperMetaDto,
  BlockchainMetaBase,
  EvmBlockchainMeta,
  CosmosBlockchainMeta,
  TransferBlockchainMeta,
  BlockchainMeta,
  SwapperMeta,
  MessagingProtocol,
  MessagingProtocolsResponse,
} from '../shared/index.js'

export {
  EVMChainInfo,
  CosmosChainInfo,
  SwapperMetaDto,
  BlockchainMetaBase,
  EvmBlockchainMeta,
  CosmosBlockchainMeta,
  TransferBlockchainMeta,
  BlockchainMeta,
  SwapperMeta,
  MessagingProtocol,
  MessagingProtocolsResponse,
}

/**
 * All metadata info for a token, unique by (blockchain, symbol, address) tuple
 *
 * @property {string} blockchain - The blockchain which this token belongs to
 * @property {string | null} address - Smart contract address of token, null for native tokens
 * @property {string} symbol - The token symbol, e.g: ADA
 * @property {string | null} name - Display name of token, e.g: Cardano for ADA. It can be null
 * @property {number} decimals - Decimals of token in blockchain, example: 18
 * @property {string} image - Url of its image, example: https://api.rango.exchange/tokens/ETH/ETH.png
 * @property {number | null} usdPrice - USD unit price of this token if available
 * @property {boolean} isSecondaryCoin - If true, means that the token's trading is high risk. Better to warn user before proceeding
 * @property {string | null} coinSource - If the token is secondary, coinSource indicates the third-party list
 * that Rango found this token in, example: Pancake Extended List
 * @property {string | null} coinSourceUrl - The absolute url of the source list that token was extracted from
 * @property {boolean} isPopular - If true, means that the token is popular
 * @property {string[]} [supportedSwappers] - List of swappers that support this token
 *
 */
export type Token = {
  blockchain: string
  address: string | null
  symbol: string
  name: string | null
  decimals: number
  image: string
  usdPrice: number | null
  isSecondaryCoin: boolean
  coinSource: string | null
  coinSourceUrl: string | null
  isPopular: boolean
  supportedSwappers?: string[]
}

/**
 * Compact version of token
 */
export type CompactToken = {
  b: string
  a: string | null
  s: string
  n?: string
  d: number
  i: string
  p?: number
  ip?: boolean
  is?: boolean
  c?: string
  cu?: string
  ss?: string[]
}

/**
 * Metadata info for all blockchains and tokens supported
 *
 * @property {BlockchainMeta[]} blockchains - List of all supported blockchains
 * @property {Token[]} tokens - List of all tokens
 * @property {Token[]} popularTokens - List of popular tokens, a subset of tokens field
 * @property {SwapperMeta[]} swappers - List of all DEXes & Bridges
 *
 */
export type MetaResponse = {
  blockchains: BlockchainMeta[]
  tokens: Token[]
  popularTokens: Token[]
  swappers: SwapperMeta[]
}

/**
 * Compact Metadata info for all blockchains and tokens supported
 *
 * @property {BlockchainMeta[]} blockchains - List of all supported blockchains
 * @property {CompactToken[]} tokens - List of all tokens in compact format
 * @property {Token[]} popularTokens - List of popular tokens, a subset of tokens field
 * @property {SwapperMeta[]} swappers - List of all DEXes & Bridges
 *
 */
export type CompactMetaResponse = {
  blockchains: BlockchainMeta[]
  tokens: CompactToken[]
  popularTokens: CompactToken[]
  swappers: SwapperMeta[]
}
