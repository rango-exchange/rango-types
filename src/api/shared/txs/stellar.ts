import {
  BaseTransaction as RangoBaseTransaction,
  TransactionType,
} from '../../shared/index.js'

export interface StellarTransaction extends RangoBaseTransaction {
  type: TransactionType.STELLAR
  xdrBase64: string
}

export const isStellarTransaction = (transaction: {
  type: TransactionType
}): transaction is StellarTransaction =>
  transaction.type === TransactionType.STELLAR
