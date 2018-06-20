import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from '../../db';
import Circle from '../../skills/widgets/Circle';

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {circles: [], lines: []};
    get('skills/top').then(data => data.json()).then(skills => this.setState({
      circles: Object.entries(skills.circles).reverse()
    }));
  }

  render() {
    return (
      <Grid container style={{backgroundColor: '#FAFAFA'}}>
        <Grid container class="container">
          <Grid container justify="center" md={7} class="box">
            {this.state.circles.map(skill => <Circle skill={skill}/>)}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
