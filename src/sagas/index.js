import { put, takeLatest, all, call } from 'redux-saga/effects';
import axiosClient from '../config/axios';
import {
  GET_EMPLOYEE_LIST_PROGRESS, GET_EMPLOYEE_LIST_SUCCESS, GET_EMPLOYEE_LIST_FAILURE,
  ADD_EMPLOYEE_PROGRESS, ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_FAILURE,
  EDIT_DELETE_EMPLOYEE_PROGRESS, EDIT_DELETE_EMPLOYEE_SUCCESS, EDIT_DELETE_EMPLOYEE_FAILURE,

  GET_VISITOR_PURPOSE_LIST_PROGRESS, GET_VISITOR_PURPOSE_LIST_SUCCESS, GET_VISITOR_PURPOSE_LIST_FAILURE,
  ADD_VISITOR_PURPOSE_PROGRESS, ADD_VISITOR_PURPOSE_SUCCESS, ADD_VISITOR_PURPOSE_FAILURE,
  EDIT_DELETE_VISITOR_PURPOSE_PROGRESS, EDIT_DELETE_VISITOR_PURPOSE_SUCCESS, EDIT_DELETE_VISITOR_PURPOSE_FAILURE,

  GET_DEPARTMENT_LIST_PROGRESS, GET_DEPARTMENT_LIST_SUCCESS, GET_DEPARTMENT_LIST_FAILURE,
  ADD_DEPARTMENT_PROGRESS, ADD_DEPARTMENT_SUCCESS, ADD_DEPARTMENT_FAILURE,
  EDIT_DELETE_DEPARTMENT_PROGRESS, EDIT_DELETE_DEPARTMENT_SUCCESS, EDIT_DELETE_DEPARTMENT_FAILURE,

  GET_INVITATION_OR_VISITOR_LIST_PROGRESS, GET_INVITATION_OR_VISITOR_LIST_SUCCESS, GET_INVITATION_OR_VISITOR_LIST_FAILURE,
  ADD_INVITATION_OR_VISITOR_PROGRESS, ADD_INVITATION_OR_VISITOR_SUCCESS, ADD_INVITATION_OR_VISITOR_FAILURE,
  EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS, EDIT_DELETE_INVITATION_OR_VISITOR_SUCCESS, EDIT_DELETE_INVITATION_OR_VISITOR_FAILURE,
  UPLOAD_ID_PROOF_VISITORS_PROGRESS, UPLOAD_ID_PROOF_VISITORS_SUCCESS, UPLOAD_ID_PROOF_VISITORS_FAILURE,
  UPLOAD_PHOTO_VISITORS_PROGRESS, UPLOAD_PHOTO_VISITORS_SUCCESS, UPLOAD_PHOTO_VISITORS_FAILURE,

  LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_PROGRESS,
  LOGOUT_PROGRESS, LOGOUT_SUCCESS, LOGOUT_FAILURE,

  IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_PROGRESS,

  GET_COMPANY_DETAILS_LIST_PROGRESS, GET_COMPANY_DETAILS_LIST_SUCCESS, GET_COMPANY_DETAILS_LIST_FAILURE,
  ADD_COMPANY_DETAILS_PROGRESS, ADD_COMPANY_DETAILS_SUCCESS, ADD_COMPANY_DETAILS_FAILURE,
  EDIT_DELETE_COMPANY_DETAILS_PROGRESS, EDIT_DELETE_COMPANY_DETAILS_SUCCESS, EDIT_DELETE_COMPANY_DETAILS_FAILURE,

  GET_SECURITY_LIST_PROGRESS, GET_SECURITY_LIST_SUCCESS, GET_SECURITY_LIST_FAILURE,
  ADD_SECURITY_PROGRESS, ADD_SECURITY_SUCCESS, ADD_SECURITY_FAILURE,
  EDIT_DELETE_SECURITY_PROGRESS, EDIT_DELETE_SECURITY_SUCCESS, EDIT_DELETE_SECURITY_FAILURE,
  UPLOAD_AADHAR_SECURITY_PROGRESS, UPLOAD_AADHAR_SECURITY_SUCCESS, UPLOAD_AADHAR_SECURITY_FAILURE,
  GENERATE_CODE_SUCCESS, GENERATE_CODE_FAILURE, GENERATE_CODE_PROGRESS,
  GET_VISITOR_DETAILS_THROUGH_CODE_SUCCESS, GET_VISITOR_DETAILS_THROUGH_CODE_FAILURE, GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS,
  GET_NOTIFICATION_LIST_SUCCESS, GET_NOTIFICATION_LIST_FAILURE, GET_NOTIFICATION_LIST_PROGRESS, EDIT_DELETE_NOTIFICATION_SUCCESS, EDIT_DELETE_NOTIFICATION_FAILURE, EDIT_DELETE_NOTIFICATION_PROGRESS, GET_ACCEPTED_NOTIFICATION_LIST_SUCCESS, GET_ACCEPTED_NOTIFICATION_LIST_FAILURE, GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS, EDIT_DELETE_CHECKOUTNOTIFICATION_SUCCESS, EDIT_DELETE_CHECKOUTNOTIFICATION_FAILURE, EDIT_DELETE_CHECKOUTNOTIFICATION_PROGRESS, GET_DATEWISE_VISITORS_PROGRESS, GET_DATEWISE_VISITORS_FAILURE, GET_DATEWISE_VISITORS_SUCCESS,
  GET_TOMMOROWDATES_VISITORS_FAILURE, GET_TOMMOROWDATES_VISITORS_SUCCESS, GET_TOMMOROWDATES_VISITORS_PROGRESS, GET_NEXTDATES_VISITORS_SUCCESS, GET_NEXTDATES_VISITORS_FAILURE, GET_NEXTDATES_VISITORS_PROGRESS, GET_EXPIRED_VISITORS_SUCCESS, GET_EXPIRED_VISITORS_FAILURE, GET_EXPIRED_VISITORS_PROGRESS, GET_ALLINVITES_VISITORS_SUCCESS, GET_ALLINVITES_VISITORS_FAILURE, GET_ALLINVITES_VISITORS_PROGRESS, GET_INTODAYS_VISITORS_SUCCESS, GET_INTODAYS_VISITORS_FAILURE, GET_INTODAYS_VISITORS_PROGRESS, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE, ADD_NOTIFICATION_PROGRESS, GET_OUTTODAYS_VISITORS_SUCCESS, GET_OUTTODAYS_VISITORS_FAILURE, GET_OUTTODAYS_VISITORS_PROGRESS, GET_ALLTODAY_VISITORS_SUCCESS, GET_ALLTODAY_VISITORS_FAILURE, GET_ALLTODAY_VISITORS_PROGRESS, GET_WEEKLY_VISITORS_SUCCESS, GET_WEEKLY_VISITORS_PROGRESS, GET_WEEKLY_VISITORS_FAILURE, GET_TODAYS_VISITORS_SUCCESS, GET_TODAYS_VISITORS_FAILURE, GET_TODAYS_VISITORS_PROGRESS, GET_ALL_VISITORS_SUCCESS, GET_ALL_VISITORS_FAILURE, GET_ALL_VISITORS_PROGRESS, GET_ALL_EMPLOYEE_SUCCESS, GET_ALL_EMPLOYEE_FAILURE, GET_ALL_EMPLOYEE_PROGRESS, GET_CHECKOUT_REGISTER_SUCCESS, GET_CHECKOUT_REGISTER_FAILURE, GET_CHECKOUT_REGISTER_PROGRESS, GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS, GET_AVEARGE_HRS_EXPRESS_VISITOR_FAILURE, GET_AVEARGE_HRS_EXPRESS_VISITOR_SUCCESS, GET_AVERAGE_DAY_EXPRESS_VISITOR_SUCCESS, GET_AVERAGE_DAY_EXPRESS_VISITOR_FAILURE, GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_FAILURE,
  GET_COMPANY_LIST_PROGRESS,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  ADD_COMPANY_PROGRESS,
  EDIT_DELETE_COMPANY_SUCCESS,
  EDIT_DELETE_COMPANY_FAILURE,
  EDIT_DELETE_COMPANY_PROGRESS

} from '../types/actionTypes';
import axios from 'axios';

// ==================Employee========================
function* getEmployeeListSaga(action) {
  try {
    const response = yield axiosClient.get(`/employee_list`);
    yield put({ type: GET_EMPLOYEE_LIST_SUCCESS, employee: response.data });
  } catch (error) {
    yield put({ type: GET_EMPLOYEE_LIST_FAILURE });
  }
}

function* watchGetEmployeeList() {
  yield takeLatest(GET_EMPLOYEE_LIST_PROGRESS, getEmployeeListSaga);
}

function* addEmployeeSaga(action) {
  try {
    const response = yield axiosClient.post('/employee', action.payload);
    yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
  }
}

function* watchAddEmployee() {
  yield takeLatest(ADD_EMPLOYEE_PROGRESS, addEmployeeSaga);
}

function* editDeleteEmployee(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/employee_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_EMPLOYEE_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteEmployee() {
  yield takeLatest(EDIT_DELETE_EMPLOYEE_PROGRESS, editDeleteEmployee);
}

// ==================VISITOR_PURPOSE========================
function* getVisitorPurposeListSaga() {
  try {
    const response = yield axiosClient.get(`/visitorPurpose_list`);
    yield put({ type: GET_VISITOR_PURPOSE_LIST_SUCCESS, visitorPurpose: response.data });
  } catch (error) {
    yield put({ type: GET_VISITOR_PURPOSE_LIST_FAILURE });
  }
}

function* watchGetVisitorPurposeList() {
  yield takeLatest(GET_VISITOR_PURPOSE_LIST_PROGRESS, getVisitorPurposeListSaga);
}

function* addVisitorPurposeSaga(action) {
  try {
    const response = yield axiosClient.post('/visitorPurpose', action.payload);
    yield put({ type: ADD_VISITOR_PURPOSE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_VISITOR_PURPOSE_FAILURE, payload: error.message });
  }
}

function* watchAddVisitorPurpose() {
  yield takeLatest(ADD_VISITOR_PURPOSE_PROGRESS, addVisitorPurposeSaga);
}

function* editDeleteVisitorPurpose(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/visitorPurpose_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_VISITOR_PURPOSE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_VISITOR_PURPOSE_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteVisitorPurpose() {
  yield takeLatest(EDIT_DELETE_VISITOR_PURPOSE_PROGRESS, editDeleteVisitorPurpose);
}

// ==================DEPARTMENT========================
function* getDepartmentListSaga() {
  try {
    const response = yield axiosClient.get(`/department_list`);
    yield put({ type: GET_DEPARTMENT_LIST_SUCCESS, department: response.data });
  } catch (error) {
    yield put({ type: GET_DEPARTMENT_LIST_FAILURE });
  }
}

function* watchGetDepartmentList() {
  yield takeLatest(GET_DEPARTMENT_LIST_PROGRESS, getDepartmentListSaga);
}

function* addDepartmentSaga(action) {
  try {
    const response = yield axiosClient.post('/department', action.payload);
    yield put({ type: ADD_DEPARTMENT_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_DEPARTMENT_FAILURE, payload: error.message });
  }
}

function* watchAddDepartment() {
  yield takeLatest(ADD_DEPARTMENT_PROGRESS, addDepartmentSaga);
}

function* editDeleteDepartment(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/department_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_DEPARTMENT_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_DEPARTMENT_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteDepartment() {
  yield takeLatest(EDIT_DELETE_DEPARTMENT_PROGRESS, editDeleteDepartment);
}

// ==================COMPANY Master========================
function* addCompanySaga(action) {
  try {
    const response = yield axiosClient.post('/company', action.payload);
    yield put({ type: ADD_COMPANY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_COMPANY_FAILURE, payload: error.message });
  }
}

function* watchAddCompany() {
  yield takeLatest(ADD_COMPANY_PROGRESS, addCompanySaga);
}

function* getCompanyListSaga() {
  try {
    const response = yield axiosClient.get(`/company_list`);
    yield put({ type: GET_COMPANY_LIST_SUCCESS, company: response.data });
  } catch (error) {
    yield put({ type: GET_COMPANY_LIST_FAILURE });
  }
}

function* watchGetCompanyList() {
  yield takeLatest(GET_COMPANY_LIST_PROGRESS, getCompanyListSaga);
}

function* editDeleteCompany(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/company_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_COMPANY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_COMPANY_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteCompany() {
  yield takeLatest(EDIT_DELETE_COMPANY_PROGRESS, editDeleteCompany);
}


// ==================INVITATION_OR_VISITOR========================
function* getInvitationOrVisitorListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/invitationOrVisitor_list?host_name=${data.host_name}&&userRole=${data.userRole}`);
    yield put({ type: GET_INVITATION_OR_VISITOR_LIST_SUCCESS, invitationOrVisitor: response.data });
  } catch (error) {
    yield put({ type: GET_INVITATION_OR_VISITOR_LIST_FAILURE });
  }
}

function* watchGetInvitationOrVisitorList() {
  yield takeLatest(GET_INVITATION_OR_VISITOR_LIST_PROGRESS, getInvitationOrVisitorListSaga);
}



function* addInvitationOrVisitorSaga(action) {
  try {
    const response = yield axiosClient.post('/invitationOrVisitor', action.payload);
    yield put({ type: ADD_INVITATION_OR_VISITOR_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_INVITATION_OR_VISITOR_FAILURE, payload: error.message });
  }
}

function* watchAddInvitationOrVisitor() {
  yield takeLatest(ADD_INVITATION_OR_VISITOR_PROGRESS, addInvitationOrVisitorSaga);
}

function* editDeleteInvitationOrVisitor(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/invitationOrVisitor_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_INVITATION_OR_VISITOR_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_INVITATION_OR_VISITOR_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteInvitationOrVisitor() {
  yield takeLatest(EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS, editDeleteInvitationOrVisitor);
}

function* ImageUploadSaga(action) {
  try {
    const response = yield axiosClient.post('invitationOrVisitor_image', action.payload);

    yield put({ type: IMAGE_UPLOAD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: IMAGE_UPLOAD_FAILURE, payload: error.message });
  }
}

function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_PROGRESS, ImageUploadSaga);
}

function* uploadIdProofVisitorSaga(action) {
  try {
    // const response = yield axiosClient.post('/idProof_visitor', action.payload);
    const response = yield axiosClient.post('/fileAttachment', action.payload);
    yield put({ type: UPLOAD_ID_PROOF_VISITORS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPLOAD_ID_PROOF_VISITORS_FAILURE, payload: error.message });
  }
}

function* watchUploadIdProofVisitor() {
  yield takeLatest(UPLOAD_ID_PROOF_VISITORS_PROGRESS, uploadIdProofVisitorSaga);
}


function* uploadPhotoVisitorSaga(action) {
  try {
    const response = yield axiosClient.post('/fileAttachment', action.payload);
    yield put({ type: UPLOAD_PHOTO_VISITORS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPLOAD_PHOTO_VISITORS_FAILURE, payload: error.message });
  }
}

function* watchUploadPhotoVisitor() {
  yield takeLatest(UPLOAD_PHOTO_VISITORS_PROGRESS, uploadPhotoVisitorSaga);
}

// =========== DATE COUNT INVITATION OR VISITOR=========== 
function* gettodayVisitorsdateCountListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/allDatewise?host_name=${data.host_name}&&userRole=${data.userRole}`);
    yield put({ type: GET_DATEWISE_VISITORS_SUCCESS, todayvisitors: response.data });
  } catch (error) {
    yield put({ type: GET_DATEWISE_VISITORS_FAILURE });
  }
}

function* watchtodaydateCountVisitors() {
  yield takeLatest(GET_DATEWISE_VISITORS_PROGRESS, gettodayVisitorsdateCountListSaga)
}
// ===========TOMMOROW DATE COUNT INVITATION OR VISITOR=========== 
function* gettommorowVisitorsdateCountListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/gettommorowDate?host_name=${data.host_name}&&userRole=${data.userRole}`);
    yield put({ type: GET_TOMMOROWDATES_VISITORS_SUCCESS, tommorowVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_TOMMOROWDATES_VISITORS_FAILURE });
  }
}

function* watchtommorowdateCountVisitors() {
  yield takeLatest(GET_TOMMOROWDATES_VISITORS_PROGRESS, gettommorowVisitorsdateCountListSaga)
}
// ===========NEXTDATES VISITORS COUNT INVITATION OR VISITOR=========== 
function* getnextdateVisitorsdateCountListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/getnextDates?host_name=${data.host_name}&&userRole=${data.userRole}`)
    yield put({ type: GET_NEXTDATES_VISITORS_SUCCESS, nextVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_NEXTDATES_VISITORS_FAILURE })
  }
}

function* watchnextdateCountVisitors() {
  yield takeLatest(GET_NEXTDATES_VISITORS_PROGRESS, getnextdateVisitorsdateCountListSaga)
}
// ===========EXPIRED VISITORS COUNT INVITATION OR VISITOR=========== 

function* getexpireddateVisitorsCountListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/getexpiresVisitors?host_name=${data.host_name}&&userRole=${data.userRole}`)
    yield put({ type: GET_EXPIRED_VISITORS_SUCCESS, expiredVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_EXPIRED_VISITORS_FAILURE })
  }
}

function* watchexpireddateCountVisitors() {
  yield takeLatest(GET_EXPIRED_VISITORS_PROGRESS, getexpireddateVisitorsCountListSaga)
}
// ===========ALL INVITEDVISITORS COUNT INVITATION ============

function* getallinvitedCountListSaga() {
  try {
    const response = yield axiosClient.get(`/allinvitesVisitors`)
    yield put({ type: GET_ALLINVITES_VISITORS_SUCCESS, allInvitedVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_ALLINVITES_VISITORS_FAILURE })
  }
}

function* watchallinvitedCountVisitors() {
  yield takeLatest(GET_ALLINVITES_VISITORS_PROGRESS, getallinvitedCountListSaga)
}

// =====================ALL ININVITED TODAYS VISITORS ============ 

function* getinvisitortodayCountVisitors(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/invisitorsToday?host_name=${data.host_name}&&userRole=${data.userRole}`)
    yield put({ type: GET_INTODAYS_VISITORS_SUCCESS, intodaysVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_INTODAYS_VISITORS_FAILURE })
  }
}

function* watchinvisitortodayCountVisitors() {
  yield takeLatest(GET_INTODAYS_VISITORS_PROGRESS, getinvisitortodayCountVisitors)
}

// =====================ALL OUTINVITED TODAYS VISITORS ============ 

function* getoutvisitorstodayCountVisitors(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/getOutVisitors?host_name=${data.host_name}&&userRole=${data.userRole}`)
    yield put({ type: GET_OUTTODAYS_VISITORS_SUCCESS, outtodaysVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_OUTTODAYS_VISITORS_FAILURE })
  }
}

function* watchoutvisitorstodayCountVisitors() {
  yield takeLatest(GET_OUTTODAYS_VISITORS_PROGRESS, getoutvisitorstodayCountVisitors)
}

// =====================GET ALL TODAYS INVITATION VISITORS ============ 

function* getalltodaysVisitorsListSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/getalltodayinvitation?host_name=${data.host_name}&&userRole=${data.userRole}`)
    yield put({ type: GET_ALLTODAY_VISITORS_SUCCESS, alltodaysVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_ALLTODAY_VISITORS_FAILURE })
  }
}

function* watchallvisitorsCount() {
  yield takeLatest(GET_ALLTODAY_VISITORS_PROGRESS, getalltodaysVisitorsListSaga)
}

// ============GET ALL WEEKLY INVITATION VISITORS =====

function* getallweeklyVisitorsListSaga() {
  try {
    const response = yield axiosClient.get(`/weeklyCount`)
    yield put({ type: GET_WEEKLY_VISITORS_SUCCESS, weeklyVisitors: response.data })
  } catch (error) {
    yield put({ type: GET_WEEKLY_VISITORS_FAILURE })
  }
}

function* watchallweeklyVisitorsCount() {
  yield takeLatest(GET_WEEKLY_VISITORS_PROGRESS, getallweeklyVisitorsListSaga)
}

// ==============GET ALL TODAYS INVITATION VISITORS =======

function* gettodaysVisitorsListSaga() {
  try {
    const response = yield axiosClient.get(`/todaysCount`)
    yield put({ type: GET_TODAYS_VISITORS_SUCCESS, intodayvisitors: response.data })
  } catch (error) {
    yield put({ type: GET_TODAYS_VISITORS_FAILURE })
  }
}

function* watchalltodaysVisitorCount() {
  yield takeLatest(GET_TODAYS_VISITORS_PROGRESS, gettodaysVisitorsListSaga)
}

// =====================GET ALL VISITORS ============ 

function* getallVisitorsListSaga() {
  try{
    const response = yield axiosClient.get(`/gettotalVisitors`)
    yield put({ type : GET_ALL_VISITORS_SUCCESS , allVisitors: response.data })
  } catch (error) {
    yield put ({ type: GET_ALL_VISITORS_FAILURE })
  }
}

function* watchtotalVisitorsCount() {
  yield takeLatest(GET_ALL_VISITORS_PROGRESS , getallVisitorsListSaga)
}

// =====================GET ALL EMPLOYEES  ============ 

function* getallEmployeeListSaga() {
  try {
    const response = yield axiosClient.get(`/getallemployee`)
    yield put({ type : GET_ALL_EMPLOYEE_SUCCESS , allEmployees : response.data })
  } catch (error) {
    yield put ({ type : GET_ALL_EMPLOYEE_FAILURE })
  }
}

function* watchEmployeeCount() {
  yield takeLatest(GET_ALL_EMPLOYEE_PROGRESS , getallEmployeeListSaga)
}

// =====================GET CHECKOUT STATUS============ 

function* getallCheckOutListSaga() {
  try {
    const response = yield axiosClient.get(`/checkoutregistered`)
    yield put({ type : GET_CHECKOUT_REGISTER_SUCCESS , employeeCheckout : response.data })
  } catch (error) {
    yield put ({ type : GET_CHECKOUT_REGISTER_FAILURE})
  }
}
function* watchCheckoutCount() {
  yield takeLatest (GET_CHECKOUT_REGISTER_PROGRESS , getallCheckOutListSaga)
}

// =====================AVERAGE HRS EXPRESS VISITORS============ 

function* getallaverageListSaga() {
  try {
    const response = yield axiosClient.get(`/timedifference`)
    yield put({ type : GET_AVEARGE_HRS_EXPRESS_VISITOR_SUCCESS , averagehrsvisitors : response.data })
  } catch (error) {
    yield put ({ type : GET_AVEARGE_HRS_EXPRESS_VISITOR_FAILURE})
  }
}
function* watchaverageCount() {
  yield takeLatest (GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS , getallaverageListSaga)
}
// ==============AVERAGE DAY EXPRESS VISITORS============ 

function* getallaveragedayListSaga() {
  try {
    const response = yield axiosClient.get('/averageDay')
    yield put({ type : GET_AVERAGE_DAY_EXPRESS_VISITOR_SUCCESS , averagedayvisitors : response.data })
  } catch (error) {
    yield put ({ type : GET_AVERAGE_DAY_EXPRESS_VISITOR_FAILURE})
  }
}
function* watchaveragedayCount() {
  yield takeLatest (GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS , getallaveragedayListSaga)
}

// Login
function* loginSaga(action) {
  try {
    const response = yield axiosClient.post('/login', action.payload);
    localStorage.setItem('loginUser', JSON.stringify(response.data));
    yield put({ type: LOGIN_SUCCESS, loginUser: response.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_PROGRESS, loginSaga);
}

function* logoutSaga(action) {
  try {
    const logoutSession = localStorage.removeItem('loginUser');
    yield put({ type: LOGOUT_SUCCESS, loginUser: logoutSession });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, payload: error.message });
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_PROGRESS, logoutSaga);
}

// ==================COMANY_DETAILS========================
function* getCompanyDetailsListSaga() {
  try {
    const response = yield axiosClient.get(`/companyDetails_list`);
    yield put({ type: GET_COMPANY_DETAILS_LIST_SUCCESS, companyDetails: response.data });
  } catch (error) {
    yield put({ type: GET_COMPANY_DETAILS_LIST_FAILURE });
  }
}

function* watchGetCompanyDetailsList() {
  yield takeLatest(GET_COMPANY_DETAILS_LIST_PROGRESS, getCompanyDetailsListSaga);
}

function* addCompanyDetailsSaga(action) {
  try {
    const response = yield axiosClient.post('/companyDetails', action.payload);
    yield put({ type: ADD_COMPANY_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_COMPANY_DETAILS_FAILURE, payload: error.message });
  }
}

function* watchAddCompanyDetails() {
  yield takeLatest(ADD_COMPANY_DETAILS_PROGRESS, addCompanyDetailsSaga);
}

function* editDeleteCompanyDetails(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/companyDetails_edit_delete?${data._id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_COMPANY_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_COMPANY_DETAILS_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteCompanyDetails() {
  yield takeLatest(EDIT_DELETE_COMPANY_DETAILS_PROGRESS, editDeleteCompanyDetails);
}

// ==================SECURITY========================
function* getSecurityListSaga() {
  try {
    const response = yield axiosClient.get(`/security_list`);
    yield put({ type: GET_SECURITY_LIST_SUCCESS, security: response.data });
  } catch (error) {
    yield put({ type: GET_SECURITY_LIST_FAILURE });
  }
}

function* watchGetSecurityList() {
  yield takeLatest(GET_SECURITY_LIST_PROGRESS, getSecurityListSaga);
}

function* addSecuritySaga(action) {
  try {
    const response = yield axiosClient.post('/security', action.payload);
    yield put({ type: ADD_SECURITY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_SECURITY_FAILURE, payload: error.message });
  }
}

function* watchAddSecurity() {
  yield takeLatest(ADD_SECURITY_PROGRESS, addSecuritySaga);
}

function* editDeleteSecurity(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/security_edit_delete?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_SECURITY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_SECURITY_FAILURE, payload: error.message });
  }
}

function* watchEditDeleteSecurity() {
  yield takeLatest(EDIT_DELETE_SECURITY_PROGRESS, editDeleteSecurity);
}

function* uploadAadharSecuritySaga(action) {
  try {
    const response = yield axiosClient.post('/fileAttachment', action.payload);
    yield put({ type: UPLOAD_AADHAR_SECURITY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPLOAD_AADHAR_SECURITY_FAILURE, payload: error.message });

  }
}

function* watchuploadAadharSecurity() {
  yield takeLatest(UPLOAD_AADHAR_SECURITY_PROGRESS, uploadAadharSecuritySaga);
}

// ==================Generate Code==================
function* generateCodeSaga(action) {
  try {
    // const response = yield axiosClient.post('/selfRegistration', action.payload);
    const response = yield axiosClient.post('/invitationOrVisitor', action.payload);
    yield put({ type: GENERATE_CODE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GENERATE_CODE_FAILURE, payload: error.message });
  }
}

function* watchGenerateCodeSaga() {
  yield takeLatest(GENERATE_CODE_PROGRESS, generateCodeSaga);
}


function* getvistitorDetailsThroughCodeSaga(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.get(`/getDetailsThrough_invitationCode?invitationCode=${data.invitationCode}`);
    yield put({ type: GET_VISITOR_DETAILS_THROUGH_CODE_SUCCESS, visitorDetailsThroughCode: response.data });
  } catch (error) {
    yield put({ type: GET_VISITOR_DETAILS_THROUGH_CODE_FAILURE });
  }
}

function* watchGetVistitorDetailsThroughCode() {
  yield takeLatest(GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS, getvistitorDetailsThroughCodeSaga);
}

// ==================NOTIFICATIONS========================
// function* getSecurityListSaga() {
//   try {
//     const response = yield axiosClient.get(`/security_list`);
//     yield put({ type: GET_SECURITY_LIST_SUCCESS, security: response.data });
//   } catch (error) {
//     yield put({ type: GET_SECURITY_LIST_FAILURE });
//   }
// }

// function* watchGetSecurityList() {
//   yield takeLatest(GET_SECURITY_LIST_PROGRESS, getSecurityListSaga);
// }


function* addNotificationSaga(action) {
  try {
    const response = yield axiosClient.post('/notification', action.payload);
    yield put({ type: ADD_NOTIFICATION_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_NOTIFICATION_FAILURE, payload: error.message });
  }

}
function* watchaddNotificationSaga() {
  yield takeLatest(ADD_NOTIFICATION_PROGRESS, addNotificationSaga)
}



function* getNotificationListSaga() {
  try {
    const response = yield axiosClient.get('/notification_list');
    yield put({ type: GET_NOTIFICATION_LIST_SUCCESS, notification: response.data })
  } catch (error) {
    yield put({ type: GET_NOTIFICATION_LIST_FAILURE });
  }
}

function* watchGetNotificationList() {
  yield takeLatest(GET_NOTIFICATION_LIST_PROGRESS, getNotificationListSaga)
}

function* getAcceptedNotificationListSaga() {
  try {
    const response = yield axiosClient.get('/getallaccepted_notification');
    yield put({ type: GET_ACCEPTED_NOTIFICATION_LIST_SUCCESS, notificationaccepted: response.data })
  } catch (error) {
    yield put({ type: GET_ACCEPTED_NOTIFICATION_LIST_FAILURE })
  }
}

function* watchGetAcceptedNotificationListSaga() {
  yield takeLatest(GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS, getAcceptedNotificationListSaga)
}
function* editDeletenotification(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/notification_accepted?${data.visitor_id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_NOTIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_NOTIFICATION_FAILURE, payload: error.message });
  }
}
function* watchEditDeletenotification() {
  yield takeLatest(EDIT_DELETE_NOTIFICATION_PROGRESS, editDeletenotification);
}

function* editcheckoutnotification(action) {
  try {
    const data = action.payload;
    const response = yield axiosClient.put(`/notification_checkout?${data.id}&&${data.changedUpdatedValue}`, data);
    yield put({ type: EDIT_DELETE_CHECKOUTNOTIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_DELETE_CHECKOUTNOTIFICATION_FAILURE, payload: error.message })
  }
}
function* watchEditDeletecheckoutnotification() {
  yield takeLatest(EDIT_DELETE_CHECKOUTNOTIFICATION_PROGRESS, editcheckoutnotification)
}
// Export all sagas

export default function* rootSaga() {
  yield all([
    watchGetEmployeeList(), watchAddEmployee(), watchEditDeleteEmployee(),
    watchGetVisitorPurposeList(), watchAddVisitorPurpose(), watchEditDeleteVisitorPurpose(),
    watchGetDepartmentList(), watchAddDepartment(), watchEditDeleteDepartment(),
    watchGetCompanyList() , watchAddCompany(), watchEditDeleteCompany(),
    watchGetInvitationOrVisitorList(), watchAddInvitationOrVisitor(), watchEditDeleteInvitationOrVisitor(),
    watchUploadIdProofVisitor(), watchUploadPhotoVisitor(),
    watchLogin(), watchLogout(),
    watchImageUpload(), watchGetCompanyDetailsList(), watchAddCompanyDetails(), watchEditDeleteCompanyDetails(),
    watchGetSecurityList(), watchAddSecurity(), watchEditDeleteSecurity(), watchuploadAadharSecurity(),
    watchGenerateCodeSaga(), watchGetVistitorDetailsThroughCode(), watchGetNotificationList(), watchEditDeletenotification(), watchGetAcceptedNotificationListSaga(), watchEditDeletecheckoutnotification(),
    watchtodaydateCountVisitors(), watchtommorowdateCountVisitors(), watchnextdateCountVisitors(), watchexpireddateCountVisitors(), watchallinvitedCountVisitors(), watchinvisitortodayCountVisitors(),
    watchaddNotificationSaga(), watchoutvisitorstodayCountVisitors(), watchallvisitorsCount(), watchallweeklyVisitorsCount(), watchalltodaysVisitorCount() , watchtotalVisitorsCount() , watchEmployeeCount(),
    watchCheckoutCount(),watchaveragedayCount(),
    watchaverageCount()


  ])
}