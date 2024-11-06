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
var userAddress; 

var db;

document.addEventListener("DOMContentLoaded", async function () {
    if (window.ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);

        const accounts = await web3.eth.getAccounts();
        userAddress = accounts[0];
        console.log("User Address:", userAddress);

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
        ], "0x615d371c1a4f10372d89BB21C6d6A495F5Ae90C7");
    } else {
        alert("Metamask not found!");
        return;
    }
});
