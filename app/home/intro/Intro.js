import { PureComponent } from 'react';
import { Grid, Typography, Avatar, Paper, Button } from 'material-ui';
import { url, get } from 'db';
import './Intro.css';

const third = 33.333;

export default class Intro extends PureComponent {
  state = {expand: null};
  papers = Object.entries({
    Basics: {icon: 'address-book'},
    Origin: {style: {top: `${third}%`}, icon: 'globe-africa'},
    Discipline: {style: {top: `${2*third}%`}, icon: 'pencil-ruler'},
    Goals: {style: {left: `${third}%`, top: `${2*third}%`}, icon: 'check-double'},
    Education: {style: {left: `${third}%`}, icon: 'user-graduate'},
    Experience: {style: {left: `${2*third}%`}, icon: 'briefcase'},
    Publications: {style: {left: `${2*third}%`, top: `${third}%`}, icon: 'clipboard'}
  });

  myResume(event) {
    event.preventDefault();
    window.open(url('my/resume.docx'), '_self');
  }

  render() {
    const { myResume, papers, state: { expand }} = this;
    return (
      <Grid container class="container" style={{paddingBottom: 80}}>
        <Grid item md={4} xs={12} align="center" id="intro">
          <div style={{position: 'relative', width: 324, height: 324}}>
            <Avatar id="photo" src={url('my/photo')}/>
            <Avatar id="logo" src={url('my/logo')}/>
          </div>
          <Typography variant="display1" style={{color: '#4F4D4E', margin: '12px 0'}}>
            Omar Einea
          </Typography>
          <Typography style={{fontSize: 18, color: '#616161', whiteSpace: 'nowrap'}}>
            Application Developer. Web, Mobile & PC.
          </Typography>
          <Button variant="raised" href="my/resume" onClick={myResume}>
            <i class="fas fa-file-download" style={{marginRight: 8, fontSize: 16}}/>
            Resume
          </Button>
          <Button variant="raised" target="_self" href="mailto:hello@omareinea.com">
            <i class="fas fa-lg fa-envelope"/>
          </Button>
          <Button variant="raised" target="_blank" href="my/linkedin">
            <i class="fab fa-lg fa-linkedin"/>
          </Button>
          <Button variant="raised" target="_blank" href="my/github">
            <i class="fab fa-lg fa-github"/>
          </Button>
          <Button variant="raised" target="_blank" href="my/stackoverflow">
            <i class="fab fa-lg fa-stack-overflow"/>
          </Button>
        </Grid>
        <Grid item md={8} xs={12} id="bio">
          <Grid container>
            {papers.map(([title, paper]) =>
              <Paper style={paper.style} elevation={expand === title ? 4 : 2}
                class={'paper' + (expand === title ? ' expand' : '') + ('Basics' === title ? ' small' : '')}
                onMouseEnter={() => this.setState({expand: title})}
                onMouseLeave={() => this.setState({expand: null})}>
                <Grid container layout="column" justify="center">
                  <i class={'fas fa-fw fa-' + paper.icon}/>
                  <Typography>{title}</Typography>
                </Grid>
              </Paper>
            )}
            <div class="paper" style={{left: `${2*third}%`, top: `${2*third}%`}}>
              <Grid container layout="column" justify="center">
                <i class="fas fa-fw fa-arrow-down"/>
                <Typography>More&nbsp;Below</Typography>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
