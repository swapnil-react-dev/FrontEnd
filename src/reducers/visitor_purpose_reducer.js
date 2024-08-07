import {
    GET_VISITOR_PURPOSE_LIST_PROGRESS, GET_VISITOR_PURPOSE_LIST_SUCCESS, GET_VISITOR_PURPOSE_LIST_FAILURE,
    ADD_VISITOR_PURPOSE_PROGRESS, ADD_VISITOR_PURPOSE_SUCCESS, ADD_VISITOR_PURPOSE_FAILURE,
    EDIT_DELETE_VISITOR_PURPOSE_PROGRESS, EDIT_DELETE_VISITOR_PURPOSE_SUCCESS, EDIT_DELETE_VISITOR_PURPOSE_FAILURE,
    RESET_MESSAGE,
} from '../types/actionTypes';

const initialState = {
    visitorPurpose: [],
    error: false,
    loading: false,
    message: null,
}

const visitor_purpose_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VISITOR_PURPOSE_LIST_SUCCESS:
            return { ...state, visitorPurpose: action.visitorPurpose, loading: false };
        case GET_VISITOR_PURPOSE_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_VISITOR_PURPOSE_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_VISITOR_PURPOSE_PROGRESS:
            return { ...state, loading: true };
        case ADD_VISITOR_PURPOSE_SUCCESS:
            return { ...state, visitorPurpose: [...state.visitorPurpose, action.payload], loading: false, error: false, message: 'Record saved successfully!' };
        case ADD_VISITOR_PURPOSE_FAILURE:
            return { ...state, loading: false, error: action.payload, message: 'Failed to save the record, try again!' };
        case EDIT_DELETE_VISITOR_PURPOSE_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_VISITOR_PURPOSE_SUCCESS:
            return {
                ...state,
                visitorPurpose: state.visitorPurpose.map((visitorPurpose) =>
                    visitorPurpose.id === action.payload.id ? action.payload : visitorPurpose
                ),
                message: action.payload.message
            };
        case EDIT_DELETE_VISITOR_PURPOSE_FAILURE:
            return { ...state, loading: false, error: action.payload, message: action.payload.changedUpdatedValue === 'delete' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' };

        case RESET_MESSAGE:
            return { ...state, message: null }; // Reset the message

        default:
            return state
    }
}

export default visitor_purpose_reducer;