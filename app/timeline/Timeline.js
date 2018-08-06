import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import './Timeline.css';

export default class Timeline extends Component {
  state = {years: []};

  componentWillMount() {
    get('timeline').then(timeline => {
      const { years, cities } = timeline, starts = [], ends = [];
      Object.entries(cities).map(([range, _]) => {
        const [ a, b ] = range.split(',');
        starts.push(a);
        ends.push(b || a);
      });
      this.setState({years: Object.entries(years).slice(1), starts, ends})  ;
    });
  }

  render() {
    const { years, starts, ends } = this.state;
    return (
      <Grid container direction="column" alignItems="center"
        class="container" style={{margin: '24px auto'}}>
        {years.map(([year, state], index) => {
          const start = starts.includes(year);
          return (
            <div class={'year' + (start && ' start' || '') + (ends.includes(year) && ' end' || '')}>
              {start && <Typography class="number"><i/>{+year + 1994}</Typography>}
              <Typography align="center" class="state">{state}</Typography>
              {index === years.length - 1 &&
                <Typography class="last number"><i/>{+year + 1995}</Typography>
              }
            </div>
          );
        })}
      </Grid>
    );
  }
}
