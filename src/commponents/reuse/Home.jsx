import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Home = ({ routeSegments }) => {
    return (
        <> 
        <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
            <HomeIcon sx={{ paddingTop: '2px', fontSize: '28px' , marginRight:'5px', marginLeft:'5px'}} /> 
        </NavLink>
      
        </>
       
    )
}


export default Home;



