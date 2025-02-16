import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import { ethers, utils } from "ethers";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [totalBalance, setTotalBalance] = useState(0);
    const [validators, setValidators] = useState([]);
    const [validatorBalance, setValidatorBalance] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const [pendingInitializedBalance, setPendingInitializedBalance] = useState();
    const [pendingQueuedBalance, setPendingQueuedBalance] = useState();
    const [activeOngoingBalance, setActiveOngoingBalance] = useState();
    const [activeExitingBalance, setActiveExitingBalance] = useState();
    const [activeSlashedBalance, setActiveSlashedBalance] = useState();
    const [exitedUnslashedBalance, setExitedUnslashedBalance] = useState();
    const [exitedSlashedBalance, setExitedSlashedBalance] = useState();
    const [withdrawalPossibleBalance, setWithdrawalPossibleBalance] = useState();
    const [withdrawalDoneBalance, setWithdrawalDoneBalance] = useState();

    // Get Beacon Deposit Contract balance
    const fetchBeaconContractBalance = async () => {
        const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_RPC);https://api.quicknode.com/functions/rest/v1/functions/aa20fd51-36ec-40e4-bc55-52310cd11262/call
        const balance = await provider.getBalance("0x00000000219ab540356cBB839Cbe05303d7705Fa");
        setTotalBalance(balance);
    };

    // Fetch validator data from REST API
    const fetchValidators = async () => {
        try {
            console.log("Fetching validators...");
            const validators = await fetch(
                `${process.env.NEXT_PUBLIC_QUICKNODE_RPC}eth/v1/functions/aa20fd51-36ec-40e4-bc55-52310cd11262/call
            ).then((res) => res.json());

            // Uncomment to see all validator data in the console
            // console.log(validators.data);
            setValidators(validators.data);
        } catch (error) {
            console.error(error);
            setValidators([]);
        }
    };

    const sumValidatorBalances = (validators) => {
        const validatorBalance = validators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);
        console.log(validatorBalance);
        setValidatorBalance(validatorBalance);
    };

    // Sum balances for each validator status
    const sumValidatorStatuses = (validators) => {
        const pendingInitializedValidators = validators.filter(
            (validator) => validator.status === "pending_initialized"
        );
        const pendingQueuedValidators = validators.filter((validator) => validator.status === "pending_queued");
        const activeOngoingValidators = validators.filter((validator) => validator.status === "active_ongoing");
        const activeExitingValidators = validators.filter((validator) => validator.status === "active_exiting");
        const activeSlashedValidators = validators.filter((validator) => validator.status === "active_slashed");
        const exitedUnslashedValidators = validators.filter((validator) => validator.status === "exited_unslashed");
        const exitedSlashedValidators = validators.filter((validator) => validator.status === "exited_slashed");
        const withdrawalPossibleValidators = validators.filter(
            (validator) => validator.status === "withdrawal_possible"
        );
        const withdrawalDoneValidators = validators.filter((validator) => validator.status === "withdrawal_done");

        const pendingInitializedBalance = pendingInitializedValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const pendingQueuedBalance = pendingQueuedValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const activeOngoingBalance = activeOngoingValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const activeExitingBalance = activeExitingValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const activeSlashedBalance = activeSlashedValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const exitedUnslashedBalance = exitedUnslashedValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const exitedSlashedBalance = exitedSlashedValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const withdrawalPossibleBalance = withdrawalPossibleValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        const withdrawalDoneBalance = withdrawalDoneValidators.reduce((acc, validator) => {
            return acc + parseInt(validator.balance);
        }, 0);

        setPendingInitializedBalance(pendingInitializedBalance);
        setPendingQueuedBalance(pendingQueuedBalance);
        setActiveOngoingBalance(activeOngoingBalance);
        setActiveExitingBalance(activeExitingBalance);
        setActiveSlashedBalance(activeSlashedBalance);
        setExitedUnslashedBalance(exitedUnslashedBalance);
        setExitedSlashedBalance(exitedSlashedBalance);
        setWithdrawalPossibleBalance(withdrawalPossibleBalance);
        setWithdrawalDoneBalance(withdrawalDoneBalance);

        console.log("pendingInitializedBalance", pendingInitializedBalance);
        console.log("pendingQueuedBalance", pendingQueuedBalance);
        console.log("activeOngoingBalance", activeOngoingBalance);
        console.log("activeExitingBalance", activeExitingBalance);
        console.log("activeSlashedBalance", activeSlashedBalance);
        console.log("exitedUnslashedBalance", exitedUnslashedBalance);
        console.log("exitedSlashedBalance", exitedSlashedBalance);
        console.log("withdrawalPossibleBalance", withdrawalPossibleBalance);
        console.log("withdrawalDoneBalance", withdrawalDoneBalance);
    };

    // Handle data fetching
    const fetchData = (e) => {
        fetchBeaconContractBalance();
    };

    const calculateData = (e) => {
        sumValidatorBalances(validators);
        sumValidatorStatuses(validators);
    };

    const calculateLeaderboard = (e) => {
        const leaderboad = validators.sort((a, b) => b.balance - a.balance);
        console.log(leaderboad.slice(0, 300));
        setLeaderboard(leaderboad.slice(0, 300));
    };

    return (
        <>
            <Head>
                <title>Ethereum validators data</title>
                <meta name="description" content="Ethereum validators data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container xl mx-auto px-4">
                <div className="hero bg-base-200 py-10">
                    <div className="hero-content text-center">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl font-bold text-primary-content">Ethereum Validators</h1>
                            <p className="py-6 text-primary-content">
                                Total ETH staked + totals by staking status (active, slashed, exited, etc.) + Top 300
                                Staking Leaderboard
                            </p>
                            <button type="submit" onClick={fetchData} className="btn btn-primary m-2 normal-case">
                                Fetch staked balance
                            </button>
                            <button type="submit" onClick={fetchValidators} className="btn btn-primary m-2 normal-case">
                                Fetch validator data
                            </button>
                            <button
                                type="submit"
                                onClick={calculateData}
                                className="btn btn-secondary m-2 normal-case"
                                disabled={validators.length > 0 ? false : true}
                            >
                                Calculate validator data
                            </button>
                            <button
                                type="submit"
                                onClick={calculateLeaderboard}
                                className="btn btn-accent m-2 normal-case"
                                disabled={validators.length > 0 ? false : true}
                            >
                                Show Leaderboard
                            </button>
                        </div>
                    </div>
                </div>

                {totalBalance > 0 && (
                    <div className="stats bg-primary text-primary-content m-2">
                        <div className="stat">
                            <div className="stat-title">Total Beacon Contract balance</div>
                            <div className="stat-value">
                                {(parseInt(totalBalance) / 1e18).toLocaleString(undefined, {
                                    minimumFractionDigits: 0
                                })}{" "}
                                ETH
                            </div>
                        </div>
                    </div>
                )}

                {validators.length > 0 && (
                    <div className="stats bg-primary text-primary-content m-2">
                        <div className="stat">
                            <div className="stat-title">Total validator entries</div>
                            <div className="stat-value">
                                {validators.length.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
                <br />
                {validatorBalance > 0 && (
                    <div className="stats bg-secondary text-primary-content m-2">
                        <div className="stat">
                            <div className="stat-title">Sum of all validator balances</div>
                            <div className="stat-value">
                                {(validatorBalance / 1e9).toLocaleString(undefined, { minimumFractionDigits: 0 })} ETH
                            </div>
                        </div>
                    </div>
                )}

                {validatorBalance > 0 && (
                    <>
                        <h2 className="text-4xl text-primary-content font-bold pt-5 pb-3">Totals by status</h2>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>pending_initialized</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(pendingInitializedBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>pending_queued</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(pendingQueuedBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>active_ongoing</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(activeOngoingBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>active_exiting</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(activeExitingBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>active_slashed</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(activeSlashedBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>exited_unslashed</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(exitedUnslashedBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>exited_slashed</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(exitedSlashedBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>withdrawal_possible</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(withdrawalPossibleBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>

                        <div className="stats bg-secondary text-primary-content m-2">
                            <div className="stat">
                                <div className="stat-title">
                                    Sum of all <strong>withdrawal_done</strong> validators
                                </div>
                                <div className="stat-value">
                                    {(withdrawalDoneBalance / 1e9).toLocaleString(undefined, {
                                        minimumFractionDigits: 0
                                    })}{" "}
                                    ETH
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {leaderboard.length > 0 && (
                    <>
                        <h2 className="text-4xl text-primary-content font-bold pt-5 pb-3">Leaderboard</h2>

                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-accent text-primary-content">Rank</th>
                                        <th className="bg-accent text-primary-content">Index</th>
                                        <th className="bg-accent text-primary-content">Balance</th>
                                        <th className="bg-accent text-primary-content">Public key</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((validator, index) => (
                                        <tr key={validator.publicKey}>
                                            <th>{index + 1}</th>
                                            <td>{validator.index}</td>
                                            <td>
                                                <strong>
                                                    {(validator.balance / 1e9).toLocaleString(undefined, {
                                                        minimumFractionDigits: 4
                                                    })}{" "}
                                                    ETH
                                                </strong>
                                            </td>
                                            <td>
                                                <a
                                                    href={`https://beaconscan.com/validator/${validator.validator.pubkey}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-primary-content"
                                                >
                                                    {validator.validator.pubkey}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Index</th>
                                        <th>Balance</th>
                                        <th>Public key</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </>
                )}
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>
                        <a
                            href="https://www.quicknode.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-content"
                        >
                            <img src="powered-by-quicknode-blue.png" alt="QuickNode" width="150" />
                        </a>
                    </p>
                    <div>
                        <div className="card inline-block my-2 mx-4 w-69 bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Code</h2>
                                <p>Full code of the website.</p>
                                <div className="card-actions justify-end">
                                    <button className="btn normal-case">
                                        <a
                                            href="https://github.com/velvet-shark/beacon-validators"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary-content inline"
                                        >
                                            Grab it on GitHub
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card inline-block m-2 w-69 bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Video</h2>
                                <p>Want to see it built live?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn normal-case">
                                        <a
                                            href="https://youtu.be/DpQqXv8Tq5A"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary-content inline"
                                        >
                                            Watch it on YouTube
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
