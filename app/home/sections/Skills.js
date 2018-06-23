import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from '../../db';
import Circle from '../../skills/widgets/Circle';
import Line from '../../skills/widgets/Line';

export default class Skills extends Component {
  state = {circles: [], lines: []};

  componentWillMount() {
    get('skills/top').then(data => data.json()).then(skills => this.setState({
      circles: Object.entries(skills.circles).reverse(),
      lines: Object.entries(skills.lines).reverse()
    }));
  }

  render() {
    return (
      <Grid container style={{backgroundColor: '#FAFAFA'}}>
        <Grid container class="container" style={{paddingTop: 16, paddingBottom: 24}}>
          <Grid container justify="center">
            <Typography variant="display1" style={{padding: 28}}>My Skills</Typography>
          </Grid>
          <Grid container md={7} xs={12} style={{paddingRight: 12}} class="no-sm-padding">
            <Grid container justify="center" class="box">
              {this.state.circles.map(skill => <Circle skill={skill}/>)}
            </Grid>
          </Grid>
          <Grid container md={5} xs={12} style={{paddingLeft: 12}} class="no-sm-padding">
            <Grid container direction="column" class="box">
              {this.state.lines.map(skill => <Line skill={skill}/>)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
