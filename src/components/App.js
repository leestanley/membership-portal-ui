import React, { PropTypes } from 'react';

import SideBar from './components/Sidebar/sidebar';


class App extends React.Component {
    render () {
        return(
            <div className="App-main">
                <Sidebar />
                {this.props.children}
            </div>
        );
    }
}

export default App;
