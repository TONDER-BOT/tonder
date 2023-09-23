#!/bin/bash

# Below should be set before running Bash script

export CHAIN_ID=80001
export RPC_URL="https://polygon-mumbai-bor.publicnode.com"
export VERIFIER_URL="https://api-testnet.polygonscan.com/api"
# export ETHERSCAN_API_KEY=
# export PRIVATE_KEY=

forge script script/Tonder.s.sol:DeployScript \
  --chain-id "$CHAIN_ID" \
  --rpc-url "$RPC_URL" \
  --etherscan-api-key "$ETHERSCAN_API_KEY" \
  --verifier-url "$VERIFIER_URL" \
  --broadcast \
  --verify \
  --private-key "$PRIVATE_KEY"