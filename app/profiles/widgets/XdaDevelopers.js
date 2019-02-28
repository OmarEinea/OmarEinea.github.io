import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { logo } from 'db';

export default class XdaDevelopers extends PureComponent {
  render() {
    const { thanks, posts, threads } = this.props.data;
    return (
      <Grid item>
        <a href="my/xda-developers" target="_black">
          <img height="45" src={logo('xda')}/>
        </a>
        <Typography variant="h6">
          <i class="fas fa-fw fa-thumbs-up"/>
          {thanks} Thanks
        </Typography>
        <Typography variant="subtitle1">
          <i class="fas fa-fw fa-user-edit" style={{margin: '0 3px'}}/>
          <b>{posts}</b> Posts
          in <b>{threads}</b> Threads
        </Typography>
      </Grid>
    );
  }
}
