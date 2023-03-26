import { Transaction, TransactionType } from '../api/main'

export interface ISigner<Tx extends Transaction> {
  signMessage(msg: string): Promise<string>
  signAndSendTx(tx: Tx): Promise<string>
}

export class SignerFactory {
  private signers: any = {}

  constructor() {
    this.signers = {}
  }

  registerSigner<Tx extends Transaction>(
    txType: TransactionType,
    signer: ISigner<Tx>
  ): void {
    this.signers[txType] = signer
  }

  getSigner<Tx extends Transaction>(txType: TransactionType): ISigner<Tx> {
    if (this.signers && txType in this.signers) return this.signers[txType]
    throw new Error('Signer not found for ' + txType)
  }
}
