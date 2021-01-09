import Shop from '../../pages/shop/shop.component';
import ShopActionTypes from './shop.types';

export const updateCollection = (collectionMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTION,
    payload: collectionMap
});