import {createAssociatedTokenAccount, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import * as fs from "fs";
import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
const mintKey = new PublicKey('82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739')
const ownerKey = new PublicKey('4bCtf9EMjHUFUs8hoyka2Jq2DazpNs18ikqcYNzDozaK')

const createATA = async(connection:Connection, payer: Keypair, mint: PublicKey, owner: PublicKey) => {
const associatedTokenAccount = await
    createAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner,
);
console.log(associatedTokenAccount);
}

const createGetATA = async(connection:Connection, payer: Keypair, mint: PublicKey, owner: PublicKey) => {
    const associatedTokenAccount = await
        getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            owner,
        );
    console.log(associatedTokenAccount);
}
// Returns an object with the address of the associated token account, owner and mint and some more information.

createGetATA(connection, payer, mintKey, ownerKey)
    .then(() => console.log('done'))
    .catch((error) => console.error('Error:', error));