import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from '../../db';
import CertCard from '../../certs/card/Card';

export default class Certificates extends Component {
  state = {certs: []};

  componentWillMount() {
    get('certs/top').then(certs => this.setState({certs: Object.entries(certs)}));
  }

  render() {
    return (
      <Grid container class="container" style={{padding: '16px 0 24px'}}>
        <Grid container justify="center">
          <Typography variant="display1" style={{padding: 28, color: '#616161', marginBottom: 4}}>
            My Certificates
          </Typography>
        </Grid>
        {this.state.certs.map((cert) =>
          <Grid item sm={4} xs={12}>
            <CertCard cert={cert}/>
          </Grid>
        )}
      </Grid>
    );
  }
}
