import { PureComponent } from 'react';
import { Card, CardMedia, Button, Typography, Grid, Hidden } from 'material-ui';
import { url, profile } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProfileCard extends PureComponent {
  state = {image: false};

  render() {
    const { name, images, style, children, ratio, use='' } = this.props,
      { image } = this.state, [text, icon] = use.split(';');
    return (
      <Card class="card" style={style}>
        <CardMedia style={{paddingTop: `${ratio || 60}%`, position: 'relative'}}
          image={url(`profiles/${name}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <Button class="image-button"><i/></Button>
          <i class="fas fa-images"
            style={{position: 'absolute', bottom: 24, right: 24, fontSize: 20, color: '#757575'}}/>
        </CardMedia>
        {image && <Gallery title={name} images={images} format="png"
          folder="profiles" onClose={() => this.setState({image: false})}/>}
        <div style={{padding: 8}}>
          {children || <Grid container style={{padding: '16px 16px 12px'}}>
            <Grid item md={7} xs={12}>
              <a href={'my/' + name.toLowerCase().replace(/ /g, '')}>
                <img height="42" src={profile(name)}/>
              </a>
            </Grid>
            <Grid item md={5} xs={12}>
              <Typography variant="body1" style={{color: '#616161', lineHeight: 1.4}}>
                <b style={{color: '#9e9e9e', fontSize: 14}}>Main Use: </b>
                <Hidden smDown><br/></Hidden>
                {icon && <i class={'fa fa-fw fa-' + icon}/>} {text}
              </Typography>
            </Grid>
          </Grid>}
        </div>
      </Card>
    );
  }
}
