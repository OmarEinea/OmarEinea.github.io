import { PureComponent } from 'react';
import { Grid, Hidden, Grow } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';
import { get } from 'db';
import './Profiles.css';

export default class Profiles extends PureComponent {
  state = {github: {}, stack: {}, xda: {}};

  componentWillMount() {
    get('home/profiles').then(profiles => this.setState(profiles));
  }

  render() {
    const { state: { github, stack, xda }, props: { visible }} = this;
    return (
      <Grid container>
        <Grow in={visible} timeout={500}>
          <Grid container class="box">
            <GitHub data={github}/>
          </Grid>
        </Grow>
        <Hidden xsDown><Grid container style={{height: 4}}/></Hidden>
        <Grid container>
          <Grow in={visible} timeout={800}>
            <Grid item sm={6} xs={12}>
              <div class="box flair">
                <StackOverflow data={stack}/>
              </div>
            </Grid>
          </Grow>
          <Grow in={visible} timeout={1000}>
            <Grid item sm={6} xs={12}>
              <div class="box flair">
                <XdaDevelopers data={xda}/>
              </div>
            </Grid>
          </Grow>
        </Grid>
      </Grid>
    );
  }
}
