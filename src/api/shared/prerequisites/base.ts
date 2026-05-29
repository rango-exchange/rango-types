import {
  StellarChangeTrustLinePrerequisite,
  StellarChangeTrustLinePrerequisiteResultData,
} from './stellar.js'
import {
  XrplChangeTrustLinePrerequisite,
  XrplChangeTrustLinePrerequisiteResultData,
} from './xrpl.js'

export interface BaseTransactionPrerequisite {
  type: TransactionPrerequisiteType
  blockChain: string
}

export type TransactionPrerequisite =
  | XrplChangeTrustLinePrerequisite
  | StellarChangeTrustLinePrerequisite

export type TransactionPrerequisiteResultMap = {
  STELLAR_CHANGE_TRUSTLINE: StellarChangeTrustLinePrerequisiteResultData
  XRPL_CHANGE_TRUSTLINE: XrplChangeTrustLinePrerequisiteResultData
}

export type TransactionPrerequisiteType = keyof TransactionPrerequisiteResultMap

export interface BaseTransactionPrerequisiteResult<
  T extends TransactionPrerequisiteType = TransactionPrerequisiteType
> {
  prerequisiteIndex: number
  prerequisiteType: T
  status: 'success' | 'failed' | 'pending'
  data: TransactionPrerequisiteResultMap[T]
}

export type TransactionPrerequisiteResult = {
  [K in TransactionPrerequisiteType]: BaseTransactionPrerequisiteResult<K>
}[TransactionPrerequisiteType]
