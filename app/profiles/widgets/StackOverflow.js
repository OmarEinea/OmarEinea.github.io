import { PureComponent } from 'react';
import { Grid, Typography } from 'material-ui';
import { logo } from 'db';

export default class StackOverflow extends PureComponent {
  render() {
    const { reputation, gold, silver, bronze } = this.props.data;
    return (
      <Grid item>
        <a href="my/stackoverflow" target="_blank">
          <img height="45" src={logo('so')}/>
        </a>
        <Typography variant="h6">
          <i class="fas fa-fw fa-thumbs-up"/>
          {reputation} Up Votes
        </Typography>
        <Typography variant="subtitle1">
          <i class="fas fa-fw fa-trophy" style={{marginLeft: 2}}/> Badges
          <b style={{color: '#c38b5f'}}>
            <i class="fas fa-fw fa-certificate"/> {bronze}
          </b>
          <b style={{color: '#8c9298'}}>
            <i class="fas fa-fw fa-certificate"/> {silver}
          </b>
          <b style={{color: '#cda400'}}>
            <i class="fas fa-fw fa-certificate"/> {gold}
          </b>
        </Typography>
      </Grid>
    );
  }
}
