import * as crypto from 'crypto';

class Transaction {

  constructor(
    public amount: number,
    public payer: string, // public key
    public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}

class Block {

  constructor(
    public previousHash: string,
    public transaction: Transaction,
    public timestamp = Date.now()
  ) {}

  get hash() {
    const stringifiedBlock = JSON.stringify(this);
    const hashedBlock = crypto.createHash('SHA256');
    hashedBlock.update(stringifiedBlock).end();
    return hashedBlock.digest('hex');
  }

}

class Chain {

}

class Wallet {
  
}

