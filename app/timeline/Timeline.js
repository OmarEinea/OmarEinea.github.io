import { Component } from 'react';
import { Grid, Typography, Tooltip, Grow } from 'material-ui';
import { FormControlLabel, RadioGroup, Radio } from 'material-ui';
import { get } from 'db';
import Loading from '~/utils/Loading';
import './Timeline.css';

export default class Timeline extends Component {
  state = { showEvents: true };
  structureItems = items => Object.entries(items).reduce((struct, [range, desc]) => {
    const [a, b] = range.split(',');
    return { ...struct, [a]: [desc.split(';').map(d => d.trim()), (b || a) - a] };
  }, {});
  onResize = () => {
    const pc = window.innerWidth > 650;
    if (pc !== this.state.pc) this.setState({ pc });
  };

  componentWillMount() {
    this.onResize();
    get('timeline').then(({ years, cities, institutes, events }) => {
      this.setState({
        years: Object.entries(years).slice(1),
        cities: this.structureItems(cities),
        institutes: this.structureItems(institutes),
        events: this.structureItems(events),
      });
    });
  }

  render() {
    const { years, cities, institutes, events, showEvents, pc } = this.state;
    let city, cityStart, cityCount, instIcon, institute, instDesc, instStart, instCount;
    return years ? (
      <Grid container direction="column-reverse"
        alignItems={pc ? 'center' : showEvents ? 'flex-end' : 'flex-start'}
        class="container" style={{ margin: '30px auto', paddingTop: 18, overflow: 'hidden' }}>
        {years.map(([year, state], index) => {
          if (cityStart = year in cities) {
            [city, cityCount] = cities[year];
          }
          if (instStart = year in institutes) {
            [[instIcon, institute, instDesc], instCount] = institutes[year];
          }
          const [[eventText, eventDirection = '']] = events[year] || [[]];
          const calendarYear = +year + 1994;
          return (
            <Grow in timeout={(years.length - index) * 100 + 200}>
              <div class={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
                {showEvents && cityStart && <span>
                  <b class="city-vline"><i />
                    <Typography class="number">{calendarYear}</Typography>
                  </b>
                  <Typography class="city" variant="subtitle1" noWrap>
                    <i class="fas fa-map-marker-alt" /> {city[0]}
                  </Typography>
                </span>}
                {(pc || !showEvents) && <span>
                  {instCount === 0 && <span class="inst-box white-text"><i />
                    <Typography variant="subtitle1" style={instDesc && { marginBottom: 6 }} noWrap>
                      <i style={{ marginRight: 8 }} class={'fas fa-' + instIcon} />
                      <b>{institute}</b>
                    </Typography>
                    <Typography variant="caption">{instDesc}</Typography>
                  </span>}
                  {instCount >= 0 &&
                    <i class={'inst-sign' + (instStart ? ' start' : '') + (instCount-- === 0 ? ' end' : '')} />
                  }
                </span>}
                {(pc || showEvents) && eventText &&
                  <Typography class={'white-text event ' + eventDirection}><i />{eventText}</Typography>
                }
                <Typography align="center" style={{ flex: 1, color: '#616161' }}>
                  <Tooltip title={`${year} years old (${calendarYear})`}>
                    {state ? <span>{state}</span> : <i class="fas fa-child fa-lg" />}
                  </Tooltip>
                </Typography>
              </div>
            </Grow>
          );
        })}
        {!pc && <RadioGroup value={showEvents} class="ctrls"
          onChange={() => this.setState({ showEvents: !showEvents })}>
          <FormControlLabel value={true} control={<Radio />} label="Events" class="orange" />
          <FormControlLabel value={false} control={<Radio />} label="Phases" class="black" />
        </RadioGroup>}
      </Grid>
    ) : <Loading />;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}
