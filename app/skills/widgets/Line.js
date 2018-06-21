import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { logo } from '../../db';

export default class Line extends Component {
  render() {
    const [ name, rate ] = this.props.skill;
    return (
      <Grid item direction="column" style={{margin: '12px 16px'}}>
        <Typography variant="title" style={{color: '#424242', marginBottom: 6}}>
          {name}
        </Typography>
        <div style={{backgroundColor: '#ECECEC', height: 16, width: '100%'}}>
          <div style={{backgroundColor: '#3F51B5', height: '100%', width: rate + '%'}}></div>
        </div>
      </Grid>
    );
  }
}
