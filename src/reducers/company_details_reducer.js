import {
    GET_COMPANY_DETAILS_LIST_PROGRESS, GET_COMPANY_DETAILS_LIST_SUCCESS, GET_COMPANY_DETAILS_LIST_FAILURE,
    ADD_COMPANY_DETAILS_PROGRESS, ADD_COMPANY_DETAILS_SUCCESS, ADD_COMPANY_DETAILS_FAILURE,
    EDIT_DELETE_COMPANY_DETAILS_PROGRESS, EDIT_DELETE_COMPANY_DETAILS_SUCCESS, EDIT_DELETE_COMPANY_DETAILS_FAILURE, 
    IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_PROGRESS, 

} from '../types/actionTypes';

const initialState = {
    companyDetails: [],
    error: false,
    imageUpload: null,
    loading: false,
}

const company_details_reducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_PROGRESS:
            return { ...state, loading: true };
        case IMAGE_UPLOAD_SUCCESS:
            return { ...state, imageUpload: action.imageUpload, loading: false, error: false };
        case IMAGE_UPLOAD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_COMPANY_DETAILS_LIST_SUCCESS:
            return { ...state, companyDetails: action.companyDetails, loading: false };
        case GET_COMPANY_DETAILS_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_COMPANY_DETAILS_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
        case ADD_COMPANY_DETAILS_PROGRESS:
            return { ...state, loading: true };
        case ADD_COMPANY_DETAILS_SUCCESS:
            return { ...state, companyDetails: [...state.companyDetails, action.payload], loading: false, error: false };
        case ADD_COMPANY_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case EDIT_DELETE_COMPANY_DETAILS_PROGRESS:
            return { ...state, loading: true };
        case EDIT_DELETE_COMPANY_DETAILS_SUCCESS:
            return {...state,
                companyDetails: state.companyDetails.map((companyDetails) =>
                    companyDetails.id === action.payload.id ? action.payload : companyDetails
                ),
            };
        case EDIT_DELETE_COMPANY_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}

export default company_details_reducer;