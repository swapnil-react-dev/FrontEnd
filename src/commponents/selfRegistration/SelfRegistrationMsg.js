import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';


const SelfRegistrationMsg = (props) => {
    const queryParameters = new URLSearchParams(window.location.search)
    const msg = queryParameters.get("msg")

    return (
        <Paper className="listPaper" sx={{ boxShadow: 'none', }}>

            {msg === 'success' &&
                <Grid container spacing={4} sx={{ pt: 6, p: 4, }}>
                    <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon icon="mdi:success-circle-outline" color="#87d185" width="180" height="180" />
                    </Grid>
                    <Grid item md={12} xs={12} sx={{ border: '1px solid #f2f2f2', pb: 4 }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '88px' }}> Thank You</Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: '18px' }}> Your Submition has been sent.</Typography>
                    </Grid>
                </Grid>
            }
            {msg === 'failure' &&
                <Grid container spacing={4} sx={{ pt: 6, p: 4, }}>
                    <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon icon="mdi:success-circle-outline" color="#ff0303" width="180" height="180" />
                    </Grid>
                    <Grid item md={12} xs={12} sx={{ border: '1px solid #f2f2f2', pb: 4 }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '88px' }}> Oops</Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: '18px' }}> Something went wrong, plese try again.</Typography>
                    </Grid>
                </Grid>
            }
        </Paper>

    )
}
export default SelfRegistrationMsg;