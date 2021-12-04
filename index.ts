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

  public nonce = Math.round(Math.random() * 999999999);

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

  mine(nonce: number) {
    let solution = 1;
    console.log('... mining ...');
    while(true) {
      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest('hex');
      if (attempt.substr(0, 4) === '0000') {
        console.log(`... solution: ${solution}`);
        return solution;
      }
      solution++;
    }
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: string) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transaction.toString());
    const isValid = verifier.verify(senderPublicKey, signature);
    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
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

