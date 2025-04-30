// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Defi_v1 is Initializable {
    mapping(address => uint256) public balance;
    mapping(address => uint256) public stakeBalance;
    mapping(address => uint256) public endTime;

    event deposit(address indexed user, uint256 amount, uint time);
    event stake(address indexed user, uint256 amount,uint time);
    event unstake(address indexed user, uint256 amount,uint time);

    function Deposit() public payable {
        require(msg.value > 0, "Amount must be more than 0");
        balance[msg.sender] += msg.value;
        emit deposit(msg.sender, msg.value,block.timestamp);
    }

    function Stake(uint256 amount, uint256 duration) public {
        require(amount <= balance[msg.sender], "No enough balance");
        stakeBalance[msg.sender] += amount ;
        endTime[msg.sender] = block.timestamp +duration * 1 minutes;
        balance[msg.sender] -= amount;
        emit stake(msg.sender, amount,block.timestamp);
    }

    function Unstake(uint256 amount) public {
        require(
            endTime[msg.sender] <= block.timestamp,
            "You can not unstake untill time has end"
        );
        require(stakeBalance[msg.sender] >= amount, "No enough balance");
        balance[msg.sender] += amount;
        stakeBalance[msg.sender] -= amount;
        emit unstake(msg.sender, amount,block.timestamp);
    }

    function ForceUnstake(uint256 amount) public {
        require(stakeBalance[msg.sender] >= amount, "No enough balance");
        uint256 penalty = (amount * 10) / 100;
        balance[address(this)] += penalty;
        balance[msg.sender] += amount - penalty;
        stakeBalance[msg.sender] -= amount;
        emit unstake(msg.sender, amount,block.timestamp);
    }
}
