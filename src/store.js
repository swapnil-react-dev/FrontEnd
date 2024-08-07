import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
 const store = createStore(
  reducer,
  // initialState,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store