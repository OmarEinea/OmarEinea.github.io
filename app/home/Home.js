import { Component } from 'react';
import { Grid, Typography, IconButton, Tooltip, Grow, Fade } from 'material-ui';
import Intro from './intro/Intro';
import Profiles from './profiles/Profiles';
import Skills from './sections/TopSkills';
import Cards from './sections/TopCards';
import './Home.css'

export default class Home extends Component {
  state = {entered: 0};
  sections = Object.entries({
    projects: [(props) => <Cards type="Project" {...props}/>, 'laptop-code'],
    skills: [Skills, 'brain'],
    events: [(props) => <Cards type="Event" {...props}/>, 'users'],
    profiles: [Profiles, 'globe'],
    certificates: [(props) => <Cards type="Cert" {...props}/>, 'award']
  });

  render() {
    const { sections, state: { entered }, props: { goto }} = this;
    return (
      <Grid container>
        <Grow in>
          <Grid container>
            <Intro/>
          </Grid>
        </Grow>
        {sections.map(([ title, [ Section, icon ]], index) =>
          <Grid container style={{background: index === 0 && '#90A4AE55' || index % 2 === 1 && '#FFFFFFAA'}}>
            <Grid container class="container" style={{paddingTop: 40, paddingBottom: 80}}>
              <Fade in={index < entered} timeout={800}>
                <Grid container justify="center" class="section">
                  <Typography variant="h3" class="headline" noWrap
                    style={{padding: '40px 0', textTransform: 'capitalize'}}>
                    <i class={'fas fa-' + icon} style={{paddingRight: 16}}/>
                    {Section === Profiles ? 'dev ' + title : <span>top {title}
                      <Tooltip title="View All" placement="right" enterDelay={100}>
                        <IconButton onClick={(event) => goto(title, event)}
                          href={title} style={{marginLeft: 8}} class="mini">
                          <i class="fas fa-link" style={{fontSize: 17, opacity: .7}}/>
                        </IconButton>
                      </Tooltip>
                    </span>}
                  </Typography>
                </Grid>
              </Fade>
              <Section visible={index < entered}/>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }

  componentDidMount() {
    this.tags = Array.from(document.getElementsByClassName('section'));
    let prevScroll = 0;
    window.addEventListener('scroll', this.onScroll = () => {
      const scroll = window.pageYOffset + window.innerHeight - 50;
      if(scroll - prevScroll > 50) {
        prevScroll = scroll;
        this.tags.map((section, index) => {
          if(scroll > section.offsetTop + section.scrollHeight && index >= this.state.entered)
            this.setState({entered: index + 1});
        });
      }
    });
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.entered !== nextState.entered;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
