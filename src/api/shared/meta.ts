import { Asset, SwapperType } from './common'
import { TransactionType } from './transactions'

/**
 * EVM Chain Info
 *
 * @property {string} chainName - Chain name, e.g. Polygon Mainnet
 * @property {name: string, symbol: string, decimals: null} nativeCurrency
 * @property {string[]} rpcUrls - e.g. "https://polygon-rpc.com"
 * @property {string[]} blockExplorerUrls - e.g. "https://polygonscan.com"
 * @property {string} addressUrl - Explorer address base url for this blockchain,
 * e.g. "https://bscscan.com/address/{wallet}"
 * @property {string} transactionUrl - Explorer transaction base url for this blockchain,
 * e.g. "https://bscscan.com/tx/{txHash}"
 *
 */
export type EVMChainInfo = {
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
  addressUrl: string
  transactionUrl: string
}

/**
 * Cosmos Chain Info - Used for adding experimental chains to keplr if needed
 *
 * @see https://github.com/osmosis-labs/osmosis-frontend/blob/0b88e39740cb087be576f464bfcd6cc2971ed2fd/packages/web/config/chain-infos.ts
 *
 */
export type CosmosChainInfo = {
  experimental: boolean
  rpc: string
  rest: string
  cosmostationLcdUrl: string | null
  cosmostationApiUrl: string | null
  cosmostationDenomTracePath: string
  mintScanName: string | null
  chainName: string
  stakeCurrency: {
    coinDenom: string
    coinMinimalDenom: string
    coinDecimals: number
    coinGeckoId: string
    coinImageUrl: string
  }
  bip44: {
    coinType: number
  }
  bech32Config: {
    bech32PrefixAccAddr: string
    bech32PrefixAccPub: string
    bech32PrefixValAddr: string
    bech32PrefixValPub: string
    bech32PrefixConsAddr: string
    bech32PrefixConsPub: string
  }
  currencies: {
    coinDenom: string
    coinMinimalDenom: string
    coinDecimals: number
    coinGeckoId: string
    coinImageUrl: string
  }[]
  feeCurrencies: {
    coinDenom: string
    coinMinimalDenom: string
    coinDecimals: number
    coinGeckoId: string
    coinImageUrl: string
  }[]
  features: string[]
  explorerUrlToTx: string
  gasPriceStep: {
    low: number
    average: number
    high: number
  } | null
}

/**
 * Metadata of Swapper
 *
 * @property {string} id - Unique identifier for the swapper
 * @property {string} title - Display name for the swapper
 * @property {string} logo - Icon logo for the swapper
 * @property {string} swapperGroup - Group name for swapper
 * @property {SwapperType[]} types - Type of the transaction supported by the swapper
 *
 */
export type SwapperMetaDto = {
  id: string
  title: string
  logo: string
  swapperGroup: string
  types: SwapperType[]
}

/**
 * Blockchain Meta Information
 *
 * @property {string} name - Unique name of blockchain, this field is used in all endpoints as the identifier
 * @property {number} defaultDecimals - The default decimals of blockchain, do not use it in computations, use Token.decimals instead
 * @property {Asset[]} feeAssets - List of assets that can be used as fee in this blockchain
 * @property {string[]} addressPatterns - List of all regex patterns for wallet addresses of this blockchain, can be
 * used for input validation, example: [ "^(0x)[0-9A-Fa-f]{40}$" ]
 * @property {string} logo - Logo of the blockchain
 * @property {string} displayName - Display name for the blockchain
 * @property {string} shortName - Short name for the blockchain
 * @property {string} color - Suggested color for the blockchain
 * @property {boolean} enabled - Is blockchain enabled or not in Rango
 * @property {TransactionType} type - Type of the blockchain
 * @property {string | null} chainId - e.g. "0xa86a" for Avax, "osmosis-1" for Osmosis, etc.
 * @property {EVMChainInfo | CosmosChainInfo | null} info - Chain specific information
 *
 */
export type BlockchainMetaBase = {
  name: string
  shortName: string
  displayName: string
  defaultDecimals: number
  feeAssets: Asset[]
  addressPatterns: string[]
  logo: string
  color: string
  enabled: boolean
  type: TransactionType
  chainId: string | null
  info: EVMChainInfo | CosmosChainInfo | null
}

export interface EvmBlockchainMeta extends BlockchainMetaBase {
  type: TransactionType.EVM
  chainId: string
  info: EVMChainInfo
}

export interface CosmosBlockchainMeta extends BlockchainMetaBase {
  type: TransactionType.COSMOS
  chainId: string
  info: CosmosChainInfo
}
export interface TransferBlockchainMeta extends BlockchainMetaBase {
  type: TransactionType.TRANSFER
  chainId: null
  info: null
}

export type BlockchainMeta =
  | EvmBlockchainMeta
  | CosmosBlockchainMeta
  | TransferBlockchainMeta
