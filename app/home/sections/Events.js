import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import EventCard from '~/events/card/Card';

export default class Events extends Component {
  state = {events: []};

  componentWillMount() {
    get('events/top').then(events => {
      const { order } = events, orderedEvents = [];
      delete events.order;
      events = Object.entries(events);
      order.split(',').map(index => orderedEvents.push(events[index - 1]));
      this.setState({events: orderedEvents});
    });
  }

  render() {
    return (
      <Grid container justify="center">
        {this.state.events.map((event) =>
          <Grid item md={4} sm={6} xs={12}>
            <EventCard event={event}/>
          </Grid>
        )}
      </Grid>
    );
  }
}
