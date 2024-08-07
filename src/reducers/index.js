import { combineReducers } from 'redux'
import employee_reducer from './employee_reducer'
import department_reducer from './department_reducer'
import visitor_purpose_reducer from './visitor_purpose_reducer'
import invitation_or_visitor_reducer from './invitation_or_visitor_reducer'
import company_details_reducer from './company_details_reducer'
import security_reducer from './security_reducer'
import notification_reducer from './notification_reducer'
import company_reducer from './company_reducer'

export default combineReducers({
  employee: employee_reducer,
  visitorPurpose: visitor_purpose_reducer,
  department: department_reducer, 
  invitationOrVisitor: invitation_or_visitor_reducer,
  companyDetails: company_details_reducer,  
  security: security_reducer,  
  notification: notification_reducer,
  company : company_reducer
})

// If we are going to have several reducers, we must use combine them because there can only be one
