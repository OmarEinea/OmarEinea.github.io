import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { profile } from 'db';
import './Flair.css';

export default class XdaDevelopers extends PureComponent {
  render() {
    const { thanks, posts, threads } = this.props.data;
    return (
      <Grid item class="flair">
        <a href="my/xda-developers" target="_black">
          <img height="45" src={profile('XdaDevelopers')} />
        </a>
        <Typography variant="h6">
          <i class="fas fa-fw fa-thumbs-up" />
          {thanks} Thanks
        </Typography>
        <Typography variant="subtitle1">
          <i class="fas fa-fw fa-user-edit" style={{ margin: '0 3px' }} />
          <b>{posts}</b> Posts
          in <b>{threads}</b> Threads
        </Typography>
      </Grid>
    );
  }
}
