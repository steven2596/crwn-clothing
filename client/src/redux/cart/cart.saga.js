import { takeLatest, call, put, all } from 'redux-saga/effects';

import { clearCart } from './cart.actions';
import { UserActionTypes } from '../user/user.types';

export function* clearUserCart() {
    yield put(clearCart())
};

export function* onUserSignOutToClearCart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,
        clearUserCart
    )
};

export function* cartSagas() {
    yield all([call(onUserSignOutToClearCart)])
};