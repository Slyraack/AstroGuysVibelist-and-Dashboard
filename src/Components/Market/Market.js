import Box from '@mui/material/Box';
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from '../Sidebar/SideBar';
import Grid from '@mui/material/Grid';
import './Market.css'
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
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import last24hr from '../../Img/last-24-hr.png'
import minilogo from '../../Img/mini-logo.png'
import wlogimg from '../../Img/wlog-img.png'
import banner1 from '../../Img/banner-1.png'
import banner2 from '../../Img/banner-2.png'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Slider from "react-slick";


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
{ id: 1, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 2, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 3, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 4, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 5, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 6, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 7, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 8, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
{ id: 9, colimg: minilogo, name: 'Astro Guys', img: `${last24hr}`, Floor_Price: "100 SEI", percentage: 14, floatpoint: 20.91 },
]

const wlog = [

{ id: 1, colimg: wlogimg, name: 'CappysNew', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20  },
{ id: 2, colimg: wlogimg, name: 'Cappys', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 3, colimg: wlogimg, name: 'CappysOld', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 4,  colimg: wlogimg, name: 'Cappys', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 5, colimg: wlogimg, name: 'CappysNew', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 6, colimg: wlogimg, name: 'Cappys', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 7, colimg: wlogimg, name: 'CappysOld', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 8, colimg: wlogimg, name: 'Cappys', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 9, colimg: wlogimg, name: 'CappysNew', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 10, colimg: wlogimg, name: 'CappysOld', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 11, colimg: wlogimg, name: 'Cappys', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 },
{ id: 12, colimg: wlogimg, name: 'CappysNew', wlog: "WL Spot", guys: "30 $GUYS", img: `${sei}`, Floor_Price: "30 $GUYS", hours: "1hr", percentage: 5, usrnme: "sei1k0h5h65sei1k0h5h65", floatpoint: 20.91, pricerate: 20 }
]


const accord = [
    { title: 'What is Astro Hub Staking?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel1' },
    { title: 'How does Astro Hub Staking work?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel2' },
    { title: 'What is Astro Hub Staking?', cont: 'Nulla facilisi Phasellus sollicitudin nulla et quam mattis feugiatAliquam eget maximus est id dignissim quam', panel: 'panel3' },
]


const drawerWidth = 240;

//Owl Carousel Settings
const options = {
    margin: 30,
    items: 1,
    responsiveClass: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 7000,
    dots: false,
    loop: true,
    smartSpeed: 2000,
    autoHeightClass: "owl-height",
    responsive: {
      0: {
        items: 1,
      },
      320: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

function Market() {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [value, setValue] = React.useState(0);

    const handleChangetab = (event, newValue) => {
        setValue(newValue);
    };

    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(wlog)

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = wlog.filter((user) =>
    user.name.includes(searchTerm)
    );

    setFilteredUsers(filteredItems);
    
  }



  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    draggable: true,
    margin:8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


    return (

        <>
            <div className="Stacking market-main-page">
                <Box sx={{ display: 'flex' }} >
                    <CssBaseline />
                    <SideBar />
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)`, marginTop: '50px' } }}
                    >
                    
                    <Grid container spacing={2} className='banner-market section-1-cls'>
                    
                    {/* <Slider {...settings}>
                        <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>

                        <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>

                        <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>

                    </Slider> */}

                    <OwlCarousel className="owl-theme owl-carousel" {...options}>
                    <div className="item">
                        <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>
                    </div>
                    <div className="item">
                    <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>
                    </div>
                    <div className="item">
                    <div className='banner-market-outer'>
                        <div className='banner-market-img'><img src={banner1} alt="banner-1"/></div>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <h3>Get Astro Guys WL</h3>
                            <div><Button variant='contained'>Live</Button></div>
                        </Stack>
                        </div>
                    </div>
                    </OwlCarousel>
                    </Grid>

                    <Grid container spacing={2} className='section-2-cls'>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                     <div className='buy-sell-block-market'>
                        <h2 className='heading-market stack-pool'>SEI WL <span>OTC MARKET</span></h2>
                        <p>Buy and sell WL and OG spots from SEI's hottest NFT collections. Our system is based on buying in $GUYS with collateral in SEI to protect the buyer.</p>
                     </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <div className='token-price-graph'>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className='tpg-left'>
                        <div className='row-1-tpg'><span>$GUYS</span><label>token price</label></div>
                        <div className='row-2-tpg'><span>$0.11</span><label>+27%</label></div>
                        <div className='row-3-tpg'>$15.000.000 FDV</div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className='tpg-right'>
                        <Button variant="contained">Buy $GUYS</Button>
                        </div>
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>

                    <Grid container spacing={2} className='section-3-cls'>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h3 className='heading-market'>Top collections over <span>last 24</span> hours</h3>
                    </Grid>
                    <Grid container spacing={2} className='tco-inner-outer'>
                    {ycollection?.map((tco)=>(
                    <Grid key={tco.id} item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className='tco-inner'>
                        <div className='tco-inner-1'>{tco.id}.</div>
                        <div className='tco-inner-2'><img src={tco.colimg}/></div>
                        <div className='tco-inner-3'><label>{tco.name}</label><span>Floor Price: {tco.Floor_Price}</span></div>
                        <div className='tco-inner-4'><span>{tco.percentage}%</span><div><img src={tco.img}/><span>{tco.floatpoint}</span></div></div>
                    </div>
                    </Grid>
                    ))}
                    </Grid>
                    </Grid>
                   
                    <Grid container spacing={2} className='section-4-cls'>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h3 className='heading-market Trade-WL-and-OG-spots'>Trade WL and OG spots</h3>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='your-dei-grid'>
                    <div className='your-sei your-sei-wl-og'>
                    <Stack direction="row" spacing={2}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Verified collection"/>
                    <FormControlLabel control={<Checkbox />} label="All collection"/>
                    <TextField id="outlined-basic" className='collection-name-class' placeholder="Enter collection name" variant="outlined" value={searchItem} onChange={handleInputChange} />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Verified collection"/>
                    <FormControlLabel control={<Checkbox />} label="All collection"/>
                    <Button className='sort-button' variant="text" startIcon={<FilterListIcon />}>Sort</Button>
                    <Button className='Sell-WL-spot-button' variant="contained" startIcon={<AddIcon />}>Sell WL spot</Button>
                    </Stack>
                    </div>
                    </Grid>
                    <Grid container spacing={2} className='wlog-block-outer-class'>
                    {filteredUsers?.map((wlog)=>(
                    <Grid key={wlog.id} item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <div className='wl-og-block-outer'>
                        <div className='wl-og-block-outer-1'>
                            <div className='wl-og-block-outer-1-left'>
                                <div><img src={wlog.colimg}/></div>
                                <div>
                                <label>{wlog.name}</label>
                                <span>{wlog.wlog}</span>
                                </div>
                            </div>
                            <div className='wl-og-block-outer-1-right'>
                            <label>Floor price</label>
                            <span>{wlog.Floor_Price}</span>
                            </div>
                        </div>
                        <div className='wl-og-block-outer-2'>
                            <div><img src={wlog.img} alt="wlogimg"/><label>{wlog.guys}</label></div>
                            <span>${wlog.pricerate}</span>
                        </div>
                        <div className='wl-og-block-outer-3'>
                            <div className='wl-og-block-outer-3-left'>
                            <span>{wlog.hours} ago, by <span className='wlog-usrname'>{wlog.usrnme}</span></span>
                            </div>
                            <div className='wl-og-block-outer-3-right'>
                            <div><Button variant="contained">Buy</Button></div>
                            <span>{wlog.percentage}% collection fee</span>
                            </div>
                        </div>
                    </div>
                    </Grid>
                    ))}
                    </Grid>
                    </Grid>

                    </Box>
                </Box>
            </div>
        </>);
}

export default Market;