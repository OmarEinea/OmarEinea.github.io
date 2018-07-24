import { Component } from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from 'material-ui';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from 'material-ui';
import { url, logo } from 'db';
import Gallery from 'gallery';

export default class ProjectCard extends Component {
  state = {text: false, image: false};

  render() {
    let { text, image } = this.state,
      [ title, { desc, type, images, skills, repo, demo } ] = this.props.project;
    return (
      <Card class="card">
        <CardMedia style={{paddingTop: '60%', marginTop: 80, position: 'relative'}}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <i class="fas fa-images fa-lg"
            style={{position: 'absolute', bottom: 20, left: 16, color: '#757575'}}/>
          <Button class="image-button"/>
        </CardMedia>
        <Gallery title={title} images={images.split(',')} folder="projects"
          isOpen={image} onClose={() => this.setState({image: false})} format="png"/>
      </Card>
    );
  }
}
