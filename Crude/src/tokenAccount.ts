import {createAccount} from "@solana/spl-token";
import * as fs from "fs";
import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const owenKeyPair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
const mintKey = new PublicKey('82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739')
// Public key of the mint token generate from the createMint.ts
const createTokenAccount = async (connection: Connection, payer: Keypair, mint: PublicKey, owner: PublicKey) => {
const tokenAccount = await createAccount(
    connection,
    payer,
    mint,
    owner,
);
//Not Providing it with a keyPair already makes it a Associated Token Account means it is associated with the owner and the mint.
console.log(tokenAccount);
}

createTokenAccount(connection, owenKeyPair, mintKey, owenKeyPair.publicKey).then(() => console.log('done'));