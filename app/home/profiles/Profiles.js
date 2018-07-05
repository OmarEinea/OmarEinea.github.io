import { Component } from 'react';
import { Grid, Typography, Hidden } from 'material-ui';
import { get, logo, json } from '../../db';
import fetch from 'fetch';
import './Profiles.css';

export default class Profiles extends Component {
  state = {graph: {}, github: {}, stack: {}, xda: {}};

  componentWillMount() {
    if(process.env.NODE_ENV === 'production') {
      fetch('https://urlreq.appspot.com/req?method=GET&url=' +
            'https://github.com/users/OmarEinea/contributions')
        .then(data => data.text()).then(html => {
          let regex = /data-count="([0-9]+)"/g, match, commits = 0;
          html = html.replace('translate(16, 20)', 'translate(20, 24)')
                     .replace('height="104"', 'height="108"')
                     .replace(/dx="-14"/g, 'dx="-20"');
          while(match = regex.exec(html))
            commits += Number(match[1]);
          this.setState({graph: {html, commits}});
        });
    }
    fetch('https://api.github.com/users/OmarEinea')
      .then(json).then(github => this.setState({github: {
        followers: github.followers,
        repos: github.public_repos,
        stars: this.state.github.stars
      }}));
    get('home/profiles').then(profiles => this.setState({
        xda: profiles.xda, github: {
          stars: profiles.github.stars,
          repos: this.state.github.repos,
          followers: this.state.github.followers
        }
      }));
    fetch('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow')
      .then(json).then(stack => {
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
          <Grid container class="box">
            <Grid item md={3} xs={12} id="github">
              <a href="my/github"><img height="50" src={logo('gh')}></img></a>
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
            <Grid item md={9} xs={12} align="center">
              <Grid item style={{maxWidth: 685}}>
                <Typography variant="headline" align="center" style={{padding: '8px 0 16px'}}>
                  {this.state.graph.commits} contributions last year
                </Typography>
                <div class="font" style={{overflow: 'hidden', marginLeft: 8}}
                  dangerouslySetInnerHTML={{__html: this.state.graph.html}}/>
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
          <Hidden xsDown><Grid container style={{height: 4}}/></Hidden>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <div class="box flair">
                <a href="my/stackoverflow"><img height="45" src={logo('so')}></img></a>
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
              <div class="box flair">
                <a href="my/xda-developers"><img height="45" src={logo('xda')}></img></a>
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
