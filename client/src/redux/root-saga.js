import { call, all } from 'redux-saga/effects';

import { onFetchCollectionsStart } from './shop/shop.saga';
import { userSagas } from './user/user.saga';
import { cartSagas } from './cart/cart.saga';

export default function* rootSaga() {
    yield all([
        call(onFetchCollectionsStart),
        call(userSagas),
        call(cartSagas)
    ]);
};