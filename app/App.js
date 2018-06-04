import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, AppBar, Toolbar, Grid, Button } from 'material-ui';
import Home from './home/Home';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme({typography: {fontFamily: 'Quicksand'}})}>
        <Grid container style={{maxWidth: 1000, margin: '-8px auto'}}>
          <AppBar position="static" elevation="0">
            <Toolbar>
              <div style={{flex: 'auto'}}/>
              <Button style={{color: '#9E125E'}}>Skills</Button>
              <Button style={{color: '#DB236B'}}>Projects</Button>
              <Button style={{color: '#E32f4C'}}>Certificates</Button>
              <Button style={{color: '#F24354'}}>Events</Button>
              <Button style={{color: '#FA5E35'}}>Courses</Button>
              <Button style={{color: '#FE7131'}}>Profiles</Button>
            </Toolbar>
          </AppBar>
          <Home/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.body);
