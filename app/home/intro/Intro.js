import { Component } from 'react';
import { Grid, Typography, Avatar, Paper, Button } from 'material-ui';
import { url, get } from '../../db';
import './Intro.css';

export default class Intro extends Component {
  state = {bio: ''};

  componentWillMount() {
    get('home/bio').then(bio => this.setState({bio}));
  }

  render() {
    return (
      <Grid container class="container" style={{marginBottom: 36}}>
        <Grid item md={4} xs={12} align="center" id="profile">
          <div style={{position: 'relative', width: 324, height: 324}}>
            <Avatar id="photo" src={url('my/photo')}/>
            <Avatar id="logo" src={url('my/logo')}/>
          </div>
          <Typography variant="display1" style={{margin: '12px 0'}}>
            Omar Einea
          </Typography>
          <Typography style={{fontSize: 18, color: '#616161', whiteSpace: 'nowrap'}}>
            Application Developer. Web, Mobile & PC.
          </Typography>
          <Button variant="raised" href="my/resume">
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
