import Shop from '../../pages/shop/shop.component';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

//Purpose of fetchCollectionsStartAsync:
// It returns a function which receives dispatch as parameter
// 1. fetchCollectionsStart sets isFetching: true
// 2. When collections data comes back from firebase, 
//    fetchCollectionsSuccess put those datas into shop.collections and sets isFetching: false
// 3. If error occurs during fetching data, fetchCollectionsFailure() will be called.
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());

//         collectionRef.get()
//             .then(snapshot => {
//                 const collectionMap = convertCollectionSnapshotToMap(snapshot);
//                 dispatch(fetchCollectionsSuccess(collectionMap));
//             })
//             .catch(error => {
//                 dispatch(fetchCollectionsFailure(error.message));
//             })
//     }
// };
