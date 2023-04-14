export enum SignerErrorCode {
  REJECTED_BY_USER = 'REJECTED_BY_USER',
  SIGN_TX_ERROR = 'SIGN_TX_ERROR',
  SEND_TX_ERROR = 'SEND_TX_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  OPERATION_UNSUPPORTED = 'OPERATION_UNSUPPORTED',
  UNEXPECTED_BEHAVIOUR = 'UNEXPECTED_BEHAVIOUR',
}

export function isSignerErrorCode(value: string): value is SignerErrorCode {
  return Object.keys(SignerErrorCode).includes(value)
}

export function getDefaultErrorMessage(code: SignerErrorCode): string {
  const errorMap: { [key in SignerErrorCode]: string } = {
    [SignerErrorCode.REJECTED_BY_USER]: 'User rejected the transaction',
    [SignerErrorCode.SIGN_TX_ERROR]: 'Error signing the transaction',
    [SignerErrorCode.SEND_TX_ERROR]: 'Error sending the transaction',
    [SignerErrorCode.NOT_IMPLEMENTED]: 'Operation not implemented',
    [SignerErrorCode.OPERATION_UNSUPPORTED]: 'Unsupported operation',
    [SignerErrorCode.UNEXPECTED_BEHAVIOUR]: 'Unexpected error',
  }
  return errorMap[code]
}

export type SignerOperationName =
  | 'executeEvmTransaction'
  | 'executeCosmosMessage'
  | 'executeSolanaTransaction'
  | 'executeTransfer'
  | 'executeStarknetTransaction'
  | 'executeTronTransaction'
  | 'signMessage'

export class SignerError extends Error {
  public readonly code: SignerErrorCode
  public readonly root?: any
  public _isSignerError = true

  constructor(code: SignerErrorCode, m?: string | undefined, root?: any) {
    super(m || getDefaultErrorMessage(code))
    Object.setPrototypeOf(this, SignerError.prototype)
    SignerError.prototype._isSignerError = true
    this.code = code
    this.root = root
    if (
      this.code === SignerErrorCode.REJECTED_BY_USER ||
      SignerError.isRejectedError(root)
    ) {
      this.code = SignerErrorCode.REJECTED_BY_USER
      this.message = 'User rejected the transaction'
      this.root = undefined
    }
  }

  static isSignerError(obj: unknown): obj is SignerError {
    return (
      obj instanceof SignerError ||
      Object.prototype.hasOwnProperty('_isSignerError')
    )
  }

  static isRejectedError(error: any): boolean {
    const POSSIBLE_REJECTION_ERRORS = [
      'rejected by user',
      'rejected by the user',
      'user canceled',
      'user rejected',
      'user denied',
      'request rejected',
      'user abort',
      'declined by user',
    ]
    if (!!error && typeof error === 'string') {
      for (const msg of POSSIBLE_REJECTION_ERRORS) {
        if (error.toLowerCase().includes(msg.toLowerCase())) return true
      }
    } else if (!!error && typeof error === 'object') {
      if (error?.code === 4001) return true
      for (const msg of POSSIBLE_REJECTION_ERRORS) {
        if (
          JSON.stringify(error).toLowerCase().includes(msg.toLowerCase()) ||
          (error?.message || '').toLowerCase().includes(msg.toLowerCase())
        )
          return true
      }
    }
    return false
  }

  static UnsupportedError(operation: SignerOperationName): SignerError {
    return new SignerError(
      SignerErrorCode.OPERATION_UNSUPPORTED,
      `'${operation}' is not supported by the signer`
    )
  }
  static UnimplementedError(operation: SignerOperationName): SignerError {
    return new SignerError(
      SignerErrorCode.NOT_IMPLEMENTED,
      `'${operation}' is not implemented by the signer`
    )
  }

  static AssertionFailed(m: string): SignerError {
    return new SignerError(
      SignerErrorCode.UNEXPECTED_BEHAVIOUR,
      'Assertion failed: ' + m
    )
  }

  getErrorDetail(): {
    code: SignerErrorCode
    message: string
    detail?: string | undefined
  } {
    if (this.code === SignerErrorCode.REJECTED_BY_USER) {
      return {
        code: this.code,
        message: this.message,
        detail: this.root?.message || 'User rejected the transaction',
      }
    }

    const rawMessage =
      typeof this.root === 'object' && this.root && this.root.error
        ? this.root.error
        : JSON.stringify(this.root)

    const rootStr =
      typeof this.root === 'string'
        ? this.root
        : this.root instanceof Error
        ? this.root.message
        : rawMessage

    return {
      code: this.code,
      message: this.message,
      detail: rootStr,
    }
  }
}
