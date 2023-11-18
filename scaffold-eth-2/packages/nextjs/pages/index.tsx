import type { NextPage } from "next";
import { ChartPieIcon, FireIcon, HeartIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount} from "wagmi";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Vote for</span>
            <span className="block text-4xl font-bold">What to have for dinner?</span>
          </h1>
        </div>
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <ConnectWallet></ConnectWallet>
        </div>
        <Vote></Vote>
      </div>
    </>
  );
};

function ConnectWallet() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (address)
    return (
      <div>
        <MintAnyToken></MintAnyToken>
        <Delegate></Delegate>
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

function MintAnyToken() {
  const [mintAmount, setMintAmount] = useState("");
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Mint some AnyTokens</h2>
        <input
          type="text"
          placeholder="Amount"
          className="input input-bordered w-full max-w-xs"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
        <ConnectAnyToken></ConnectAnyToken>
        <button
          className="btn btn-active btn-neutral"
        >
          Mint
        </button>
      </div>
    </div>
  );
}

function Delegate() {
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Delegate</h2>
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered w-full max-w-xs"
          value={""}
        />
        <SelfDelegate></SelfDelegate>
        <button
          className="btn btn-active btn-neutral"
        >
          Delegate
        </button>
      </div>
    </div>
  );
}

function ConnectAnyToken() {
  // TODO: backend API
  return <div></div>;
}

function SelfDelegate() {
  // TODO: wagmi write to contract
  return <div></div>;
}

function Vote() {
  return (
    <div className="flex justify-center bg-base-300 w-full mt-16 px-8 py-12">
    <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
      <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
        <FireIcon className="h-8 w-8 fill-secondary" />
        <p>
          Proposal 1: Hot Pot
        </p>
        <button className="btn btn-outline">Vote</button>
        <GetTotalVotesForProposal index={0}></GetTotalVotesForProposal>
      </div>
      <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
        <HeartIcon className="h-8 w-8 fill-secondary" />
        <p>
          Proposal 2: K-BBQ
        </p>
        <button className="btn btn-outline">Vote</button>
        <GetTotalVotesForProposal index={1}></GetTotalVotesForProposal>
      </div>
      <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
        <ChartPieIcon className="h-8 w-8 fill-secondary" />
        <p>
          Proposal 3: Pizza
        </p>
        <button className="btn btn-outline">Vote</button>
        <GetTotalVotesForProposal index={2}></GetTotalVotesForProposal>
      </div>
    </div>
  </div>
  )
}

function GetTotalVotesForProposal(params: { index: any }) {
  // TODO: use wagmi read to get total vote counts
  return <p>Total vote is: 0</p>;
}


export default Home;
