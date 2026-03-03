// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SwundGovernanceToken is ERC20 {
    constructor() ERC20("Swund Governance", "SWUND") {
        _mint(msg.sender, 10_000_000 * 10**18);
    }
}

contract ReferralVault {
    SwundGovernanceToken public token;
    mapping(address => uint256) public referrals;

    function claimReferralReward(address referrer) external {
        require(referrer != msg.sender, "Cannot refer self");
        referrals[referrer] += 1000 * 10**18; // 1000 SWUND per referral
        token.transfer(referrer, 1000 * 10**18);
    }
}