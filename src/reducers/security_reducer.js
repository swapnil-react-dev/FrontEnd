import {
    GET_SECURITY_LIST_PROGRESS, GET_SECURITY_LIST_SUCCESS, GET_SECURITY_LIST_FAILURE,
    ADD_SECURITY_PROGRESS, ADD_SECURITY_SUCCESS, ADD_SECURITY_FAILURE,
    EDIT_DELETE_SECURITY_PROGRESS, EDIT_DELETE_SECURITY_SUCCESS, EDIT_DELETE_SECURITY_FAILURE,
    UPLOAD_AADHAR_SECURITY_PROGRESS, UPLOAD_AADHAR_SECURITY_SUCCESS, UPLOAD_AADHAR_SECURITY_FAILURE,
    RESET_MESSAGE,

} from '../types/actionTypes';

const initialState = {
    security: [],
    SecurityAadharImage: null,
    error: false,
    loading: false,
    message: null,
}

const security_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SECURITY_LIST_SUCCESS:
            return { ...state, security: action.security, loading: false };
        case GET_SECURITY_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_SECURITY_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_SECURITY_PROGRESS:
            return { ...state, loading: true };
        case ADD_SECURITY_SUCCESS:
            return { ...state, security: [...state.security, action.payload], loading: false, error: false, message: 'Record saved successfully!' };
        case ADD_SECURITY_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!' };
        case EDIT_DELETE_SECURITY_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_SECURITY_SUCCESS:
            return {
                ...state,
                security: state.security.map((security) =>
                    security.id === action.payload.id ? action.payload : security
                ),
                message: action.payload.message
            };
        case EDIT_DELETE_SECURITY_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
        case UPLOAD_AADHAR_SECURITY_PROGRESS:
            return { ...state, loading: true };
        case UPLOAD_AADHAR_SECURITY_SUCCESS:
            return { ...state, SecurityAadharImage: action.payload.result || null, loading: false, error: false, };
        case UPLOAD_AADHAR_SECURITY_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.message };
        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message
        default:
            return state
    }
}
export default security_reducer;