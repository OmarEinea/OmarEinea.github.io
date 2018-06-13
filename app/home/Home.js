import { Component } from 'react';
import { Grid } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Intro/>
        <Profiles/>
      </Grid>
    );
  }
}
