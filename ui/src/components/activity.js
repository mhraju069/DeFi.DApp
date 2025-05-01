import { formatEther } from 'ethers';
import React, { useEffect } from 'react'

export default function Activity(props) {
    const { contract } = props;

    const [log, setLog] = React.useState([]);

    useEffect(() => {
        if (!contract) return;

        const fetchLogs = async () => {
            try {
                const Dipositlog = await contract.queryFilter(contract.filters.deposit())
                const Stakelog = await contract.queryFilter(contract.filters.stake())
                const Unstakelog = await contract.queryFilter(contract.filters.unstake())

                const logs = (event, type) => {
                    const time = new Date(event.args.time.toString() * 1000).toLocaleString();
                    const addr = event.args.user.toString().slice(0, 7) + "..." + event.args.user.toString().slice(-7);
                    return {
                        type: type,
                        from: addr,
                        amount: event.args.amount.toString(),
                        blockNumber: event.blockNumber,
                        time: time,
                    }
                }

                const allLogs = [
                    ...Stakelog.map(e => logs(e, 'stake')),
                    ...Unstakelog.map(e => logs(e, 'unstake')),
                    ...Dipositlog.map(e => logs(e, 'deposit'))
                ];

                allLogs.sort((a, b) => b.blockNumber - a.blockNumber);
                setLog(allLogs.slice(0, 50));
            } catch (e) {
                console.log("Fetch log error", e);
            }
        }

        fetchLogs();

        // Listen to new events
        const onEvent = () => {
            fetchLogs();
        };

        contract.on("stake", onEvent);
        contract.on("unstake", onEvent);
        contract.on("deposit", onEvent);

        // Cleanup on unmount
        return () => {
            contract.off("stake", onEvent);
            contract.off("unstake", onEvent);
            contract.off("deposit", onEvent);
        };
    }, [contract]);






    return (
        <>
            <div className="card activity-feed">
                <h2>{log.length == 0 ? "Loading..." : "Recent Activity"}</h2>
                {!log.length == 0 &&
                    <div className="activity-list">
                        {log.map((item, index) => (
                            <div className="activity-item" key={index}>
                                <div className={`activity-icon ${item.type}`}>
                                    {item.type === 'deposit' ? '↑' : item.type === 'unstake' ? '←' : '→'}
                                </div>
                                <div className="activity-details">
                                    <pre>{item.type.toUpperCase()}   {parseFloat(formatEther(item.amount)).toFixed(2)}ETH  by  {item.from}   #{item.blockNumber}
                                    </pre>
                                </div>
                                <div className="activity-amount">{item.time}</div>
                            </div>
                        ))}
                    </div>}

            </div>
        </>
    )
}
