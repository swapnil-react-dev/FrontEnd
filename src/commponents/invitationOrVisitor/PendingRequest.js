import { Alert, Box, Button, DialogContent, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import Barcode from 'react-barcode';
import { addEmployee, editDeleteEmployee } from "../../actions/actions";
import { NavLink } from "react-router-dom";
import { BootstrapDialog, BootstrapDialogTitle } from "../reuse/BootstrapDialog";
import Authorization from "./Authorization";

const PendingRequest = (props) => {
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const editData = props.editInfo;
    const editid = editData && editData._id;
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useState({
        _id: editid,
        visitor_name: editData ? editData.visitor_name : '',
        company_name: editData ? editData.company_name : '',
        mobile_number: editData ? editData.mobile_number : '',
        account_type: editData ? editData.account_type : '',
        branch_name: editData ? editData.branch_name : '',
        ifsc_code: editData ? editData.ifsc_code : '',
    })

    // const handleChange = ({ target }) => {
    //     const value = target.value;
    //     setData({
    //         ...data,
    //         [target.name]: value,
    //     });
    //     data[target.name] = target.value;

    // }

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit'
        }
        if (editData) {
            dispatch(editDeleteEmployee(sendingData));
            setSuccessMessage("Record Updated Successfully!")
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addEmployee(sendingData));
            setSuccessMessage("Record Added Successfully!")
            props.onEdit();
            props.handleCloseDialog();
        }
    }
    const dateConversion = (date) => {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        const convDate = dd + "/" + mm + "/" + yyyy;
        return convDate;
    };
    // const handleCloseSuccessMsg = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSuccessMessage(false)
    // };

    // const actionMsg = (
    //     <React.Fragment>
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={handleCloseSuccessMsg}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     </React.Fragment>
    // );
    const [open, setOpen] = useState(false);
    const handleClose = (event) => {

        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Paper sx={{ boxShadow: 'none', }}>
                <Grid container spacing={1} sx={{ pt: 1 }}>
                    <Grid item md={12} className="lableGrid">
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="warning" onClick={handleClickOpen}>This is a warning alert — check it out!</Alert>
                            <Alert severity="warning" onClick={handleClickOpen}>This is a warning alert — check it out!</Alert>
                            <Alert severity="warning" onClick={handleClickOpen}>This is a warning alert — check it out!</Alert>
                            <Alert severity="warning" onClick={handleClickOpen}>This is a warning alert — check it out!</Alert>
                        </Stack>
                    </Grid>
                </Grid>

                <BootstrapDialog
                    PaperProps={{
                        sx: {
                            minWidth: "45%",
                            maxHeight: "95%"
                        }
                    }}
                    onClose={handleClose}
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                        Authorization
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        <Authorization />
                    </DialogContent>
                </BootstrapDialog>
            </Paper>
        </>
    )
}
export default PendingRequest;