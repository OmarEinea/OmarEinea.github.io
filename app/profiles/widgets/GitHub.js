import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { logo } from 'db';
import './GitHub.css';

export default class GitHub extends PureComponent {
  render() {
    const { repos, followers, stars, commits, graph } = this.props.data;
    return (
      <Grid container>
        <Grid item md={3} xs={12} id="github">
          <a href="my/github" target="_blank">
            <img height="50" src={logo('gh')}/>
          </a>
          <Typography variant="subtitle1">
            <i class="fas fa-fw fa-hdd"/>
            <b>{repos}</b> Repositories
          </Typography>
          <Typography variant="subtitle1">
            <i class="fas fa-fw fa-user-friends"/>
            <b>{followers}</b> Followers
          </Typography>
          <Typography variant="subtitle1">
            <i class="fas fa-fw fa-star"/>
            <b>{stars}</b> Stars
          </Typography>
        </Grid>
        <Grid item md={9} xs={12} align="center">
          <Grid item style={{maxWidth: 685}}>
            <Typography variant="h5" align="center" style={{padding: '8px 0 16px'}}>
              {commits} contributions last year
            </Typography>
            <div id="graph" dangerouslySetInnerHTML={{__html: graph}}/>
            <Typography variant="caption" align="left" id="legend">
              Commits made by me
              <div style={{float: 'right'}}>
                Less
                <ul>
                  {['#eee', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
                    .map(color => <li style={{backgroundColor: color}}></li>)}
                </ul>
                More
              </div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
