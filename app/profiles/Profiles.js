import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';
import { get } from 'db';
import Loading from '~/utils/Loading';
import ProfileCard from '~/utils/card/ProfileCard';

export default class Profiles extends Component {
  componentWillMount() {
    get('profiles').then(profiles => this.setState(profiles));
  }

  render() {
    const { Development: dev, ...profiles } = this.state  || {};
    return dev ? (
      <Grid container class="container" style={{marginBottom: 24, marginTop: 8}}>
        <Grow in timeout={500}>
          <ProfileCard name="GitHub" images={dev.GitHub.images} ratio={25}>
            <GitHub data={dev.GitHub}/>
          </ProfileCard>
        </Grow>
        <Grid container>
          <Grow in timeout={800}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="StackOverflow" images={dev.StackOverflow.images}>
                <StackOverflow data={dev.StackOverflow}/>
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="XdaDevelopers" images={dev.XdaDevelopers.images}>
                <XdaDevelopers data={dev.XdaDevelopers}/>
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
    ) : <Loading/>;
  }
}
