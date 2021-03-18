import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import './shop.style.scss';

import WithSpinner from '../../components/withspinner/with-spinner.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';


import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollectionsStatus } from '../../redux/shop/shop.selectors';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
    // render() will run before componentDidMount()
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }

    render() {
        const { match, isCollectionsLoaded } = this.props;

        return (
            <div className='shop-page' >
                <Route exact
                    path={`${match.path}`}
                    render={(props) => <CollectionOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                />

            </div>
        )
    }
}

// If isCollectionsLoaded = true, we want isLoading to be false so that it returns wrapped component
// If isCollectionsLoaded = false, we want isLoading to be true so that it returns loading screen
const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectCollectionsStatus
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

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