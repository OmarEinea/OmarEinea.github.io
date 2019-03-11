import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { profile } from 'db';
import './GitHub.css';

const colors = ['#eaeaea', '#c6e48b', '#7bc96f', '#239a3b', '#196127'], days = ['Mon', 'Wed', 'Fri'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
months = months.splice(new Date().getMonth()).concat(months);

export default class GitHub extends PureComponent {
  render() {
    const { repos, followers, stars, commits, graph } = this.props.data;
    return (
      <Grid container style={{padding: '16px 8px'}}>
        <Grid item md={3} xs={12} id="github">
          <a href="my/github" target="_blank">
            <img height="50" src={profile('GitHub')}/>
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
        <Grid item md={9} xs={12} align="right">
          <Grid item style={{maxWidth: 685, padding: '0 8px'}}>
            <Typography variant="h5" align="center">
              {commits} contributions last year
            </Typography>
            <div id="graph">
              <svg width="669" height="108">
                <g transform="translate(20, 24)">
                  {months.map((month, i) => <text x={(4*i+1)*13} y="-10">{month}</text>)}
                  {days.map((day, i) => <text dx="-20" dy={i*25+20}>{day}</text>)}
                  {graph && [...Array(53)].map((_, week) =>
                    <g transform={`translate(${week * 13}, 0)`}>
                      {[...Array(7)].map((_, day) =>
                        <rect width="10" height="10" x={13 - week} y={day * 12}
                          fill={colors[graph.charAt(week * 7 + day)]}/>
                      )}
                    </g>
                  )}
                </g>
              </svg>
            </div>
            <Typography variant="caption" align="left" id="legend">
              Commits made by me
              <div style={{float: 'right'}}>
                Less
                <ul>{colors.map(color => <li style={{backgroundColor: color}}></li>)}</ul>
                More
              </div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
