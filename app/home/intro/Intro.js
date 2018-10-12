import { PureComponent } from 'react';
import { Grid, Typography, Avatar, Paper, Button } from 'material-ui';
import { url, get, colors } from 'db';
import './Intro.css';

const third = 33.333;

export default class Intro extends PureComponent {
  state = {content: {}, expand: null};
  papers = Object.entries({
    Current: {icon: 'address-card'},
    Origin: {style: {top: `${third}%`}, icon: 'globe-africa'},
    Discipline: {style: {top: `${2*third}%`}, icon: 'pencil-ruler'},
    Goals: {style: {left: `${third}%`, top: `${2*third}%`}, icon: 'check-double'},
    Education: {style: {left: `${third}%`}, icon: 'user-graduate'},
    Experience: {style: {left: `${2*third}%`}, icon: 'briefcase'},
    Publications: {style: {left: `${2*third}%`, top: `${third}%`}, icon: 'clipboard'}
  });

  componentWillMount() {
    get('home/intro').then(papers => {
      const content = {};
      Object.entries(papers).map(([title, data], index) => {
        if(index < 3)
          content[title] = <div style={{borderTopColor: colors[index]}} class="content">
            {data.slice(1).map((line, index) => {
              const [ text, icon ] = line.split(';').reverse();
              const [ body, head ] = text.split(':').reverse();
              return <Typography class="line" variant="subtitle1"
                style={{fontSize: index == 0 ? 22 : 18}}>
                {icon && <i class={'fas fa-' + icon} style={{marginRight: 8}}/>}
                {head && <b>{head}:</b> }{body}
              </Typography>
            })}
          </div>;
      });
      this.setState({content});
    });
  }

  myResume(event) {
    event.preventDefault();
    window.open(url('my/resume.docx'), '_self');
  }

  render() {
    const { myResume, papers, state: { content, expand }} = this;
    return (
      <Grid container class="container" style={{paddingBottom: 80}}>
        <Grid item md={4} xs={12} align="center" id="intro">
          <div style={{position: 'relative', width: 324, height: 324}}>
            <Avatar id="photo" src={url('my/photo')}/>
            <Avatar id="logo" src={url('my/logo')}/>
          </div>
          <Typography variant="h4" style={{color: '#4F4D4E', margin: '12px 0'}}>
            Omar Einea
          </Typography>
          <Typography style={{fontSize: 18, color: '#616161', whiteSpace: 'nowrap'}}>
            Application Developer. Web, Mobile & PC.
          </Typography>
          <Button variant="contained" href="my/resume" onClick={myResume}>
            <i class="fas fa-file-download" style={{marginRight: 8, fontSize: 16}}/>
            Resume
          </Button>
          <Button variant="contained" target="_self" href="mailto:hello@omareinea.com">
            <i class="fas fa-lg fa-envelope"/>
          </Button>
          <Button variant="contained" target="_blank" href="my/linkedin">
            <i class="fab fa-lg fa-linkedin"/>
          </Button>
          <Button variant="contained" target="_blank" href="my/github">
            <i class="fab fa-lg fa-github"/>
          </Button>
          <Button variant="contained" target="_blank" href="my/stackoverflow">
            <i class="fab fa-lg fa-stack-overflow"/>
          </Button>
        </Grid>
        <Grid item md={8} xs={12} id="bio">
          <Grid container>
            {papers.map(([title, paper], index) =>
              <Paper style={paper.style} elevation={expand === title ? 4 : 2}
                class={'paper' + (expand === title ? ' expand' : '') + (index === 0 ? ' small' : '')}
                onMouseEnter={() => this.setState({expand: title})}
                onMouseLeave={() => this.setState({expand: null})}>
                {content[title]}
                <Grid container class="title" layout="column" justify="center">
                  <i class={'fas fa-fw fa-' + paper.icon}/>
                  <Typography>{title}</Typography>
                </Grid>
              </Paper>
            )}
            <div class="paper" style={{left: `${2*third}%`, top: `${2*third}%`}}>
              <Grid container class="title" layout="column" justify="center">
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
