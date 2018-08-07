import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import './Timeline.css';

export default class Timeline extends Component {
  state = {years: []};

  structureItems(items) {
    const structured = {};
    Object.entries(items).map(([range, desc]) => {
      const [ a, b ] = range.split(',');
      structured[a] = [(b || a) - a, desc];
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
        {years.map(([year, state]) => {
          if(cityStart = year in cities) cityCount = cities[year][0];
          if(instStart = year in institutes) instCount = institutes[year][0];
          return (
            <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
              {cityStart && <span>
                <Typography class="number"><i/>{+year + 1994}</Typography>
                <i class="city-vline"><i/></i>
                <Typography class="city" variant="subheading" noWrap>
                  <i class="fas fa-map-marker-alt"/> {cities[year][1]}
                </Typography>
              </span>}
              {+year === years.length && <Typography class="last number"><i/>{+year + 1995}</Typography>}
              {instCount >= 0 && <i class={'institute' + (instStart && ' start' || '') + (instCount-- === 0 && ' end' || '')}/>}
              <Typography align="center" class="state">{state || <i class="fas fa-child fa-lg"/>}</Typography>
            </div>
          );
        })}
      </Grid>
    );
  }
}
