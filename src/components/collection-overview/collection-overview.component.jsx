import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import './collection-overview.style.scss';

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionOverview = ({ collections }) => (
    <div className='collection-overview' >
        {
            collections.map(({ id, ...others }) => (
                <div>
                    <CollectionPreview key={id} {...others} />
                </div>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverview);