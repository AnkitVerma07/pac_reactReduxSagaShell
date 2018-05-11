import {
    GET_RECENT_ACCOUNTS,
    RECENT_ACCOUNTS_SUCCESS,
    RECENT_ACCOUNTS_FAIL
} from './user-actions'
import {getErrorMessage , errorConstants} from '../../global/common/ErrorHandler/ErrorUtil'

const defaultState = {
    events: null
}

export const recentAccountSearchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_RECENT_ACCOUNTS:
            return state
        case RECENT_ACCOUNTS_SUCCESS:
            if (action.payload.data) {
                return {
                    ...state,
                    events: action.payload.data
                }
            }
            if (action.payload.status.cd !== 0) {
                let knownError = getErrorMessage(action.payload.status.cd, action.payload.status.constant)
                return {
                    ...state,
                    events: {
                        message: knownError.found ? knownError.message : action.payload.status.mgs[0],
                        error: true,
                        type: action.type,
                        payload: action.payload
                    }
                }
            }
            return {
                ...state,
                events: {
                    error: true,
                    message: errorConstants.CONSTANT_MESSAGE,
                    type: action.type,
                    payload: action.payload
                }
            }
        case
        RECENT_ACCOUNTS_FAIL:
            return {
                ...state,
                events: {
                    error: true,
                    message: action.message,
                    type: action.type,
                    payload: action.payload
                }
            }
        default:
            return state
    }
}