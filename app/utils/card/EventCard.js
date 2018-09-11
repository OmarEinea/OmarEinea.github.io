import { PureComponent } from 'react';
import { ClickAwayListener, Typography, Collapse, CardActions } from 'material-ui';
import { Card, CardMedia, Button, IconButton } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class EventCard extends PureComponent {
  state = {text: false, image: false, scroll: false};

  render() {
    const { text, image, scroll } = this.state,
      [ title, { desc, place, images, preview }] = this.props.data;
    return (
      <Card class="card">
        <CardMedia onClick={() => this.setState({image: true})}
          style={{paddingTop: '50%', marginBottom: 54, position: 'relative'}}
          image={url(`events/${title}/${preview ? 'preview' : 1}.jpg`)}>
          <Button class="image-button"><i/></Button>
          <i class="fas fa-images white-text" style={{position: 'absolute', bottom: 18, left: 18, fontSize: 20}}/>
        </CardMedia>
        {image && <Gallery title={title} images={images}
          folder="events" onClose={() => this.setState({image: false})}/>}
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: false})}}>
          <Collapse in={text} collapsedHeight="54px" timeout="auto" class={'collapse' + (scroll ? ' scroll' : '')}
            onEntered={() => this.setState({scroll: true})} onExit={() => this.setState({scroll: false})}>
            <CardActions style={{padding: '16px 18px'}}>
              <Typography variant="title" style={{fontSize: 19, flex: 1, color: '#424242'}} noWrap>
                {title}
              </Typography>
              <IconButton onClick={() => this.setState({text: !text})}
                style={{margin: -10}} class="mini">
                <i style={{fontSize: 12}} class={'fas fa-chevron-' + (text ? 'down' : 'up')}/>
              </IconButton>
            </CardActions>
            <div style={{margin: 16, marginTop: text ? -8 : 0, marginBottom: text ? 14 : 6}}>
              <Typography style={{color: '#616161', marginBottom: 12}} noWrap>
                <i class="fas fa-map-marker-alt" style={{margin: '0 4px 0 1px'}}/> {place}
              </Typography>
              <Typography>{desc}</Typography>
            </div>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
