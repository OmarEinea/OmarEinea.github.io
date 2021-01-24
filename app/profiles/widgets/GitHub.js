import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { profile } from 'db';
import './GitHub.css';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
months = months.splice(new Date().getMonth()).concat(months);

export default class GitHub extends PureComponent {
  render() {
    const { repos, followers, stars } = this.props.data;
    return (
      <Grid item class="flair">
        <a href="my/github" target="_blank">
          <img height="45" src={profile('GitHub')} />
        </a>
        <Typography variant="h6">
          <i class="fas fa-fw fa-star" />
          <b>{stars}</b> Stars
        </Typography>
        <Typography variant="subtitle1">
          <i class="fas fa-fw fa-hdd" style={{ margin: '0 3px' }} />
          <b>{repos}</b> Repos & <b>{followers}</b> Followers
        </Typography>
      </Grid>
    );
  }
}
