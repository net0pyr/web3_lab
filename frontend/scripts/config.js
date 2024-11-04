const updateClockTimeout = 1000;
var valueR = 2.4;
var isRChanged = false;
let board;
var valueX = 0;
var valueY = 0;
var valueFine = 0;
var points = [];

var web3;
var contract;
document.addEventListener("DOMContentLoaded", async function () {
    if (window.ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);

        contract = new web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "x",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "y",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "r",
                        "type": "int256"
                    }
                ],
                "name": "checkShot",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "pure",
                "type": "function",
                "constant": true
            }
        ], "0xcdfF78D487e6B39e651F75825104C5a36fFe0CeC");
    } else {
        alert("Metamask not found!");
        return;
    }
});
