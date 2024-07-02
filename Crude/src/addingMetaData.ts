import {
    Commitment,
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    SystemProgram,
    clusterApiUrl
} from "@solana/web3.js"
import fs from "fs";
import {createCreateMetadataAccountV3Instruction} from "@metaplex-foundation/mpl-token-metadata";

const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));

const commitment: Commitment = "confirmed";
const connection = new Connection(clusterApiUrl("testnet"), commitment);
const mint = new PublicKey("82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739")
const token_metadata_program_id = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')


const metadata_seeds = [
    Buffer.from('metadata'),
    token_metadata_program_id.toBuffer(),
    mint.toBuffer(),
];
const [metadata_pda, _bump] = PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);

(async () => {
    try {
        const metadaAccount =  createCreateMetadataAccountV3Instruction(
            {
                metadata: metadata_pda,
                mint: mint,
                mintAuthority:keypair.publicKey,
                payer: keypair.publicKey,
                updateAuthority: keypair.publicKey,
                systemProgram: SystemProgram.programId,
            },
            {createMetadataAccountArgsV3:
                    {
                        data:{
                            name: "Kawaaii",
                            symbol: "ᵕᴗᵕ",
                            uri: "https://www.anime-evo.net/wp-content/uploads/2022/01/SoBi_03_1.jpg",
                            sellerFeeBasisPoints: 0,
                            creators: null,
                            collection: null,
                            uses: null

                        },
                        isMutable: true,
                        collectionDetails: null
                    }
            }
        );
        const tx = new Transaction().add(metadaAccount);
        const txhash = await sendAndConfirmTransaction(
            connection,
            tx,
            [keypair]
        );
        console.log(`Success! Check out your TX here: https://solscan.io/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();