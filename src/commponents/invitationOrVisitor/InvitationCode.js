import { Box, Button, ButtonGroup, DialogContent, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { visitorDetailsThroughCode } from "../../actions/actions";
import { VisitorInput } from "../reuse/VisitorInput";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import { addNotification } from "../../actions/actions";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));
const InvitationCode = () => {
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const [invitationCode, setInvitationCode] = useState('')
    const [flag, setFlag] = useState(false)

    const handleChangeCode = (e) => {
        setInvitationCode(e.target.value);
        setFlag(false)
    };
    const visitorDetails = useSelector(state => state.invitationOrVisitor.visitorDetailsThroughCode)

    const requestSend = (visitorDetails) => {
        dispatch(addNotification({ visitorDetails }))
        setOpen(false);
    }
    console.log("requestSend", requestSend)
    const handleOK = (info) => {
        dispatch(visitorDetailsThroughCode({ invitationCode: info }))
        setFlag(true)
    }
    const [open, setOpen] = useState(false);
    const handleDetails = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setInvitationCode('')
    };

    return (
        <>
            <Paper sx={{ boxShadow: 'none', maxWidth: '600px' }}>
                <Button onClick={handleDetails} size="small" variant="outlined"
                    sx={{ marginLeft: '20px', color: 'black', fontWeight: 'bold' }}>
                    <QrCode2Icon sx={{ marginRight: '8px' }} /> Invitation Code</Button>

                <BootstrapDialog
                    PaperProps={{
                        sx: {
                            minWidth: "55%",
                            maxWidth: "65%",
                            maxHeight: "95%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        {flag === true && invitationCode !== '' ? 'Invitation Details' : 'Invitaion Code'}
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        <Box>
                            <Grid container spacing={1} sx={{ pt: 1, }}>
                                <Grid item md={12}>
                                    <Typography className="Inputlable">Enter Invitation Code</Typography>
                                    <VisitorInput
                                        id="outlined-required"
                                        name="invitationCode"
                                        value={invitationCode}
                                        placeholder="Enter Invitation Code"
                                        onChange={handleChangeCode}
                                        size="small"
                                    />
                                    <Button color="primary" variant="contained" type="submit"
                                        onClick={() => handleOK(invitationCode)}
                                        style={{
                                            marginLeft: '2px',
                                            height: '28px'
                                        }} >Submit</Button>
                                </Grid>

                            </Grid>
                        </Box>
                        <Box sx={{ margin: '10px', marginTop: '30px' }}>
                            {flag === true && invitationCode !== '' &&
                                <Grid container spacing={2}>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Type</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.VType}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Visitor Name</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.visitor_name}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Company Name</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.company_name}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Host Name</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                {/* <Typography style={{ fontSize: '12px' }}>{visitorDetails.host_name === null || visitorDetails.host_name === undefined ? '-' : visitorDetails.host_name.employee_name}</Typography> */}
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.hostName}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Department</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                {/* <Typography style={{ fontSize: '12px' }}>{visitorDetails.department === null || visitorDetails.department === undefined ? '-' : visitorDetails.department.department}</Typography> */}
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.department === null || visitorDetails.department === undefined ? '-' : visitorDetails.department}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Purpose</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                {/* <Typography style={{ fontSize: '12px' }}>{visitorDetails.purpose === null || visitorDetails.purpose === undefined ? '-' : visitorDetails.purpose.purpose}</Typography> */}
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.purpose === null || visitorDetails.purpose === undefined ? '-' : visitorDetails.purposeName}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Meeting Time</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.meeting_time}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Meeting Location</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.meeting_location}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Check In Time</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.check_in_time}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Check Out Time (Host)</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.check_out_time_host}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Check Out Time (Gate)</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                {/* <Typography style={{ fontSize: '12px' }}>{visitorDetails.check_out_time_gate}</Typography> */}
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.check_out_time_gate === null ? '-' : visitorDetails.check_out_time_gate}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={3} xs={3}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>Status</Typography>
                                            </Grid>
                                            <Grid item md={0.6} sm={0.6} xs={0.6}>
                                                <Typography className="Inputlable" style={{ fontWeight: 600 }}>:</Typography>
                                            </Grid>
                                            <Grid item md={8.4} sm={8.4} xs={8.4}>
                                                <Typography style={{ fontSize: '12px' }}>{visitorDetails.status}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Box >
                                            <img src={visitorDetails.scanCode} width="150" height='150' />
                                            <h4 style={{ display: 'flex', justifyContent: 'center', marginTop: '0px', width: '150px' }}>{visitorDetails.code}</h4>
                                        </Box>
                                        {visitorDetails.status === 'Invited' &&
                                            <Button color="primary" variant="contained" type="submit"
                                                onClick={() => requestSend(visitorDetails)}
                                                style={{
                                                    marginLeft: '25px',
                                                    height: '28px',
                                                    // display: visitorDetails.status === "Allowed" ? "none" : "" 


                                                }}
                                            >
                                                <span style={{ fontSize: "11px" }}>Allowed</span>
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </DialogContent>
                </BootstrapDialog>
            </Paper >

        </>
    )
}
export default InvitationCode;