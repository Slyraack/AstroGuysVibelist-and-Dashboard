import React from 'react'
import SideBar from '../Sidebar/SideBar'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import cmg from '../../Img/comming soon.gif'
import { Grid } from '@mui/material';
const drawerWidth = 240;


function Bridge() {
    return (

        <div className="Bridge">
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <SideBar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, marginTop: '50px' } }}
                >
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>

                            <div className='soon-img'>
                                <img src={cmg} />
                                <div className='stack-pool soon'>
                                    <span>Comming Soon!</span>
                                </div>
                            </div>

                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </div >

    )
}

export default Bridge