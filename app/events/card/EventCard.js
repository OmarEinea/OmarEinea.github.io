import { Component } from 'react';
import { ClickAwayListener, Typography, Collapse, CardActions } from 'material-ui';
import { Card, CardMedia, Button, IconButton } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';

export default class EventCard extends Component {
  state = {text: false, image: false};

  render() {
    const { text, image } = this.state,
      [ title, { desc, place, images } ] = this.props.data;
    return (
      <Card class="card">
        <CardMedia style={{paddingTop: '50%', marginBottom: 54, position: 'relative'}}
          image={url(`events/${title}/1.jpg`)} onClick={() => this.setState({image: true})}>
          <Button class="image-button"/>
          <i class="fas fa-images fa-lg white-text" style={{position: 'absolute', bottom: 20, left: 16}}/>
        </CardMedia>
        <Gallery title={title} images={images.split(',')} folder="events"
          isOpen={image} onClose={() => this.setState({image: false})}/>
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: false})}}>
          <Collapse in={text} collapsedHeight="54px" timeout="auto" class="collapse">
            <CardActions style={{padding: 16}}>
              <Typography variant="title" style={{fontSize: 19, flex: 1}} noWrap>
                {title}
              </Typography>
              <IconButton onClick={() => this.setState({text: !text})}
                style={{margin: -10, width: 40, height: 40}}>
                <i style={{fontSize: 12}} class={'fas fa-chevron-' + (text ? 'down' : 'up')}/>
              </IconButton>
            </CardActions>
            <Typography style={{padding: '0 16px 16px'}}>
              <Typography style={{color: '#616161', marginBottom: 12}} noWrap>
                <i class="fas fa-map-marker-alt" style={{margin: '0 4px 0 1px'}}/> {place}
              </Typography>
              {desc}
            </Typography>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
