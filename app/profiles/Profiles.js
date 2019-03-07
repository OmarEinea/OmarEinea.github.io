import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';
import { get } from 'db';
import Loading from '~/utils/Loading';
import ProfileCard from '~/utils/card/ProfileCard';

export default class Profiles extends Component {
  state = {img: {}};

  componentWillMount() {
    get('profiles').then(profiles => this.setState({top: profiles.Development}));
  }

  render() {
    const { top, img } = this.state;
    return top ? (
      <Grid container class="container" style={{marginBottom: 24, marginTop: 8}}>
        <Grow in timeout={500}>
          <ProfileCard name="GitHub" images={img.GitHub} ratio={25}>
            <GitHub data={top.GitHub}/>
          </ProfileCard>
        </Grow>
        <Grid container>
          <Grow in timeout={800}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="StackOverflow" images={img.StackOverflow}>
                <StackOverflow data={top.StackOverflow}/>
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item sm={6} xs={12} ratio={50}>
              <ProfileCard name="XdaDevelopers" images={img.XdaDevelopers}>
                <XdaDevelopers data={top.XdaDevelopers}/>
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
    ) : <Loading/>;
  }
}
