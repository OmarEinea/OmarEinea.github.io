import { PureComponent } from 'react';
import { Card, CardMedia, Button, Typography, Grid } from 'material-ui';
import { url, profile } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProfileCard extends PureComponent {
  state = { image: false };

  render() {
    const { name, images, children, use = '', ...props } = this.props;
    const { image } = this.state, [text, icon] = use.split(';');
    return (
      <Card class="card" {...props}>
        <CardMedia style={{ paddingTop: '64%', position: 'relative', backgroundPosition: 'left' }}
          image={url(`profiles/${name}/preview.jpg`)} onClick={() => this.setState({ image: true })}>
          <Button class="image-button"><i /></Button>
          <i class="fas fa-images"
            style={{ position: 'absolute', bottom: 24, right: 24, fontSize: 20, color: '#757575' }} />
        </CardMedia>
        {image && <Gallery title={name} images={images} format="png"
          folder="profiles" onClose={() => this.setState({ image: false })} />}
        <div style={{ padding: 8 }}>
          {children || <Grid container direction="column" style={{ padding: '16px 16px 12px' }}>
            <Grid item style={{ marginBottom: 8 }}>
              <a href={'my/' + name.toLowerCase().replace(/ /g, '')}>
                <img height="42" src={profile(name)} />
              </a>
            </Grid>
            <Grid item>
              <Typography class="profile-use" variant="body1" style={{ color: '#616161', lineHeight: 1.4 }}>
                <b style={{ color: '#9e9e9e', fontSize: 14 }}>Main Use:</b>
                <br /><i class={'fa fa-fw fa-' + icon} /> {text}
              </Typography>
            </Grid>
          </Grid>}
        </div>
      </Card>
    );
  }
}
