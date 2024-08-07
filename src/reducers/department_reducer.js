import {
    GET_DEPARTMENT_LIST_PROGRESS, GET_DEPARTMENT_LIST_SUCCESS, GET_DEPARTMENT_LIST_FAILURE,
    ADD_DEPARTMENT_PROGRESS, ADD_DEPARTMENT_SUCCESS, ADD_DEPARTMENT_FAILURE,
    EDIT_DELETE_DEPARTMENT_PROGRESS, EDIT_DELETE_DEPARTMENT_SUCCESS, EDIT_DELETE_DEPARTMENT_FAILURE,
    RESET_MESSAGE,
} from '../types/actionTypes';

const initialState = {
    department: [],
    error: false,
    loading: false,
    message: null,
}

const department_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT_LIST_SUCCESS:
            return { ...state, department: action.department, loading: false };
        case GET_DEPARTMENT_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_DEPARTMENT_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_DEPARTMENT_PROGRESS:
            return { ...state, loading: true };
        case ADD_DEPARTMENT_SUCCESS:
            return { ...state, department: [...state.department, action.payload], loading: false, error: false, message: 'Record saved successfully!'};
        case ADD_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!'};
        case EDIT_DELETE_DEPARTMENT_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                department: state.department.map((department) =>
                    department.id === action.payload.id ? action.payload : department
                ),
                message: action.payload.message
             };
        case EDIT_DELETE_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
            // return { ...state, loading: false, error: action.payload, message: action.payload.is_deleted === 1  ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message

        default:
            return state
    }
}

export default department_reducer;