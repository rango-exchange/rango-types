import { TransactionType } from '../transactions'
import { BaseTransaction } from './base'

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
