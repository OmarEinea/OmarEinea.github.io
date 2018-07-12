import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import CertCard from '~/certs/card/Card';

export default class Certificates extends Component {
  state = {certs: []};

  componentWillMount() {
    get('certs/top').then(certs => this.setState({certs: Object.entries(certs)}));
  }

  render() {
    return (
      <Grid container>
        {this.state.certs.map((cert) =>
          <Grid item sm={4} xs={12}>
            <CertCard cert={cert}/>
          </Grid>
        )}
      </Grid>
    );
  }
}
