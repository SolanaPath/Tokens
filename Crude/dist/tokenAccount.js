"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spl_token_1 = require("@solana/spl-token");
const fs = __importStar(require("fs"));
const web3_js_1 = require("@solana/web3.js");
const secret = JSON.parse(fs.readFileSync('secret.json').toString());
const secretKey = Uint8Array.from(secret);
const owenKeyPair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('testnet'), 'confirmed');
const mintKey = new web3_js_1.PublicKey('82ZJq9xss5HNoR3uH7arrTqDpkTwSVVcQFBZ3RFQV739');
// Public key of the mint token generate from the createMint.ts
const createTokenAccount = (connection, payer, mint, owner) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenAccount = yield (0, spl_token_1.createAccount)(connection, payer, mint, owner);
    //Not Providing it with a keyPair already makes it a Associated Token Account means it is associated with the owner and the mint.
    console.log(tokenAccount);
});
createTokenAccount(connection, owenKeyPair, mintKey, owenKeyPair.publicKey).then(() => console.log('done'));
