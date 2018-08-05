import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/TopSkills';
import Cards from './sections/TopCards';

export default class Home extends Component {
  sections = Object.entries({
    Projects: [() => <Cards type="Project"/>, 'laptop-code'],
    Skills: [Skills, 'brain'],
    Events: [() => <Cards type="Event"/>, 'users'],
    Profiles: [Profiles, 'globe'],
    Certificates: [() => <Cards type="Cert"/>, 'award']
  });

  render() {
    return (
      <Grid container>
        <Intro/>
        {this.sections.map(([ title, [ Section, icon ]], index) =>
          <Grid container style={{background: index === 0 && '#90A4AE55' || index % 2 === 1 && '#FFFFFFAA'}}>
            <Grid container class="container" style={{paddingTop: 40, paddingBottom: 80}}>
              <Grid container justify="center">
                <Typography variant="display2" style={{padding: 40}}>
                  <i class={'fas fa-' + icon} style={{paddingRight: 16, verticalAlign: 'bottom'}}/>
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
