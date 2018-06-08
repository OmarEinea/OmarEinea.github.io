import { Component } from 'react';
import { Grid, Typography, Avatar, Paper, Button } from 'material-ui';
import { url, get } from '../../db';
import './Intro.css';

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {bio: ''};
    get('bio').then(data => data.json()).then(bio => this.setState({bio}));
  }

  render() {
    return (
      <Grid container>
        <Grid item md={4} xs={12} align="center" id="profile">
          <div style={{position: 'relative', width: 324, height: 324}}>
            <Avatar id="photo" src={url('photo')}/>
            <Avatar id="logo" src={url('logo')}/>
          </div>
          <Typography variant="display1" style={{margin: '12px 0', fontWeight: 300}}>
            Omar Einea
          </Typography>
          <Typography style={{fontSize: 17, color: '#616161', whiteSpace: 'nowrap'}}>
            Application Developer. Web, Mobile & PC.
          </Typography>
          <Button variant="raised" href={url('resume.docx')}>
            <i class="fas fa-download" style={{marginRight: 8, fontSize: 16}}/>Resume
          </Button>
          <Button variant="raised" target="_blank" href="https://www.linkedin.com/in/OmarEinea/">
            <i class="fab fa-lg fa-linkedin"/>
          </Button>
          <Button variant="raised" target="_blank" href="https://github.com/OmarEinea/">
            <i class="fab fa-lg fa-github"/>
          </Button>
          <Button variant="raised" target="_blank" href="https://stackoverflow.com/u/4794459/">
            <i class="fab fa-lg fa-stack-overflow"/>
          </Button>
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper id="bio">
            <Typography variant="subheading" style={{padding: 16}}
              dangerouslySetInnerHTML={{__html: this.state.bio}}/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
