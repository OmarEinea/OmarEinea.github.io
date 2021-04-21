import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from './widgets';
import { get } from 'db';
import Loading from '~/utils/Loading';
import ProfileCard from '~/cards/widgets/ProfileCard';
import './Profiles.css';

export default class Profiles extends Component {
  componentWillMount() {
    get('profiles').then(({ Development, order, ...profiles }) => {
      for (const key in profiles) {
        profiles[key] = Object.entries(profiles[key]);
      }
      profiles = Object.entries(profiles);
      const orderedCategories = [];
      order.split(',').map(index => orderedCategories.push(profiles[index - 1]));
      this.setState({ dev: Development, allProfiles: profiles });
    });
  }

  render() {
    const { dev, allProfiles } = this.state || {};
    return dev ? (
      <Grid container class="container" style={{ marginBottom: 24, marginTop: 8 }}>
        <Grid container justify="center">
          <Grow in timeout={600}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="GitHub" images={dev.GitHub.images}>
                <GitHub data={dev.GitHub} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={800}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="StackOverflow" images={dev.StackOverflow.images}>
                <StackOverflow data={dev.StackOverflow} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="XdaDevelopers" images={dev.XdaDevelopers.images}>
                <XdaDevelopers data={dev.XdaDevelopers} />
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
        {allProfiles.map(([category, profiles]) =>
          <Grid container justify="center">
            <Fade in>
              <Typography variant="h4" class="category">{category}</Typography>
            </Fade>
            {profiles.map(([title, data]) =>
              <Grid item md={4} sm={6} xs={12}>
                <ProfileCard name={title} images={data.images} use={data.use} />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    ) : <Loading />;
  }
}
