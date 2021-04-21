import { PureComponent } from 'react';
import { Grid, Typography, CircularProgress, Tooltip } from 'material-ui';
import { skill } from 'db';

export default class Circle extends PureComponent {
  render() {
    const [name, rate] = this.props.skill;
    return (
      <Grid item direction="column" align="center" style={{ margin: 16 }}>
        <Tooltip title={rate + '%'} placement="top">
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <CircularProgress variant="determinate" value={100} thickness={7} size={150}
              style={{ position: 'absolute', left: 0, top: 0, color: '#ECECEC' }} />
            <CircularProgress variant="determinate" value={rate} thickness={7} size={150} />
            <img width="60" src={skill(name.replace(/\+/g, '%2B'))} style={{ position: 'absolute', left: 45, top: 45 }} />
          </div>
        </Tooltip>
        <Typography variant="h6" style={{ color: '#424242', maxWidth: 150 }} noWrap>
          {name}
        </Typography>
      </Grid>
    );
  }
}
