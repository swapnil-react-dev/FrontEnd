import {
    GET_INVITATION_OR_VISITOR_LIST_PROGRESS, GET_INVITATION_OR_VISITOR_LIST_SUCCESS, GET_INVITATION_OR_VISITOR_LIST_FAILURE,
    ADD_INVITATION_OR_VISITOR_PROGRESS, ADD_INVITATION_OR_VISITOR_SUCCESS, ADD_INVITATION_OR_VISITOR_FAILURE,
    EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS, EDIT_DELETE_INVITATION_OR_VISITOR_SUCCESS, EDIT_DELETE_INVITATION_OR_VISITOR_FAILURE,
    IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_PROGRESS,
    UPLOAD_ID_PROOF_VISITORS_PROGRESS, UPLOAD_ID_PROOF_VISITORS_SUCCESS, UPLOAD_ID_PROOF_VISITORS_FAILURE,
    UPLOAD_PHOTO_VISITORS_PROGRESS, UPLOAD_PHOTO_VISITORS_SUCCESS, UPLOAD_PHOTO_VISITORS_FAILURE,
    GENERATE_CODE_SUCCESS, GENERATE_CODE_FAILURE, GENERATE_CODE_PROGRESS,
    GET_VISITOR_DETAILS_THROUGH_CODE_SUCCESS, GET_VISITOR_DETAILS_THROUGH_CODE_FAILURE, GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS,
    GET_DATEWISE_VISITORS_PROGRESS, GET_DATEWISE_VISITORS_SUCCESS, GET_DATEWISE_VISITORS_FAILURE,
    RESET_MESSAGE,
    GET_TOMMOROWDATES_VISITORS_SUCCESS,
    GET_TOMMOROWDATES_VISITORS_FAILURE,
    GET_TOMMOROWDATES_VISITORS_PROGRESS,
    GET_NEXTDATES_VISITORS_FAILURE, GET_NEXTDATES_VISITORS_PROGRESS, GET_NEXTDATES_VISITORS_SUCCESS, GET_EXPIRED_VISITORS_SUCCESS, GET_EXPIRED_VISITORS_FAILURE, GET_EXPIRED_VISITORS_PROGRESS, GET_ALLINVITES_VISITORS_SUCCESS, GET_ALLINVITES_VISITORS_FAILURE, GET_ALLINVITES_VISITORS_PROGRESS, GET_INTODAYS_VISITORS_SUCCESS, GET_INTODAYS_VISITORS_FAILURE, GET_INTODAYS_VISITORS_PROGRESS, GET_OUTTODAYS_VISITORS_SUCCESS, GET_OUTTODAYS_VISITORS_FAILURE, GET_OUTTODAYS_VISITORS_PROGRESS, GET_ALLTODAY_VISITORS_SUCCESS, GET_ALLTODAY_VISITORS_FAILURE, GET_ALLTODAY_VISITORS_PROGRESS, GET_WEEKLY_VISITORS_SUCCESS, GET_WEEKLY_VISITORS_FAILURE, GET_WEEKLY_VISITORS_PROGRESS, GET_TODAYS_VISITORS_SUCCESS, GET_TODAYS_VISITORS_FAILURE, GET_TODAYS_VISITORS_PROGRESS, GET_ALL_VISITORS_SUCCESS, GET_ALL_VISITORS_FAILURE, GET_ALL_VISITORS_PROGRESS, GET_CHECKOUT_REGISTER_FAILURE, GET_CHECKOUT_REGISTER_SUCCESS, GET_CHECKOUT_REGISTER_PROGRESS, GET_AVEARGE_HRS_EXPRESS_VISITOR_SUCCESS, GET_AVEARGE_HRS_EXPRESS_VISITOR_FAILURE, GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS, GET_AVERAGE_DAY_EXPRESS_VISITOR_SUCCESS, GET_AVERAGE_DAY_EXPRESS_VISITOR_FAILURE, GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS
} from '../types/actionTypes';

const initialState = {
    invitationOrVisitor: [],
    visitorDetailsThroughCode: {},
    IdProofVisitor: null,
    todayvisitors: [],
    tommorowVisitors: [],
    nextVisitors: [],
    expiredVisitors: [],
    allInvitedVisitors: [],
    intodaysVisitors: [],
    outtodaysVisitors: [],
    alltodaysVisitors: [],
    weeklyVisitors: [],
    intodayvisitors: [],
    allVisitors: [],
    employeeCheckout: [],
    averagehrsvisitors: [],
    averagedayvisitors: [],
    photoVisitor: null,
    generateCode: null,
    error: false,
    imageUpload: null,
    loading: false,
    message: null,
}

const invitation_or_visitor_reducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_PROGRESS:
            return { ...state, loading: true };
        case IMAGE_UPLOAD_SUCCESS:
            return { ...state, imageUpload: action.imageUpload, loading: false, error: false };
        case IMAGE_UPLOAD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_INVITATION_OR_VISITOR_LIST_SUCCESS:
            return { ...state, invitationOrVisitor: action.invitationOrVisitor, loading: false };
        case GET_INVITATION_OR_VISITOR_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_INVITATION_OR_VISITOR_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_INVITATION_OR_VISITOR_PROGRESS:
            return { ...state, loading: true };
        case ADD_INVITATION_OR_VISITOR_SUCCESS:
            return { ...state, invitationOrVisitor: [...state.invitationOrVisitor, action.payload], loading: false, error: false, message: 'Record saved successfully!' };
        case ADD_INVITATION_OR_VISITOR_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!' };
        case EDIT_DELETE_INVITATION_OR_VISITOR_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_INVITATION_OR_VISITOR_SUCCESS:
            return {
                ...state,
                invitationOrVisitor: state.invitationOrVisitor.map((invitationOrVisitor) =>
                    invitationOrVisitor.id === action.payload.id ? action.payload : invitationOrVisitor
                ),
                message: action.payload.message
            };
        case EDIT_DELETE_INVITATION_OR_VISITOR_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };

        case UPLOAD_ID_PROOF_VISITORS_PROGRESS:
            return { ...state, loading: true };
        case UPLOAD_ID_PROOF_VISITORS_SUCCESS:
            return { ...state, IdProofVisitor: action.payload.result || null, loading: false, error: false };
        case UPLOAD_ID_PROOF_VISITORS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPLOAD_PHOTO_VISITORS_PROGRESS:
            return { ...state, loading: true };
        case UPLOAD_PHOTO_VISITORS_SUCCESS:
            return { ...state, photoVisitor: action.payload.result || null, loading: false, error: false };
        case UPLOAD_PHOTO_VISITORS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GENERATE_CODE_PROGRESS:
            return { ...state, loading: true };
        case GENERATE_CODE_SUCCESS:
            return { ...state, generateCode: action.payload.scanCode, loading: false, error: false, message: 'Code generated successfully!' };

        case GENERATE_CODE_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to generate a code, try again!' };

        case GET_VISITOR_DETAILS_THROUGH_CODE_SUCCESS:
            return { ...state, visitorDetailsThroughCode: action.visitorDetailsThroughCode[0], loading: false };
        case GET_VISITOR_DETAILS_THROUGH_CODE_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_VISITOR_DETAILS_THROUGH_CODE_PROGRESS:
            return { ...state, loading: true, error: false };

        case GET_DATEWISE_VISITORS_SUCCESS:
            return { ...state, todayvisitors: action.todayvisitors, loading: false };
        case GET_DATEWISE_VISITORS_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_DATEWISE_VISITORS_PROGRESS:
            return { ...state, loading: true, error: false }

        case GET_TOMMOROWDATES_VISITORS_SUCCESS:
            return { ...state, tommorowVisitors: action.tommorowVisitors, loading: false }
        case GET_TOMMOROWDATES_VISITORS_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_TOMMOROWDATES_VISITORS_PROGRESS:
            return { ...state, loading: true, error: true }
        
        case GET_NEXTDATES_VISITORS_SUCCESS:
            return { ...state , nextVisitors : action.nextVisitors, loading: false }
        case GET_NEXTDATES_VISITORS_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_NEXTDATES_VISITORS_PROGRESS:
            return { ...state , loading: true, error: true }
        
        case GET_EXPIRED_VISITORS_SUCCESS:
            return { ...state , expiredVisitors : action.expiredVisitors, loading: false}
        case GET_EXPIRED_VISITORS_FAILURE:
            return {...state , loading: false , error: true}
        case GET_EXPIRED_VISITORS_PROGRESS:
            return { ...state , loading: true , error: true}
        
        case GET_ALLINVITES_VISITORS_SUCCESS:
            return { ...state , allInvitedVisitors : action.allInvitedVisitors, loading: false}
        case GET_ALLINVITES_VISITORS_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_ALLINVITES_VISITORS_PROGRESS:
            return { ...state , loading: true , error: true}
        
        case GET_INTODAYS_VISITORS_SUCCESS:
            return { ...state , intodaysVisitors : action.intodaysVisitors , loading: false} 
        case GET_INTODAYS_VISITORS_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_INTODAYS_VISITORS_PROGRESS:
            return { ...state , loading: true , error: true}

        case GET_OUTTODAYS_VISITORS_SUCCESS:
            return { ...state, outtodaysVisitors : action.outtodaysVisitors , loading: false }
        case GET_OUTTODAYS_VISITORS_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_OUTTODAYS_VISITORS_PROGRESS:
            return { ...state , loading : true , error: true}
        
        case GET_ALLTODAY_VISITORS_SUCCESS: 
         return { ...state , alltodaysVisitors : action.alltodaysVisitors , loading: false }
        case GET_ALLTODAY_VISITORS_FAILURE:
         return { ...state , loading: false , error: true }
        case GET_ALLTODAY_VISITORS_PROGRESS:
         return { ...state , loading : true , error: true}

         case GET_WEEKLY_VISITORS_SUCCESS:
            return {...state , weeklyVisitors : action.weeklyVisitors , loading: false }
         case GET_WEEKLY_VISITORS_FAILURE:
            return { ...state , loading: false , error: true }
         case GET_WEEKLY_VISITORS_PROGRESS:
            return { ...state , loading : true , error: true }
        
        case GET_TODAYS_VISITORS_SUCCESS:
            return { ...state , intodayvisitors : action.intodayvisitors , loading: false }
        case GET_TODAYS_VISITORS_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_TODAYS_VISITORS_PROGRESS:
            return { ...state , loading : true , error: true}
        
        case GET_ALL_VISITORS_SUCCESS:
            return { ...state , allVisitors : action.allVisitors , loading: false }
        case GET_ALL_VISITORS_FAILURE:
            return { ...state , loading: false , error: true }
        case GET_ALL_VISITORS_PROGRESS:
            return { ...state , loading : true , error: true }
        
        case GET_CHECKOUT_REGISTER_SUCCESS:
            return { ...state , employeeCheckout: action.employeeCheckout , loading: false}
        case GET_CHECKOUT_REGISTER_FAILURE:
            return { ...state , loading: false , error: true }
        case GET_CHECKOUT_REGISTER_PROGRESS:
            return { ...state , loading : true , error: true }   

        case GET_AVEARGE_HRS_EXPRESS_VISITOR_SUCCESS:
            return { ...state , averagehrsvisitors: action.averagehrsvisitors , loading: false}
        case GET_AVEARGE_HRS_EXPRESS_VISITOR_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_AVEARGE_HRS_EXPRESS_VISITOR_PROGRESS:
            return { ...state , loading: true , error : true}    
        
        case GET_AVERAGE_DAY_EXPRESS_VISITOR_SUCCESS:
            return { ...state , averagedayvisitors: action.averagedayvisitors , loading: false}
        case GET_AVERAGE_DAY_EXPRESS_VISITOR_FAILURE:
            return { ...state , loading: false , error: true}
        case GET_AVERAGE_DAY_EXPRESS_VISITOR_PROGRESS:
            return { ...state , loading: true , error : true}

        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message

        default:
            return state
    }
}

export default invitation_or_visitor_reducer;