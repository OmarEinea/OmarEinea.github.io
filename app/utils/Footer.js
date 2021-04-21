import { PureComponent } from 'react';
import { Grid, IconButton, Typography } from 'material-ui';
import { colors, age } from 'db';

export default class Footer extends PureComponent {
  render() {
    return (
      <Grid item id="footer" class="white-text">
        <div style={{ background: `linear-gradient(to top right, ${colors[0]}, ${colors[5]})`, zIndex: -2 }} />
        <Grid container class="container">
          <Grid item sm={6} xs={12} align="center" style={{ paddingTop: 36 }}>
            <Typography variant="h5" gutterBottom>About Me</Typography>
            <Typography variant="subtitle1" gutterBottom>
              I'm a passionate {age} years old<br />
              self-taught Application Developer.
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} align="center" style={{ padding: '36px 0' }}>
            <Typography variant="h5" gutterBottom>Contact</Typography>
            <IconButton href="mailto:hello@omareinea.com">
              <i class="fas fa-envelope" />
            </IconButton>
            {['linkedin', 'instagram', 'google-plus', 'facebook'].map(profile =>
              <IconButton target="_blank" href={'my/' + profile}>
                <i class={'fab fa-' + profile} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
