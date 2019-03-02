import { PureComponent } from 'react';
import { Card, CardMedia, Button } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProfileCard extends PureComponent {
  state = {image: false};

  render() {
    const { image } = this.state, { name, images, style, children, ratio } = this.props;
    return (
      <Card class="card" style={style}>
        <CardMedia style={{paddingTop: `${ratio || 60}%`, position: 'relative'}}
          image={url(`profiles/${name}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <Button class="image-button"><i/></Button>
          <i class="fas fa-images"
            style={{position: 'absolute', bottom: 24, right: 24, fontSize: 20, color: '#757575'}}/>
        </CardMedia>
        {image && <Gallery title={name} images={images}
          folder="profiles" onClose={() => this.setState({image: false})}/>}
        <div style={{padding: 8}}>{children}</div>
      </Card>
    );
  }
}
