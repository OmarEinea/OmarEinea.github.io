import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Projects from './sections/TopProjects';
import Skills from './sections/TopSkills';
import Certificates from './sections/TopCerts';
import Events from './sections/TopEvents';

export default class Home extends Component {
  sections = Object.entries({Projects, Skills, Events, Profiles, Certificates});

  render() {
    return (
      <Grid container>
        <Intro/>
        {this.sections.map(([title, Section], index) =>
          <Grid container style={{background: index === 0 && '#90A4AE55' || index % 2 === 1 && '#FFFFFFAA'}}>
            <Grid container class="container" style={{paddingTop: 40, paddingBottom: 80}}>
              <Grid container justify="center">
                <Typography variant="display2" style={{padding: 40}}>
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
