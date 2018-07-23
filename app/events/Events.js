import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import EventCard from './card/EventCard';

export default class Events extends Component {
  state = {events: []};

  componentWillMount() {
    get('events').then(events => {
      const { top } = events;
      delete events.top;
      for(let key in events) {
        let category = events[key];
        for(let event in category)
          if(category[event] === -1)
            category[event] = top[event];
        events[key] = Object.entries(category);
      }
      this.setState({events: Object.entries(events)});
    });
  }

  render() {
    return (
      <Grid container class="container" style={{marginBottom: 24}}>
        {this.state.events.map(([category, events]) =>
          <Grid container justify="center">
            <Typography variant="display1" class="category">{category}</Typography>
            {events.map(event =>
              <Grid item md={4} sm={6} xs={12}>
                <EventCard event={event}/>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
