import { Component } from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from 'material-ui';
import { get } from 'db';
import './Timeline.css';

export default class Timeline extends Component {
  state = {years: [], showEvents: true, showCities: true, showInsts: true};

  structureItems(items) {
    const structured = {};
    Object.entries(items).map(([range, desc]) => {
      const [ a, b ] = range.split(',');
      structured[a] = [desc.split(';'), (b || a) - a];
    });
    return structured;
  }

  componentWillMount() {
    (this.onResize = () => {
      const pc = window.innerWidth > 650;
      this.setState(prev => ({pc, showInsts: prev.pc === pc ? prev.showInsts : pc}));
    })();
    get('timeline').then(({ years, cities, institutes, events }) => this.setState({
      years: Object.entries(years).slice(1),
      cities: this.structureItems(cities),
      institutes: this.structureItems(institutes),
      events
    }));
  }

  render() {
    const { years, cities, institutes, events, showEvents, showCities, showInsts, pc } = this.state,
      is = (string, type) => string.includes(type) && type.toLowerCase();
    let city, cityStart, cityCount, institute, instDesc, instStart, instCount;
    return (
      <Grid container direction="column-reverse"
        alignItems={pc ? 'center': showInsts ? 'flex-start' : 'flex-end'}
        class="container" style={{margin: '36px auto', overflow: 'hidden'}}>
        {years.map(([year, state]) => {
          if(cityStart = year in cities)
            [ city, cityCount ] = cities[year];
          if(instStart = year in institutes)
            [[ institute, instDesc], instCount ] = institutes[year];
          return (
            <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
              {showCities && cityStart && <span>
                <b class="city-vline"><i/>
                  <Typography class="number">{+year + 1994}</Typography>
                </b>
                <Typography class="city" variant="subheading" noWrap>
                  <i class="fas fa-map-marker-alt"/> {city[0]}
                </Typography>
              </span>}
              {showInsts && <span>
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
              {showEvents && year in events &&
                <Typography class={'white-text event' + (year - 1 in events ? ' up': '')}>
                  <i/>{events[year]}
                </Typography>
              }
              <Typography align="center" style={{flex: 1, color: '#616161'}}>
                {state || <i class="fas fa-child fa-lg"/>}
              </Typography>
            </div>
          );
        })}
        <Grid container justify="space-evenly" class={'ctrls' + (pc ? '' : ' margin')}>
          <FormControlLabel class="orange" label="Events" control={
            <Checkbox
              checked={showEvents}
              onChange={() => {this.setState({showEvents: !showEvents, showInsts: !pc ? false : showInsts})}}
            />
          }/>
          <FormControlLabel class="white" label="Cities" control={
            <Checkbox
              checked={showCities}
              onChange={() => {this.setState({showCities: !showCities, showInsts: !pc ? false : showInsts})}}
            />
          }/>
          <FormControlLabel class="black" label="Institutes" control={
            <Checkbox
              checked={showInsts}
              onChange={() => {this.setState({
                showInsts: !showInsts,
                showCities: !pc ? false : showCities,
                showEvents: !pc ? false : showEvents
              })}}
            />
          }/>
        </Grid>
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
