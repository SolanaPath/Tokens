import { NextPage } from "next";
import styles from "../app/styles/Home.module.css";
import { AppBar } from "@/app/components/AppBar";
import { BalanceDisplay } from "@/app/components/BalanceDisplay";
import Head from "next/head";
import {CreateMintForm} from "@/app/components/CreateMint";
import { CreateTokenAccountForm} from "@/app/components/CreateTokenAccount";
import { MintToForm } from "@/app/components/MintToForm";
const Home: NextPage = (props) => {
    // @ts-ignore
    return (
        <div className={styles.App}>
            <Head>
                <title>Token Program</title>
                <meta name="description" content="Token Program" />
            </Head>
                <AppBar />
                <div className={styles.AppBody}>
                    <BalanceDisplay />
                    <CreateMintForm />
                    <CreateTokenAccountForm />
                    <MintToForm/>
                </div>
        </div>
    );
};

export default Home;