import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import './SideBar.css'
import logo from '../../Img/logo.png'
import sidedoc from '../../Img/side-doc.png'
import mini from '../../Img/mini-logo.png'
import { Await, NavLink } from "react-router-dom";
import CottageIcon from '@mui/icons-material/Cottage';
import PortraitIcon from '@mui/icons-material/Portrait';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import LayersIcon from '@mui/icons-material/Layers';
import { FaBridgeWater } from "react-icons/fa6";
import { RiWallet3Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import { BiWalletAlt } from "react-icons/bi";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WEb3, { Web3 } from "web3";
import { StargateClient } from "@cosmjs/stargate";
import LogoutIcon from '@mui/icons-material/Logout';
import Axios from "../axios";
import Modal from '@mui/material/Modal';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import leap from "../../Img/leap.png"
import compass from "../../Img/compass.png"
import { toast } from "react-toastify";
import { Token } from "@mui/icons-material";



const drawerWidth = 240;

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


function SideBar(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCampass = async () => {
        window.open("https://chromewebstore.google.com/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb");
    }

    const handleLeap = async () => {
        window.open("https://chromewebstore.google.com/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg");
    }


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [metamaskadd, setMetamaskadd] = useState(null);
    const [wallet, setWallet] = useState("");

    useEffect(() => {
        if (window.localStorage.getItem("address") != null) {
            const accounts = window.localStorage.getItem("address")
            let add = accounts.slice(0, 6) + "......" + accounts.slice(36, 42)
            setWallet(add)
        }
        else if (window.localStorage.getItem("leapaddress") != null) {
            const accounts = window.localStorage.getItem("leapaddress")
            let add = accounts.slice(0, 6) + "......" + accounts.slice(36, 42)
            setWallet(add)
        } else {
            setWallet("")
        }
    })


    const connectwallet = async () => {
        if (window.compass) {
            const rpcEndpoint = "https://sei-rpc.brocha.in"; // e.g., "http://localhost:26657"
            const client = await StargateClient.connect(rpcEndpoint);
            try {

                /* MetaMask is installed */
                await window.compass.enable("pacific-1");
                const offlineSigner = window.compass.getOfflineSigner("pacific-1");
                const accounts = await offlineSigner.getAccounts();
                let addres = accounts[0].address

                const balances = await client.getAllBalances(addres);


                window.localStorage.setItem("address", accounts[0].address)
                let add = accounts[0].address.slice(0, 6) + "......" + accounts[0].address.slice(36, 42)
                setWallet(add)

                const response = await Axios.post('/users/register', { address: addres }, {
                    headers: { Authorization: window.localStorage.getItem('token') }
                })

                if (response.data.success == true) {
                    const token = response.data.result.token
                    window.localStorage.setItem('token', token)
                    toast.success(response.data.message)
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        else if (window.leap) {

            const rpcEndpoint = "https://sei-rpc.brocha.in";  // e.g., "http://localhost:26657"
            const client = await StargateClient.connect(rpcEndpoint);
           
            try {
        
                /* MetaMask is installed */
                await window.leap.enable("pacific-1");
                const offlineSigner = window.leap.getOfflineSigner("pacific-1");
                const accounts = await offlineSigner.getAccounts();
               

                let addres = accounts[0].address

                const balances = await client.getAllBalances(addres);

               
                window.localStorage.setItem("leapaddress", accounts[0].address)
                let add = accounts[0].address.slice(0, 6) + "......" + accounts[0].address.slice(36, 42)
                setWallet(add)

                const response = await Axios.post('/users/register', { address: addres }, {
                    headers: { Authorization: window.localStorage.getItem('token') }
                })
               
                if (response.data.success == true) {
                    const token = response.data.result.token
                   
                    window.localStorage.setItem('token', token)
                    
                    toast.success(response.data.message)
                    
                }

            } catch (err) {
                console.error(err.message);
            }
        }
        else {
            /* MetaMask is not installed */
            setOpen(true)
           

        }
    }


    const logout = () => {
        const accounts = window.localStorage.getItem("address")
        if (accounts) {
            window.localStorage.clear()
            setWallet("")
        }
        else {
            window.localStorage.clear()
            setWallet("")
        }
    }

    const drawer = (
        <div className="sidebar-list">
            <Divider />
            <div className="sidebar-backarrow">
                <ArrowForwardIosIcon sx={{ display: { lg: 'none', sm: 'block' } }} onClick={handleDrawerClose} />
            </div>
            <List>
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <hr className="hr" />
            </List>
            <Divider />
            <List className="navlink-list">
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><CottageIcon className="svg-icon" /> Dashboard</NavLink>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><PortraitIcon className="svg-icon" /> Portfolio</NavLink>
                <NavLink to='/vibelist' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><SignalCellularAltIcon className="svg-icon" /> Vibelist</NavLink>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><FaBridgeWater className="svg-icon" /> Bridge</NavLink>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><LayersIcon className="svg-icon" /> Staking</NavLink>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><LayersIcon className="svg-icon" /> WL Market</NavLink>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'non-active')} ><LayersIcon className="svg-icon" /> Buy $GUYS</NavLink>
            </List>
            <Divider />
            <List className="navlink-list cw">
                <div className="account">
                    YOUR ACCOUNT
                </div>
                {wallet === "" ? <Button variant="text" onClick={connectwallet}><RiWallet3Fill className="svg-icon" /> Connect wallet</Button> :
                    <div style={{ color: "white" }} className="w-id">{wallet}</div>}

            </List>
            <Divider />
            <List >
                <div className="doc-img-div">
                    <img src={sidedoc} alt="doc" />
                </div>
                <div className="doc-content">
                    <div className="minilogo">
                        <img src={mini} alt="minilogo" />
                    </div>
                    <div className="need-help">
                        Need help?
                    </div>
                    <div className="pls-chk">
                        Please check our docs
                    </div>
                    <div className="dov-btn-div">
                        <Button>
                            DOCUMENTATION
                        </Button>
                    </div>
                </div>
            </List>
        </div>
    );



    return (

        <div className="sidebar">
            <Box sx={{ display: 'flex', width: '100%' }} >
                <CssBaseline />

                <Box
                    component="nav"
                    sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
                    aria-label="mailbox folders"
                    className="list"
                >
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { lg: `calc(100% - ${drawerWidth}px)` },
                            ml: { lg: `${drawerWidth}px` },
                        }}
                        className="head"

                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { lg: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <div className="head-text-sidebar">
                                <div className="user-name">
                                </div>
                                {wallet === "" ?
                                    <Button className="connet-wallet" onClick={connectwallet}>
                                        <BiWalletAlt /><span >Connect wallet</span>
                                    </Button> : <>
                                        <div className="connect-bef">
                                            {wallet}<LogoutIcon onClick={logout} />
                                        </div></>}
                            </div>
                        </Toolbar>

                    </AppBar>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', lg: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        className="list"
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', lg: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open

                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Modal
                    open={open}

                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='pop-wallet-head'>
                            Please Refer the Wallet
                        </div>
                        <div className='pop-close'>
                            <CancelOutlinedIcon onClick={handleClose} />
                        </div>
                        <div className='wallet-logo'>
                            <div onClick={handleCampass} className='wallet-wrap'>
                                <img src={compass} alt='compass' />
                                <div className='pop-wallet-name'>
                                    Compass
                                </div>
                            </div>

                            <div onClick={handleLeap} className='wallet-wrap'>
                                <img src={leap} alt='leap' />
                                <div className='pop-wallet-name'>
                                    Leap
                                </div>
                            </div>

                        </div>

                    </Box>
                </Modal>
            </Box>
        </div >


    );
}



export default SideBar;
