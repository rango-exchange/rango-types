import { RoutingResultType } from '../shared/index.js'
import type { Amount, Asset, SwapResult } from './common.js'
import type { TransactionType } from './transactions.js'

export { RoutingResultType }

/**
 * All user wallets for a specific blockchain
 *
 * @property {string} blockchain - The blockchain that wallets belong to
 * @property {string[]} addresses - List of user wallet addresses for the specified blockchain
 *
 */
export type UserWalletBlockchain = {
  blockchain: string
  addresses: string[]
}

/**
 * Full information of a path of multiple swaps that should be executed by user to swap X to Y
 *
 * @property {string} outputAmount - The estimation of Rango from output amount of Y
 * @property {RoutingResultType} resultType
 * @property {SwapResult[]} swaps - List of required swaps to swap X to Y with the expected outputAmount
 *
 */
export type SimulationResult = {
  outputAmount: string
  resultType: RoutingResultType
  swaps: SwapResult[]
}

/**
 * Describing a required Asset for swapping X to Y and check if the wallet has enough balance or not
 *
 * @property {Asset} asset - asset required for fee or balance
 * @property {Asset} requiredAmount
 * @property {Amount} currentAmount
 * @property {boolean} ok - If true, means this requirement is fulfilled, false means swap may fail due to insufficient balance
 * @property {string} reason - 'FEE' | 'FEE_AND_INPUT_ASSET' | 'INPUT_ASSET'
 *
 */
export type WalletRequiredAssets = {
  asset: Asset
  requiredAmount: Amount
  currentAmount: Amount
  ok: boolean
  reason: 'FEE' | 'FEE_AND_INPUT_ASSET' | 'INPUT_ASSET'
}

/**
 * The validation status of a wallet
 *
 * @property {string} address - The address of wallet
 * @property {boolean} addressIsValid - If false, the wallet address is invalid for the given blockchain
 * @property {WalletRequiredAssets[]} requiredAssets - The list of required assets for swapping X to Y in this wallet
 * and the status to indicate whether these assets are missing or not
 * @property {boolean} validResult - If false, Rango was unable to fetch the balance of this address to check the
 * requiredAssets availability
 *
 */
export type WalletValidationStatus = {
  address: string
  addressIsValid: boolean
  requiredAssets: WalletRequiredAssets[]
  validResult: boolean
}

/**
 * The blockchain that this validation data belongs to
 *
 * @property {string} blockchain - The blockchain of validation
 * @property {WalletValidationStatus[]} wallets - The status of validation for all the wallets of the specific blockchain
 *
 */
export type BlockchainValidationStatus = {
  blockchain: string
  wallets: WalletValidationStatus[]
}

/**
 * Body of routing request
 *
 * @property {Asset} from - The source asset
 * @property {Asset} to - The destination asset
 * @property {string} amount - The human-readable amount of asset X that is going to be swapped, example: 0.28
 * @property {{ [key: string]: string }} selectedWallets - Map of blockchain to selected address
 * @property {UserWalletBlockchain[]} connectedWallets - List of all user connected wallet addresses per each blockchain
 * @property {boolean} checkPrerequisites - It should be false when client just likes to preview the route to user,
 * and true when user really accepted to swap. If true, server will be much slower to respond, but will check some
 * pre-requisites including balance of X and required fees in user's wallets
 * @property {string} [slippage] - User slippage, used to filter routes which are incompatible with this slippage
 * @property {string} [destination] - Custom destination for the route
 * @property {boolean} [forceExecution] - Use this flag if you want to ignore checkPrerequisites before executing the route
 * @property {string | null} [affiliateRef] - To enable dApps to charge affiliate fees and generate income from users' transactions,
 * the affiliate referral code should be provided. You can create this code by visiting the following link: https://app.rango.exchange/affiliate.
 * @property {number | null} [affiliatePercent] - If you want to change the default affiliate fee percentage, you can provide a new value here.
 * @property {{ [key: string]: string }} [affiliateWallets] - If you want to change the default affiliate wallet addresses, you can provide new values here.
 * (Map of route blockchains to affiliate address)
 * @property {boolean} [disableMultiStepTx] - It should be true when the client doesn't want multi-step transactions
 * @property {string[]} [blockchains] - List of all accepted blockchains, an empty list means no filter is required
 * @property {string[]} [swappers] - List of all accepted swappers, an empty list means no filter is required
 * @property {boolean} [swappersExclude] - Indicates include/exclude mode for the swappers param
 * @property {string[]} [swapperGroups] - List of all accepted swapper groups, an empty list means no filter is required
 * @property {boolean} [swappersGroupsExclude] - Indicates include/exclude mode for the swappers group param
 * @property {TransactionType[]} [transactionTypes] - List of all accepted transaction types including [EVM, TRANSFER, COSMOS]
 * @property {number} [maxLength] - Maximum number of steps in a route
 * @property {boolean} contractCall - Mark it true if you are going to call this route via your own contract, so we
 * will filter routes that are not possible to be called from a contract
 * @property {boolean} [experimental] - For enabling experimental features in routing
 * @property {string | null} [sourceContract] - Address of your contract on source chain (will be called in case of refund in the source chain)
 * @property {string | null} [destinationContract] - Address of your contract on destination chain (will be called in case of success/refund in the destination chain)
 * @property {string | null} [imMessage] - The message that you want to pass to your contract on the destination chain
 *
 */
export type BestRouteRequest = {
  from: Asset
  to: Asset
  amount: string
  connectedWallets: UserWalletBlockchain[]
  selectedWallets: { [key: string]: string }
  checkPrerequisites: boolean
  slippage?: string
  destination?: string
  forceExecution?: boolean
  affiliateRef?: string | null
  affiliatePercent?: number | null
  affiliateWallets?: { [key: string]: string }
  disableMultiStepTx?: boolean
  blockchains?: string[]
  swappers?: string[]
  swappersExclude?: boolean
  swapperGroups?: string[]
  swappersGroupsExclude?: boolean
  transactionTypes?: TransactionType[]
  maxLength?: number
  contractCall?: boolean
  experimental?: boolean
  sourceContract?: string | null;
  destinationContract?: string | null;
  imMessage?: string | null;
};

/**
 * The response of best route, if the result fields is null, it means that no route is found
 *
 * @property {string} requestId - The unique requestId which is generated for this request by the server. It should be
 * passed down to all other endpoints if this swap continues on. e.g. d10657ce-b13a-405c-825b-b47f8a5016ad
 * @property {string} requestAmount - The human readable input amount from the request
 * @property {Asset} from
 * @property {Asset} to
 * @property {SimulationResult | null} result
 * @property {BlockchainValidationStatus[] | null} validationStatus - Pre-requisites check result. It will be null if
 * the request checkPrerequisites was false
 * @property {string[]} diagnosisMessages - list of string messages that might be cause of not finding the route.
 * It's just for display purposes
 * @property {string[]} missingBlockchains - List of all blockchains which are necessary to be present for the best
 * route and user has not provided any connected wallets for it. A null or empty list indicates that there is no problem.
 * @property {boolean} processingLimitReached - A warning indicates that it took too much time to find the best
 * route and the server could not find any routes from X to Y
 * @property {boolean} walletNotSupportingFromBlockchain - A warning indicates that none of your wallets have the same
 * blockchain as X asset
 *
 */
export type BestRouteResponse = {
  requestId: string
  requestAmount: string
  from: Asset
  to: Asset
  result: SimulationResult | null
  validationStatus: BlockchainValidationStatus[] | null
  diagnosisMessages: string[] | null
  missingBlockchains: string[] | null
  processingLimitReached: boolean
  walletNotSupportingFromBlockchain: boolean
}
