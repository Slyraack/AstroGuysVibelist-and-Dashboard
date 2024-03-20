import Box from '@mui/material/Box';
import React, { useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from '../Sidebar/SideBar';
import Grid from '@mui/material/Grid';
import './Stacking.css'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import stc2 from "../../Img/st-c2.png"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import c1 from "../../Img/yc1.png"
import c2 from "../../Img/yc2.png"
import c3 from "../../Img/yc3.png"
import c4 from "../../Img/y4.png"
import bc from "../../Img/bc.png"
import sei from "../../Img/sei.png"
import ft1 from "../../Img/ft1.png"
import ft2 from "../../Img/ft2.png"
import ft3 from "../../Img/ft3.png"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { StargateClient, QueryClient } from "@cosmjs/stargate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigningStargateClient, coin, assertIsBroadcastTxSuccess } from '@cosmjs/stargate';
import Axios from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { DistributionExtension, setupDistributionExtension } from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import axios from "axios";
import { GasPrice } from '@cosmjs/stargate'


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const ycollection = [
    { name: 'Astro Guys', img: `${c1}` },
    { name: 'Astro Guys', img: `${c2}` },
    { name: 'Astro Guys', img: `${c3}` },
    { name: 'Astro Guys', img: `${c4}` },
    { name: 'Astro Guys', img: `${c2}` },
    { name: 'Astro Guys', img: `${c1}` },
    { name: 'Astro Guys', img: `${c3}` },
    { name: 'Astro Guys', img: `${c4}` },
    { name: 'Astro Guys', img: `${c2}` },
]


const accord = [
    { title: 'What is Astro Hub Staking?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel1' },
    { title: 'How does Astro Hub Staking work?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel2' },
    { title: 'What is Astro Hub Staking?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel3' },
]


const drawerWidth = 240;



function Stacking() {
    var ws
    const stakeinput = useRef("");
    const [expanded, setExpanded] = useState(false);
    const [datatusd, setDatatusd] = useState("")
    const [seibal, setSeibal] = useState("")
    const [values, setValues] = React.useState(0);
    const [reward, setReward] = useState("")
    const [anreward, setAnreward] = useState("")
    const [mnemonic, setMnemonic] = useState('');
    const [stakdata, setStakdata] = useState([
        { name: 'Sankar', wallet: '46713485sfr762', user: 'sankar@gmail.com' },
        { name: 'Sankar', wallet: '46713485sfr762', user: 'sankar@gmail.com' },
        { name: 'Sankar', wallet: '46713485sfr762', user: 'sankar@gmail.com' },
        { name: 'Sankar', wallet: '46713485sfr762', user: 'sankar@gmail.com' },
        { name: 'Sankar', wallet: '46713485sfr762', user: 'sankar@gmail.com' },
    ])

    const [btnload, setBtnload] = useState(false)
    const [withdrawed, setWithdrawed] = useState(true)
    const [progress, setProgress] = useState(0);

    const [getStake, setGetStake] = useState([])
    const [getNFTstake, setGetNFTstake] = useState([])
    const [imagearray, setImageArray] = useState([])
    const [stakeCreatedate, setStakeCreatedate] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [totalUser, setTotalUser] = useState()
    const [totalNFTAmount, setTotalNFTAmount] = useState(0)
    const [totalUserNFTAmount, setTotalUserNFTAmount] = useState(0)
    const [userTotalReward, setUserTotalReward] = useState(0)
    const [rew, setRew] = useState("")
    const [share, setShare] = useState("")



    const handleChangetab = (event, newValue) => {
        setValues(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    const apiCall = {
        "method": "SUBSCRIBE",
        "params": [
            "seiusdt@ticker"
        ],
        "id": 1
    }


    const socket = () => {
        ws.onopen = (event) => {
            ws.send(JSON.stringify(apiCall));
        };

        ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                if (json.s === "SEIUSDT") {
                    setDatatusd(json)
                }

            } catch (err) {
                console.log("error");
            }
        };
    }

    const SendNFT = async (tokenid) => {
        const compassAddr = window.localStorage.getItem("address")
        const leapAddr = window.localStorage.getItem("leapaddress")

        const Imgobj = tokenid
        const token = Imgobj.split(" ")
        const tokenId = token[2].replace("#", "")
       

        try {
            if (compassAddr) {

                // const addr = localStorage.getItem("address")
                const contractAddress =
                    'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g';
                const msg = {
                    "transfer_nft": {
                        "recipient": "sei14tsl7y7n2fjrw3x4wdezff5cjtjyt9uj20nekw",
                        "token_id": Number(tokenId).toString()
                    }
                };
             
                const funds = [{
                    "denom": "usei",
                    "amount": "5000"
                }];

                const execute = async () => {
                    const rpcEndpoint = "https://sei-rpc.brocha.in";
                   
                    const offlineSigner = window.compass.getOfflineSigner("pacific-1");
                    
                    const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, offlineSigner)
                   
                    const accounts = await offlineSigner.getAccounts();

                  
                    const senderAddress = accounts[0].address;
                
                    // const senderAddress = "sei1tzm0eee98d5eyh2zpvvwnse88t9lr8l6h4end7";
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "2000000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
                    };

                    const tx = await client.execute(
                        senderAddress,
                        contractAddress,
                        msg,
                        fee,
                        undefined,
                        funds
                    );
                    const hash = tx.transactionHash

                    if (tx.transactionHash) {
                        try {
                            const response = await Axios.post('/users/nftStake', { senderAddress, hash, tx, tokenId },
                                {
                                    headers: {
                                        Authorization: window.localStorage.getItem('token')
                                    }
                                })
  
                            if (response.data.success == true) {
                                toast.success('NFT Stake Successfully Completed')
                                await getImage()
                                await GetNftStake()
                            }
                        } catch (error) {
                            console.log(error, 'err');
                        }
                    }

                };
                execute();
            }
            else if (leapAddr) {

                const contractAddress =
                    'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g';
                const msg = {
                    "transfer_nft": {
                        "recipient": "sei14tsl7y7n2fjrw3x4wdezff5cjtjyt9uj20nekw",
                        "token_id": Number(tokenId).toString()
                    }
                };

                const funds = [{
                    "denom": "usei",
                    "amount": "5000"
                }];

                const execute = async () => {
                    const rpcEndpoint = "https://sei-rpc.brocha.in";

                    const offlineSigner = window.leap.getOfflineSigner("pacific-1");

                    const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, offlineSigner)
                  

                    const accounts = await offlineSigner.getAccounts();


                    const senderAddress = accounts[0].address;

                    // const senderAddress = "sei1tzm0eee98d5eyh2zpvvwnse88t9lr8l6h4end7";
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "2000000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
                    };

                    const tx = await client.execute(
                        senderAddress,
                        contractAddress,
                        msg,
                        fee,
                        undefined,
                        funds
                    );
                    const hash = tx.transactionHash

                    if (tx.transactionHash) {
                        try {
                            const response = await Axios.post('/users/nftStake', { senderAddress, hash, tx, tokenId },
                                {
                                    headers: {
                                        Authorization: window.localStorage.getItem('token')
                                    }
                                })
    
                            if (response.data.success == true) {
                                toast.success('NFT Stake Successfully Completed')
                                await getImage()
                                await GetNftStake()
                            }
                        } catch (error) {
                            console.log(error, 'err');
                        }
                    }

                };
                execute();
            }
            else {
                console.log('connect your wallet');
            }
        } catch (error) {
            console.log('nft stake error', error);
        }
    }


    useEffect(() => {
        ws = new WebSocket("wss://stream.binance.com:9443/ws");
        socket()
        return () => ws.close()
    }, [])


    const getbalance = async () => {
        try {
            const accounts = window.localStorage.getItem("address")
            if (accounts) {
                const rpcEndpoint = "https://sei-rpc.brocha.in"; // e.g., "http://localhost:26657"
                const client = await StargateClient.connect(rpcEndpoint);
                const addres = window.localStorage.getItem("address")
                const balances = await client.getAllBalances(addres);
                let newbal = (parseFloat(Number(balances[0].amount) / (10 ** 6)).toFixed(2))
                setSeibal(newbal)
            }
            else {
                const rpcEndpoint = "https://sei-rpc.brocha.in"; // e.g., "http://localhost:26657"
                const client = await StargateClient.connect(rpcEndpoint);
                const addres = window.localStorage.getItem("leapaddress")
                const balances = await client.getAllBalances(addres);
              
                if (balances === undefined || balances.length === 0) {
                    setSeibal(0)
                }
                else {
                    let newbal = (parseFloat(Number(balances[0].amount) / (10 ** 6)).toFixed(2))
                    setSeibal(newbal)
                }
            }


        } catch (error) {
            console.log(error, "err");
        }

    }


    useEffect(() => {
        if ((seibal === "" && window.localStorage.getItem("address") != null)) {
            getbalance()
        }
        else if (seibal === "" && window.localStorage.getItem("leapaddress") != null) {
            getbalance()
        }
    })




    const calculaterewa = () => {
        if (stakeinput.current.value > "0") {
            const amo = (stakeinput.current.value * 4) / 100
            setAnreward(amo * 12)
            setReward((stakeinput.current.value * 4) / 100)
        } else {
            setReward("0")
        }
    }
 

    var RewardValue = ''
   
    const getreward = async () => {
        try {
           
            const compassAddr = window.localStorage.getItem("address")
            const leapAddr = window.localStorage.getItem("leapaddress")
            if (compassAddr) {
                const client = await SigningStargateClient.connect("https://sei-rpc.brocha.in");
                
                const rewards1 = await client.queryClient.staking.delegation(compassAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
                let sha = (Number(rewards1.delegationResponse.delegation.shares) / (10 ** 18))
                setShare(sha)
                
                const rewards = await client.queryClient.staking.delegatorValidator(compassAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
               
                let newbal = (parseFloat(Number(rewards.validator.tokens) / (10 ** 18)).toFixed(4))
                
                setRew(newbal)
                // RewardValue = newbal
                return newbal
            }
            else {
                const client = await SigningStargateClient.connect("https://sei-rpc.brocha.in");
                
                const rewards1 = await client.queryClient.staking.delegation(leapAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
                let sha = (Number(rewards1.delegationResponse.delegation.shares) / (10 ** 18))
                setShare(sha)
               
                const rewards = await client.queryClient.staking.delegatorValidator(leapAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
              
                let newbal = (parseFloat(Number(rewards.validator.tokens) / (10 ** 18)).toFixed(4))
              
                // RewardValue = newbal
                setRew(newbal)
                return newbal
            }
        } catch (error) {
            console.log(error, "error123");
        }
    }



    const claimre = async () => {
        try {
            const compassAddr = window.localStorage.getItem("address")
            const leapAddr = window.localStorage.getItem("leapaddress")
            if (compassAddr) {
                await window.compass.enable("pacific-1");
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = compassAddr
                let validatorAddress = "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04"
                // Construct the message to claim rewards from the specific validator
                const msgClaimRewards = {
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: {
                        delegatorAddress,
                        validatorAddress,
                    },
                };
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Specify fee, adjust as needed
                    gas: "2000000", // Specify gas limit, adjust as needed
                };

              
                // Broadcast the transaction
                // const rewardsResponse = await client.distribution.delegationTotalRewards(delegatorAddress);
                const result = await client.signAndBroadcast(delegatorAddress, [msgClaimRewards], fee, "Claim rewards from Imperator.co");
                if (result.code === 0) {
                    toast.success("Reward Claimed successfully")
                } else {
                    toast.error("something Went Wrong")
                }
              

            } else {
                await window.leap.enable("pacific-1");
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = leapAddr
                let validatorAddress = "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04"
           
                // Construct the message to claim rewards from the specific validator
                const msgClaimRewards = {
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: {
                        delegatorAddress,
                        validatorAddress,
                    },
                };
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Specify fee, adjust as needed
                    gas: "2000000", // Specify gas limit, adjust as needed
                };

               
                const result = await client.signAndBroadcast(delegatorAddress, [msgClaimRewards], fee, "Claim rewards from Imperator.co");
                // Check if the transaction was successful
                //   assertIsBroadcastTxSuccess(result);

              
                if (result.code === 0) {
                    toast.success("Reward Claimed successfully")
                } else {
                    toast.error("something Went Wrong")
                }
            }

        } catch (error) {
            console.log(error, "**error**");
        }
    }

    const unstakre = async (da) => {
        try {
            const compassAddr = window.localStorage.getItem("address")
            const leapAddr = window.localStorage.getItem("leapaddress")
            if (compassAddr) {
                await window.compass.enable("pacific-1");
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
               
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = compassAddr
                let validatorAddress = "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04"
                // Construct the message to undelegate from the specific validator
                // let sha = (share * (10 ** 6))
                
                const amount = coin(share, "usei"); // Undelegate 1 SEI (adjust amount as needed)
                const msgUndelegate = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                    value: {
                        delegatorAddress,
                        validatorAddress,
                        amount,
                    },
                };

                // Combine the claim and undelegate messages into a single transaction
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Specify fee, adjust as needed
                    gas: "200000", // Specify gas limit, adjust as needed
                };

                // Broadcast the transaction
                // const rewardsResponse = await client.distribution.delegationTotalRewards(delegatorAddress);
                const result = await client.signAndBroadcast(delegatorAddress, [msgUndelegate], fee, "Undelegate and claim rewards from Imperator.co");

                // // Check if the transaction was successful
                // //   assertIsBroadcastTxSuccess(result);

             
                if (result.code === 0) {
                    await GetStakeDetails()
                    const response = await Axios.post('/users/WithdrawRequest', { id: da }, {
                        headers: { Authorization: window.localStorage.getItem("token") }
                    })
                    toast.success("Unstaked successfully")
                } else if (result.code === 19) {
                    toast.error("No Stake available")
                } else {
                    toast.error("Something Went Wrong")
                }
            } else {
                await window.leap.enable("pacific-1");
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = leapAddr
                let validatorAddress = "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04"
                // Construct the message to undelegate from the specific validator
               
                const amount = coin(share, "usei"); // Undelegate 1 SEI (adjust amount as needed)
                const msgUndelegate = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                    value: {
                        delegatorAddress,
                        validatorAddress,
                        amount,
                    },
                };
               
                // Combine the claim and undelegate messages into a single transaction
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Specify fee, adjust as needed
                    gas: "200000", // Specify gas limit, adjust as needed
                };

                // Broadcast the transaction
                // const rewardsResponse = await client.distribution.delegationTotalRewards(delegatorAddress);
                const result = await client.signAndBroadcast(delegatorAddress, [msgUndelegate], fee, "Undelegate and claim rewards from Imperator.co");

                // // Check if the transaction was successful
                // //   assertIsBroadcastTxSuccess(result);

                if (result.code === 0) {
                    await GetStakeDetails()
                    const response = await Axios.post('/users/WithdrawRequest', { id: da }, {
                        headers: { Authorization: window.localStorage.getItem("token") }
                    })
                    toast.success("Unstaked successfully")
                } else if (result.code === 19) {
                    toast.error("No Stake available")
                } else {
                    toast.error("Something Went Wrong")
                }
            }


        } catch (error) {
            toast.error("Transaction Reverted")
        }
    }




    useEffect(() => {
        getreward()
    }, [])


    const stake = async () => {
        if (window.localStorage.getItem("address") === null && window.localStorage.getItem("leapaddress") === null) {
            toast.error("Connect Your Wallet")
        }
        else if (stakeinput.current.value > seibal) {
            toast.error("Insufficient Fund In you Wallet")
        }
        else {
            const addres = window.localStorage.getItem("address")
            const Leapaddr = window.localStorage.getItem("leapaddress")
            if (addres) {
              
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
               
                const client = await SigningStargateClient.connectWithSigner(
                    "https://sei-rpc.brocha.in", // Replace with actual RPC endpoint
                    offlineSigner
                );
                const senderAddress = addres;
             

                try {
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "2000000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
                    };
                    const amountInUtokens = { // Make sure to convert the amount to the smallest unit, e.g., usei for SEI tokens.
                        denom: 'usei', // Adjust the denomination for SEI tokens
                        amount: String(stakeinput.current.value * (10 ** 6)), // Convert amount to string
                    };


                    const result = await client.delegateTokens(senderAddress, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04", amountInUtokens, fee);
                    const ba = await getreward()
                    const Transactionhash = result.transactionHash
                    if (Transactionhash) {
                        const response = await Axios.post('/users/stake', { amount: stakeinput.current.value, reward: ba, transactionhash: Transactionhash },
                            { headers: { Authorization: window.localStorage.getItem('token') } })
                        if (response.data.success == true) {
                            toast.success("Stacked Successfully")
                        }
                    }
                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    toast.error("Transaction Reverted")
                }
            }
            else if (Leapaddr) {

                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
          
                const client = await SigningStargateClient.connectWithSigner(
                    "https://sei-rpc.brocha.in", // Replace with actual RPC endpoint
                    offlineSigner
                );
              
                const senderAddress = Leapaddr;


                try {
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "200000", // Example gas limit, adjust based on the network
                    };
                    const amountInUtokens = { // Make sure to convert the amount to the smallest unit, e.g., usei for SEI tokens.
                        denom: 'usei', // Adjust the denomination for SEI tokens
                        amount: String(stakeinput.current.value * (10 ** 6)), // Convert amount to string
                    };

                    const result = await client.delegateTokens(senderAddress, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04", amountInUtokens, fee);
                   
                    const ba = await getreward()
                    const Transactionhash = result.transactionHash
                    if (Transactionhash) {
                        const response = await Axios.post('/users/stake', { amount: stakeinput.current.value, reward: ba, transactionhash: Transactionhash },
                            { headers: { Authorization: window.localStorage.getItem('token') } })
                        if (response.data.success == true) {
                            toast.success("Stacked Successfully")
                        }
                    }
                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    toast.error("Transaction Reverted")
                }
            }
        };

    }

    const getImage = async () => {

        const CompassAddr = window.localStorage.getItem('address')
        const LeapAddr = window.localStorage.getItem('leapaddress')
        if (CompassAddr) {
            try {
                const rpcEndpoint = "https://sei-rpc.brocha.in";
                const clientQuery = await SigningCosmWasmClient.connect(rpcEndpoint);
                const CONTRACT_ADDR = 'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g'
                const queryMsg = {
                    "tokens": {
                        "owner": CompassAddr
                    }
                };
                const queryResponse = await clientQuery.queryContractSmart(CONTRACT_ADDR, queryMsg);
                let TokenArray = []
                TokenArray.push(queryResponse.tokens[0])


                for (let i = 0; i < TokenArray.length; i++) {

                    const tokenid = TokenArray[i]
                    const imageArray = []
                    if (tokenid != undefined) {
                        const allnfttokens = {
                            "all_nft_info": {
                                "token_id": Number(tokenid).toString()
                            }
                        };
                        const queryRes = await clientQuery.queryContractSmart(CONTRACT_ADDR, allnfttokens);

                        const tokeUriArray = []
                        let obj = {}
                        obj = queryRes.info.token_uri
                        tokeUriArray.push(obj)


                        for (let i = 0; i < tokeUriArray.length; i++) {
                            const imageResponse = await axios.get(tokeUriArray[i])

                            const name = imageResponse.data.name
                            const imageUrl = imageResponse.data.image
                            let Imgobj = { name, imageUrl }

                            imageArray.push(Imgobj)

                        }
                    }

                    setImageArray(imageArray)
                }
            } catch (error) {
                console.log(error, 'getimage error');
            }
        }
        else if (LeapAddr) {

            try {
                const rpcEndpoint = "https://sei-rpc.brocha.in";
                const clientQuery = await SigningCosmWasmClient.connect(rpcEndpoint);
                const CONTRACT_ADDR = 'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g'
                const queryMsg = {
                    "tokens": {
                        "owner": LeapAddr
                    }
                };
                const queryResponse = await clientQuery.queryContractSmart(CONTRACT_ADDR, queryMsg);
                let TokenArray = []
                TokenArray.push(queryResponse.tokens[0])



                for (let i = 0; i < TokenArray.length; i++) {
                 
                    const tokenid = TokenArray[i]

                    const imageArray = []
                    if (tokenid != undefined) {
                        const allnfttokens = {
                            "all_nft_info": {
                                "token_id": Number(tokenid).toString()
                            }
                        };
                        const queryRes = await clientQuery.queryContractSmart(CONTRACT_ADDR, allnfttokens);

                        const tokeUriArray = []
                        let obj = {}
                        obj = queryRes.info.token_uri
                        tokeUriArray.push(obj)


                        for (let i = 0; i < tokeUriArray.length; i++) {
                            const imageResponse = await axios.get(tokeUriArray[i])
                          
                            const name = imageResponse.data.name
                            const imageUrl = imageResponse.data.image
                            let Imgobj = { name, imageUrl }
                            
                            imageArray.push(Imgobj)

                        }
                    }
                    setImageArray(imageArray)
                }

            } catch (error) {
                console.log(error, 'getimage err');
            }
        }
        else {
            console.log('connect your wallet');
        }
    }



    const GetStakeDetails = async () => {
        getImage()
        GetNftStake()
        try {
            const response = await Axios.post('/users/getstackdetails', {}, {
                headers: { Authorization: window.localStorage.getItem("token") }
            })



            if (response.data.success == true) {
                setGetStake(response.data.result)
            }
            else {
                console.log('erron in getting stake details');
            }
        } catch (error) {
            console.log(error, 'err');
        }

    }

    const GetNftStake = async () => {
        try {
            const response = await Axios.post('/users/getNFT', {}, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
          
            if (response.data.success == true) {
                setGetNFTstake(response.data.result)
            }

        } catch (error) {
            console.log(error, 'err');
        }
    }


    const FormatDate = ((dbdate) => {
        const date = dbdate.split('T')[0]
        return date
    })

    const FormatAddress = ((addr) => {
        let add = addr.slice(0, 6) + "......" + addr.slice(36, 42)
        return add
    })

    const convert = ((str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    })




    const WithDrawRequest = async (id) => {

        try {
            const response = await Axios.post('/users/WithdrawRequest', { id }, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })

            if (response.data.success == true) {
                toast.success(response.data.message)
                GetNftStake()
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {

        }

    }

    const clamButton = (ind) => {
        if (getStake.length % 2 === 0) {
            return ind === getStake.length / 2 - 1;
        } else {
            return ind === Math.floor(getStake.length / 2);
        }
    };

    const getAllDatas = async () => {
        const response = await Axios.post('/alldata')
        setTotalUser(response.data.user)
        const amount = response.data.data[0].totalAmount
        const seiUSDT = 0.90
        const usdt = seiUSDT * amount
        setTotalAmount(usdt)
    }

    const TotalNFT = async () => {
        try {
            const response = await Axios.post('/users/totalNFT', {}, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            if (response.data.success == true) {
                setTotalNFTAmount(response.data.result)
            }

        } catch (error) {
            console.log(error, 'err');
        }
    }

    const TotaluserNFT = async () => {
        try {
            const response = await Axios.post('/users/totalusernft', {}, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            if (response.data.success == true) {
                setTotalUserNFTAmount(response.data.result)
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    const TotalUserReward = async () => {
        try {
            const response = await Axios.post('/users/totaluserreward', {}, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            if (response.data.success == true) {
                setUserTotalReward(response.data.data[0].totalReward)
            }
        } catch (error) {
            console.log(error, 'err');
        }
    }

    const Unstake = async (id) => {
        try {
            const response = await Axios.post('/users/unstakeNFt', { id }, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })

            if (response.data.result) {
                toast.error(`You can Unstake after ${response.data.result} days`)
                GetNftStake()
            }
            else if (response.data.success == true) {
                toast.success('unstake successfully')
                GetNftStake()
            }
        } catch (error) {
            console.log('error in unstakenft', error);
        }
    }

    const Claim = async (id) => {
        try {
            const response = await Axios.post('/users/claimNFT', { id }, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            if (response.data.success) {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log('error in claimnft', error);
        }

    }

    const token = window.localStorage.getItem('token')

    useEffect(() => {
        if (token != null) {
            GetStakeDetails()
        }
        else {
            setGetStake([])
            setGetNFTstake([])
        }
    }, [token])

    useEffect(() => {
        TotalNFT()
        TotaluserNFT()
        TotalUserReward()
        getAllDatas()
    }, [])

    return (

        <>
            <ToastContainer />
            <div className="Stacking">
                <Box sx={{ display: 'flex' }} >
                    <CssBaseline />
                    <SideBar />
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, marginTop: '50px' } }}
                    >
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                                <div className='st-c1'>
                                    <div className='display'>
                                        <div className='coming-soon'>
                                            Coming soon
                                        </div>
                                        <div className='sei-liquid'>
                                            SEI Liquid
                                            <div >
                                                Staking
                                            </div>
                                        </div>

                                        <div className='content-sct-1'>
                                            Earn stable rewards by staking
                                            <div >
                                                your SEI tokens and AstroGuys NFTs.
                                            </div>
                                        </div>

                                        <div className='read'>
                                            Read documentation
                                            <ArrowRightAltIcon />
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={3.5}>
                                <div className='st-c2'>
                                    <div className=''>
                                        <div>
                                            <img src={stc2} alt='c2' />
                                        </div>
                                        <div className='st-c2-amount-text'>
                                            SEI total staked amount
                                        </div>
                                        <div className='st-c2-amount'>
                                            {totalAmount} USDT
                                        </div>
                                        <div className='st-c2-sub-amount'>
                                            0.90 SEI
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={3.5}>
                                <div className='st-c2'>
                                    <div className=''>
                                        <div>
                                            <img src={stc2} alt='c2' />
                                        </div>
                                        <div className='st-c2-amount-text'>
                                            SEI total NFT staked
                                        </div>
                                        <div className='st-c2-amount'>
                                            {totalNFTAmount}
                                        </div>
                                        <div className='st-c2-sub-amount'>
                                            0.90 SEI
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className='stack-pool'>
                                    Staking<span>POOLS</span>

                                </div>
                                <div className='generate-stable'>
                                    Generate stable returns by participating in our staking program, where you can stake both your SEI tokens and your AstroGuys NFTs.
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6} className='your-dei-grid'>
                                <div className='your-sei'>
                                    Stake your SEI
                                </div>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='your-dei-grid'>
                                        <div className='collection-card-main2'>
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs value={values} onChange={handleChangetab} aria-label="basic tabs example" className='stack-tab'>
                                                        <Tab label="Stake" {...a11yProps(0)} />
                                                        <Tab label="Unstake" {...a11yProps(1)} onClick={(event) => {
                                                            GetStakeDetails()
                                                        }} />

                                                    </Tabs>
                                                </Box>
                                                <CustomTabPanel value={values} index={0}>
                                                    <div className='stack-tab-main-div'>
                                                        <div className='stack-tab-card-whole-div'>
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            Available to stake
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            {seibal} SEI
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            SEI Price
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            ${datatusd === "" ? 0 : parseFloat(datatusd.c).toFixed(6)}
                                                                            {datatusd.P < 0 ? <span style={{ color: "red" }}>{datatusd === "" ? 0 : parseFloat(datatusd.P).toFixed(2)}% </span> :
                                                                                <span style={{ color: "green" }}>{datatusd === "" ? 0 : parseFloat(datatusd.P).toFixed(2)}% </span>}
                                                                            <span style={{ color: "white" }}>(1d)</span>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div>
                                                                            <div className='available'>
                                                                                NFT Holder APR
                                                                            </div>
                                                                            <div className='sei-count'>
                                                                                5%
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='available'>
                                                                                Non-NFT Holder APR
                                                                            </div>
                                                                            <div className='sei-count'>
                                                                                4%
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Grid>

                                                            </Grid>
                                                        </div>
                                                        <div className='earnings-main-div'>
                                                            <div className='stack-tab-earnings'>
                                                                Your earnings
                                                            </div>
                                                            <div>
                                                                {reward > 0 ? reward : 0}
                                                            </div>
                                                        </div>
                                                        <div className='yourstack'>
                                                            You stake
                                                        </div>
                                                        <div className='stake-input2'>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                // label="TextField"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <img src={sei} alt='sei' />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                type="Number"
                                                                inputRef={stakeinput}
                                                                onChange={calculaterewa}
                                                                placeholder="0.0"
                                                                variant="outlined"

                                                            />
                                                            <p className='connect-compas'>Connect your Compass wallet to see your SEI balance</p>
                                                        </div>
                                                        <div>
                                                            <Button className='stack-tab-btn'
                                                                onClick={stake}>
                                                                Stake
                                                            </Button>
                                                        </div>
                                                        <div className='stack-tab-footer-main'>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft1} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        {reward} SEI
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    You will receive
                                                                </div>
                                                            </div>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft2} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        1 SEI = $<span>{datatusd === "" ? 0 : parseFloat(datatusd.c).toFixed(6)}</span>  USDT
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Exchange rate
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='stack-tab-footer-main'>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft1} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        {anreward === "" ? 0 : parseFloat(anreward).toFixed(3)} SEI
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Annual interest
                                                                </div>
                                                            </div>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft3} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        10%
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Reward fee
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CustomTabPanel>
                                                <CustomTabPanel value={values} index={1}>
                                                    <div className='stack-tab-main-div'>
                                                        <div className='stack-tab-card-whole-div'>
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            SEI Price
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            ${datatusd === "" ? 0 : parseFloat(datatusd.c).toFixed(6)}
                                                                            {datatusd.P < 0 ? <span style={{ color: "red" }}>{datatusd === "" ? 0 : parseFloat(datatusd.P).toFixed(2)}% </span> :
                                                                                <span style={{ color: "green" }}>{datatusd === "" ? 0 : parseFloat(datatusd.P).toFixed(2)}% </span>}
                                                                            <span style={{ color: "white" }}>(1d)</span>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div>
                                                                            <div className='available'>
                                                                                NFT Holder APR
                                                                            </div>
                                                                            <div className='sei-count'>
                                                                                5%
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='available'>
                                                                                Non-NFT Holder APR
                                                                            </div>
                                                                            <div className='sei-count'>
                                                                                4%
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                <div className='stack-tacb-c2 stktable'>
                                                                    <TableContainer >
                                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>Address</TableCell>
                                                                                    <TableCell>Amount</TableCell>
                                                                                    <TableCell>Reward</TableCell>
                                                                                    <TableCell>Current day</TableCell>
                                                                                    <TableCell>End Date</TableCell>
                                                                                    <TableCell>Claim</TableCell>
                                                                                    <TableCell > Unstake</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {getStake.length == 0 ? (
                                                                                    <TableRow
                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                                        <TableCell >No Data</TableCell>
                                                                                    </TableRow>
                                                                                ) : (
                                                                                    <>
                                                                                        {
                                                                                            getStake.map((row, index) => (

                                                                                                <TableRow
                                                                                                    key={row.name}
                                                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                                >
                                                                                                    {/* <TableCell component="th" scope="row"> {row.name} </TableCell> */}
                                                                                                    <TableCell >{FormatAddress(row?.Address)}</TableCell>
                                                                                                    <TableCell >{row?.Amount}</TableCell>
                                                                                                    <TableCell >{row?.reward}</TableCell>
                                                                                                    <TableCell >{row?.diffDays}</TableCell>
                                                                                                    <TableCell >{FormatDate(row.Lastdate)}</TableCell>
                                                                                                    <TableCell>
                                                                                                        {row?.unstake === "true" ? <>{row?.balday} Days Left</> : <Button className='succes-btn' onClick={claimre} >
                                                                                                            Claim
                                                                                                        </Button>}
                                                                                                    </TableCell>
                                                                                                    <TableCell >
                                                                                                        {row?.unstake === "true" ? <>{row?.balday} Days Left</> : <Button className='succes-btn' onClick={() => unstakre(row.id)}>Unstake</Button>}
                                                                                                    </TableCell>

                                                                                                </TableRow>
                                                                                            ))
                                                                                        }
                                                                                    </>
                                                                                )}

                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>

                                                                </div>
                                                            </Grid>

                                                        </div>
                                        
                                                        <div className='yourstack'>
                                                            You stake
                                                        </div>
                                                        <div className='stake-input2'>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                // label="TextField"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <img src={sei} alt='sei' />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                placeholder="0.0"
                                                                variant="outlined"

                                                            />
                                                            <p className='connect-compas'>Connect your Compass wallet to see your SEI balance</p>
                                                        </div>
                                                        <div>
                                                            <Button className='stack-tab-btn'>
                                                                Stake
                                                            </Button>
                                                        </div>
                                                        <div className='stack-tab-footer-main'>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft1} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        0 astroSEI
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    You will receive
                                                                </div>
                                                            </div>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft2} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        1 SEI = 0.9905 astroSEI
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Exchange rate
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='stack-tab-footer-main'>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft1} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        0 SEI
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Annual interest
                                                                </div>
                                                            </div>
                                                            <div className='foot-inner-div'>
                                                                <div className='foot-tab-inner-cont'>
                                                                    <img src={ft3} alt='ft1' />
                                                                    <div className='stck-seq'>
                                                                        10%
                                                                    </div>
                                                                </div>
                                                                <div className='stack-status-foot'>
                                                                    Reward fee
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CustomTabPanel>

                                            </Box>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6} className='your-dei-grid'>
                                <div className='your-sei'>
                                    <span>Stake your</span> Astro Guys ✌️
                                </div>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='your-dei-grid'>
                                        <div className='collection-card-main'>
                                            <div className='you-collect-whole-div'>
                                                <div className='your-collection'>
                                                    Your collectibles
                                                    <div className='total-collect'>
                                                        Total: {totalUserNFTAmount} Astro Guys
                                                    </div>
                                                </div>
                                       
                                            </div>
                                            <Grid container spacing={2} sx={{ marginTop: '20px' }} className='card-cont-yc'>

                                                {imagearray.length == 0 ? (<p className='data-no'>No NFT Found</p>) : (
                                                    <>
                                                        {imagearray.map((obj, ind) => {
                                                            return (
                                                                <Grid item xs={6} sm={6} md={6} lg={3} xl={3} className='your-dei-grid'>
                                                                    <Card sx={{ maxWidth: 150, margin: 'auto' }} className='card-main'>
                                                                        <CardMedia
                                                                            sx={{ height: 140 }}
                                                                            image={obj.imageUrl}
                                                                            title="green iguana"
                                                                        />
                                                                        <CardContent>
                                                                            <div className='card-txt-yc'>
                                                                                {obj.name}
                                                                            </div>
                                                                            {/* <div className='yc-num'>
                                                                        # {ind + 1}
                                                                    </div> */}
                                                                        </CardContent>
                                                                        <CardActions className='card-action'>
                                                                            <Button size="small" onClick={() => {
                                                                                SendNFT(obj.name)
                                                                            }}>stake</Button>
                                                                        </CardActions>
                                                                    </Card>
                                                                </Grid>
                                                            )
                                                        })}
                                                    </>
                                                )}

                                            </Grid>

                                        </div>
                                    </Grid>


                                </Grid>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='your-dei-grid'>
                                        <div className='collection-card-main'>

                                            <div>
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                        <div className='total-stacked-main'>
                                                            <div className='totao-stacked'>
                                                                Total staked
                                                            </div>
                                                            <div className='stacked-astro'>
                                                                {totalUserNFTAmount} Astro Guys
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                        <div className='total-stacked-main2 display'>
                                                            <div className='stack-duration'>
                                                                Staking duration
                                                            </div>
                                                            <div className='stack-days'>
                                                                21 days 💫
                                                            </div>
                                                        </div>
                                                        <div className='input-claim'>
                                                            <div className='stake-input'>
                                                                <input type='text' placeholder={userTotalReward} />
                                                            </div>
                                                            <div className='claim-your'>
                                                                {/* <Button> */}
                                                                <label>Claim Your $GUYS</label>

                                                                {/* </Button> */}
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className='you-collect-whole-div'>
                                                <div className='your-collection'>
                                                    Your staked collectibles
                                                    <div className='total-collect'>
                                                        You can unstake them after 21 days.
                                                    </div>
                                                </div>
                                              
                                            </div>

                                            <div className='stack-tacb-c2 stktable'>
                                                <TableContainer >
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Address</TableCell>
                                                                <TableCell>Reward</TableCell>
                                                                <TableCell>Current day</TableCell>
                                                                <TableCell>End Date</TableCell>
                                                                <TableCell > Unstake </TableCell>
                                                                <TableCell>Claim</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {getNFTstake.length == 0 ? (
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell >No Data</TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <>
                                                                    {getNFTstake.map((row) => (
                                                                        <TableRow
                                                                            key={row.name}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell >{FormatAddress(row.userId.address)}</TableCell>
                                                                            <TableCell >{row.reward}</TableCell>
                                                                            <TableCell >{row.currentday}</TableCell>
                                                                            <TableCell >{convert(row.lastday)}</TableCell>
                                                                            {/* <TableCell >16.03.2024</TableCell> */}
                                                                            <TableCell >
                                                                                {row.unstake == 0 ? (
                                                                                    <Button onClick={() => {
                                                                                        Unstake(row._id)
                                                                                    }}>
                                                                                        Unstake
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Button>
                                                                                        Pending
                                                                                    </Button>
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    row.currentday == 0 || row.reward == 0 ? (
                                                                                        <label>
                                                                                            Unable to Claim
                                                                                        </label>
                                                                                    ) : (
                                                                                        <Button className='succes-btn' onClick={() => {
                                                                                            Claim(row._id)
                                                                                        }} >
                                                                                            Claim
                                                                                        </Button>
                                                                                    )
                                                                                }

                                                                            </TableCell>

                                                                        </TableRow>
                                                                    ))}

                                                                </>
                                                            )}
                                                           
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                            </div>

                                        
                                        </div>

                                    </Grid>


                                </Grid>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='your-dei-grid'>
                                        <div className='collection-card-main'>

                                            <div className='buy-pallet-main-div'>
                                                <div className='became-astro'>
                                                    Become an Astro Guys holder
                                                    <div className='start-earning'>
                                                        And start earning $GUYS.
                                                    </div>
                                                </div>
                                                <div className='buy-pallet-btn'>
                                                    <Button>
                                                        Buy on Pallet
                                                        <div className='sub-btn-pallet'>
                                                            FP: 100 SEI
                                                        </div>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={bc} alt='bp1' className='stack-img-buy-pallet' />
                                            </div>

                                        </div>

                                    </Grid>


                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                <div className='qa'>
                                    Q&A
                                </div>
                                <div className='auestion-abt'>
                                    Questions about SEI Staking? We've got you covered.
                                </div>
                                <div className='accord-div'>
                                    {accord.map((obj, ind) => {
                                        return (
                                            <Accordion expanded={expanded === obj.panel} onChange={handleChange(obj.panel)} className='accord-stack'>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <div>
                                                        {obj.title}
                                                    </div>

                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div>
                                                        {obj.cont}
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })}


                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className='cpy-name'>
                                    @ 2024, Astro Hub
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <Stack direction="row" spacing={3} className='follow-astro'>
                                    <div>Twitter</div>
                                    <div>Discord</div>
                                    <div>Subber</div>
                                    <div>Atlas</div>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </div >
        </>);
}

export default Stacking;