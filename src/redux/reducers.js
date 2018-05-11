import { combineReducers } from 'redux'

import {
    recentAccountSearchReducer
} from './User/user-reducers'

const reducers = combineReducers({
    recentAccounts: recentAccountSearchReducer
})

export default reducers
