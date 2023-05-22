import {
  CosmosTransaction,
  EvmTransaction,
  SimulationResult,
  SolanaTransaction,
  SwapperStatusStep,
  Transfer as TransferTransaction,
} from '../api/main'
import {
  AmountRestrictionType,
  StarknetTransaction,
  SwapExplorerUrl,
  TronTransaction,
} from '../api/shared'

export type StepStatus =
  | 'created'
  | 'running'
  | 'failed'
  | 'success'
  | 'waitingForApproval'
  | 'approved'

export type SwapStatus = 'running' | 'failed' | 'success'

export enum PendingSwapNetworkStatus {
  WaitingForConnectingWallet = 'waitingForConnectingWallet',
  WaitingForQueue = 'waitingForQueue',
  WaitingForNetworkChange = 'waitingForNetworkChange',
  NetworkChanged = 'networkChanged',
}

export type PendingSwapStep = {
  // routing data
  id: number
  fromBlockchain: string
  fromSymbol: string
  fromSymbolAddress: string | null
  fromDecimals: number
  fromAmountPrecision: string | null
  fromAmountMinValue: string | null
  fromAmountMaxValue: string | null
  fromAmountRestrictionType: AmountRestrictionType | null
  fromLogo: string
  toBlockchain: string
  toSymbol: string
  toSymbolAddress: string | null
  toDecimals: number
  toLogo: string
  swapperId: string
  expectedOutputAmountHumanReadable: string | null
  startTransactionTime: number
  internalSteps: SwapperStatusStep[] | null
  estimatedTimeInSeconds: number | null

  // status data
  status: StepStatus
  networkStatus: PendingSwapNetworkStatus | null
  executedTransactionId: string | null
  executedTransactionTime: string | null
  explorerUrl: SwapExplorerUrl[] | null
  diagnosisUrl: string | null
  outputAmount: string | null

  // txs data
  cosmosTransaction: CosmosTransaction | null
  transferTransaction: TransferTransaction | null
  solanaTransaction: SolanaTransaction | null
  evmApprovalTransaction: EvmTransaction | null
  evmTransaction: EvmTransaction | null
  tronApprovalTransaction: TronTransaction | null
  tronTransaction: TronTransaction | null
  starknetApprovalTransaction: StarknetTransaction | null
  starknetTransaction: StarknetTransaction | null

  // missing fields in older versions
  // keeping null for backward compatability
  swapperLogo: string | null
  swapperType: string | null
  fromBlockchainLogo: string | null
  toBlockchainLogo: string | null
  feeInUsd: string | null
}

export enum MessageSeverity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

export type WalletTypeAndAddress = {
  walletType: string
  address: string
}

export type SwapSavedSettings = {
  slippage: string
  disabledSwappersIds?: string[]
  disabledSwappersGroups?: string[]
  infiniteApprove?: boolean
}

export type PendingSwap = {
  creationTime: string
  finishTime: string | null
  requestId: string
  inputAmount: string
  status: SwapStatus
  isPaused: boolean
  extraMessage: string | null
  extraMessageSeverity: MessageSeverity | null
  extraMessageErrorCode: string | null
  extraMessageDetail: string | null | undefined
  networkStatusExtraMessage: string | null
  networkStatusExtraMessageDetail: string | null
  lastNotificationTime: string | null
  wallets: { [p: string]: WalletTypeAndAddress }
  settings: SwapSavedSettings
  steps: PendingSwapStep[]
  simulationResult: SimulationResult
  validateBalanceOrFee: boolean
  hasAlreadyProceededToSign?: boolean | null
}
