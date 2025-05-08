// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BXT is
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    function initialize() public initializer {
        __ERC20_init("BXT", "BTX");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    function GetReward(address to, uint256 rewards) public onlyOwner virtual {
        _mint(to, rewards);
    }
}

contract Defi_v1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    BXT public bxt;
    uint256 rewardsRate;
    mapping(address => uint256) public mainBalance;
    struct Stake {
        uint256 balance;
        uint256 stakingTime;
        uint256 endtime;
        uint reward;
    }
    mapping(address => Stake[]) public stakeList;
    mapping(address => uint256) public stakeCount;

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        rewardsRate = 50;
    }

    // Override _authorizeUpgrade to ensure only the owner can upgrade
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    function BXT_Address(address _address) public onlyOwner virtual{
        bxt = BXT(_address);
    }

    event depositlog(address indexed user, uint256 amount, uint256 time);
    event stakelog(address indexed user, uint256 amount, uint256 time);
    event unstakelog(address indexed user, uint256 amount, uint256 time);
    event rewardlog(address indexed user, uint256 amount, uint256 time);

    function Deposit() public payable virtual{
        require(msg.value > 0, "Amount must be more than 0");
        mainBalance[msg.sender] += msg.value;
        emit depositlog(msg.sender, msg.value, block.timestamp);
    }
    

    function Staking(uint256 duration) public payable  virtual{
        require(msg.value <= mainBalance[msg.sender], "No enough balance, Deposit first");
        stakeCount[msg.sender]++;
        stakeList[msg.sender].push( Stake({
            balance: msg.value,
            stakingTime: block.timestamp,
            endtime: block.timestamp + duration * 1 minutes,
            reward : 0
        }));

        mainBalance[msg.sender] -= msg.value;
        emit stakelog(msg.sender, msg.value, block.timestamp);
    }

    function Unstake(uint256 index) public virtual{
        Stake storage stakes = stakeList[msg.sender][index];
        require(
            stakes.endtime <= block.timestamp,
            "You can not unstake untill time has end"
        );

        mainBalance[msg.sender] += stakes.balance;

        uint rewards = CalculateRewards(stakes.balance,stakes.stakingTime);
        bxt.GetReward(msg.sender, rewards);

        emit rewardlog(msg.sender, rewards, block.timestamp);
        emit unstakelog(msg.sender, stakes.balance, block.timestamp);
        stakeList[msg.sender][index] = stakeList[msg.sender][stakeCount[msg.sender]-1];
        stakeList[msg.sender].pop();
        stakeCount[msg.sender]--;
    }


    function ForceUnstake(uint256 index) public virtual{
        Stake storage stakes = stakeList[msg.sender][index];
        uint256 penalty = (stakes.balance * 10) / 100;
        mainBalance[address(this)] += penalty;
        mainBalance[msg.sender] += stakes.balance - penalty;
        emit unstakelog(msg.sender, stakes.balance, block.timestamp);
        stakeList[msg.sender][index] = stakeList[msg.sender][stakeCount[msg.sender]-1];
        stakeList[msg.sender].pop();
        stakeCount[msg.sender]--;
    }

    function CalculateRewards(uint amount,uint time) public view virtual returns(uint) {
       
        uint rewards= ((amount *
            rewardsRate *
            (block.timestamp - time )) / (100 * 365 days));
            return rewards;
    }

    function CheckReward() public view virtual returns (uint256) {
        return (bxt.balanceOf(msg.sender));
    }
    
    function GetStakeLists() public view virtual returns(Stake[] memory){
        return stakeList[msg.sender];
    }
}
