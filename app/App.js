import { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import { Grid, Toolbar, Button, Avatar, Typography } from 'material-ui';
import { url, colors } from 'db';
import Home from './home/Home';
import Cards from './cards/Cards';
import Skills from './skills/Skills';
import Timeline from './timeline/Timeline';
import Footer from './utils/Footer';
import './App.css';

const theme = createMuiTheme({typography: {fontFamily: 'Quicksand'}}),
  my = page => '/my/' + page;

class App extends Component {
  state = {page: 'home'};
  pages = {
    home: () => <Home goto={this.goto.bind(this)}/>,
    skills: () => <Skills/>,
    projects: () => <Cards type="Project"/>,
    certificates: () => <Cards type="Cert"/>,
    courses: () => <Cards type="Course" wide/>,
    events: () => <Cards type="Event"/>,
    timeline: () => <Timeline/>
  };
  buttonColor = (page, index) => ({
    color: colors[index], boxShadow: this.state.page === page ?
      'inset 0px 0px 0px 1px ' + colors[index] : 'unset'
  });

  goto(page, event) {
    if(event) {
      event.preventDefault();
      history.pushState(null, '', page === 'home' ? '/' : my(page));
    }
    this.setState({page});
    document.title = 'Omar Einea | ' + page[0].toUpperCase() + page.slice(1);
  }

  componentWillMount() {
    const [ page ] = location.hash.split('#my/').slice(-1);
    if(page in this.pages && page !== 'home') {
      history.replaceState(null, '', my(page));
      this.goto(page);
    }
    window.addEventListener('popstate', () => {
      this.goto(location.pathname.slice(4) || 'home');
    });
  }

  render() {
    const currentPage = this.state.page, CurrentPage = this.pages[currentPage];
    return (
      <MuiThemeProvider theme={theme}>
        <Grid id="root" container direction="column">
          <Toolbar id="toolbar" class={'container' + (currentPage === 'home' ? '' : ' divider')}>
            <div style={{width: '34.5%', marginLeft: 12}}>
              <a href="/" onClick={(event) => this.goto('home', event)} id="home-link">
                <Avatar style={{border: '1px solid #757575', marginRight: 12}} src={url('my/logo')}/>
                <Typography variant="headline" style={{lineHeight: '42px', color: '#616161'}}>
                  Omar Einea
                </Typography>
              </a>
            </div>
            {Object.keys(this.pages).slice(1).map((page, index) =>
              <Button href={my(page)} style={this.buttonColor(page, index)}
                onClick={(event) => this.goto(page, event)}>{page}</Button>
            )}
          </Toolbar>
          <CurrentPage/>
          <Footer/>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.body);
