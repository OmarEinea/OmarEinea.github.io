import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/Skills';
import Certificates from './sections/Certs';

export default class Home extends Component {
  sections = Object.entries({Skills, Profiles, Certificates});

  render() {
    return (
      <Grid container>
        <Intro/>
        {this.sections.map(([title, Section]) =>
          <Grid container style={{backgroundColor: Certificates === Section || '#FAFAFA'}}>
            <Grid container class="container" style={{paddingTop: 20, paddingBottom: 30}}>
              <Grid container justify="center">
                <Typography variant="display1" style={{padding: 30}}>
                  {Section === Profiles ? 'Dev' : 'Top'} {title}
                </Typography>
              </Grid>
              <Section/>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}
