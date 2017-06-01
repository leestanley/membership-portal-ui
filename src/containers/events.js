import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';

import Config from 'config';
import {Action} from 'reducers';
import EventsComponent from 'components/Events'

class Events extends React.Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchEvents();
    }
  }

  render(){
    return <div>
        <EventsComponent events={this.props.events} error={this.props.error} />
    </div>;
  }
}

const mapStateToProps = (state)=>{
    const e = state.Events;

    return {
        events: e.get('events'),
        error: e.get('error'),
        authenticated: state.Auth.get('authenticated'),
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        fetchEvents: () => {
            dispatch(Action.GetCurrentEvents());
        },

        getTime: (input)=>{
            dispatch(Action.TimeGet());
        },
    };
};


Events = connect(mapStateToProps, mapDispatchToProps)(Events);
export default Events
