import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, Hidden } from 'material-ui';
import { Grid, Toolbar, Button } from 'material-ui';
import Home from './home/Home';
import Footer from './Footer';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}}),
  colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'],
  pages = {Home, Skills: '', Projects: '', Certificates: '', Courses: '', Events: '', Story: ''};

class App extends React.Component {
  constructor() {
    super();
    this.state = {page: 'Home'};
  }

  render() {
    const CurrentPage = pages[this.state.page] || Home;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column">
          <Toolbar id="toolbar" class="container">
            <Hidden smDown><div style={{flexBasis: '36%'}}/></Hidden>
            {Object.keys(pages).slice(1).map((page, index) =>
              <Button onClick={() => this.setState({page})}
                style={{color: colors[index]}}>{page}</Button>
            )}
          </Toolbar>
          <CurrentPage/>
          <Footer colors={[colors[0], colors[4]]}/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.body);
