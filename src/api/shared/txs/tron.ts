import { BaseTransaction } from './base'

export type TrxContractParameter = {
  value: unknown
  type_url: string
}

export type TrxContractData = {
  parameter: TrxContractParameter
  type: string
}

export type TrxRawData = {
  contract: TrxContractData[]
  ref_block_bytes: string
  ref_block_hash: string
  expiration: number
  timestamp: number
}

// TODO ADD DOCS
export interface TronTransaction extends BaseTransaction {
  type: 'TRON'
  isApprovalTx: boolean
  raw_data: TrxRawData | null
  raw_data_hex: string | null
  txID: string
  visible: boolean
  __payload__: object
}
