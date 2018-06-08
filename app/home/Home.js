import { Component } from 'react';
import { Grid } from 'material-ui';
import Intro from './intro/Intro';

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Intro/>
      </Grid>
    );
  }
}
