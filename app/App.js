import { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme, Grow, Zoom, Slide } from 'material-ui';
import { Grid, Toolbar, Button, Avatar, Typography, Hidden } from 'material-ui';
import { url, colors } from 'db';
import Optimize from './utils/Optimize';
import Home from './home/Home';
import Cards from './cards/Cards';
import Skills from './skills/Skills';
import Profiles from './profiles/Profiles';
import Timeline from './timeline/Timeline';
import Footer from './utils/Footer';
import './App.css';

class App extends Component {
  state = { page: 'home', mounted: true };
  pages = {
    home: () => <Home goto={this.goto.bind(this)} />,
    projects: () => <Cards type="Project" />,
    skills: () => <Skills />,
    events: () => <Cards type="Event" />,
    profiles: () => <Profiles />,
    certificates: () => <Cards type="Cert" />,
    timeline: () => <Timeline />
  };
  buttonColor = (page, index) => ({
    color: colors[index], boxShadow: this.state.page === page ?
      'inset 0px 0px 0px 1px ' + colors[index] : 'unset'
  });

  goto(page, event, now) {
    if (event) event.preventDefault();
    if (page === this.state.page) return;
    const switchPage = () => {
      window.scroll({ top: 0, left: 0 });
      if (event) history.pushState(null, '', page === 'home' ? '/' : page);
      this.setState({ page, mounted: true });
      document.title = 'Omar Einea | ' + page[0].toUpperCase() + page.slice(1);
    };
    if (now) switchPage();
    else {
      this.setState({ mounted: false });
      setTimeout(switchPage, 200);
    }
  }

  componentWillMount() {
    const page = location.hash.slice(1);
    if (page in this.pages && page !== 'home') {
      history.replaceState(null, '', page);
      this.goto(page, null, true);
    }
    window.addEventListener('popstate', () => {
      this.goto(location.pathname.slice(1) || 'home');
    });
  }

  render() {
    const { state, pages } = this, CurrentPage = pages[state.page], notHome = state.page !== 'home';
    return (
      <Grid id="root" container direction="column">
        <div id="top-shadow" />
        <Toolbar id="toolbar" class="container">
          <Hidden smDown={!notHome}>
            <div style={{ width: '34.5%', marginLeft: 12 }} class={notHome ? 'show' : 'hide'}>
              <Grow in={notHome} timeout={400} direction="left" unmountOnExit>
                <a href="/" onClick={(event) => this.goto('home', event)} id="home-link">
                  <Avatar style={{ border: '1px solid #616161', marginRight: 12 }} src={url('my/logo')} />
                  <Typography variant="h5" style={{ lineHeight: '42px', color: '#4F4D4E' }}>
                    Omar Einea
                  </Typography>
                </a>
              </Grow>
            </div>
          </Hidden>
          {Object.keys(pages).slice(1).map((page, index) =>
            <Slide in timeout={(6 - index) * 150} direction="down">
              <span>
                <Button href={page} style={this.buttonColor(page, index)}
                  onClick={(event) => this.goto(page, event)}>{page}</Button>
              </span>
            </Slide>
          )}
          <Zoom in={notHome} timeout={{ enter: 300, exit: 200 }}>
            <div class="divider" />
          </Zoom>
        </Toolbar>
        <Grow in={state.mounted} timeout={{ enter: 500, exit: 400 }}>
          <Optimize><CurrentPage /></Optimize>
        </Grow>
        <Footer />
      </Grid>
    );
  }
}

render(
  <MuiThemeProvider theme={createMuiTheme({
    typography: {
      fontFamily: 'Quicksand', useNextVariants: true
    }
  })}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
);
