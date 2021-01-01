import { createSelector } from 'reselect';

import memoize from 'lodash.memoize';

export const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
);


export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
    ));

//Example: if url is '/shop/jackets',
// collectionUrlParam = jackets, which mean COLLECTION_ID_MAP[collectionUrlParam] = 3
// so collections.find() will return jackets collection

