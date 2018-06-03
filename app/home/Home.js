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
        <Grid item md={4} xs={12}>
          <div style={{position: 'relative', marginBottom: 16}}>
            <Avatar id="photo" src={url('photo')}/>
            <Avatar id="logo" src={url('logo')}/>
          </div>
          <Typography variant="display1" align="center" gutterBottom>Omar Einea</Typography>
          <Typography style={{fontSize: 18, color: '#424242'}} gutterBottom>Application Developer. Web, Mobile & PC.</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper style={{marginLeft: 36, height: '100%'}}>
            <Typography variant="subheading" style={{padding: 16}} dangerouslySetInnerHTML={{__html: this.state.bio}}/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
