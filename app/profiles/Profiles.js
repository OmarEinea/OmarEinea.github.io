import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';
import { get } from 'db';
import Loading from '~/utils/Loading';
import ProfileCard from '~/utils/card/ProfileCard';

export default class Profiles extends Component {
  state = {};

  componentWillMount() {
    get('home/profiles').then(profiles => this.setState({developer: profiles}));
  }

  render() {
    const { developer, remaining } = this.state;
    return developer ? (
      <Grid container class="container" style={{marginBottom: 24, marginTop: 8}}>
        <Grow in timeout={500}>
          <ProfileCard name="GitHub" ratio={25}>
            <GitHub data={developer.github}/>
          </ProfileCard>
        </Grow>
        <Grid container>
          <Grow in timeout={800}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="StackOverflow">
                <StackOverflow data={developer.stack}/>
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="Xda-Developers">
                <XdaDevelopers data={developer.xda}/>
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
    ) : <Loading/>;
  }
}
