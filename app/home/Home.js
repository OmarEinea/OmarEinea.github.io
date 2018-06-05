import { Component } from 'react';
import { Grid, Typography, Avatar, Paper } from 'material-ui';
import { url, get } from '../db';
import './Home.css';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {bio: ''};
    get('bio').then(data => data.json()).then(bio => this.setState({bio}));
  }

  render() {
    return (
      <Grid container>
        <Grid item md={4} xs={12} align="center">
          <span style={{position: 'relative'}}>
            <Avatar id="photo" src={url('photo')}/>
            <Avatar id="logo" src={url('logo')}/>
          </span>
          <Typography variant="display1" style={{margin: '12px 0', fontWeight: 300}}>
            Omar Einea
          </Typography>
          <Typography style={{fontSize: 17, color: '#616161', marginBottom: 16}}>
            Application Developer. Web, Mobile & PC.
          </Typography>
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
