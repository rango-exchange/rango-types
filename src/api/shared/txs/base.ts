import { TransactionType } from '../transactions.js'

/**
 * Base transaction for all Rango supported transactions
 *
 * @property {TransactionType} type - Type of the transaction, e.g. EVM, SOLANA, COSMOS, ...
 * @property {string} blockChain - The blockchain that this transaction will be executed in
 *
 */
export interface BaseTransaction<
  P extends BaseTransactionPrecondition = never
> {
  type: TransactionType
  blockChain: string
  preconditions: P[]
}

type TransactionPreconditionsType =
  | 'STELLAR_CHANGE_TRUSTLINE'
  | 'XRPL_CHANGE_TRUSTLINE'

export interface BaseTransactionPrecondition {
  type: TransactionPreconditionsType
  blockchain: string
}
