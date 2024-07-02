import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";
import {transfer} from "@solana/spl-token";
import fs from "fs";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
const source = new PublicKey('6GnXRXixMPt3CmoV79dVnkV17M3ZgurCBynxUwUoRsGv');
const destination = new PublicKey('2PBmf2LAiiieqSXrVh9SbbVaLA5EJ5Y3oqaoxgzeZ48m');
const transferToken = async(connection: Connection, payer: Keypair, source: PublicKey, destination: PublicKey, owner: PublicKey, amount: number) => {
const transactionSignature = await transfer(
    connection,
    payer,
    source,
    destination,
    owner,
    amount
)
console.log(transactionSignature);
}

transferToken(connection, payer, source, destination, payer.publicKey, 100).then(() => console.log('done'));