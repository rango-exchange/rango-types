import { TransactionType } from '../transactions.js'
import { BaseTransaction } from './base.js'

interface HyperliquidWithdrawAction {
  type: 'withdraw3'
  signatureChainId: string
  hyperliquidChain: string
  destination: string
  amount: string
  time: number
}

/**
 * This type of transaction is used for all Hyperliquid transactions
 *
 * @property {TransactionType} type - This fields equals to HYPERLIQUID for all HyperliquidTransactions
 * @property {HyperliquidWithdrawAction} action - Hyperliquid transaction action
 * @property {string} message, message to be signed by wallet
 * @property {string} nonce, nonce of transaction
 * @property {string} preconditions, This field is an empty array for Hyperliquid transactions
 * @property {string | null} expectedOutput, expected output of transaction
 *
 */
export interface HyperliquidTransaction extends BaseTransaction {
  type: TransactionType.HYPERLIQUID
  action: HyperliquidWithdrawAction
  message: string
  nonce: number
  preconditions: []
  expectedOutput: string
}

export const isHyperliquidTransaction = (transaction: {
  type: TransactionType
}): transaction is HyperliquidTransaction =>
  transaction.type === TransactionType.HYPERLIQUID
