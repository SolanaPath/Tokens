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
const spl_token_1 = require("@solana/spl-token");
const fs_1 = __importDefault(require("fs"));
const secret = JSON.parse(fs_1.default.readFileSync('secret.json').toString());
const secretKey = Uint8Array.from(secret);
const payer = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('testnet'), 'confirmed');
const source = new web3_js_1.PublicKey('6GnXRXixMPt3CmoV79dVnkV17M3ZgurCBynxUwUoRsGv');
const destination = new web3_js_1.PublicKey('2PBmf2LAiiieqSXrVh9SbbVaLA5EJ5Y3oqaoxgzeZ48m');
const transferToken = (connection, payer, source, destination, owner, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionSignature = yield (0, spl_token_1.transfer)(connection, payer, source, destination, owner, amount);
    console.log(transactionSignature);
});
transferToken(connection, payer, source, destination, payer.publicKey, 100).then(() => console.log('done'));
