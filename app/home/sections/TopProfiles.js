import { PureComponent } from 'react';
import { Grid, Grow } from 'material-ui';
import { GitHub, StackOverflow, XdaDevelopers } from '~/profiles/widgets';

export default class TopProfiles extends PureComponent {
  state = { GitHub: {}, StackOverflow: {}, XdaDevelopers: {} };

  componentWillReceiveProps(props) {
    if (props.data) this.setState(Object.assign({}, ...props.data.map(([k, v]) => ({ [k]: v }))));
  }

  render() {
    const { state, props: { visible } } = this;
    return (
      <Grid container justify="center">
        <Grow in={visible} timeout={600}>
          <Grid item md={4} sm={6} xs={12} >
            <div class="box">
              <GitHub data={state.GitHub} />
            </div>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={800}>
          <Grid item md={4} sm={6} xs={12}>
            <div class="box">
              <StackOverflow data={state.StackOverflow} />
            </div>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={1000}>
          <Grid item md={4} sm={6} xs={12}>
            <div class="box">
              <XdaDevelopers data={state.XdaDevelopers} />
            </div>
          </Grid>
        </Grow>
      </Grid>
    );
  }
}
