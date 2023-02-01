/**
 * The type of transaction
 */
export enum TransactionType {
  EVM = 'EVM',
  TRANSFER = 'TRANSFER',
  COSMOS = 'COSMOS',
  SOLANA = 'SOLANA',
  TRON = 'TRON',
  STARKNET = 'STARKNET',
}

/**
 * The type of transaction
 * @deprecated use TransactionType instead
 */
export type GenericTransactionType = TransactionType

/**
 * A transaction's url that can be displayed to advanced user to track the progress
 *
 * @property {string} url - Url of the transaction in blockchain explorer. example: https://etherscan.io/tx/0xa1a3...
 * @property {string | null} description - A custom display name to help user distinguish the transactions from each
 * other. Example: Inbound, Outbound, Bridge, or null
 *
 */
export type SwapExplorerUrl = {
  description: string | null
  url: string
}

/**
 * Data of the event including its type and an extra metadata
 * It should be used when an error happened in client and we want to inform server that transaction failed,
 * E.g. user rejected the transaction dialog or and an RPC error raised during signing tx by user.
 *
 * @property {string} requestId - The requestId from best route endpoint
 * @property {string} eventType - Type of the event that happened, example: TX_FAIL
 * @property {[key: string]: string} data - A list of key-value for extra details
 *
 */
export type ReportTransactionRequest = {
  requestId: string
  eventType: 'TX_FAIL'
  data: { [key: string]: string }
}

/**
 * The status of transaction in tracking
 */
export enum TransactionStatus {
  FAILED = 'failed',
  RUNNING = 'running',
  SUCCESS = 'success',
}

/**
 * Response body of check-approval
 *
 * @property {boolean} isApproved - A flag which indicates that the approve tx is done or not
 *
 */
export type CheckApprovalResponse = {
  isApproved: boolean
}
