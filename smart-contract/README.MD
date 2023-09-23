# Tonder Smart Contract Documentation

## Config

- Network: mumbai
- Chain Id: 80001
- RPC URL: https://polygon-mumbai-bor.publicnode.com

## Contract Address

| Contract | Address                                    | Chain  | Link                                                                                             |
| :------- | :----------------------------------------- | :----- | :----------------------------------------------------------------------------------------------- |
| Tonder   | 0xcb6620177B41f489672ba620e830238e7d7cA896 | Mumbai | [Tonder](https://mumbai.polygonscan.com/address/0xcb6620177B41f489672ba620e830238e7d7cA896#code) |

## Contract ABI

Tonder ABI: [link](Tonder.json)

## Contract Functions

### verifyAndExecute

`verifyAndExecute` Allow users to send proof of real-person verification. Upon successful verification, they will receive an SBT representing a Tonder membership certificate.

```solidity
function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) public
```
