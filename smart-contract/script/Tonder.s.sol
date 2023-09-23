// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "../lib/forge-std/src/Script.sol";
import {Tonder} from "../src/Tonder.sol";
import {console2} from "../lib/forge-std/src/console2.sol";
import {IWorldID} from "../src/interfaces/IWorldID.sol";

contract DeployScript is Script {
    IWorldID constant WORLD_ID_ROUTER =
        IWorldID(0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260);
    string constant APP_ID = "app_61776abbd11364f9420d8ddf161daf27";
    string constant ACTION_ID = "Claim";

    function setUp() public {}

    function run() public {
        vm.broadcast();
        Tonder tonder = new Tonder(WORLD_ID_ROUTER, APP_ID, ACTION_ID);
        console2.log("Tonder address: ", address(tonder));
    }
}
