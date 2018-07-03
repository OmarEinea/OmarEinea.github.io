import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from '../db';
import CertCard from './card/Card';

export default class Skills extends Component {
  state = {certs: []};

  componentWillMount() {
    get('certs').then(certs => {
      const { top } = certs;
      delete certs.top;
      for(let key in certs) {
        let category = certs[key];
        for(let cert in category)
          if(category[cert] === -1)
            category[cert] = top[cert];
        certs[key] = Object.entries(category);
      }
      this.setState({certs: Object.entries(certs)});
    });
  }

  render() {
    return (
      <Grid container class="container" style={{marginBottom: 24}}>
        {this.state.certs.map(([category, certs]) =>
          <Grid container justify="center">
            <Typography variant="display1" class="category">{category}</Typography>
            {certs.map(cert =>
              <Grid item md={4} sm={6} xs={12}>
                <CertCard cert={cert}/>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
