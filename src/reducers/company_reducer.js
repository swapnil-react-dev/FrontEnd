import {
    GET_COMPANY_LIST_PROGRESS, GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE,
    ADD_COMPANY_PROGRESS, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILURE,
    EDIT_DELETE_COMPANY_PROGRESS, EDIT_DELETE_COMPANY_SUCCESS,
    RESET_MESSAGE,EDIT_DELETE_COMPANY_FAILURE
} from '../types/actionTypes';


const initialState = {
    company: [],
    error: false,
    loading: false,
    message: null,
}

const company_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY_LIST_SUCCESS:
            return { ...state, company: action.company, loading: false };
        case GET_COMPANY_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_COMPANY_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_COMPANY_PROGRESS:
            return { ...state, loading: true };
        case ADD_COMPANY_SUCCESS:
            return { ...state, company: [...state.company, action.payload], loading: false, error: false, message: 'Record saved successfully!'};
        case ADD_COMPANY_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!'};
        case EDIT_DELETE_COMPANY_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_COMPANY_SUCCESS:
            return {
                ...state,
                company: state.company.map((company) =>
                company.id === action.payload.id ? action.payload : company
                ),
                message: action.payload.message
             };
        case EDIT_DELETE_COMPANY_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
            // return { ...state, loading: false, error: action.payload, message: action.payload.is_deleted === 1  ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };
        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message

        default:
            return state
    }
}

export default company_reducer;