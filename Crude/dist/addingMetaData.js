"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const secret = JSON.parse(fs_1.default.readFileSync('secret.json').toString());
const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secret));
const commitment = "confirmed";
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("testnet"), commitment);
const mint = new web3_js_1.PublicKey("82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739");
const token_metadata_program_id = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const metadata_seeds = [
    Buffer.from('metadata'),
    token_metadata_program_id.toBuffer(),
    mint.toBuffer(),
];
const [metadata_pda, _bump] = web3_js_1.PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metadaAccount = (0, mpl_token_metadata_1.createCreateMetadataAccountV3Instruction)({
            metadata: metadata_pda,
            mint: mint,
            mintAuthority: keypair.publicKey,
            payer: keypair.publicKey,
            updateAuthority: keypair.publicKey,
            systemProgram: web3_js_1.SystemProgram.programId,
        }, { createMetadataAccountArgsV3: {
                data: {
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
        });
        const tx = new web3_js_1.Transaction().add(metadaAccount);
        const txhash = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [keypair]);
        console.log(`Success! Check out your TX here: https://solscan.io/tx/${txhash}?cluster=devnet`);
    }
    catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
}))();
