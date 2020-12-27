import React from 'react';

import { withRouter } from 'react-router-dom';

import './menu-item.style.scss';

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
    console.log(match.url);
    return (
        <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)} >
            <div style=
                {{ backgroundImage: `url(${imageUrl})` }}
                className="background-image" />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <p className="subtitle">SHOP NOW</p>
            </div>
        </div >
    )
}
//withRouter is used  because we want to have access to history.push() method
export default withRouter(MenuItem);

// match.url+linkUrl = '/hats'
