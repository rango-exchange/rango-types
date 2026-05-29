import {
  BaseTransaction as RangoBaseTransaction,
  TransactionType,
  BaseTransactionPrerequisite,
} from '../../shared/index.js'

/**
 *  Stellar Prerequisite Type
 *
 * @property {string} type equals to STELLAR_CHANGE_TRUSTLINE
 * @property {string} blockChain, equals to STELLAR
 * @property {string} code The stellar output asset code, such as USDC
 * @property {string} issuer The stellar asset issuer, e.g.: GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN
 * @property {string} value The minimum amount of required trustline for this stellar asset, such as 11.50
 * @property {string} wallet User's wallet address which must have this trustline allowed for the stellar asset
 *
 */
export interface StellarChangeTrustLinePrerequisite
  extends BaseTransactionPrerequisite {
  type: 'STELLAR_CHANGE_TRUSTLINE'
  blockChain: 'STELLAR'
  code: string
  issuer: string
  value: string
  wallet: string
}

export interface StellarTransactionData {
  baseFee: string | null // Recommended base fee (in stroops) for building the stellar transaction
  preconditions: {
    // CAP-21 PreconditionsV2 of transaction transaction
    timeBounds: {
      // time bounds of stellar transaction data
      minTime: number // Unix timestamped constraint for minimum time of transaction validity
      maxTime: number // Unix timestamped constraint for maximum time of transaction validity
    }
    ledgerBounds: {
      // ledger bounds of stellar transaction data, Transaction only valid for ledger numbers n such that minLedger <= n < maxLedger
      minLedger: number // Minimum ledger for transaction validity
      maxLedger: number // Maximum ledger for transaction validity, 0 here means no maxLedger
    }
    minSeqNumber: string | null // If NULL, only valid when sourceAccount's sequence number is seqNum - 1.  Otherwise, valid when sourceAccount's sequence number n satisfies minSeqNum <= n < tx.seqNum
    minSeqAge: number | null // For the transaction to be valid, the current ledger time must be at least minSeqAge greater than sourceAccount's seqTime
    minSeqLedgerGap: number | null // For the transaction to be valid, the current ledger number must be at least minSeqLedgerGap greater than sourceAccount's seqLedger
    extraSigners: string[] | null // list of strings, For the transaction to be valid, there must be a signature corresponding to every Signer in this array
  }
  operationsXdrBase64: string[] // list of operations as base 64 encoded strings
  memoXdrBase64: string | null // base 64 encoded memo of transaction
}

export interface StellarTransaction
  extends RangoBaseTransaction<StellarChangeTrustLinePrerequisite> {
  type: TransactionType.STELLAR
  data: StellarTransactionData
}

export const isStellarTransaction = (transaction: {
  type: TransactionType
}): transaction is StellarTransaction =>
  transaction.type === TransactionType.STELLAR
