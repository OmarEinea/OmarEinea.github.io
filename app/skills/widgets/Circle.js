import { Component } from 'react';
import { Grid, Typography, CircularProgress } from 'material-ui';
import { logo } from '../../db';

export default class Circle extends Component {
  render() {
    const [ name, rate ] = this.props.skill;
    return (
      <Grid item direction="column" align="center" style={{margin: 16}}>
        <div style={{position: 'relative', marginBottom: 8}}>
          <CircularProgress variant="static" value={100} thickness={7} size={150}
            style={{position: 'absolute', left: 0, top: 0, color: '#ECECEC'}}/>
          <CircularProgress variant="static" value={rate} thickness={7} size={150}/>
          <img width="60" src={logo(name.replace(/\+/g, '%2B'))} style={{position: 'absolute', left: 45, top: 45}}/>
        </div>
        <Typography variant="title" style={{color: '#424242', maxWidth: 150}} noWrap>
          {name}
        </Typography>
      </Grid>
    );
  }
}
