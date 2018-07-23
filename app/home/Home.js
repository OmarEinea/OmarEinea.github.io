import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/TopSkills';
import Certificates from './sections/TopCerts';
import Events from './sections/TopEvents';

export default class Home extends Component {
  sections = Object.entries({Skills, Events, Profiles, Certificates});

  render() {
    return (
      <Grid container>
        <Intro/>
        {this.sections.map(([title, Section], index) =>
          <Grid container style={{backgroundColor: index % 2 === 0 && '#FAFAFA'}}>
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
