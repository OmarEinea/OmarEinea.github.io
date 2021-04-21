import { Component } from 'react';
import { Grid, CircularProgress } from 'material-ui';
import { colors } from 'db';

export default class Loading extends Component {
  state = { index: colors.length - 1 };

  componentWillMount() {
    let direction = -1;
    this.colorChanger = setInterval(() => this.setState(prev => {
      if (prev.index + direction === colors.length) {
        direction = -1;
      } else if (prev.index + direction === 0) {
        direction = 1;
      }
      return { index: prev.index + direction };
    }), 1000);
  }

  render() {
    const { props: { style }, state: { index } } = this;
    return (
      <Grid container justify="center" alignItems="center"
        style={{ flex: 1, marginBottom: 16, ...style }}>
        <CircularProgress size={64} style={{ color: colors[index] }} />
      </Grid>
    );
  }

  componentWillUnmount() {
    clearInterval(this.colorChanger);
  }
}
