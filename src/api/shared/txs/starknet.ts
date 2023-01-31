import { BaseTransaction } from './base'

export type StarknetCallData = {
  contractAddress: string
  calldata?: string[]
  entrypoint: string
}

// TODO DOC
export interface StarknetTransaction extends BaseTransaction {
  type: 'STARKNET'
  isApprovalTx: boolean
  calls: StarknetCallData[]
}
