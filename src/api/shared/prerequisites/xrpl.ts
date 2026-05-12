import {
  BaseTransactionPrerequisiteResult,
  BaseTransactionPrerequisite,
} from './base'

export interface XrplChangeTrustLinePrerequisite
  extends BaseTransactionPrerequisite {
  type: 'XRPL_CHANGE_TRUSTLINE'
  blockChain: 'XRPL'
  /** Xrpl Currency **/
  currency: string
  /** Xrpl Asset Issuer **/
  issuer: string
  /** Minimum expected value of trust **/
  value: string
  /** User's wallet address **/
  wallet: string
}

export const isXrplChangeTrustLinePrerequisite = (
  prerequisite: BaseTransactionPrerequisite
): prerequisite is XrplChangeTrustLinePrerequisite =>
  prerequisite.type === 'XRPL_CHANGE_TRUSTLINE'

export type XrplChangeTrustLinePrerequisiteResultData = {
  executedTransactionHash: string
}

export type XrplChangeTrustLinePrerequisiteResult =
  BaseTransactionPrerequisiteResult<'XRPL_CHANGE_TRUSTLINE'>

export const isXrplChangeTrustLinePrerequisiteResult = (
  prerequisiteResult: BaseTransactionPrerequisiteResult
): prerequisiteResult is XrplChangeTrustLinePrerequisiteResult =>
  prerequisiteResult.prerequisiteType === 'XRPL_CHANGE_TRUSTLINE'
