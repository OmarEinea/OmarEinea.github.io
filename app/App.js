import { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme, Hidden } from 'material-ui';
import { Grid, Toolbar, Button, Avatar, Typography } from 'material-ui';
import { url } from 'db';
import Home from './home/Home';
import Cards from './cards/Cards';
import Skills from './skills/Skills';
import Timeline from './timeline/Timeline';
import Footer from './utils/Footer';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}}),
  colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'],
  pages = {
    home: Home, skills: Skills,
    projects: () => <Cards type="Project"/>,
    certificates: () => <Cards type="Cert"/>,
    courses: () => <Cards type="Course" wide/>,
    events: () => <Cards type="Event"/>,
    timeline: Timeline
  };

class App extends Component {
  state = {page: 'home'};
  buttonColor = (page, index) => ({
    color: colors[index], boxShadow: this.state.page === page ?
      'inset 0px 0px 0px 1px ' + colors[index] : 'unset'
  });

  goto(page, event) {
    if(event) {
      event.preventDefault();
      history.pushState(null, '', page === 'home' ? '/' : '/my/' + page);
    }
    this.setState({page});
    document.title = 'Omar Einea | ' + page[0].toUpperCase() + page.slice(1);
  }

  componentWillMount() {
    const [ page ] = location.hash.split('#my/').slice(-1);
    if(page in pages && page !== 'home') {
      history.replaceState(null, '', '/my/' + page);
      this.goto(page);
    }
    window.addEventListener('popstate', () => {
      this.goto(location.pathname.slice(4) || 'home');
    });
  }

  render() {
    const currentPage = this.state.page, CurrentPage = pages[currentPage];
    return (
      <MuiThemeProvider theme={theme}>
        <Grid id="root" container direction="column">
          <Toolbar id="toolbar" class={'container' + (currentPage === 'home' ? '' : ' divider')}>
            <Hidden smDown>
              <div style={{flexBasis: '35.6%'}}>
                <a href="/" onClick={(event) => this.goto('home', event)} id="home-link">
                  <Avatar style={{border: '1px solid #757575', marginRight: 12}} src={url('my/logo')}/>
                  <Typography variant="headline" style={{lineHeight: '42px', color: '#616161'}}>
                    Omar Einea
                  </Typography>
                </a>
              </div>
            </Hidden>
            {Object.keys(pages).slice(1).map((page, index) =>
              <Button href={page} style={this.buttonColor(page, index)}
                onClick={(event) => this.goto(page, event)}>{page}</Button>
            )}
          </Toolbar>
          <CurrentPage/>
          <Footer colors={[colors[0], colors[4]]}/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.body);
