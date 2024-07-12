
"use client";

import React,{useState,useEffect} from 'react'
import axios from "axios"
import { ethers } from 'ethers';


function Swap() {
	
	 const from="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
	 const to="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
	 const [amount,setAmount]=useState(0)
	 
	const [quoteData,setQuoteData]=useState('')
	const [ethBalance,setEthBalance]=useState(0)
	const [baseBalance,setBaseBalance]=useState(0)
	const [account,setAccount]=useState('Connect Wallet')
	const [step1,setStep1]=useState('')
	const [step2,setStep2]=useState('')
	const [step3,setStep3]=useState('')
	const erc20_abi = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "burn",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "burnFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "initialOwner",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "ECDSAInvalidSignature",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "length",
					"type": "uint256"
				}
			],
			"name": "ECDSAInvalidSignatureLength",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "s",
					"type": "bytes32"
				}
			],
			"name": "ECDSAInvalidSignatureS",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "allowance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientAllowance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientBalance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "approver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidApprover",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidReceiver",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSpender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "deadline",
					"type": "uint256"
				}
			],
			"name": "ERC2612ExpiredSignature",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "signer",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "ERC2612InvalidSigner",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "currentNonce",
					"type": "uint256"
				}
			],
			"name": "InvalidAccountNonce",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "InvalidShortString",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "str",
					"type": "string"
				}
			],
			"name": "StringTooLong",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [],
			"name": "EIP712DomainChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "deadline",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "v",
					

	"type": "uint8"
				},
				{
					"internalType": "bytes32",
					"name": "r",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "s",
					"type": "bytes32"
				}
			],
			"name": "permit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "totalTokensHeld",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalTokensMinted",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

	const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api";
		
	const getQuote = async (params) => {
	const endpoint = "v2/quote";
	const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

	try {
		const res = await axios.get(quoteUrl, { params });
		return res.data;
	} catch (e) {
		console.error(`Fetching quote data from pathfinder: ${e}`);
	}
	};

	const checkAndSetAllowance = async (wallet, tokenAddress, approvalAddress, amount) => {
		if (tokenAddress === ethers.constants.AddressZero) {
			return;
		}

		const erc20 = new ethers.Contract(tokenAddress, erc20_abi, wallet);
		const allowance = await erc20.allowance(await wallet.getAddress(), approvalAddress);
		if (allowance.lt(amount)) {
			const approveTx = await erc20.approve(approvalAddress, amount, { gasPrice: await wallet.provider.getGasPrice() });
			try {
				await approveTx.wait();
				console.log(`Transaction mined successfully: ${approveTx.hash}`);
			} catch (error) {
				console.log(`Transaction failed with error: ${error}`);
			}
		} else {
			console.log("Enough allowance");
			alert("Enough allowance");
		}
	};

	const getTransaction = async (params, quoteData) => {
	const endpoint = "v2/transaction";
	const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

	try {
		const res = await axios.post(txDataUrl, {
			...quoteData,
			slippageTolerance: 0.5,
			senderAddress: account,
			receiverAddress: account,
		});
		return res.data;
	} catch (e) {
		console.error(`Fetching tx data from pathfinder: ${e}`);
	}
	};
	
	
  return (
	<div className="body bg-black h-screen mt-[-80px]">
	<center>
	<div className="navbar">
  <h1 className='text-2xl font-medium  py-[30px] text-white'>Swap</h1>
		<button class="button-52 mt-[20px] border border-2 border-purple-600
		px-[5px] py-[3px] rounded-lg bg-black text-white" onClick={async ()=>{
	  if (window.ethereum) {
		try {
		  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		  setAccount(accounts[0]);

		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  const provider1 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth", 1);
		  const provider2 = new ethers.providers.JsonRpcProvider("https://base-rpc.publicnode.com", 8453);
		  const signer = provider.getSigner();

		  const contract = new ethers.Contract(to, erc20_abi, provider1);
		  let balance = await contract.balanceOf(accounts[0]);
		  setEthBalance(ethers.utils.formatEther(balance));

		  const contract2 = new ethers.Contract(from, erc20_abi, provider2);
		  balance = await contract2.balanceOf(accounts[0]);
		  setBaseBalance(ethers.utils.formatEther(balance));
		
		} catch (err) {
		  console.log(err);
		}
	  }
	}}>{account.substring(0,4) + "...." + account.substring(38,42)}</button>
	</div>
	<br/>
	<br/><br/>
  <h5 className='text-lg fonr-medium border-2 rounded-lg px-[5px] py-[3px] 
		border-purple-600 bg-black text-white'>Transfer USDC from Eth to Base</h5>
	<br/>
  <div className='bg-black text-white border-2 border-purple-600 py-[5px] font-medium'>Eth: {ethBalance}&nbsp;&nbsp;&nbsp;&nbsp;Base: {baseBalance}</div>
	<br/>
  <input placeholder='Enter Amount' onChange={(e)=>{setAmount(e.target.value*Math.pow(10,18))}}
		className='bg-black text-white py-[3px] border rounded-lg px-[2px]'></input>
		<h2 className='mt-[40px] bg-purple-600 text-white font-medium
		py-[3px] '>Steps Involved</h2>
	<br/>
	<button  class="button-51 mt-[20px] bg-purple-600 text-white font-medium
		py-[3px] px-[20px]" onClick={async ()=>{
	const params = {
		'fromTokenAddress': from,
		'toTokenAddress': to,
		'amount': amount,
		'fromTokenChainId': "43113",
		'toTokenChainId': "17000",
		'partnerId': "0",
	};
	
	const quoteData = await getQuote(params);
	setQuoteData(quoteData);
	setStep1('✅');
	alert(quoteData.allowanceTo)
	}}>Step 1: Get Quote {step1}</button>
	<br/>
	<br/>
  <button class="button-51 button-51 mt-[20px] bg-purple-600 text-white font-medium
		py-[3px] px-[20px]" onClick={async () => {
	if (window.ethereum) {
		try {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			await checkAndSetAllowance(
				signer,
				from,
				quoteData.allowanceTo,
				ethers.constants.MaxUint256
			);
			setStep2('✅');
		} catch (err) {
			console.log(err);
		}
	}}}>Step 2: Approve Allowance {step2}</button>
	<br/>
	<br/>
  <button class="button-51 button-51 mt-[20px] bg-purple-600 text-white font-medium
		py-[3px] px-[20px]" onClick={async () => {
	const params = {
		'fromTokenAddress': from,
		'toTokenAddress': to,
		'amount': amount,
		'fromTokenChainId': "1",
		'toTokenChainId': "8453",
	};
	
	const txData = await getTransaction(params, quoteData);
	setStep3('✅');
	}}>Step 3: Execute Transaction {step3}</button>
	
	</center>
	</div>
  );
}

export default Swap;


