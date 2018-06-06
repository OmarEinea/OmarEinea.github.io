import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import { Grid, Toolbar, Button, Hidden } from 'material-ui';
import Home from './home/Home';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" style={{maxWidth: 1000, margin: '-8px auto'}}>
          <Toolbar id="toolbar">
            <Hidden smDown><div style={{width: 370}}/></Hidden>
            <Button style={{color: '#9E125E'}}>Skills</Button>
            <Button style={{color: '#DB236B'}}>Projects</Button>
            <Button style={{color: '#E32f4C'}}>Certificates</Button>
            <Button style={{color: '#F24354'}}>Events</Button>
            <Button style={{color: '#FA5E35'}}>Courses</Button>
            <Button style={{color: '#FE7131'}}>Profiles</Button>
          </Toolbar>
          <Home/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.body);
