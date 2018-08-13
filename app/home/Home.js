import { Component } from 'react';
import { Grid, Typography, IconButton, Tooltip } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/TopSkills';
import Cards from './sections/TopCards';

export default class Home extends Component {
  sections = Object.entries({
    projects: [() => <Cards type="Project"/>, 'laptop-code'],
    skills: [() => <Skills/>, 'brain'],
    events: [() => <Cards type="Event"/>, 'users'],
    profiles: [() => <Profiles/>, 'globe'],
    certificates: [() => <Cards type="Cert"/>, 'award']
  });

  render() {
    return (
      <Grid container>
        <Intro/>
        {this.sections.map(([ title, [ Section, icon ]], index) =>
          <Grid container style={{background: index === 0 && '#90A4AE55' || index % 2 === 1 && '#FFFFFFAA'}}>
            <Grid container class="container" style={{paddingTop: 40, paddingBottom: 80}}>
              <Grid container justify="center">
                <Typography variant="display2" style={{padding: '40px 0', textTransform: 'capitalize'}} noWrap>
                  <i class={'fas fa-' + icon} style={{paddingRight: 16, verticalAlign: 'bottom'}}/>
                  {Section === Profiles ? 'dev ' + title : <span>top {title}
                    <Tooltip title="View All" placement="right" enterDelay={100}>
                      <IconButton onClick={(event) => this.props.goto(title, event)}
                        href={title} style={{marginLeft: 8}} class="mini">
                        <i class="fas fa-link" style={{fontSize: 17, opacity: .7}}/>
                      </IconButton>
                    </Tooltip>
                  </span>}
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
