import React from "react";
import { Route, Routes, } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { appRoutes } from "../../config/constants";
import { PrivateRoute } from "./PrivateRoute";
import Navbar from "./Navbar";
import Login from "./Login";
import SelfRegistrationAdd from "../selfRegistration/SelfRegistrationAdd";
import SelfRegistrationMsg from "../selfRegistration/SelfRegistrationMsg";
import Authorization from "../invitationOrVisitor/Authorization";


const VisitorRoutes = () => {
  const loginData = localStorage.getItem('loginUser');
  const loginInfor = JSON.parse(loginData);
  // const loginUser = loginInfor.userInfo;

  return (
    <>
      <Routes>
        {/* <Route path={appRoutes.LOGIN} element={<Navbar />}></Route> */}
        <Route path={appRoutes.EMPLOYEE} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.EMPLOYEELIST} element={<PrivateRoute />}>
          <Route path={appRoutes.EMPLOYEELIST} element={<><Navbar /> </>}></Route>
        </Route>


        <Route path={appRoutes.DEPARTMENTLIST} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.COMPANYLIST} element={<> <Navbar/> </>}> </Route>
        <Route path={appRoutes.PURPOSELIST} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.INVITATIONLIST} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.GUESTPASS} element={<><Navbar /> </>}></Route>

        {/* <Route path={appRoutes.AUTHORIZATION} element={
          loginData === null ?
            <Authorization />
            :
            loginData && loginUser.userRole !== "Security" &&
            <><Navbar /></>
        }></Route> */} 
         <Route path={
          appRoutes.DASHBOARD} element={<> 
         <Navbar/></>}></Route>
        <Route path={appRoutes.SETTING} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.SELFREGISTRATION} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.DASHBOARD} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.LOGIN} element={<><Login /> </>}></Route>
        <Route path={appRoutes.SELFREGISTRATIONMOB} element={<><SelfRegistrationAdd/></>}></Route>
        <Route path={appRoutes.SELFREGISTRATIONMSG} element={<><SelfRegistrationMsg/> </>}></Route>
        <Route path={appRoutes.COMPANYDETAILS} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.SECURITY} element={<><Navbar /> </>}></Route>
        <Route path={appRoutes.PENDINGREQUEST} element={<><Navbar /> </>}></Route>
        {/* <Route path={appRoutes.ADMINDASHBOARD} element={<><Navbar /> </>}></Route> */}
      </Routes>
    </>
  )
}
export default VisitorRoutes;