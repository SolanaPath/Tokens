import { createMint } from "@solana/spl-token";
import * as fs from "fs";
import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
const secretKey = Uint8Array.from(secret);
const owenKeyPair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
console.log(owenKeyPair.publicKey.toBase58());
const mintToken = async (connection:Connection, payer: Keypair, mintAuthority: PublicKey, freezeAuthority: PublicKey, decimal: number) => {
const tokenMint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimal
);
console.log(tokenMint);
}

mintToken(connection, owenKeyPair, owenKeyPair.publicKey, owenKeyPair.publicKey, 2).then(() => console.log('done'));