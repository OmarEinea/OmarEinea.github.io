import { PureComponent } from 'react';
import { Grid, Grow } from 'material-ui';
import Circle from '~/skills/widgets/Circle';
import Line from '~/skills/widgets/Line';

export default class TopSkills extends PureComponent {
  state = { circles: [], lines: [] };

  componentWillReceiveProps(props) {
    if (props.data) this.setState(props.data);
  }

  render() {
    const { state: { circles, lines }, props: { visible } } = this;
    return (
      <Grid container>
        <Grow in={visible} timeout={400}>
          <Grid container item md={7} xs={12}>
            <Grid container justify="space-around" class="box">
              {circles.map(skill => <Circle skill={skill} />)}
            </Grid>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={700}>
          <Grid container item md={5} xs={12}>
            <Grid container direction="column" class="box">
              {lines.map(skill => <Line skill={skill} />)}
            </Grid>
          </Grid>
        </Grow>
      </Grid>
    );
  }
}
