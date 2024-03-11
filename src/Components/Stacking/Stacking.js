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
import { StargateClient } from "@cosmjs/stargate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigningStargateClient } from '@cosmjs/stargate';
import Axios from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';


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
    const [stakeCreatedate, setStakeCreatedate] = useState()


    useEffect(() => {

    }, [btnload]); //

    const handleBtnbload = () => {

        // setWithdrawed(false)
        setTimeout(() => {
            setBtnload(true);
        }, 2000); // Delay of 2000 milliseconds (2 seconds)

    }



    // console.log(stakeinput.current.value, 'stakeinput');
    // useEffect(() => {
    //     console.log(typeof (window.localStorage.getItem("address")), window.localStorage.getItem("address"), "local");
    //     if (window.localStorage.getItem("address") === null) {
    //         setSeibal("")
    //     }
    //     else if (window.localStorage.getItem("leapaddress") === null) {
    //         setSeibal("")
    //     }
    // })

    const handleChangetab = (event, newValue) => {
        setValues(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

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
                console.log(balances, 'balance');
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

    console.log(seibal, 'seibal');
    console.log(window.localStorage.getItem("leapaddress"), 'leap addr');

    useEffect(() => {
        if ((seibal === "" && window.localStorage.getItem("address") != null)) {
            getbalance()
        }
        else if (seibal === "" && window.localStorage.getItem("leapaddress") != null) {
            getbalance()
        }
    })

    useEffect(() => {
        socket()
        return () => ws.close
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


    const stake = async () => {
        if (window.localStorage.getItem("address") === null && window.localStorage.getItem("leapaddress") === null) {
            toast.error("Connect Your Wallet")
        }
        // else if (window.localStorage.getItem("leapaddress") === null) {
        //     toast.error("Connect Your Wallet")
        // }
        else if (stakeinput.current.value > seibal) {
            toast.error("Insufficient Fund In you Wallet")
        } else if (stakeinput.current.value < 1) {
            toast.error("Minimum Stake Should be 1 SEI")
        }
        else {

            const addres = window.localStorage.getItem("address")
            const Leapaddr = window.localStorage.getItem("leapaddress")
            if (addres) {
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
                // const accounts = await offlineSigner.getAccounts();
                const client = await SigningStargateClient.connectWithSigner(
                    "https://sei-rpc.brocha.in", // Replace with actual RPC endpoint
                    offlineSigner
                );
                const senderAddress = addres;
                const sendAmount = {
                    denom: "usei", // Replace with the actual denom for SEI tokens
                    amount: String(parseInt(stakeinput.current.value) * 1e6), // Example conversion to microSEI (1 SEI = 1e6 microSEI)
                };

                try {
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "200000", // Example gas limit, adjust based on the network
                    };
                    const result = await client.sendTokens(senderAddress, "sei1e8mfjzkrvdqugn9z29qwxzzc4vwm0vwxhgencd", [sendAmount], fee);
                    console.log("Transaction result:", result);
                    toast.success("Stacked Successfully")
                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    toast.error("Transaction Reverted")
                }
            }
            else if (Leapaddr) {
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                // const accounts = await offlineSigner.getAccounts();
                const client = await SigningStargateClient.connectWithSigner(
                    "https://sei-rpc.brocha.in", // Replace with actual RPC endpoint
                    offlineSigner
                );
                const senderAddress = Leapaddr;
                const sendAmount = {
                    denom: "usei", // Replace with the actual denom for SEI tokens
                    amount: String(parseInt(stakeinput.current.value) * 1e6), // Example conversion to microSEI (1 SEI = 1e6 microSEI)
                };

                try {
                    const fee = {
                        amount: [{ denom: "usei", amount: "5000" }], // Example fee, adjust based on the network
                        gas: "200000", // Example gas limit, adjust based on the network
                    };
                    const result = await client.sendTokens(senderAddress, "sei14ynzhfepjfane88n2uutsztm2xtdst3pkdtzmy", [sendAmount], fee);
                    console.log("Transaction result:", result);
                    const Transactionhash = result.transactionHash
                    console.log(result.transactionHash, 'transactionHash');
                    // const Transactionhash = "17A494F0A58A8B003B01465F90AE4D2BE9CB2C3A357244A81639E39BB5004A62"
                    const response = await Axios.post('/users/stake', { amount: stakeinput.current.value, reward: reward, transactionhash: Transactionhash })
                    console.log(response, 'response');
                    if (response.data.success == true) {
                        toast.success("Stacked Successfully")
                    }
                } catch (error) {
                    console.error("Failed to send SEI tokens:", error);
                    toast.error("Transaction Reverted")
                }
            }
        };

    }

    const GetStakeDetails = async () => {
        const response = await Axios.post('/users/getstackdetails')
        console.log(response, 'GetStakeDetails');

        if (response.data.success == true) {
            setGetStake(response.data.result)
        }
        else {
            console.log('erron in getting stake details');
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

    console.log(getStake, 'getstake');

    const WithDrawRequest = async (id) => {
        console.log(id, 'id');
        const response = await Axios.post('/users/WithdrawRequest', { id })
        console.log(response, 'WithDrawRequest');
        // if (response.data.success == true) {
        //     setWithdrawed(false)
        // }
        // else {
        //     setWithdrawed(true)
        // }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        console.log(token, 'tokenn');
        if (token != null) {
            GetStakeDetails()
        }
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
                                            $3,052,000 <span>+14%</span>
                                        </div>
                                        <div className='st-c2-sub-amount'>
                                            5,240,382 SEI
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
                                            $3,052,000 <span>+14%</span>
                                        </div>
                                        <div className='st-c2-sub-amount'>
                                            5,240,382 SEI
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
                                                        <Tab label="Unstake" {...a11yProps(1)} />

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
                                                            {/* <div>
                                                                1,503,545 astroSEI
                                                            </div> */}
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
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            Available to stake
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            777 SEI
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            SEI Price
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            $0.65<span>+5% (1d)</span>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                                                                    <div className='stack-tacb-c1'>
                                                                        <div className='available'>
                                                                            Astro Hub APR
                                                                        </div>
                                                                        <div className='sei-count'>
                                                                            6%
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
                                                                                    {/* <TableCell>Create date of stake</TableCell> */}
                                                                                    <TableCell>End Date</TableCell>
                                                                                    <TableCell >
                                                                                        Withdraw
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {getStake.map((row) => (
                                                                                    <TableRow
                                                                                        key={row.name}
                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                    >
                                                                                        {/* <TableCell component="th" scope="row">
                                                                                            {row.name}
                                                                                        </TableCell> */}
                                                                                        <TableCell >{FormatAddress(row.Address)}</TableCell>
                                                                                        <TableCell >{row.Amount}</TableCell>
                                                                                        <TableCell >{row.reward}</TableCell>
                                                                                        <TableCell >{row.diffDays}</TableCell>
                                                                                        {/* <TableCell >{FormatDate(row.CreateDate)}</TableCell> */}
                                                                                        <TableCell >{FormatDate(row.Lastdate)}</TableCell>
                                                                                        {/* <TableCell >{row.user}</TableCell> */}
                                                                                        <TableCell>
                                                                                            {row.withdrawstatus == 0 ? <Button onClick={(event) => {
                                                                                                handleBtnbload();
                                                                                                WithDrawRequest(row.id);
                                                                                            }}> Withdraw
                                                                                            </Button> :
                                                                                                <Button className='succes-btn' >
                                                                                                    Request Raised
                                                                                                </Button>

                                                                                            }

                                                                                        </TableCell>

                                                                                    </TableRow>
                                                                                ))}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>

                                                                </div>
                                                            </Grid>

                                                        </div>
                                                        <div className='earnings-main-div'>
                                                            <div className='stack-tab-earnings'>
                                                                Your earnings
                                                            </div>
                                                            <div>
                                                                1,503,545 astroSEI
                                                            </div>
                                                            <div>
                                                                1,023 SEI
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
                                                        Total: 12 Astro Guys
                                                    </div>
                                                </div>
                                                <div className='stake-all'>
                                                    stake all
                                                </div>
                                            </div>
                                            <Grid container spacing={2} sx={{ marginTop: '20px' }} className='card-cont-yc'>
                                                {ycollection.map((obj, ind) => {
                                                    return (
                                                        <Grid item xs={6} sm={6} md={6} lg={3} xl={3} className='your-dei-grid'>
                                                            <Card sx={{ maxWidth: 150, margin: 'auto' }} className='card-main'>
                                                                <CardMedia
                                                                    sx={{ height: 140 }}
                                                                    image={obj.img}
                                                                    title="green iguana"
                                                                />
                                                                <CardContent>
                                                                    <div className='card-txt-yc'>
                                                                        {obj.name}
                                                                    </div>
                                                                    <div className='yc-num'>
                                                                        # {ind + 1}
                                                                    </div>
                                                                </CardContent>
                                                                <CardActions className='card-action'>
                                                                    <Button size="small">stake</Button>
                                                                </CardActions>
                                                            </Card>
                                                        </Grid>
                                                    )
                                                })}
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
                                                                6 Astro Guys
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                        <div className='total-stacked-main2 display'>
                                                            <div className='stack-duration'>
                                                                Staking duration
                                                            </div>
                                                            <div className='stack-days'>
                                                                56 days 💫
                                                            </div>
                                                        </div>
                                                        <div className='input-claim'>
                                                            <div className='stake-input'>
                                                                <input type='text' placeholder='1,100,100$GUYS' />
                                                            </div>
                                                            <div className='claim-your'>
                                                                <Button>
                                                                    Claim Your $GUYS
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className='you-collect-whole-div'>
                                                <div className='your-collection'>
                                                    Your staked collectibles
                                                    <div className='total-collect'>
                                                        You can unstake them at any time.
                                                    </div>
                                                </div>
                                                <div className='stake-all'>
                                                    unstake all
                                                </div>
                                            </div>


                                            <div className='stacker-mar'>
                                                {ycollection.map((obj, ind) => {
                                                    return (
                                                        <div className='stacked-main-col'>
                                                            <div className='stac-col-img-txt'>
                                                                <div className='stacked-col-img'>
                                                                    <img src={obj.img} alt='unstake' />
                                                                </div>
                                                                <div className='col-astro'>
                                                                    Astro Guys #1788
                                                                </div>
                                                            </div>
                                                            <div className='unstake-col'>
                                                                unstake
                                                            </div>
                                                        </div>
                                                    )
                                                })}

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