import { AssetWithTicker } from '../common.js'
import { TransactionType } from '../transactions.js'
import { BaseTransaction } from './base.js'

export type UTXOWitness = {
  value: string,
  script: string,
}
export type PSBTInput = {
  hash: string,
  index: number,
  witnessUtxo: UTXOWitness | null;
  tapInternalKey: string | null
}
export type PSBTOutput = {
  outputType: "address",
  value: string,
  address: string
} | {
  outputType: "script",
  value: string,
  script: string
}
/**
 * @property {string} psbt - Hexadecimal representation of the PSBT
 * @property {PSBTInput[]} psbtInputs - Input being spent in the transaction
 * @property {PSBTOutput[]} psbtOutputs - Details about where the funds will be sent, including the recipient address or script, the amount to be sent.
 * @property {string} fee - Transaction fee
 */
export type PSBT = {
  psbt: string
  psbtInputs: PSBTInput[]
  psbtOutputs: PSBTOutput[]
  fee: string
}
/**
 * TransferTransaction. This type of transaction is used for UTXO blockchains including BTC, LTC, BCH
 *
 * @property {TransactionType} type - This fields equals to TRANSFER for all TransferTransactions
 * @property {string} blockChain - The blockchain that this transaction will be executed in, same as the input blockchain of creating transaction
 * @property {string} method - The method that should be passed to wallet. examples: deposit, transfer
 * @property {AssetWithTicker} asset
 * @property {string} amount - The machine-readable amount of transaction, example: 1000000000000000000
 * @property {number} decimals - The decimals of the asset
 * @property {string} fromWalletAddress - The source wallet address that can sign this transaction
 * @property {string} recipientAddress - The destination wallet address that the fund should be sent to
 * @property {string | null} memo - The memo of transaction, can be null
 * @property {PSBT | null} psbt - PSBT object containing the hexadecimal representation of the PSBT, along with details about its inputs, outputs, and the transaction fee.
 *
 */
export interface Transfer extends BaseTransaction {
  type: TransactionType.TRANSFER
  method: string
  asset: AssetWithTicker
  amount: string
  decimals: number
  fromWalletAddress: string
  recipientAddress: string
  memo: string | null
  psbt: PSBT
}

export const isTransferTransaction = (transaction: {
  type: TransactionType
}): transaction is Transfer => transaction.type === TransactionType.TRANSFER
