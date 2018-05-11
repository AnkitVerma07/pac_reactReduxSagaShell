import {call, put, takeLatest} from 'redux-saga/effects'

import {
    GET_RECENT_ACCOUNTS,
    RECENT_ACCOUNTS_SUCCESS,
    RECENT_ACCOUNTS_FAIL
} from './user-actions'
import {
    fetchRecentAccounts
} from '../../global/api/'

function* getRecentAccounts() {
    try {
        const accountsData = yield call(fetchRecentAccounts)
        yield put({type: RECENT_ACCOUNTS_SUCCESS, payload: accountsData})
    } catch (e) {
        yield put({type: RECENT_ACCOUNTS_FAIL, message: e.message})
    }
}

export default function* accountSearchSaga() {
    yield takeLatest(GET_RECENT_ACCOUNTS, getRecentAccounts)
}