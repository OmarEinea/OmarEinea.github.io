import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { url } from '../../db';
import fetch from 'fetch';
import './Profiles.css';

export default class Profiles extends Component {
  constructor() {
    super();
    this.state = {graph: {}, github: {}};
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
        repos: github.public_repos
      }}));
  }

  render() {
    return (
      <Grid container style={{backgroundColor: '#FAFAFA'}}>
        <Grid container class="container">
          <Grid container justify="center">
            <Typography variant="display1" style={{padding: 24}}>My Dev Profiles</Typography>
          </Grid>
          <Grid container class="container box">
            <Grid item sm={4} xs={12} id="github">
              <img width="160" src={url('logos/github.png')}></img>
              <Typography variant="subheading">
                <i class="fas fa-fw fa-hdd"/>
                <b>{this.state.github.repos}</b> Repositories
              </Typography>
              <Typography variant="subheading">
                <i class="fas fa-fw fa-user-friends"/>
                <b>{this.state.github.followers}</b> Followers
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12} justify="center" class="font">
              <Typography variant="headline" align="center" style={{padding: '8px 0 16px'}}>
                {this.state.graph.commits} contributions last year
              </Typography>
              <div id="graph" dangerouslySetInnerHTML={{__html: this.state.graph.html}}/>
              <div id="legend">
                Summary of commits made by <a href="my/github">@OmarEinea</a>
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
        </Grid>
      </Grid>
    );
  }
}
