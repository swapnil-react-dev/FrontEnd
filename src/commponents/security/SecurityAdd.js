import { Avatar, Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import security_img from "../images/security_img1.jpg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { VisitorInput } from "../reuse/VisitorInput";
import { UploadImageAadharSecurity, addCompanyDetails, addSecurity, editDeleteCompanyDetails, editDeleteSecurity } from "../../actions/actions";
import { getCurrentDateTime } from "../reuse/getCurrentDateTime";


const SecurityAdd = (props) => {
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const editData = props.editInfo;
    const editid = editData && editData.id;
    const [successMessage, setSuccessMessage] = useState(null)
    const [previewImage, setPreviewImage] = useState("")
    // const [upload_aadhar_card, setUpload_aadhar_card] = useState(editData ? editData.upload_aadhar_card : '');
    const imageSecurityAdhar = useSelector(state => state.security.SecurityAadharImage)
    // const [logo_image, setImageName] = useState(editData ? editData.logo_image : '');


    const [data, setData] = useState({
        id: editid,
        security_name: editData ? editData.security_name : '',
        aadhar_number: editData ? editData.aadhar_number : '',
        agency_name: editData ? editData.agency_name : '',
        security_contact_number: editData ? editData.security_contact_number : '',
        agency_contact_number: editData ? editData.agency_contact_number : '',
        gender: editData ? editData.gender : '',
        created_by: loginUser.userId,
        // created_by: editData ? editData.created_by : loginUser.fullName + ' (' + loginUser.userName + ')',
        created_at: editData ? editData.created_at : getCurrentDateTime(),
        // modified_by: editData ? loginUser.fullName + ' (' + loginUser.userName + ')' : null,
        modified_by: loginUser.userId,
        modified_at: editData ? getCurrentDateTime() : null,
        userRole: 'Security'
    })

    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });
        data[target.name] = target.value;
    }

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit',
            upload_aadhar_card: imageSecurityAdhar == null ? editData ? editData.upload_aadhar_card : null : imageSecurityAdhar,
        }

        if (editData) {
            dispatch(editDeleteSecurity(sendingData));
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addSecurity(sendingData));
            props.onEdit();
            props.handleCloseDialog();
        }
    }

    const uploadFile = async (event) => {
        try {
            const selectedFile = event.target.files[0];
            const formData = new FormData();
            const reader = new FileReader();
            formData.append('file', selectedFile);
            dispatch(UploadImageAadharSecurity(formData));
            reader.addEventListener(
                "load",
                function () {
                    setPreviewImage(reader.result);
                },
                false
            );
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
                setData({ ...data, imageSecurityAdhar: selectedFile });
    
            }
        } catch (error) {
            console.error('Error uploading file:', error); // Log the error for debugging
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            function () {
                // setPreviewImage(reader.result);
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
            setData({ ...data, uploadBillReceipt: file });

        }
    };

    const handleCloseSuccessMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)
    };

    const actionMsg = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSuccessMsg}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
            <Paper className='listPaper' sx={{ boxShadow: 'none' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                        <Grid item md={4} >
                            <Grid item md={12} xs={12} >
                                <Typography sx={{ fontWeight: 'bold' }}> Security Details Entry</Typography>
                                <Typography className='Inputlable'> Create Security details for registration for the Security.
                                </Typography>
                            </Grid>
                            <Grid item md={12} xs={12} >
                                <img src={security_img} style={{ width: '100%', height: 'auto', padding: '25px' }} />
                            </Grid>
                        </Grid>
                        {/* ----2nd col--- */}
                        <Grid item md={8} className="lableGrid">
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Security Name</Typography>
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="security_name"
                                        type="text"
                                        value={(data.security_name)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Aadhar No</Typography>
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="aadhar_number"
                                        type="number"
                                        value={(data.aadhar_number)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Agency Name</Typography>
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="agency_name"
                                        type="text"
                                        value={(data.agency_name)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Gender</Typography>
                                    <VisitorInput
                                        select
                                        size="small"
                                        fullWidth
                                        name="gender"
                                        type="text"
                                        value={(data.gender)}
                                        onChange={handleChange} >
                                        <MenuItem className="menuItem" value="Male">Male</MenuItem>
                                        <MenuItem className="menuItem" value="Female">Female</MenuItem>
                                    </VisitorInput>
                                </Grid>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Security Contact No</Typography>
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="security_contact_number"
                                        type="number"
                                        value={(data.security_contact_number)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Upload Aadhar Card</Typography>
                                    <VisitorInput
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        name="upload_aadhar_card"
                                        accept="image/*"
                                        type="file"
                                        onChange={uploadFile}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        style={{ border: '1px solid #0000003b', borderRadius: '4px' }}
                                    />
                                    <Box
                                        sx={{
                                            border: "1px solid #333",
                                            maxWidth: 100,
                                            minWidth: 200,
                                            height: 180,
                                            padding: 1,
                                            margin: 2,
                                        }}
                                    >
                                        <Avatar
                                            variant="square"
                                            alt="Remy Sharp"
                                            src={previewImage}
                                            sx={{ width: "100%", height: "100%" }}
                                        />
                                    </Box>

                                </Grid>

                                <Grid item md={6} xs={6} className="lableGrid">
                                    <Typography className="Inputlable">Agency Contact No</Typography>
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="agency_contact_number"
                                        type="number"
                                        value={(data.agency_contact_number)}
                                        onChange={handleChange} />
                                </Grid>
                            </Grid>

                            <Box sx={{ marginTop: '50px', float: 'right' }}>
                                <Button color="primary" id='btnSave' variant="contained" type="submit">
                                    {editData ? 'Update' : 'Save'}
                                </Button>
                                {/* <Cancel />s */}
                            </Box>
                        </Grid>

                    </Grid>

                </form>
                {successMessage &&
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={successMessage ? true : false}
                        autoHideDuration={2000}
                        onClose={handleCloseSuccessMsg}
                        message={successMessage}
                        action={actionMsg}
                    />
                }
            </Paper>

        </>
    )
}
export default SecurityAdd;