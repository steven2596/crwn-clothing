import React from 'react';
import './shop.style.scss';
import SHOP_DATA from './shop.data.js';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';


class Shop extends React.Component {
    constructor() {
        super();

        this.state = {
            collections: SHOP_DATA
        };
    }

    render() {
        const { collections } = this.state;
        return (
            <div>
                {
                    collections.map(({ id, ...others }) => (
                        <div>
                            <CollectionPreview key={id} {...others} />
                        </div>
                    ))
                }

            </div>
        )
    }
}

export default Shop;