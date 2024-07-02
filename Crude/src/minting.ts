import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";
import {mintTo} from "@solana/spl-token";
import * as fs from "fs";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const tokenAcount = new PublicKey('6GnXRXixMPt3CmoV79dVnkV17M3ZgurCBynxUwUoRsGv');
const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
const mintKey = new PublicKey('82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739');
const mint = async (connection: Connection, payer: Keypair, mint: PublicKey, destination: PublicKey, authority: PublicKey, amount:number ) => {
const transactionSignature = await mintTo(
    connection,
    payer,
    mint,
    destination,
    authority,
    amount
);
console.log(transactionSignature);
}

mint(connection, payer, mintKey, tokenAcount, payer.publicKey, 100).then(() => console.log('done'));