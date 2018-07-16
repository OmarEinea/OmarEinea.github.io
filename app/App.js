import { Component } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, Hidden } from 'material-ui';
import { Grid, Toolbar, Button, Avatar, Typography } from 'material-ui';
import { url } from 'db';
import Home from './home/Home';
import Skills from './skills/Skills';
import Certificates from './certs/Certs';
import Events from './events/Events';
import Footer from './Footer';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}}),
  colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'],
  pages = {Home, Skills, Projects: '', Certificates, Courses: '', Events, Story: ''};

class App extends Component {
  state = {page: 'Home'};

  goto(page) {
    this.setState({page});
    document.title = 'Omar Einea | ' + page;
  }

  buttonColor(page, index) {
    return {
      color: colors[index],
      boxShadow: this.state.page === page ?
        'inset 0px 0px 0px 1px ' + colors[index] : 'unset'
    };
  }

  render() {
    const currentPage = this.state.page, CurrentPage = pages[currentPage] || (() => <p style={{flex: 1}}/>);
    return (
      <MuiThemeProvider theme={theme}>
        <Grid id="root" container direction="column">
          <Toolbar id="toolbar" class={'container' + (currentPage === 'Home' ? '' : ' not-home')}>
            <Hidden smDown>
              <div style={{flexBasis: '36%'}}>
                <Grid container id="home-link">
                  <Avatar style={{border: '1px solid #757575', cursor: 'pointer'}}
                    onClick={() => this.goto('Home')} src={url('my/logo')}/>
                  <Typography variant="headline" onClick={() => this.goto('Home')}
                    style={{lineHeight: '42px', marginLeft: 12, color: '#616161', cursor: 'pointer'}}>
                    Omar Einea
                  </Typography>
                </Grid>
              </div>
            </Hidden>
            {Object.keys(pages).slice(1).map((page, index) =>
              <Button style={this.buttonColor(page, index)}
                onClick={() => this.goto(page)}>{page}</Button>
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
