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
        <Grid container direction="column">
          <Toolbar id="toolbar" class="container">
            <Hidden smDown><div style={{flexBasis: '36%'}}/></Hidden>
            <Button style={{color: '#9E125E'}}>Skills</Button>
            <Button style={{color: '#DB236B'}}>Projects</Button>
            <Button style={{color: '#E32f4C'}}>Certificates</Button>
            <Button style={{color: '#F24354'}}>Courses</Button>
            <Button style={{color: '#FA5E35'}}>Events</Button>
            <Button style={{color: '#FE7131'}}>Story</Button>
          </Toolbar>
          <Home/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.body);
