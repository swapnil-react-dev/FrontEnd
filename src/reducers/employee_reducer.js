import {
    GET_EMPLOYEE_LIST_PROGRESS, GET_EMPLOYEE_LIST_SUCCESS, GET_EMPLOYEE_LIST_FAILURE,
    ADD_EMPLOYEE_PROGRESS, ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_FAILURE,
    EDIT_DELETE_EMPLOYEE_PROGRESS, EDIT_DELETE_EMPLOYEE_SUCCESS, EDIT_DELETE_EMPLOYEE_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_PROGRESS,
    LOGOUT_PROGRESS, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
    RESET_MESSAGE,
    GET_ALL_EMPLOYEE_SUCCESS,
    GET_ALL_EMPLOYEE_FAILURE,
    GET_ALL_EMPLOYEE_PROGRESS,

} from '../types/actionTypes';

const initialState = {
    employee: [],
    allEmployees : null,
    loginUser: null,
    error: false,
    loading: false,
    message: null,
}

const employee_reducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_PROGRESS:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loginUser: action.loginUser, loading: false, error: false };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT_PROGRESS:
            return { ...state, loading: true };
        case LOGOUT_SUCCESS:
            return { ...state, loginUser: null, loading: false, error: false };
        case LOGOUT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // -----------------------------***********------------------------------
        case GET_EMPLOYEE_LIST_SUCCESS:
            return { ...state, employee: action.employee, loading: false };
        case GET_EMPLOYEE_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_EMPLOYEE_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_EMPLOYEE_PROGRESS:
            return { ...state, loading: true };
        case ADD_EMPLOYEE_SUCCESS:
            return { ...state, employee: [...state.employee, action.payload], loading: false, error: false, message: 'Record saved successfully!' };
        case ADD_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!' };
        case EDIT_DELETE_EMPLOYEE_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employee: state.employee.map((employee) =>
                    employee.id === action.payload.id ? action.payload : employee
                ),
                message: action.payload.message
            };
        case EDIT_DELETE_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
        
        case GET_ALL_EMPLOYEE_SUCCESS:
            return { ...state , allEmployees : action.allEmployees }
        case GET_ALL_EMPLOYEE_FAILURE:
            return { ...state , loading: false , error: true }
        case GET_ALL_EMPLOYEE_PROGRESS:
            return { ...state, loading : true , error: true }
        
        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message

        default:
            return state
    }
}

export default employee_reducer;