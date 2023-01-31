import { TransactionType } from '../transactions'

// TODO UPDATE DOC
/**
 * Base transaction for all Rango supported transactions
 *
 * @property {TransactionType} type - Type of the transaction, e.g. EVM, SOLANA, COSMOS, ...
 * @property {string} blockChain - The blockchain that this transaction will be executed in, same as the input blockchain of creating transaction
 *
 */
export interface BaseTransaction {
  type: TransactionType
  blockChain: string
  externalTxId: string | null // TODO double check
}
