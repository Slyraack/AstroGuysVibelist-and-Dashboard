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
import Loader from '../../Img/loader.gif'
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
import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import load from "../../Img/loader2.gif"
import Modal from '@mui/material/Modal';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import leap from "../../Img/leap.png"
import compass from "../../Img/compass.png"
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LineStyle } from '@mui/icons-material';
import { Link } from "react-router-dom";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    '@media(max-width:575px)': {
        width: '90%'
    },
    bgcolor: '#0a193a',
    border: '2px solid #0a193a',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
};


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

    const [open, setOpen] = React.useState(false);
    const [getvalidators, setGetvalidators] = useState([])
    const [adminFee, setAdminFee] = useState()
    const [adminAddr, setAdminAddr] = useState()
    const [defaultValue, setDefaultValue] = useState('Select Any Validator');

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

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
    const [totse, setTotse] = useState("")
    const [validatorAddress, setValidatorAddress] = useState()
    const [stakeValidatorAddress, setStakeValidatorAddress] = useState()

    const token = window.localStorage.getItem('token')
    // console.log(token, 'tokenn');

    const handleChangetab = (event, newValue) => {
        setValues(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSelectChange = (e) => {
        // console.log(e.target.value, 'event value');
        // console.log(getvalidators, 'getvalidators');
        const selectedMoniker = e.target.value
        setDefaultValue(e.target.value)
        const selectedValidator = getvalidators.find(validator => validator.moniker === selectedMoniker);

        if (selectedValidator) {
            console.log(selectedValidator.operatorAddress);
            setValidatorAddress(selectedValidator.operatorAddress)
        }
    }
    // console.log(validatorAddress, 'validatorAddress');

    const handlePallet = async () => {
        window.open('https://pallet.exchange/collection/astro-guys');
    }

    const [open2, setOpen2] = React.useState(false);
    const [stakeAmount, setStakeAmount] = useState()
    const [userId, setUserId] = useState()

    const handleOpen2 = (amount, id, validatoraddress) => {
        console.log(amount, 'amount', id, 'id');
        setUserId(id)
        setStakeAmount(amount)
        setStakeValidatorAddress(validatoraddress)
        setOpen2(true);
    }
    const handleClose2 = () => setOpen2(false);

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

    const getAdminAddr = async () => {
        try {
            const response = await Axios.post('/users/adminaddr')
            if (response.data.success == true) {
                setAdminAddr(response.data.result.walletaddr)
            }
        } catch (error) {
            console.log(error, 'err in get admin addr');
        }
    }

    // console.log(adminAddr, 'adminaddr');

    const SendNFT = async (tokenid) => {
        const compassAddr = window.localStorage.getItem("address")
        const leapAddr = window.localStorage.getItem("leapaddress")

        const Imgobj = tokenid
        const token = Imgobj.split(" ")
        const tokenId = token[2].replace("#", "")


        try {
            if (compassAddr) {
                setOpen(true)
                // const addr = localStorage.getItem("address")
                const contractAddress =
                    'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g';
                const msg = {
                    "transfer_nft": {
                        // "recipient": "sei14tsl7y7n2fjrw3x4wdezff5cjtjyt9uj20nekw",
                        "recipient": adminAddr,
                        "token_id": Number(tokenId).toString()
                    }
                };

                const funds = [{
                    "denom": "usei",
                    "amount": "5000"
                }];

                // const execute = async () => {
                const rpcEndpoint = "https://sei-rpc.brocha.in";

                const offlineSigner = window.compass.getOfflineSigner("pacific-1");

                const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, offlineSigner)

                const accounts = await offlineSigner.getAccounts();


                const senderAddress = accounts[0].address;

                // const senderAddress = "sei1tzm0eee98d5eyh2zpvvwnse88t9lr8l6h4end7";
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                    gas: "200000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
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
                            setOpen(false)
                            toast.success('NFT Stake Successfully Completed')
                            await getImage()
                            await GetNftStake()
                        }
                    }
                    catch (error) {
                        setOpen(false)
                        toast.error(error)
                        console.log(error, 'err');
                    }
                }

                // };
                // execute();
            }
            else if (leapAddr) {
                setOpen(true)
                const contractAddress =
                    'sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g';
                const msg = {
                    "transfer_nft": {
                        // "recipient": "sei14tsl7y7n2fjrw3x4wdezff5cjtjyt9uj20nekw",
                        "recipient": adminAddr,
                        "token_id": Number(tokenId).toString()
                    }
                };

                const funds = [{
                    "denom": "usei",
                    "amount": "5000"
                }];

                // const execute = async () => {
                const rpcEndpoint = "https://sei-rpc.brocha.in";

                const offlineSigner = window.leap.getOfflineSigner("pacific-1");

                const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, offlineSigner)


                const accounts = await offlineSigner.getAccounts();


                const senderAddress = accounts[0].address;

                // const senderAddress = "sei1tzm0eee98d5eyh2zpvvwnse88t9lr8l6h4end7";
                const fee = {
                    amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                    gas: "200000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
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
                            setOpen(false)
                            toast.success('NFT Stake Successfully Completed')
                            await getImage()
                            await GetNftStake()
                        }
                    }
                    catch (error) {
                        setOpen(false)
                        toast.error(error)
                        console.log(error, 'err');
                    }
                }

                // };
                // execute();
            }
            else {
                setOpen(false)
                console.log('connect your wallet');
            }
        } catch (error) {
            setOpen(false)
            // toast.error(error)
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

        if ((seibal === "" || window.localStorage.getItem("address") != null)) {
            getbalance()
        }
        else if (seibal === "" || window.localStorage.getItem("leapaddress") != null) {
            getbalance()
        }
    }, [token])




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
                // console.log(client, 'client');
                const rewards1 = await client.queryClient.staking.delegation(leapAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
                // console.log(rewards1, 'rewards1');
                // console.log(rewards1.delegationResponse.delegation.shares, 'sharess');
                let sha = (Number(rewards1.delegationResponse.delegation.shares) / (10 ** 18))
                let amount = (Number(sha) / (10 ** 6))
                // console.log(amount, 'amount');
                // console.log(shareAmount, 'share amount');
                // console.log(sha, 'sha');
                setShare(amount)

                const rewards = await client.queryClient.staking.delegatorValidator(leapAddr, "seivaloper1t9fq3qfm7ngau5gr8qgf5dpfzjqg79kf65cu04");
                // console.log(rewards, 'rewards');
                let newbal = (parseFloat(Number(rewards.validator.tokens) / (10 ** 18)).toFixed(4))

                // RewardValue = newbal
                setRew(newbal)
                return newbal


            }
        } catch (error) {
            console.log(error, "error123");
        }
    }



    const claimre = async (validatoraddress) => {
        console.log('claimre validator address', validatorAddress);
        try {
            const compassAddr = window.localStorage.getItem("address")
            const leapAddr = window.localStorage.getItem("leapaddress")
            if (compassAddr) {
                setOpen(true)
                await window.compass.enable("pacific-1");
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = compassAddr
                let validatorAddress = validatoraddress
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
                    gas: "200000", // Specify gas limit, adjust as needed
                };


                // Broadcast the transaction
                // const rewardsResponse = await client.distribution.delegationTotalRewards(delegatorAddress);
                const result = await client.signAndBroadcast(delegatorAddress, [msgClaimRewards], fee, "Claim rewards from Imperator.co");
                if (result.code === 0) {
                    setOpen(false)
                    toast.success("Reward Claimed successfully")
                } else {
                    setOpen(false)
                    toast.error("something Went Wrong")
                }
            }
            else {
                setOpen(true)
                await window.leap.enable("pacific-1");
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = leapAddr
                let validatorAddress = validatoraddress

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
                    gas: "200000", // Specify gas limit, adjust as needed
                };


                const result = await client.signAndBroadcast(delegatorAddress, [msgClaimRewards], fee, "Claim rewards from Imperator.co");
                // Check if the transaction was successful
                //   assertIsBroadcastTxSuccess(result);


                if (result.code === 0) {
                    setOpen(false)
                    toast.success("Reward Claimed successfully")
                } else {
                    setOpen(false)
                    toast.error("something Went Wrong")
                }
            }

        } catch (error) {
            setOpen(false)
            console.log(error, "**error**");
        }
    }

    const unstakre = async (stakeAmount, userId) => {
        // console.log(da, 'da');
        try {
            const compassAddr = window.localStorage.getItem("address")
            const leapAddr = window.localStorage.getItem("leapaddress")
            if (compassAddr) {
                setOpen(true)
                await window.compass.enable("pacific-1");
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");

                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                let delegatorAddress = compassAddr
                let validatorAddress = stakeValidatorAddress
                // Construct the message to undelegate from the specific validator
                // let sha = (share * (10 ** 6))
                // console.log(share, 'share');
                let shares = (share * (10 ** 6))

                console.log(shares, 'shares');
                if (stakeAmount > shares) {
                    toast.error("Invalid stake amount")
                    setOpen(false)
                }
                else {
                    let amo = stakeAmount * (10 ** 6)
                    console.log(amo, 'amount');
                    const amount = coin(amo, "usei");// Undelegate 1 SEI (adjust amount as needed)
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
                    console.log(result, 'result');
                    // // Check if the transaction was successful
                    // //   assertIsBroadcastTxSuccess(result);


                    if (result.code === 0) {
                        await GetStakeDetails()
                        const response = await Axios.post('/users/WithdrawRequest', { id: userId }, {
                            headers: { Authorization: window.localStorage.getItem("token") }
                        })
                        if (response.data.success == true) {
                            setOpen(false)
                            toast.success("Unstaked successfully")
                            await GetStakeDetails()
                        }
                    } else if (result.code === 19) {
                        setOpen(false)
                        toast.error("No Stake available")
                    } else {
                        setOpen(false)
                        toast.error("Something Went Wrong")
                    }
                }
            }
            else {
                setOpen(true)
                await window.leap.enable("pacific-1");
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                const client = await SigningStargateClient.connectWithSigner("https://sei-rpc.brocha.in", offlineSigner);
                // console.log(client, 'client');
                let delegatorAddress = leapAddr
                let validatorAddress = stakeValidatorAddress
                // Construct the message to undelegate from the specific validator

                console.log(share, 'share');
                if (stakeAmount > share) {
                    toast.error("Invalid stake amount")
                    setOpen(false)
                }
                else {
                    let amo = stakeAmount * (10 ** 6)
                    // let amo = parseFloat(am).toFixed(0)
                    const amount = coin(amo, "usei");// Undelegate 1 SEI (adjust amount as needed)

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
                    console.log(result, 'result');
                    // // Check if the transaction was successful
                    // //   assertIsBroadcastTxSuccess(result); 

                    if (result.code === 0) {
                        await GetStakeDetails()
                        const response = await Axios.post('/users/WithdrawRequest', { id: userId }, {
                            headers: { Authorization: window.localStorage.getItem("token") }
                        })
                        if (response.data.success == true) {
                            setOpen(false)
                            toast.success("Unstaked successfully")
                            await GetStakeDetails()
                        }
                    } else if (result.code === 19) {
                        setOpen(false)
                        toast.error("No Stake available")
                    } else {
                        setOpen(false)
                        toast.error("Something Went Wrong")
                    }
                }
            }
        } catch (error) {
            setOpen(false)
            toast.error("Transaction Reverted")
            console.log(error, 'unstake error');
        }
    }




    useEffect(() => {
        getreward()
    }, [])

    const getAdminFee = async () => {
        try {
            const response = await Axios.post('/users/getadminfee')
            // console.log(response, 'getadminfee');
            if (response.data.success) {
                setAdminFee(response.data.result.adminfee)
                getAdminAddr()
            }
        } catch (error) {
            console.log(error, 'err in get admin fee');
        }
    }
    // console.log(adminFee, 'adminfee');



    const stake = async () => {
       try {
        if (window.localStorage.getItem("address") === null && window.localStorage.getItem("leapaddress") === null) {
            toast.error("Connect Your Wallet")
        }
        else if (stakeinput.current.value > seibal) {
            toast.error("Insufficient Fund In you Wallet")
        }else if(stakeinput.current.value  === ""){
            toast.error("Please Enter the Stake Amount")
        }
        else if(defaultValue === "Select Any Validator"){
              toast.error("Please Select Validator")
        }
        else {
            const addres = window.localStorage.getItem("address")
            const Leapaddr = window.localStorage.getItem("leapaddress")
            if (addres) {
                setOpen(true)
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");

                const client = await SigningStargateClient.connectWithSigner(
                    "https://sei-rpc.brocha.in", // Replace with actual RPC endpoint
                    offlineSigner
                );
                const senderAddress = addres;


                try {
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "200000", // Example gas limit, adjust based on the network sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd
                    };
                    // const amountInUtokens = { // Make sure to convert the amount to the smallest unit, e.g., usei for SEI tokens.
                    //     denom: 'usei', // Adjust the denomination for SEI tokens
                    //     amount: String(stakeinput.current.value * (10 ** 6)), // Convert amount to string
                    // };

                    // console.log(amountInUtokens, 'amountInUtokens');


                    // console.log(typeof stakeinput.current.value, 'stakeinput.current.value ');
                    const Adminfee = Number(stakeinput.current.value) / 100
                    // console.log(Adminfee, 'perrr');
                    const adminFeePer = Number(Adminfee) * Number(adminFee)
                    // const adminFeePer = Adminfee * adminFee
                    // console.log(adminFeePer, 'adminFeePer');

                    const amountinPer = {
                        amount: String(adminFeePer * (10 ** 6)),
                    };

                    // console.log(amountinPer, 'amountinPer');

                    const amount = Number(stakeinput.current.value) - adminFeePer
                    // console.log(amount, 'delegator amount');

                    const delegatorAmount = { // Make sure to convert the amount to the smallest unit, e.g., usei for SEI tokens.
                        denom: 'usei', // Adjust the denomination for SEI tokens
                        amount: String(amount * (10 ** 6)), // Convert amount to string
                    };
                    // console.log(delegatorAmount, 'delegatorAmount');

                    const sendResponse = await client.sendTokens(senderAddress, adminAddr, [amountinPer], fee);
                    if (sendResponse.transactionHash) {
                        const result = await client.delegateTokens(senderAddress, validatorAddress, delegatorAmount, fee);
                        console.log(result, 'result');
                        const ba = await getreward()
                        const Transactionhash = result.transactionHash
                        if (Transactionhash) {
                            const response = await Axios.post('/users/stake',
                                {
                                    amount: stakeinput.current.value,
                                    reward: ba,
                                    transactionhash: Transactionhash,
                                    adminfee: adminFeePer,
                                    validatoraddress: validatorAddress
                                },
                                { headers: { Authorization: window.localStorage.getItem('token') } })
                            if (response.data.success == true) {
                                setOpen(false)
                                stakeinput.current.value = 0
                                toast.success("Stacked Successfully")
                            }
                        }
                    }
                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    setOpen(false)
                    toast.error("Transaction Reverted")
                }
            }
            else if (Leapaddr) {
                setOpen(true)
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
                    // const amountInUtokens = { // Make sure to convert the amount to the smallest unit, e.g., usei for SEI tokens.
                    //     denom: 'usei', // Adjust the denomination for SEI tokens
                    //     amount: String(stakeinput.current.value * (10 ** 6)), // Convert amount to string
                    // };

                    // console.log(typeof stakeinput.current.value, 'stakeinput.current.value ');
                    const Adminfee = Number(stakeinput.current.value) / 100
                    // console.log(typeof Adminfee, 'perrr');
                    const adminFeePer = Number(Adminfee) * Number(adminFee)
                    // console.log(adminFeePer, 'adminFeePer');

                    const amountinPer = {
                        denom: 'usei',
                        amount: String(adminFeePer * (10 ** 6)),
                    };

                    // console.log(amountinPer, 'amountinPer');

                    const amount = Number(stakeinput.current.value) - adminFeePer
                    // console.log(amount, 'delegator amount');

                    const delegatorAmount = {
                        denom: 'usei',
                        amount: String(amount * (10 ** 6)),
                    };
                    // console.log(delegatorAmount, 'delegatorAmount');

                    // const sendResponse = await client.sendTokens(senderAddress, adminAddr, [amountinPer], fee);
                    // console.log(sendResponse, 'sendtokens');

                    // if (sendResponse.transactionHash) {
                    const result = await client.delegateTokens(senderAddress, validatorAddress, delegatorAmount, fee);
                    const ba = await getreward()
                    const Transactionhash = result.transactionHash
                    if (Transactionhash) {
                        const response = await Axios.post('/users/stake',
                            {
                                amount: stakeinput.current.value,
                                reward: ba,
                                transactionhash: Transactionhash,
                                adminfee: adminFeePer,
                                validatoraddress: validatorAddress
                            },
                            { headers: { Authorization: window.localStorage.getItem('token') } })
                        if (response.data.success == true) {
                            setOpen(false)
                            stakeinput.current.value = 0
                            toast.success("Stacked Successfully")
                        }
                    }
                    // }


                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    setOpen(false)
                    toast.error("Transaction Reverted")
                }
            }
        };
       } catch (error) {
         console.log(error,"error");
       }

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

                const imageArray = []
                for (let i = 0; i < queryResponse.tokens.length; i++) {

                    const tokenid = queryResponse.tokens[i]

                    if (token != undefined) {
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

                }
                setImageArray(imageArray)

            } catch (error) {
                console.log(error, 'getimage err');
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

                const imageArray = []
                for (let i = 0; i < queryResponse.tokens.length; i++) {

                    const tokenid = queryResponse.tokens[i]

                    const token = tokenid[i]
                    if (token != undefined) {
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

                }
                setImageArray(imageArray)

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
        // const seiUSDT = 0.90
        // console.log(amount,"usdt");
        const usdt = datatusd.c * amount
        setTotse(amount)
        setTotalAmount(parseFloat(usdt).toFixed(2))
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
                setUserTotalReward((response.data.data[0].totalReward).toFixed(2))
            }
        } catch (error) {
            console.log(error, 'err');
        }
    }

    const Unstake = async (id) => {
        try {
            setOpen(true)
            const response = await Axios.post('/users/unstakeNFt', { id }, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })

            if (response.data.result) {
                setOpen(false)
                toast.error(`You can Unstake after ${response.data.result} days`)
                await GetNftStake()
            }
            else if (response.data.success == true) {
                setOpen(false)
                toast.success('unstake successfully')
                await GetNftStake()
            }
        } catch (error) {
            setOpen(false)
            console.log('error in unstakenft', error);
        }
    }

    const Claim = async (id) => {
        try {
            setOpen(true)
            const response = await Axios.post('/users/claimNFT', { id }, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            if (response.data.success) {
                setOpen(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            setOpen(false)
            console.log('error in claimnft', error);
        }

    }

    const getValidators = async () => {
        try {
            const response = await Axios.post('/users/getValidators')
            // console.log(response, 'getvalidators');
            const valiArray = []

            for (let i = 0; i < response.data.result.length; i++) {
                const address = response.data.result[i].validatoraddress
                const client = await SigningStargateClient.connect("https://sei-rpc.brocha.in");
                const validators = await client.queryClient.staking.validator(address)
                console.log(validators, 'validatorssss');

                valiArray.push({
                    moniker: validators.validator.description.moniker,
                    operatorAddress: validators.validator.operatorAddress
                })
            }
            setGetvalidators(valiArray)
            // if (response.data.success == true) {
            //     setGetvalidators(response.data.result)

            // }
        } catch (error) {
            console.log('error in get validators', error);
        }
    }
    // console.log(getvalidators, 'getvalidators');


    useEffect(() => {
        if (token != null) {
            GetStakeDetails()
            getValidators()
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
        getAdminFee()
    }, [])

    useEffect(() => {
        getAllDatas()
    }, [datatusd])



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
                                            {totse} SEI
                                        </div>
                                        <div className='st-c2-sub-amount'>
                                            {totalAmount == "NaN" ? 0 : totalAmount} USDT Value
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
                                            {/* {totse} SEI */}
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
                                                            <p className='connect-compas'>Connect your Compass wallet to see your SEI balance <span>Admin Fee: {adminFee}%</span></p>
                                                        </div>
                                                        <div className='stake-input2'>
                                                            <FormControl sx={{ m: 1 }} className='stake-input2'>
                                                                <Select
                                                                    value={defaultValue}
                                                                    onChange={handleSelectChange}
                                                                    displayEmpty
                                                                    className='stake-input2'
                                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                                >
                                                                    <MenuItem value="Select Any Validator">Select Validator</MenuItem>
                                                                    {getvalidators.map((data, index) => (
                                                                        <MenuItem key={index} value={data.moniker}>
                                                                            {data.moniker.toUpperCase()}
                                                                        </MenuItem>
                                                                    ))}
                                                                    {/* <MenuItem value="">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    <MenuItem key={data._id} value={data.validatorAddress}>{data.validatorAddress}</MenuItem> */}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            {open ? (
                                                                <>
                                                                    <Button className='stack-tab-btn' > Stake</Button>

                                                                    <Backdrop
                                                                        sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                        open={open}
                                                                        onClick={handleClose}
                                                                    >
                                                                        <img src={load} />
                                                                    </Backdrop>
                                                                </>


                                                            ) : (
                                                                <Button className='stack-tab-btn'
                                                                    onClick={() => {
                                                                        getAdminFee()
                                                                        stake()
                                                                    }}>
                                                                    Stake
                                                                </Button>
                                                            )}
                                                        </div>
                                                        {/* <div className='stack-tab-footer-main'>
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
                                                        </div> */}
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
                                                                                                        {row?.unstake === "true" ? <>{row?.balday} Days Left</> :
                                                                                                            <>
                                                                                                                {
                                                                                                                    open ? (
                                                                                                                        <>
                                                                                                                            <Button className='succes-btn' > Claim </Button>

                                                                                                                            <Backdrop
                                                                                                                                sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                                                                open={open}
                                                                                                                                onClick={handleClose}
                                                                                                                            >
                                                                                                                                <img src={load} />
                                                                                                                            </Backdrop>
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        <Button className='succes-btn' onClick={() => { claimre(row.validatoraddress) }} >
                                                                                                                            Claim
                                                                                                                        </Button>
                                                                                                                    )
                                                                                                                }
                                                                                                            </>
                                                                                                        }
                                                                                                    </TableCell>
                                                                                                    <TableCell >
                                                                                                        {row?.unstake === "true" ? <>{row?.balday} Days Left</> :
                                                                                                            <>
                                                                                                                {
                                                                                                                    open ? (
                                                                                                                        <>
                                                                                                                            <Button className='succes-btn' > Unstake </Button>

                                                                                                                            <Backdrop
                                                                                                                                sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                                                                open={open}
                                                                                                                                onClick={handleClose}
                                                                                                                            >
                                                                                                                                <img src={load} />
                                                                                                                            </Backdrop>
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        // <Button className='succes-btn' onClick={() => unstakre(row.id)}>Unstake</Button>
                                                                                                                        <Button className='succes-btn' onClick={() => {
                                                                                                                            handleOpen2(row?.Amount, row.id, row.validatoraddress)
                                                                                                                        }
                                                                                                                        }>Unstake</Button>

                                                                                                                    )
                                                                                                                }
                                                                                                            </>
                                                                                                        }

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

                                                        {/* <div className='yourstack'>
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
                                                        </div> */}
                                                        {/* <div className='stack-tab-footer-main'>
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
                                                        </div> */}
                                                        {/* <div className='stack-tab-footer-main'>
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
                                                        </div> */}
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
                                                        Total: {imagearray.length} Astro Guys
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
                                                                        <CardContent style={{ padding: '16px 0px 16px' }}>
                                                                            <div className='card-txt-yc'>
                                                                                {obj.name}
                                                                            </div>
                                                                            {/* <div className='yc-num'>
                                                                        # {ind + 1}
                                                                    </div> */}
                                                                        </CardContent>
                                                                        <CardActions className='card-action'>
                                                                            {
                                                                                open ? (
                                                                                    <>
                                                                                        <Button size="small" > stake </Button>

                                                                                        <Backdrop
                                                                                            sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                            open={open}
                                                                                            onClick={handleClose}
                                                                                        >
                                                                                            <img src={load} />
                                                                                        </Backdrop>
                                                                                    </>
                                                                                ) : (
                                                                                    <Button size="small" onClick={() => {
                                                                                        getAdminAddr()
                                                                                        SendNFT(obj.name)
                                                                                    }}>stake</Button>
                                                                                )
                                                                            }

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
                                                                            <TableCell >{(row.reward).toFixed(2)}</TableCell>
                                                                            <TableCell >{row.currentday}</TableCell>
                                                                            <TableCell >{convert(row.lastday)}</TableCell>
                                                                            {/* <TableCell >16.03.2024</TableCell> */}
                                                                            <TableCell >
                                                                                {row.unstake == 0 ? (
                                                                                    <>
                                                                                        {
                                                                                            open ? (
                                                                                                <>
                                                                                                    <Button > Unstake </Button>

                                                                                                    <Backdrop
                                                                                                        sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                                        open={open}
                                                                                                        onClick={handleClose}
                                                                                                    >
                                                                                                        <img src={load} />
                                                                                                    </Backdrop>
                                                                                                </>
                                                                                            ) : (
                                                                                                <Button onClick={() => {
                                                                                                    Unstake(row._id)
                                                                                                }}>
                                                                                                    Unstake
                                                                                                </Button>
                                                                                            )

                                                                                        }
                                                                                    </>

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
                                                                                        <>
                                                                                            {
                                                                                                open ? (
                                                                                                    <>
                                                                                                        <Button > Unstake </Button>

                                                                                                        <Backdrop
                                                                                                            sx={{ color: '#fff', backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                                            open={open}
                                                                                                            onClick={handleClose}
                                                                                                        >
                                                                                                            <img src={load} />
                                                                                                        </Backdrop>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <Button className='succes-btn' onClick={() => {
                                                                                                        Claim(row._id)
                                                                                                    }} >
                                                                                                        Claim
                                                                                                    </Button>
                                                                                                )
                                                                                            }
                                                                                        </>

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
                                                    <Button onClick={handlePallet}>
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
                        <Modal
                            open={open2}

                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className='pop-wallet-head'>
                                    Enter the Amount
                                </div>
                                <div className='pop-close'>
                                    <CancelOutlinedIcon onClick={handleClose2} />
                                </div>
                                <div className='form-controls'>
                                    <FormControl fullWidth sx={{ m: 1 }}>

                                        <Input
                                            id="standard-adornment-amount"
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            type='number'
                                            value={stakeAmount}
                                            onChange={(e) => { setStakeAmount(e.target.value) }}
                                            placeholder='0.0'
                                        />
                                    </FormControl>
                                </div>
                                <div className='stktable model'>
                                    <Button onClick={() => {
                                        handleClose2()
                                        unstakre(stakeAmount, userId)
                                    }}>
                                        Submit
                                    </Button>
                                </div>


                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </div >
        </>);
}

export default Stacking;