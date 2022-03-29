import { Component } from 'react';
import { Grid, Typography, IconButton, Tooltip, Fade } from 'material-ui';
import Intro from './intro/Intro';
import TopProfiles from './sections/TopProfiles';
import TopSkills from './sections/TopSkills';
import TopCards from './sections/TopCards';
import { get } from 'db';
import './Home.css';

export default class Home extends Component {
  state = { data: {}, entered: 0 };
  sections = Object.entries({
    projects: [props => <TopCards type="Project" {...props} />, 'laptop-code'],
    skills: [TopSkills, 'brain'],
    events: [props => <TopCards type="Event" {...props} />, 'users'],
    profiles: [TopProfiles, 'globe'],
    certificates: [props => <TopCards type="Cert" {...props} />, 'award']
  });
  onScroll = () => {
    const scroll = window.pageYOffset + window.innerHeight - 150;
    if (scroll - this.prevScroll > 50) {
      this.prevScroll = scroll;
      this.tags.map((section, index) => {
        if (scroll > section.offsetTop && index >= this.state.entered)
          this.setState({ entered: index + 1 });
      });
    }
  }

  componentWillMount() {
    get('home').then(data => this.setState({ data }));
  }

  render() {
    const { sections, state: { data, entered }, props: { goto } } = this;
    return (
      <Grid container>
        <Intro data={data.intro} />
        {sections.map(([title, [Section, icon]], index) =>
          <Grid container style={{ background: index === 0 && '#90A4AE55' || index % 2 === 1 && '#FFFFFFAA' }}>
            <Grid container class="container" style={{ paddingTop: 40, paddingBottom: 80, minHeight: 512 }}>
              <Fade in={index < entered} timeout={800}>
                <Grid container justify="center" class="section">
                  <Typography variant="h3" class="headline" noWrap
                    style={{ padding: '40px 0', textTransform: 'capitalize' }}>
                    <i class={'fas fa-' + icon} style={{ paddingRight: 16 }} />
                    top {title}
                    <Tooltip title="View More" placement="right" enterDelay={100}>
                      <IconButton onClick={(event) => goto(title, event)}
                        href={title} style={{ marginLeft: 8, marginTop: -12 }} class="mini">
                        <i class="fas fa-angle-right" style={{ fontSize: 20, opacity: .7 }} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Fade>
              <Section visible={index < entered} data={data[title.replace('ificate', '')]} />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }

  componentDidMount() {
    this.tags = Array.from(document.getElementsByClassName('section'));
    this.prevScroll = 0;
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
