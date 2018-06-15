import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get, url } from '../../db';
import fetch from 'fetch';
import './Profiles.css';

export default class Profiles extends Component {
  constructor() {
    super();
    this.state = {graph: {}, github: {}, stack: {}, xda: {}};
    fetch('https://urlreq.appspot.com/req?method=GET&url=' +
          'https://github.com/users/OmarEinea/contributions')
      .then(data => data.text()).then(html => {
        let regex = /data-count="([0-9]+)"/g, match, commits = 0;
        html = html.replace('width="676" height="104"', 'width="667" height="108"')
                   .replace('translate(16, 20)', 'translate(20, 24)');
        while(match = regex.exec(html))
          commits += Number(match[1]);
        this.setState({graph: {html, commits}});
      });
    fetch('https://api.github.com/users/OmarEinea').then(data => data.json())
      .then(github => this.setState({github: {
        followers: github.followers,
        repos: github.public_repos,
        stars: this.state.github.stars
      }}));
    get('home/profiles').then(data => data.json())
      .then(profiles => this.setState({
        xda: profiles.xda, github: {
          stars: profiles.github.stars,
          repos: this.state.github.repos,
          followers: this.state.github.followers
        }
      }));
    fetch('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow')
      .then(data => data.json()).then(stack => {
        const { reputation } = stack.items[0];
        const { gold, silver, bronze } = stack.items[0].badge_counts;
        this.setState({stack: {reputation, gold, silver, bronze}});
      });
  }

  render() {
    return (
      <Grid container style={{backgroundColor: '#FAFAFA'}}>
        <Grid container class="container" style={{paddingTop: 16, paddingBottom: 24}}>
          <Grid container justify="center">
            <Typography variant="display1" style={{padding: 28}}>My Dev Profiles</Typography>
          </Grid>
          <Grid container class="container box">
            <Grid item sm={4} xs={12} id="github">
              <a href="my/github"><img height="50" src={url('logos/gh.png')}></img></a>
              <Typography variant="subheading">
                <i class="fas fa-fw fa-hdd"/>
                <b>{this.state.github.repos}</b> Repositories
              </Typography>
              <Typography variant="subheading">
                <i class="fas fa-fw fa-user-friends"/>
                <b>{this.state.github.followers}</b> Followers
              </Typography>
              <Typography variant="subheading">
                <i class="fas fa-fw fa-star"/>
                <b>{this.state.github.stars}</b> Stars
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} justify="center" class="font">
              <Typography variant="headline" align="center" style={{padding: '8px 0 16px'}}>
                {this.state.graph.commits} contributions last year
              </Typography>
              <div id="graph" dangerouslySetInnerHTML={{__html: this.state.graph.html}}/>
              <div id="legend">
                Commits made by me
                <div style={{float: 'right'}}>
                  Less
                  <ul>
                    {['#eee', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
                      .map(color => <li style={{backgroundColor: color}}></li>)}
                  </ul>
                  More
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <div class="box flair" style={{marginRight: 12}}>
                <a href="my/stackoverflow"><img height="45" src={url('logos/so.png')}></img></a>
                <Typography variant="title">
                  <i class="fas fa-fw fa-thumbs-up"/>
                  {this.state.stack.reputation} Up Votes
                </Typography>
                <Typography variant="subheading">
                  <i class="fas fa-fw fa-trophy" style={{marginLeft: 2}}/> Badges
                  <b style={{color: '#c38b5f'}}>
                    <i class="fas fa-fw fa-certificate"/> {this.state.stack.bronze}
                  </b>
                  <b style={{color: '#8c9298'}}>
                    <i class="fas fa-fw fa-certificate"/> {this.state.stack.silver}
                  </b>
                  <b style={{color: '#cda400'}}>
                    <i class="fas fa-fw fa-certificate"/> {this.state.stack.gold}
                  </b>
                </Typography>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div class="box flair" style={{marginLeft: 12}}>
                <a href="my/xda-developers"><img height="45" src={url('logos/xda.png')}></img></a>
                <Typography variant="title">
                  <i class="fas fa-fw fa-thumbs-up"/>
                  {this.state.xda.thanks} Thanks
                </Typography>
                <Typography variant="subheading">
                  <i class="fas fa-fw fa-user-edit" style={{margin: '0 3px'}}/>
                  <b>{this.state.xda.posts}</b> Posts
                  in <b>{this.state.xda.threads}</b> Threads
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
