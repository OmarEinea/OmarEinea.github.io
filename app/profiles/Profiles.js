import { Component } from 'react';
import { Grid, Typography, Grow, Fade, Hidden } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from './widgets';
import { get, profile } from 'db';
import Loading from '~/utils/Loading';
import ProfileCard from '~/cards/widgets/ProfileCard';

export default class Profiles extends Component {
  componentWillMount() {
    get('profiles').then(({Development, order, ...profiles}) => {
      for(const key in profiles)
        profiles[key] = Object.entries(profiles[key]);
      profiles = Object.entries(profiles);
      const orderedCategories = [];
      order.split(',').map(index => orderedCategories.push(profiles[index - 1]));
      this.setState({dev: Development, allProfiles: profiles});
    });
  }

  render() {
    const { dev, allProfiles } = this.state || {};
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
        {allProfiles.map(([category, profiles]) =>
          <Grid container justify="center">
            <Fade in>
              <Typography variant="h4" class="category">{category}</Typography>
            </Fade>
            {profiles.map(([title, data]) => {
              const [text, icon] = data.use.split(';');
              return <Grid item sm={6} xs={12}>
                <ProfileCard name={title} images={data.images} ratio={64}>
                  <Grid container style={{padding: '16px 16px 12px'}}>
                    <Grid item md={7} xs={12}>
                      <a href={'my/' + title.toLowerCase().replace(/ /g, '')}>
                        <img height="42" src={profile(title)}/>
                      </a>
                    </Grid>
                    <Grid item md={5} xs={12}>
                      <Typography variant="body1" style={{color: '#616161'}}>
                        <Typography variant="subtitle2" inline style={{color: '#9e9e9e'}}>Main Use: </Typography>
                        <Hidden smDown><br/></Hidden>
                        {icon && <i class={'fa fa-fw fa-' + icon}/>} {text}
                      </Typography>
                    </Grid>
                  </Grid>
                </ProfileCard>
              </Grid>
            })}
          </Grid>
        )}
      </Grid>
    ) : <Loading/>;
  }
}
