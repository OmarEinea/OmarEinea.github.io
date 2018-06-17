import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, Hidden } from 'material-ui';
import { Grid, Toolbar, Button, IconButton, Typography } from 'material-ui';
import Home from './home/Home';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}}),
  colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'],
  age = new Date(Date.now() - 801954000000).getFullYear() - 1970;

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column">
          <Toolbar id="toolbar" class="container">
            <Hidden smDown><div style={{flexBasis: '36%'}}/></Hidden>
            {['Skills', 'Projects', 'Certificates', 'Courses', 'Events', 'Story'].map(
              (page, index) => <Button style={{color: colors[index]}}>{page}</Button>
            )}
          </Toolbar>
          <Home/>
          <Grid item style={{position: 'relative'}} id="footer">
            <div style={{background: `linear-gradient(to top right, ${colors[0]}, ${colors[4]})`, zIndex: -2}}/>
            <Grid container class="container">
              <Grid item sm={6} xs={12} align="center" style={{paddingTop: 36}}>
                <Typography variant="headline" gutterBottom>About Me</Typography>
                <Typography variant="subheading" gutterBottom>
                  I'm a passionate {age} years old,<br/>
                  self-taught Application Developer.
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12} align="center" style={{padding: '36px 0'}}>
                <Typography variant="headline" gutterBottom>Contact</Typography>
                <IconButton href="mailto:hello@omareinea.com">
                  <i class="fas fa-envelope"/>
                </IconButton>
                {['linkedin', 'facebook', 'google-plus', 'twitter'].map(profile =>
                  <IconButton target="_blank" href={'my/' + profile}>
                    <i class={'fab fa-' + profile}/>
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.body);
