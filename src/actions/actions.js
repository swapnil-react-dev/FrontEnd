import { 
    GET_EMPLOYEE_LIST_PROGRESS, ADD_EMPLOYEE_PROGRESS, EDIT_DELETE_EMPLOYEE_PROGRESS , 
    GET_VISITOR_PURPOSE_LIST_PROGRESS, ADD_VISITOR_PURPOSE_PROGRESS, EDIT_DELETE_VISITOR_PURPOSE_PROGRESS ,
    GET_DEPARTMENT_LIST_PROGRESS, ADD_DEPARTMENT_PROGRESS, EDIT_DELETE_DEPARTMENT_PROGRESS ,
    GET_INVITATION_OR_VISITOR_LIST_PROGRESS, ADD_INVITATION_OR_VISITOR_PROGRESS, EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS ,
    UPLOAD_ID_PROOF_VISITORS_PROGRESS, UPLOAD_PHOTO_VISITORS_PROGRESS,
    LOGIN_PROGRESS, LOGOUT_PROGRESS,
    GET_COMPANY_DETAILS_LIST_PROGRESS, ADD_COMPANY_DETAILS_PROGRESS, EDIT_DELETE_COMPANY_DETAILS_PROGRESS ,
    GET_SECURITY_LIST_PROGRESS, ADD_SECURITY_PROGRESS, EDIT_DELETE_SECURITY_PROGRESS , UPLOAD_AADHAR_SECURITY_PROGRESS, GENERATE_CODE_PROGRESS, GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS, 
     GET_NOTIFICATION_LIST_PROGRESS, EDIT_DELETE_NOTIFICATION_PROGRESS, GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS, EDIT_DELETE_CHECKOUTNOTIFICATION_PROGRESS, GET_DATEWISE_VISITORS_PROGRESS, GET_TOMMOROWDATES_VISITORS_FAILURE, GET_TOMMOROWDATES_VISITORS_PROGRESS, GET_NEXTDATES_VISITORS_PROGRESS, GET_EXPIRED_VISITORS_PROGRESS, GET_ALLINVITES_VISITORS_PROGRESS, GET_INTODAYS_VISITORS_PROGRESS, ADD_NOTIFICATION_PROGRESS, GET_OUTTODAYS_VISITORS_SUCCESS, GET_OUTTODAYS_VISITORS_PROGRESS, GET_ALLTODAY_VISITORS_PROGRESS, GET_WEEKLY_VISITORS_PROGRESS, GET_TODAYS_VISITORS_PROGRESS, GET_ALL_VISITORS_PROGRESS, GET_ALL_EMPLOYEE_PROGRESS, GET_CHECKOUT_REGISTER_PROGRESS, GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS, GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS,
     GET_COMPANY_LIST_PROGRESS,
     ADD_COMPANY_PROGRESS,
     EDIT_DELETE_COMPANY_PROGRESS
    
} from '../types/actionTypes';

// ==================Employee========================
export function getEmployeeList() {
    return {
        type: GET_EMPLOYEE_LIST_PROGRESS,
    };
}

export const addEmployee = (record) => ({
    type: ADD_EMPLOYEE_PROGRESS,
    payload: record,
});

export const editDeleteEmployee = (record) => ({
    type: EDIT_DELETE_EMPLOYEE_PROGRESS,
    payload: record,
});

// ==================VISITOR_PURPOSE========================
export function getVisitorPurposeList() {
    return {
        type: GET_VISITOR_PURPOSE_LIST_PROGRESS,
    };
}

export const addVisitorPurpose = (record) => ({
    type: ADD_VISITOR_PURPOSE_PROGRESS,
    payload: record,
});

export const editDeleteVisitorPurpose = (record) => ({
    type: EDIT_DELETE_VISITOR_PURPOSE_PROGRESS,
    payload: record,
});

// ==================DEPARTMENT========================
export function getDepartmentList() {
    return {
        type: GET_DEPARTMENT_LIST_PROGRESS,
    };
}

export const addDepartment = (record) => ({
    type: ADD_DEPARTMENT_PROGRESS,
    payload: record,
});

export const editDeleteDepartment = (record) => ({
    type: EDIT_DELETE_DEPARTMENT_PROGRESS,
    payload: record,
});

// ==================COMPANY========================
export function getCompanyList() {
    return {
        type: GET_COMPANY_LIST_PROGRESS
    }
}

export const addCompany = (record) => ({
    type: ADD_COMPANY_PROGRESS,
    payload: record,
});

export const editDeleteCompany = (record) => ({
    type: EDIT_DELETE_COMPANY_PROGRESS,
    payload: record,
});


// ==================INVITATION_OR_VISITOR========================
export function getInvitationOrVisitorList(record) {
    return {
        type: GET_INVITATION_OR_VISITOR_LIST_PROGRESS,
        payload: record,
    };
}

export const addInvitationOrVisitor = (record) => ({
    type: ADD_INVITATION_OR_VISITOR_PROGRESS,
    payload: record,
});

export const editDeleteInvitationOrVisitor = (record) => ({
    type: EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS,
    payload: record,
});

export const UploadIDProofVisitor = (record) => ({
    type: UPLOAD_ID_PROOF_VISITORS_PROGRESS,
    payload: record,
});

export const UploadPhotoVisitor = (record) => ({
    type: UPLOAD_PHOTO_VISITORS_PROGRESS,
    payload: record,
});

// ======= DATE COUNT INVITATION OR VISITOR======= 

export function gettodaydateCountList(record) {
    return {
        type : GET_DATEWISE_VISITORS_PROGRESS,
        payload : record 
    }
}
// =======TOMMOROW DATE COUNT INVITATION OR VISITOR====

export function gettommorowdateCountList(record) {
    return {
        type : GET_TOMMOROWDATES_VISITORS_PROGRESS,
        payload : record
    }
}


// =======NEXTDATE COUNT INVITATION OR VISITOR==== 

export function getnextdateCountList(record) {
    return {
        type : GET_NEXTDATES_VISITORS_PROGRESS,
        payload : record
    }
}

// =======EXPIRED COUNT INVITATION OR VISITOR====

export function getexpireddateCountList(record) {
    return {
        type : GET_EXPIRED_VISITORS_PROGRESS,
        payload : record
    }
}

// =======ALL INVITEDVISITORS COUNT INVITATION ====

export function getallinvitedCountList(record) {
    return {
        type : GET_ALLINVITES_VISITORS_PROGRESS,
        payload : record
    }
}

// =======ALL INTODAYSVISITORS COUNT INVITATION ====

export function getallintodaysCountList(record) {
    return {
        type : GET_INTODAYS_VISITORS_PROGRESS,
        payload : record
    }
}

// =======ALL OUTTODAYSVISITORS COUNT INVITATION ====

export function getallouttodaysCountList(record) {
    return {
        type : GET_OUTTODAYS_VISITORS_PROGRESS,
        payload : record
    }
}

// ======= GET ALL TODAYSVISITORS COUNT INVITATION ====

export function getalltodaysCountList(record) {
    return {
        type : GET_ALLTODAY_VISITORS_PROGRESS,
        payload : record 
    }
}

// ============GET ALL WEEKLY INVITATION VISITORS =====

export function getallweeklyCountList(record) {
    return {
        type : GET_WEEKLY_VISITORS_PROGRESS,
        payload : record
    }
}

// ==============GET ALL TODAYS INVITATION VISITORS =======

export function gettodaysCountList(record) {
    return {
        type : GET_TODAYS_VISITORS_PROGRESS,
        payload : record 
    }
}

// =====================GET ALL VISITORS ============ 

export function getallCountList(record) {
    return {
        type : GET_ALL_VISITORS_PROGRESS,
        payload : record
    }
}

// =====================GET ALL EMPLOYEES============ 

export function getallEmployeeList(record) {
    return {
        type : GET_ALL_EMPLOYEE_PROGRESS,
        payload : record
    }
}

// =====================GET CHECKOUT STATUS============ 

export function getallCheckOutList(record) {
    return {
        type : GET_CHECKOUT_REGISTER_PROGRESS,
        payload : record 
    }
}

// ============GET AVERAGE HRS EXPRESS VISITORS==========

export function getallAverageList(record) {
    return {
        type : GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS,
        payload : record 
    }
}

// ============AVERAGE DAY EXPRESS VISITORS============ 

export function getallAverageday() {
    return {
        type : GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS,
    }
} 

// ==================LOGIN========================
export const login = (record) => ({
    type: LOGIN_PROGRESS,
    payload: record,
});

export const logout = (record) => ({
    type: LOGOUT_PROGRESS,
    payload: record,
});

// ==================Company Deatils========================
export function getCompanyDetailsList() {
    return {
        type: GET_COMPANY_DETAILS_LIST_PROGRESS,
    };
}

export const addCompanyDetails = (record) => ({
    type: ADD_COMPANY_DETAILS_PROGRESS,
    payload: record,
});

export const editDeleteCompanyDetails = (record) => ({
    type: EDIT_DELETE_COMPANY_DETAILS_PROGRESS,
    payload: record,
});

// ==================SECURITY========================
export function getSecurityList() {
    return {
        type: GET_SECURITY_LIST_PROGRESS,
    };
}

export const addSecurity = (record) => ({
    type: ADD_SECURITY_PROGRESS,
    payload: record,
});

export const editDeleteSecurity = (record) => ({
    type: EDIT_DELETE_SECURITY_PROGRESS,
    payload: record,
});

export const UploadImageAadharSecurity = (record) => ({
    type: UPLOAD_AADHAR_SECURITY_PROGRESS,
    payload: record,
});

export const generateCode = (record) => ({
    type: GENERATE_CODE_PROGRESS,
    payload: record,
});

export const visitorDetailsThroughCode = (record) => ({
    type: GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS,
    payload: record,
});

// ==================NOTIFICATION======================== 

export const  addNotification = (record) => ({
    type : ADD_NOTIFICATION_PROGRESS,
    payload : record
})

export function getNotificationList() {
   return  {
   type : GET_NOTIFICATION_LIST_PROGRESS,
   };
}

export function getAcceptedNotificationList() {
    return {
        type : GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS,
    }
}

export const editDeletenotifications = (record) => ({
    type : EDIT_DELETE_NOTIFICATION_PROGRESS,
    payload: record,
})

export const editCheckoutnotifications = (record) => ({
    type : EDIT_DELETE_CHECKOUTNOTIFICATION_PROGRESS,
    payload: record
})
