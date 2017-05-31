import React from 'react'
import AdminEventCard from './adminEventCard'

export default class EventMonth extends React.Component {

    render () {
        var month;
        if(this.props.event.length > 0) {
            month = this.props.event[0].date.format('MMMM')
            this.props.event[0].firstDay = true;
        }

        for(let i = 1; i < this.props.event.length; i++) {
            if(this.props.event[i].date.format('dd') === this.props.event[i-1].date.format('dd')) {
                this.props.event[i].firstDay = false;
            }
            else {
                this.props.event[i].firstDay = true;
            }
        }

        return(
            <div className={"event-day" + (this.props.admin ? " admin-dashboard" : "")}>
                <h1 className="Display-2Primary date-month">{month}</h1>
                { this.props.event.map((ev, i) => <AdminEventCard event={ev} key={i} admin={this.props.admin} onClick={this.props.onClick} />) }
            </div>
        );
    }
}