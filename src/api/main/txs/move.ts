import { BaseTransaction, TransactionType } from '../../shared/index.js'

export interface MoveTransaction extends BaseTransaction {
  type: TransactionType.MOVE
  transactionData: string
}

export const isMoveTransaction = (transaction: {
  type: TransactionType
}): transaction is MoveTransaction => transaction.type === TransactionType.MOVE
