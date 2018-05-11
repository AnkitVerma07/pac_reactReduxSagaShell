import { fork } from 'redux-saga/effects'

import userSaga from './User/user-sagas'

const sagas = [
    userSaga
]

export default function * rootSaga () {
  yield sagas.map(saga => fork(saga))
}
