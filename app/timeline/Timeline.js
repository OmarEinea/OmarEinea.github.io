import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import './Timeline.css';

export default class Timeline extends Component {
  state = {years: []};

  structureItems(items) {
    const structured = {};
    Object.entries(items).map(([range, _]) => {
      const [ a, b ] = range.split(',');
      structured[a] = (b || a) - a;
    });
    return structured;
  }
  componentWillMount() {
    get('timeline').then(({ years, cities, institutes }) => {
      this.setState({
        years: Object.entries(years).slice(1),
        cities: this.structureItems(cities),
        institutes: this.structureItems(institutes)
      });
    });
  }

  render() {
    const { years, cities, institutes } = this.state;
    let cityStart, cityCount, instStart, instCount;
    return (
      <Grid container direction="column" alignItems="center"
        class="container" style={{margin: '24px auto'}}>
        {years.map(([year, state], index) => {
          if(cityStart = year in cities) cityCount = cities[year];
          if(instStart = year in institutes) instCount = institutes[year];
          return (
            <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
              {cityStart && <Typography class="number"><i/>{+year + 1994}</Typography>}
              {instCount >= 0 && <i class={'institute' + (instStart && ' start' || '') + (instCount-- === 0 && ' end' || '')}/>}
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
