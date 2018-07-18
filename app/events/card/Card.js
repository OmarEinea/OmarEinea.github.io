import { Component } from 'react';
import { ClickAwayListener, Typography, Collapse, CardActions } from 'material-ui';
import { Card, CardMedia, CardContent, IconButton } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';

export default class EventCard extends Component {
  state = {text: false, image: false};

  render() {
    const { text, image } = this.state,
      [ title, { desc, place, images } ] = this.props.event;
    return (
      <Card style={{margin: '6px 8px', position: 'relative'}}>
        <CardMedia image={url(`events/${title}/1.jpg`)} onClick={() => this.setState({image: true})}
          style={{paddingTop: '56.25%', marginBottom: 54, cursor: 'pointer', position: 'relative'}}>
          <i class="fas fa-images fa-lg white-text" style={{position: 'absolute', bottom: 20, left: 16}}/>
        </CardMedia>
        <Gallery title={title} images={images.split(',')} folder="events"
          isOpen={image} onClose={() => this.setState({image: false})}/>
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: false})}}>
          <Collapse in={text} collapsedHeight="54px" timeout="auto"
            style={{position: 'absolute', bottom: 0, backgroundColor: 'white', maxHeight: '100%', width: '100%'}}>
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
