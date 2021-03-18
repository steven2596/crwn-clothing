import { createSelector } from 'reselect';

import memoize from 'lodash.memoize';

export const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// !! before Truthy or Falsy will give boolean value which is true or false
export const selectCollectionsStatus = createSelector(
    [selectShop],
    shop => !!shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectShopIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);


export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectShopCollections],
        collections => collections ? collections[collectionUrlParam] : null
    ));

//Example: if url is '/shop/jackets',
// collectionUrlParam = jackets, which mean COLLECTION_ID_MAP[collectionUrlParam] = 3
// so collections.find() will return jackets collection

