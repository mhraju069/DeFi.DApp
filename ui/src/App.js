import React, { use, useState,useEffect } from 'react';
import Particles from './components/particles';
import Nav from './components/nav';
import Home from './components/home';
import Deposit from './components/deposit';
import Stake from './components/stake';
import Swap from './components/swap';
import { ConnectWallet } from './components/connectWallet';
import Alert from './components/alert';
import Loader from './components/loader';
import './App.css';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showStake, setShowStake] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [loader, setLoader] = useState(false);
  const { Connect, wallet, contract, provider, loaders } = ConnectWallet();

  useEffect(() => {
    setLoader(loaders);
  }, [loaders]);

  return (
    <>
      <Particles />
      

      <Nav contract={contract} showHome={showHome} setShowHome={setShowHome} setShowDeposit={setShowDeposit} showDeposit={showDeposit} showStake={showStake} setShowStake={setShowStake} showSwap={showSwap} setShowSwap={setShowSwap} wallet={wallet} Connect={Connect} />
      <main className="main-content">
        {showHome && <Home wallet={wallet} provider={provider} contract={contract} setLoader={setLoader} Alert={Alert} />}
        {showDeposit && <Deposit contract={contract} wallet={wallet} provider={provider} setLoader={setLoader} Alert={Alert} />}
        {showStake && <Stake contract={contract} provider={provider} wallet={wallet} setLoader={setLoader} Alert={Alert}/>}
        {showSwap && <Swap />}
        {loader && <Loader />}
      </main>
    </>
  );
}

export default App;
