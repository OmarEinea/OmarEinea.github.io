import { PureComponent } from 'react';
import { Grid, Typography, Avatar, Paper, Button } from 'material-ui';
import { url, get } from 'db';
import './Intro.css';

export default class Intro extends PureComponent {
  papers = Object.entries({
    Origin: {style: {left: 0, bottom: '33.3%'}, icon: 'globe-africa'},
    Discipline: {style: {left: 0, bottom: 0}, icon: 'pencil-ruler'},
    Goals: {style: {left: '33.3%', bottom: 0}, icon: 'check-double'},
    Education: {style: {right: '33.3%', top: 0}, icon: 'graduation-cap'},
    Experience: {style: {right: 0, top: 0}, icon: 'briefcase'},
    Publications: {style: {right: 0, top: '33.3%'}, icon: 'clipboard'}
  })

  myResume(event) {
    event.preventDefault();
    window.open(url('my/resume.docx'), '_self');
  }

  render() {
    const { myResume, papers} = this;
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
              <Paper class="paper" style={paper.style}>
                <div>
                  <i class={'fas fa-' + paper.icon}/>
                  <Typography>{title}</Typography>
                </div>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
