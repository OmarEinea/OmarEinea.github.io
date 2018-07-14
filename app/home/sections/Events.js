import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import EventCard from '~/events/card/Card';

export default class Events extends Component {
  state = {events: []};

  componentWillMount() {
    get('events/top').then(events => this.setState({events: Object.entries(events)}));
  }

  render() {
    return (
      <Grid container>
        {this.state.events.map((event) =>
          <Grid item sm={4} xs={12}>
            <EventCard event={event}/>
          </Grid>
        )}
      </Grid>
    );
  }
}
