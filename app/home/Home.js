import { Component } from 'react';
import { Grid } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/Skills';
import Certificates from './sections/Certs';

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Intro/>
        <Skills/>
        <Profiles/>
        <Certificates/>
      </Grid>
    );
  }
}
