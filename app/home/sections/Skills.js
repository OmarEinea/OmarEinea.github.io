import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from '../../db';
import Circle from '../../skills/widgets/Circle';
import Line from '../../skills/widgets/Line';

export default class Skills extends Component {
  state = {circles: [], lines: []};

  componentWillMount() {
    get('skills/top').then(skills => this.setState({
      circles: Object.entries(skills.circles).reverse(),
      lines: Object.entries(skills.lines).reverse()
    }));
  }

  render() {
    return (
      <Grid container>
        <Grid container md={7} xs={12}>
          <Grid container justify="center" class="box">
            {this.state.circles.map(skill => <Circle skill={skill}/>)}
          </Grid>
        </Grid>
        <Grid container md={5} xs={12}>
          <Grid container direction="column" class="box">
            {this.state.lines.map(skill => <Line skill={skill}/>)}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
