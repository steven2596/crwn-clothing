import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.style.scss';

import WithSpinner from '../../components/withspinner/with-spinner.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollection } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollection } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async (snapshot) => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            updateCollection(collectionMap);
            this.setState({ loading: false });
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page' >
                <Route exact
                    path={`${match.path}`}
                    render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
                />

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollection: collectionMap => dispatch(updateCollection(collectionMap))
});

export default connect(null, mapDispatchToProps)(Shop);

// The purpose of props in <Route render={ (props) => <component/> } />
//-so that the component can use those props such as match, history, location.

// collectionMap = {
//     hats: {
//         id: ,
//         items: ,
//         routeName: ,
//         title:
//     },
//     ...
// }