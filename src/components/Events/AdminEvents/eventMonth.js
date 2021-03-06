import React from 'react';
import EventDay from './eventDay';

export default class EventMonth extends React.Component {
  render() {
    return (
      <div className="event-month">
        <h1 className="Display-2Primary date-month">
Events in
          {this.props.month.date.format('MMMM')}
        </h1>
        { this.props.month.days.map((day, i) => <EventDay day={day} key={day.date.toString()} handleEditClick={this.props.handleEditClick} />) }
      </div>
    );
  }
}
