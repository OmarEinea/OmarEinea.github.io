import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';

export default class Timeline extends Component {
  state = {years: []};

  componentWillMount() {
    get('timeline').then(timeline => {
      const { years, cities } = timeline, start = [], end = [];
      Object.entries(cities).map(([range, _]) => {
        const [ a, b ] = range.split(',');
        start.push(a);
        end.push(b || a);
      });
      console.log(start, end);
      this.setState({years: Object.entries(years).slice(1), start, end})  ;
    });
  }

  render() {
    const { years, start, end } = this.state;
    return (
      <Grid container direction="column" alignItems="center"
        class="container" style={{margin: '24px auto'}}>
        {years.map(([year, state]) =>
          <div class={'year' + (start.includes(year) && ' start' || '') + (end.includes(year) && ' end' || '')}>
            <Typography align="center" style={{flex: 1}}>{state}</Typography>
          </div>
        )}
      </Grid>
    );
  }
}
