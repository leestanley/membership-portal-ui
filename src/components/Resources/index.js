import React, { PropTypes } from 'react';

import Config from 'config';

import Sidebar from '../Sidebar/sidebar';

class ResourcesComponent extends React.Component {
    render () {
        return(
            <div className="resources">
                <Sidebar/>
            </div>
        )
    }
}

export default ResourcesComponent;
