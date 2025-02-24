"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }
        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info!.lamports);
        });
    }, [connection, publicKey]);

    return (
        <div>
            <p>{publicKey ? `SOL Balance: ${balance / LAMPORTS_PER_SOL}` : ""}</p>
        </div>
    );
};