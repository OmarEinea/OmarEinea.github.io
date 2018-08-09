import { Component } from 'react';
import { Grid, Typography, FormControlLabel, RadioGroup, Radio, Tooltip } from 'material-ui';
import { get } from 'db';
import './Timeline.css';

export default class Timeline extends Component {
  state = {years: [], showEvents: true};

  structureItems(items) {
    const structured = {};
    Object.entries(items).map(([range, desc]) => {
      const [ a, b ] = range.split(',');
      structured[a] = [desc.split(';'), (b || a) - a];
    });
    return structured;
  }

  componentWillMount() {
    (this.onResize = () => this.setState({pc: window.innerWidth > 650}))();
    get('timeline').then(({ years, cities, institutes, events }) => this.setState({
      years: Object.entries(years).slice(1),
      cities: this.structureItems(cities),
      institutes: this.structureItems(institutes),
      events
    }));
  }

  render() {
    const { years, cities, institutes, events, showEvents, pc } = this.state,
      is = (string, type) => string.includes(type) && type.toLowerCase();
    let city, cityStart, cityCount, institute, instDesc, instStart, instCount;
    return (
      <Grid container direction="column-reverse"
        alignItems={pc ? 'center': showEvents ? 'flex-end' : 'flex-start'}
        class="container" style={{margin: '48px auto 36px', overflow: 'hidden'}}>
        {years.map(([year, state], index) => {
          if(cityStart = year in cities)
            [ city, cityCount ] = cities[year];
          if(instStart = year in institutes)
            [[ institute, instDesc], instCount ] = institutes[year];
          return (
            <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
              {showEvents && cityStart && <span>
                <b class="city-vline"><i/>
                  <Typography class="number">{+year + 1994}</Typography>
                </b>
                <Typography class="city" variant="subheading" noWrap>
                  <i class="fas fa-map-marker-alt"/> {city[0]}
                </Typography>
              </span>}
              {(pc || !showEvents) && <span>
                {instCount === 0 && <span class="inst-box white-text"><i/>
                  <Typography variant="subheading" style={instDesc && {marginBottom: 6}} noWrap>
                    <i style={{marginRight: 8}}
                      class={'fas fa-' + (is(institute, 'School') || is(institute, 'University') || '')}/>
                    <b>{institute}</b>
                  </Typography>
                  <Typography variant="caption">{instDesc}</Typography>
                </span>}
                {instCount >= 0 &&
                  <i class={'inst-sign' + (instStart ? ' start' : '') + (instCount-- === 0 ? ' end' : '')}/>
                }
              </span>}
              {(pc || showEvents) && year in events &&
                <Typography class={'white-text event' + (year - 1 in events ? ' up': '')}>
                  <i/>{events[year]}
                </Typography>
              }
              <Typography align="center" style={{flex: 1, color: '#616161'}}>
                <Tooltip title={year + ' years old' + (index === years.length - 1 ? ' (NOW)' : '')}>
                  {state ? <span>{state}</span> : <i class="fas fa-child fa-lg"/>}
                </Tooltip>
              </Typography>
            </div>
          );
        })}
        {!pc && <RadioGroup value={showEvents} class="ctrls"
          onChange={() => this.setState({showEvents: !showEvents})}>
          <FormControlLabel value={true} control={<Radio/>} label="Events" class="orange"/>
          <FormControlLabel value={false} control={<Radio/>} label="Phases" class="black"/>
        </RadioGroup>}
      </Grid>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}
