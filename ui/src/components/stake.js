import React, { useEffect, useState } from 'react'
import { formatEther, parseEther } from 'ethers';
import Loader from './loader';
import { Time } from 'highcharts';
export default function Stake(props) {
    const { wallet, contract, Alert } = props;
    const [stakeAmount, setStakeAmount] = useState(0);
    const [stakeCount, setStakeCount] = useState(0);
    const [unstakeAmount, setUnstakeID] = useState(0);
    const [duration, setDuration] = useState(0);
    const [balance, setBalance] = useState(0);
    const [stakeList, setStakeList] = useState([]);
    const [showStaked, setShowStaked] = useState(true);
    const [showUnstaked, setShowUnstaked] = useState(false);
    const [showRewards, setShowRewards] = useState(false);
    const [loader, setLoader] = useState(false);
    const [rewards, setRewards] = useState(0)






    const Stake = async () => {
        if (!stakeAmount || isNaN(stakeAmount)) {
            Alert("Please enter a valid amount for staking.", "warning");
            return;
        }
        try {
            setLoader(true);
            const tx = await contract.Staking(duration, {
                value: parseEther(stakeAmount.toString())
            });
            await tx.wait();
            Alert(`Staking successful for ${duration} minutes.`, "success");
            setStakeAmount(0);
            setDuration(0);
        } catch (error) {
            console.error("Error staking:", error);
            Alert("Something went wrong,try again.", "error");
        } finally {
            setLoader(false);

        }
    }

    // const Unstake = async () => {
    //     if (!unstakeAmount || isNaN(unstakeAmount)) {
    //         Alert("Please enter a valid amount for unstake.", "warning");
    //         return;
    //     }
    //     try {
    //         setLoader(true);
    //         const tx = await contract.Unstake(unstakeId);
    //         await tx.wait();
    //         setUnstakeAmount(0);
    //         Alert("Unstake successful!", "success");
    //     } catch (error) {
    //         console.error("Error Unstakeing:", error);
    //         Alert("Something went wrong,try again.", "error");
    //     } finally {
    //         setLoader(false);

    //     }
    // }

    useEffect(() => {
        const fetchdata = async () => {
            console.log('contract', contract)
            const tx = await contract.CheckReward()
            const count = await contract.stakeCount(wallet);
            setStakeCount(count);
            setRewards(formatEther(tx))
            console.log("rewards  " + formatEther(tx), "count " + count)
        }
        fetchdata()
    }, [contract, wallet])



    useEffect(() => {
        const getStakeList = async () => {
            try {
                setLoader(true);
                const stakelist = await contract.GetStakeLists();

                const updatedList = await Promise.all(
                    stakelist.map(async (item) => {
                        if (!item || !item.balance || !item.stakingTime) {
                            return {
                                ...item,
                                balance: "0",
                                reward: "0"
                            };
                        }

                        try {
                            const balance = item.balance.toString();
                            const endtime = item.endtime.toString();
                            const stakingTime = item.stakingTime.toString();
                            const reward = await contract.CalculateRewards(balance, stakingTime);

                            return {
                                endtime: endtime,
                                stakingTime: stakingTime,
                                balance: balance,
                                reward: reward.toString(),
                            };
                        } catch (error) {
                            console.error("Reward calculation error:", error);
                            return {
                                ...item,
                                reward: "0"
                            };
                        }
                    })
                );

                setStakeList(updatedList);
            } catch (error) {
                console.error("Error fetching stake list:", error);
                Alert("স্টেক লিস্ট লোড করতে সমস্যা হয়েছে", "error");
            } finally {
                setLoader(false);
            }
        };

        if (contract && wallet) {
            getStakeList();
        }
    }, [contract, wallet, Alert]);


    const Remainingtime = (item) => {
        // প্রথমে ডিবাগ করে দেখি কি পাচ্ছি
        console.log("Received item:", item);
        console.log("Received item.endtime:", item.endtime);

        // যদি item না থাকে বা item.endtime না থাকে
        if (!item || item.endtime === undefined || item.endtime === null) {
            return "সময় নির্ধারিত হয়নি";
        }

        try {
            const end = Number(item.endtime);
            const now = Math.floor(Date.now() / 1000);

            if (isNaN(end)) {
                return "অবৈধ সময়";
            }

            const remaining = end - now;

            if (remaining <= 0) {
                return "সময় শেষ";
            }

            const days = Math.floor(remaining / (60 * 60 * 24));
            const hours = Math.floor((remaining % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((remaining % (60 * 60)) / 60);

            // দুই ডিজিট ফরম্যাটিং
            const format = (num) => num < 10 ? `0${num}` : num;

            return `${format(days)} দিন ${format(hours)} ঘণ্টা ${format(minutes)} মিনিট`;
        } catch (error) {
            console.error("সময় ক্যালকুলেশনে ত্রুটি:", error);
            return "সময় গণনা করতে ব্যর্থ";
        }
    }




    useEffect(() => {
        const getBalance = async () => {
            setLoader(true);
            const currentBalance = await contract.mainBalance(wallet);
            setBalance(formatEther(currentBalance));
            setLoader(false);
        };
        getBalance()
    },
        [contract, wallet])



    const ShowStake = () => {
        if (!showStaked) {
            setShowStaked(true);
            setShowUnstaked(false);
            setShowRewards(false);
        }
    }
    const ShowUnstake = () => {
        if (!showUnstaked) {
            setShowStaked(false);
            setShowUnstaked(true);
            setShowRewards(false);
        }
    }
    const ShowRewards = () => {
        if (!showRewards) {
            setShowRewards(true);
            setShowStaked(false);
            setShowUnstaked(false);
        }
    }




    return (
        <>  {loader && <Loader />}
            <section id="stake" className="fade-in">
                <h1 className="page-title">Stake Assets</h1>
                <p className="page-subtitle">Earn passive income with your crypto. Stake your assets and start earning rewards today.</p>
                <div className="stake-tabs">
                    <span onClick={ShowStake} className={`tab ${showStaked ? 'active' : ''} `}>Stake</span>
                    <span onClick={ShowUnstake} className={`tab ${showUnstaked ? 'active' : ''} `}>Unstake</span>
                </div>


                {showStaked && <div className="card stake-card fade-in">
                    <div className="asset-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" preserveAspectRatio="xMidYMid" viewBox="0 0 256 417" id="ethereum">
                            <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"></path>
                            <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"></path>
                            <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"></path>
                            <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"></path>
                            <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"></path>
                            <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"></path>
                        </svg>                        <div className="asset-details">
                            <h3>BlockX Token (BXT)</h3>
                            <p>Current APY: 14.8% | Your stake: {stakeList.length}</p>
                        </div>
                    </div>

                    <form id="stakeForm">
                        <div className="form-group">
                            <div className="balance-info">
                                <span>Available for stake: {parseFloat(balance).toFixed(2)} ETH</span>
                                <span>≈ $3,125.00</span>
                            </div>

                            <div className="amount-input">
                                <input type="text" id="stakeAmount" value={stakeAmount} onChange={e => { setStakeAmount(e.target.value) }} className="form-control" placeholder="0.00" step="1" min="0" max="1250" required />
                                <button onClick={() => setStakeAmount(parseFloat(balance).toFixed(2))} type="button" className="max-btn">MAX</button>
                            </div>
                            <div className="form-text">Minimum stake: 0.01 ETH</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Staking Duration</label>
                            {/* <!-- From Uiverse.io by 00Kubi --> */}
                            <div className="radio-inputs">
                                <label className={`radio ${duration === 1 ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="radio"
                                        value={1}
                                        checked={duration === 1}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                    />
                                    <span className="name">1 Min</span>
                                </label>
                                <label className={`radio ${duration === 5 ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="radio"
                                        value={5}
                                        checked={duration === 5}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                    />
                                    <span className="name">5 Min</span>
                                </label>
                                <label className={`radio ${duration === 10 ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="radio"
                                        value={10}
                                        checked={duration === 10}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                    />
                                    <span className="name">10 Min</span>
                                </label>
                            </div>

                            {/* <div className="PB-range-slider-div">
                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    value={duration}
                                    className="PB-range-slider"
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />
                                <p className="PB-range-slidervalue">{(duration)}</p>
                            </div> */}
                            <div className="form-text">Longer durations typically offer higher APY</div>
                        </div>

                        <div className="projected-rewards">
                            <h4>Projected Rewards</h4>
                            <div className="rewards-chart"></div>
                            <div className="rewards-details">
                                <div>
                                    <span>30 days</span>
                                    <span>≈ 0 BXT</span>
                                </div>
                                <div>
                                    <span>90 days</span>
                                    <span>≈ 0 BXT</span>
                                </div>
                            </div>
                        </div>

                        <button type="button" onClick={Stake} className="confirm-stake-btn">Stake Tokens</button>
                    </form>
                </div>}
                {showUnstaked && <section id="rewards" className=" fade-in">
                    <h1 className="page-title">Earn Rewards</h1>
                    <p className="page-subtitle">Grow your crypto assets through staking, liquidity mining, and special promotions</p>

                    <div className="stats-grid">
                        <div className="card stat-card">
                            <h3>Total Rewards Earned</h3>
                            <h1>{rewards} RC</h1>
                            <div className="sparkline">↑ 8.2%</div>
                        </div>

                        <div className="card stat-card">
                            <h3>Active Stakes</h3>
                            <h1>{stakeCount}</h1>
                            <div className="sparkline">↗ 2 New</div>
                        </div>

                        <div className="card stat-card">
                            <h3>APY Average</h3>
                            <h1>12.6%</h1>
                            <div className="sparkline">↑ 1.8%</div>
                        </div>

                        <div className="card stat-card">
                            <h3>Pending Rewards</h3>
                            <h1>$428.90</h1>
                            <button className="claim-btn">Claim</button>
                        </div>
                    </div>

                    <div className="card reward-tabs-container">
                        <div className="reward-tabs">
                            <div className="tab active">Staking Rewards</div>
                            <div className="tab">Liquidity Mining</div>
                            <div className="tab">Promotions</div>
                        </div>

                        <div className="reward-content active">
                            <h3>Your Staking Positions</h3>

                            <div className="staking-positions">
                                {stakeList.map((item, index) => (<div key={index} className="position-card">
                                    <div className="position-header">
                                        <img src="" alt="BXT" style={{ width: '40px', height: '40px' }} />
                                        <div className="position-info">
                                            <h4>BX Token</h4>
                                            <p>14.8% APY • 90 Day Lock</p>
                                        </div>
                                        <div className="position-value">1,250 BXT ≈ $3,125.00</div>
                                    </div>

                                    <div className="position-details">
                                        <div className="detail-row">
                                            <span>Staked Amount :</span>
                                            <span className="positive">{formatEther(item.balance)} ETH</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Time Remaining :</span>
                                            <span>{Remainingtime(item)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Est. Final Reward :</span>
                                            <span className="positive">{formatEther(item.reward)} ETH</span>
                                        </div>
                                    </div>

                                    <div className="position-actions">
                                        <button className="secondary-btn">Unstake & Claim</button>
                                    </div>
                                </div>))}

                                {/* <div className="position-card">
                                    <div className="position-header">
                                        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '40px', height: '40px' }} />
                                        <div className="position-info">
                                            <h4>Ethereum</h4>
                                            <p>8.5% APY • 30 Day Lock</p>
                                        </div>
                                        <div className="position-value">2.45 ETH ≈ $7,350.00</div>
                                    </div>

                                    <div className="position-details">
                                        <div className="detail-row">
                                            <span>Rewards Earned</span>
                                            <span className="positive">0.12 ETH ≈ $360.00</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Time Remaining</span>
                                            <span>12 Days</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Est. Final Reward</span>
                                            <span className="positive">≈ 0.17 ETH</span>
                                        </div>
                                    </div>

                                    <div className="position-actions">
                                        <button className="secondary-btn">Add More</button>
                                        <button className="primary-btn">Claim Rewards</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="reward-content">
                            <h3>Liquidity Pools</h3>
                            <p className="page-subtitle" style={{ marginTop: '0' }}>Provide liquidity to earn trading fees and bonus rewards</p>

                            <div className="pool-grid">
                                <div className="pool-card">
                                    <div className="pool-header">
                                        <div className="pool-tokens">
                                            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '28px', height: '28px' }} />
                                            <img src="https://cryptologos.cc/logos/blockchain-com-bc-logo.png" alt="BXT" style={{ width: '28px', height: '28px', marginLeft: '-10px' }} />
                                        </div>
                                        <h4>ETH-BXT</h4>
                                        <span className="apy">24.5% APY</span>
                                    </div>
                                    <div className="pool-stats">
                                        <div className="stat">
                                            <span>Your Share</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="stat">
                                            <span>TVL</span>
                                            <span>$12.4M</span>
                                        </div>
                                    </div>
                                    <button className="stake-small-btn">Add Liquidity</button>
                                </div>

                                <div className="pool-card">
                                    <div className="pool-header">
                                        <div className="pool-tokens">
                                            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" style={{ width: '28px', height: '28px' }} />
                                            <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" alt="USDC" style={{ width: '28px', height: '28px', marginLeft: ' -10px' }} />
                                        </div>
                                        <h4>ETH-USDC</h4>
                                        <span className="apy">18.2% APY</span>
                                    </div>
                                    <div className="pool-stats">
                                        <div className="stat">
                                            <span>Your Share</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="stat">
                                            <span>TVL</span>
                                            <span>$8.7M</span>
                                        </div>
                                    </div>
                                    <button className="stake-small-btn">Add Liquidity</button>
                                </div>
                            </div>
                        </div>

                        <div className="reward-content">
                            <h3>Special Promotions</h3>
                            <p className="page-subtitle" style={{ marginTop: '0' }}>Limited-time opportunities to boost your earnings</p>

                            <div className="promo-card">
                                <div className="promo-badge">HOT</div>
                                <div className="promo-content">
                                    <h4>Double Rewards Week</h4>
                                    <p>Stake BXT this week and earn double rewards for the first 30 days!</p>
                                    <div className="promo-details">
                                        <div className="detail">
                                            <span>Period</span>
                                            <span>Jun 1 - Jun 7</span>
                                        </div>
                                        <div className="detail">
                                            <span>Bonus</span>
                                            <span className="positive">+100% APY</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="primary-btn">Participate</button>
                            </div>

                            <div className="promo-card">
                                <div className="promo-badge">NEW</div>
                                <div className="promo-content">
                                    <h4>Referral Program</h4>
                                    <p>Earn 10% of your friends' staking rewards for 90 days</p>
                                    <div className="promo-details">
                                        <div className="detail">
                                            <span>Your Earnings</span>
                                            <span className="positive">$0.00</span>
                                        </div>
                                        <div className="detail">
                                            <span>Friends Joined</span>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="primary-btn">Invite Friends</button>
                            </div>
                        </div>
                    </div>
                </section>}
            </section>
        </>
    )
}
