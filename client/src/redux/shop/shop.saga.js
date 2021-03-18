import { takeLatest, put, call, all } from 'redux-saga/effects';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const collectionSnapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionSnapshotToMap, collectionSnapshot);

        yield put(fetchCollectionsSuccess(collectionMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    };
}

export function* onFetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([call(onFetchCollectionsStart)])
}