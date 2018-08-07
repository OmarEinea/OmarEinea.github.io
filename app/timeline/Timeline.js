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
      structured[a] = [desc.split(';'), (b || a) - a];
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
    const { years, cities, institutes } = this.state,
      is = (string, type) => string.includes(type) && type.toLowerCase();
    let city, cityStart, cityCount, institute, instDesc, instStart, instCount;
    return (
      <Grid container direction="column-reverse" alignItems="center"
        class="container" style={{margin: '36px auto'}}>
        {years.map(([year, state]) => {
          if(cityStart = year in cities)
            [ city, cityCount ] = cities[year];
          if(instStart = year in institutes)
            [[ institute, instDesc], instCount ] = institutes[year];
          return (
            <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
              {cityStart && <span>
                <i class="city-vline"><i/></i>
                <Typography class="number">{+year + 1994}</Typography>
                <Typography class="city" variant="subheading" noWrap>
                  <i class="fas fa-map-marker-alt"/> {city[0]}
                </Typography>
              </span>}
              {instCount === 0 && <span class="inst-box white-text"><i/>
                <Typography variant="subheading" style={instDesc && {marginBottom: 6}} noWrap>
                  <i style={{marginRight: 8}}
                    class={'fas fa-' + (is(institute, 'School') || is(institute, 'University') || '')}/>
                  <b>{institute}</b>
                </Typography>
                <Typography variant="caption">{instDesc}</Typography>
              </span>}
              {instCount >= 0 &&
                <i class={'inst-sign' + (instStart && ' start' || '') + (instCount-- === 0 && ' end' || '')}/>
              }
              <Typography align="center" style={{flex: 1, color: '#616161'}}>
                {state || <i class="fas fa-child fa-lg"/>}
              </Typography>
            </div>
          );
        })}
      </Grid>
    );
  }
}
