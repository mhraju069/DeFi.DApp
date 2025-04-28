// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Defi_v1 is Initializable {
    mapping(address => uint256) public balance;
    mapping(address => uint256) public stakeBalance;
    mapping(address => uint256) public stakeDuration;

    event deposit(address indexed user, uint256 amount);
    event stake(address indexed user, uint256 amount);
    event unstake(address indexed user, uint256 amount);

    function Deposit() public payable {
        require(msg.value > 0, "Amount must be more than 0");
        balance[msg.sender] += msg.value;
        emit deposit(msg.sender, msg.value);
    }

    function Stake(uint256 amount, uint256 duration) public {
        require(amount <= balance[msg.sender], "No enough balance");
        stakeBalance[msg.sender] += (amount * 98) / 100;
        balance[address(this)] += (amount * 2) / 100;
        stakeDuration[msg.sender] =
            block.timestamp +
            duration *
            30 *
            24 *
            60 *
            60; //seconds
        emit stake(msg.sender, amount);
    }

    function Unstake(uint256 amount) public {
        require(
            stakeDuration[msg.sender] <= block.timestamp,
            "You can not unstake untill time has end"
        );
        require(stakeBalance[msg.sender] >= amount, "No enough balance");
        balance[msg.sender] += amount;
        stakeBalance[msg.sender] -= amount;
        emit unstake(msg.sender, amount);
    }

    function ForceUnstake(uint256 amount) public {
        require(stakeBalance[msg.sender] >= amount, "No enough balance");
        uint256 penalty = (amount * 10) / 100;
        balance[address(this)] += penalty;
        balance[msg.sender] += amount - penalty;
        stakeBalance[msg.sender] -= amount;
        emit unstake(msg.sender, amount);
    }
}
