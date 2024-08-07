import {
    GET_NOTIFICATION_LIST_PROGRESS, GET_NOTIFICATION_LIST_SUCCESS, GET_NOTIFICATION_LIST_FAILURE, EDIT_DELETE_NOTIFICATION_FAILURE, RESET_MESSAGE, EDIT_DELETE_NOTIFICATION_SUCCESS, GET_ACCEPTED_NOTIFICATION_LIST_SUCCESS, GET_ACCEPTED_NOTIFICATION_LIST_FAILURE, GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS,
    EDIT_DELETE_CHECKOUTNOTIFICATION_FAILURE , EDIT_DELETE_CHECKOUTNOTIFICATION_PROGRESS , EDIT_DELETE_CHECKOUTNOTIFICATION_SUCCESS, ADD_NOTIFICATION_PROGRESS, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE

} from '../types/actionTypes';

const initialState = {
    notificationInsert : [],
    notification: [],
    notificationaccepted: [],
    error: false,
    loading: false,
    message: null,
}

const notification_reducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_NOTIFICATION_PROGRESS:
            return { ...state, loading: true};
        case ADD_NOTIFICATION_SUCCESS:
            return { ...state, notificationInsert: [...state.notificationInsert , action.payload] ,loading: false , message: action.payload.message }
        case ADD_NOTIFICATION_FAILURE:
            return { ...state , loading: false , error: action.payload , message: 'Failed to save the record, try again!'}

        case GET_NOTIFICATION_LIST_SUCCESS:
            return { ...state, notification: action.notification, loading: false };
        case GET_NOTIFICATION_LIST_FAILURE:
            return { ...state, loading: false, error: true };
        case GET_NOTIFICATION_LIST_PROGRESS:
            return { ...state, loading: true, error: false };
       
        case GET_ACCEPTED_NOTIFICATION_LIST_SUCCESS:
            return { ...state, notificationaccepted : action.notificationaccepted , loading: false};
        case GET_ACCEPTED_NOTIFICATION_LIST_FAILURE: 
            return { ...state , loading: false , error: true};
        case GET_ACCEPTED_NOTIFICATION_LIST_PROGRESS:
            return { ...state, loading: true, error: false };

        case EDIT_DELETE_NOTIFICATION_SUCCESS: 
          return {
            ...state,
            notification: state.notification.map((notification) => 
             notification.id === action.payload.id ? action.payload:notification
            ),
            message: action.payload.message
          };
        case EDIT_DELETE_NOTIFICATION_FAILURE:
            return { ...state, loading: false , error: action.payload, message: action.payload.changedUpdatedValue === 'accept' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!' }
        
        case EDIT_DELETE_CHECKOUTNOTIFICATION_SUCCESS: 
        return {
            ...state,
            notification: state.notification.map((notification) => 
            notification.id === action.payload.id ? action.payload:notification
           ),
           message: action.payload.message
        };
        
        case EDIT_DELETE_CHECKOUTNOTIFICATION_FAILURE:
            return { ...state , loading: false , error: action.payload, message: action.payload.changedUpdatedValue === 'checkoutStatus' ? 'Failed to delete the record, try again!!' : 'Failed to update the record, try again!'}

        case RESET_MESSAGE: 
         return { ...state , message: null }; 

        default:
            return state
    }
}

export default notification_reducer;