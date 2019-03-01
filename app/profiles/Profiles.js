import { Component } from 'react';
import { Grid, Typography, Paper, Grow, Fade } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';
import { get } from 'db';
import Loading from '~/utils/Loading';


export default class Profiles extends Component {
  state = {};

  componentWillMount() {
    get('home/profiles').then(profiles => this.setState({developer: profiles}));
  }

  render() {
    const { developer, remaining } = this.state;
    return developer ? (
      <Grid container class="container" style={{marginBottom: 24}}>
        <Fade in>
          <Typography variant="h4" class="category">Development</Typography>
        </Fade>
        <Grow in timeout={500} style={{width: '100%'}}>
          <Paper style={{margin: 8, padding: 8}}>
            <GitHub data={developer.github}/>
          </Paper>
        </Grow>
        <Grid container>
          <Grow in timeout={800}>
            <Grid item sm={6} xs={12}>
              <Paper style={{margin: 8}}>
                <StackOverflow data={developer.stack}/>
              </Paper>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item sm={6} xs={12}>
              <Paper style={{margin: 8}}>
                <XdaDevelopers data={developer.xda}/>
              </Paper>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
    ) : <Loading/>;
  }
}
