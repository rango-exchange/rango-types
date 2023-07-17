import { TransactionType } from '../transactions.js'
import { BaseTransaction } from './base.js'

export type StarknetCallData = {
  contractAddress: string
  calldata?: string[]
  entrypoint: string
}

/**
 * StarknetTransaction
 *
 * @property {TransactionType} type - TransactionType.STARKNET
 * @property {boolean} isApprovalTx - If the transaction is an approval transaction, this will be true.
 * @property {StarknetCallData[]} calls - An array of StarknetCallData objects.
 *
 */
export interface StarknetTransaction extends BaseTransaction {
  type: TransactionType.STARKNET
  isApprovalTx: boolean
  calls: StarknetCallData[]
}

export const isStarknetTransaction = (transaction: {
  type: TransactionType
}): transaction is StarknetTransaction =>
  transaction.type === TransactionType.STARKNET
