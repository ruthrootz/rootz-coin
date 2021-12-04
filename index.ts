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

  public static blockChain = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [new Block(null, new Transaction(1000, 'genesis', 'satoshi'))];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: string) {
    
  }

}

class Wallet {

  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
  }

  this.publicKey = keypair.publicKey;
  this.privateKey = keypair.privateKey;

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    Blockchain.instance.addBlock(transaction, this.publicKey, signature);
  }

}

