import { AssetWithTicker } from '../common'
import { TransactionType } from '../transactions'
import { BaseTransaction } from './base'

/**
 * CosmosCoin representing fee coins
 */
export type CosmosCoin = {
  amount: string
  denom: string
}

/**
 * CosmosStdFee representing fee for cosmos transaction
 */
export type CosmosStdFee = {
  amount: CosmosCoin[]
  gas: string
}

/**
 * `CosmosIBCTokenAndAmount`
 *
 * @property {string} denom - The token denom.
 * @property {string} amount - The amount of the token to be sent.
 */
export type CosmosIBCTokenAndAmount = {
  denom: string
  amount: string
}

/**
 * `CosmosIBCTimeoutHeight`
 *
 * @property {string} revision_number - The revision number of the IBC module.
 * @property {string} revision_height - The height at which the revision was applied.
 */
export type CosmosIBCTimeoutHeight = {
  revision_number: string
  revision_height: string
}

/**
 * `CosmosIBCTransferMessageValue`
 *
 * @property {string} source_port - The port that the transfer is coming from.
 * @property {string} source_channel - The channel that the transfer is coming from
 * @property {CosmosIBCTokenAndAmount} token - The token and amount to transfer.
 * @property {string} sender - The address of the sender
 * @property {string} receiver - The address of the receiver of the transfer.
 * @property {CosmosIBCTimeoutHeight} timeout_height - The height at which the transfer will expire.
 */
export type CosmosIBCTransferMessageValue = {
  source_port: string
  source_channel: string
  token: CosmosIBCTokenAndAmount
  sender: string
  receiver: string
  timeout_height: CosmosIBCTimeoutHeight
}

/**
 * `CosmosIBCTransferMessage`
 *
 * @property {string} __type - This is the type of the message
 * @property {string} type - The type of the message
 * @property {CosmosIBCTransferMessageValue} value - CosmosIBCTransferMessageValue
 */
export type CosmosIBCTransferMessage = {
  __type: string
  type: string
  value: CosmosIBCTransferMessageValue
}

export type TerraSwapSingleSwapCW20Send = {
  amount: string
  contract: string
  msg: string
}
export type TerraSwapSingleSwapFromCW20TokenCallWrapper = {
  send: TerraSwapSingleSwapCW20Send
}

export type TerraSwapSingleSwapNativeToken = { denom: string }
export type TerraSwapSingleSwapAssetInfo = {
  native_token: TerraSwapSingleSwapNativeToken
}
export type TerraSwapSingleSwapOfferAsset = {
  amount: string
  info: TerraSwapSingleSwapAssetInfo
}
export type TerraSwapSingleSwap = {
  offer_asset: TerraSwapSingleSwapOfferAsset
}
export type TerraSwapSingleSwapFromNativeTokenCallWrapper = {
  swap: TerraSwapSingleSwap
}

export type CosmosExecuteMessage =
  | TerraSwapSingleSwapFromCW20TokenCallWrapper
  | TerraSwapSingleSwapFromNativeTokenCallWrapper

export type Coin = { denom: string; amount: string }

export type OsmosisSwapMessage = {
  __type: string
  type: string
  value: number[]
}

export type MsgExecuteContract = {
  __type: string
  sender: string
  contract: string
  execute_msg: CosmosExecuteMessage
  coins: Coin[]
}

export type MsgSend = {
  __type: string
  inputs: InputOutput[]
  outputs: InputOutput[]
  aminoPrefix: string
}
export type InputOutput = { address: string; coins: Coin[] }

export type DirectMsgSend = {
  __type: string
  typeUrl: string
  value: SifchainMsgSendValue
}
export type SifchainMsgSendValue = {
  amount: Coin[]
  fromAddress: string
  toAddress: string
}

export type DirectCosmosIBCTimeoutHeight = {
  revisionNumber: string
  revisionHeight: string
}

export type DirectCosmosIBCTransferMessageValue = {
  sourcePort: string
  sourceChannel: string
  token: CosmosIBCTokenAndAmount
  sender: string
  receiver: string
  timeoutHeight: DirectCosmosIBCTimeoutHeight
  timeoutTimestamp: string | null
}

export type DirectCosmosIBCTransferMessage = {
  __type: string
  typeUrl: string
  value: DirectCosmosIBCTransferMessageValue
}

export type Msg =
  | CosmosIBCTransferMessage
  | MsgExecuteContract
  | OsmosisSwapMessage
  | MsgSend
  | DirectMsgSend
  | DirectCosmosIBCTransferMessage

export type ProtoMsg = { type_url: string; value: number[] }

export type CosmosFeeAmount = { denom: string; amount: string }
export type CosmosFee = { gas: string; amount: CosmosFeeAmount[] }

/**
 * Main transaction object for COSMOS type transactions (including Terra, Osmosis, ...)
 */
export type CosmosMessage = {
  signType: 'AMINO' | 'DIRECT'
  sequence: string | null
  source: number | null
  account_number: number | null
  rpcUrl: string
  chainId: string | null
  msgs: Msg[]
  protoMsgs: ProtoMsg[]
  memo: string | null
  fee: CosmosFee | null
}
/**
 * An alternative to CosmosMessage object for the cosmos wallets that do not support generic Cosmos messages (e.g. XDefi)
 *
 * @property {AssetWithTicker} asset - The asset to be transferred
 * @property {string} amount - The machine-readable amount to transfer, example: 1000000000000000000
 * @property {number} decimals - The decimals for this asset, example: 18
 * @property {string | null} memo - Memo of transaction, could be null
 * @property {string} method - The transaction method, example: transfer, deposit
 * @property {string} recipient - The recipient address of transaction
 *
 */
export type CosmosRawTransferData = {
  amount: string
  asset: AssetWithTicker
  decimals: number
  memo: string | null
  method: string
  recipient: string
}

/**
 * A Cosmos transaction, child of GenericTransaction
 *
 * @property {TransactionType} type - This fields equals to COSMOS for all CosmosTransactions
 * @property {string} blockChain - The blockchain that this transaction will be executed in, same as the input blockchain of creating transaction
 * @property {string} fromWalletAddress - Address of wallet that this transaction should be executed in, same as the create transaction request's input
 * @property {CosmosMessage} data - Transaction data
 * @property {CosmosRawTransferData | null} rawTransfer - An alternative to CosmosMessage object for the cosmos wallets that do not support generic Cosmos messages
 *
 */
export interface CosmosTransaction extends BaseTransaction {
  type: TransactionType.COSMOS
  fromWalletAddress: string
  data: CosmosMessage
  rawTransfer: CosmosRawTransferData | null
}
