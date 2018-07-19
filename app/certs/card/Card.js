import { Component } from 'react';
import { ClickAwayListener, Typography, Collapse } from 'material-ui';
import { Card, CardMedia, CardContent, CardActions, Button, IconButton } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';

export default class CertCard extends Component {
  state = {text: false, image: false};

  render() {
    const { text, image } = this.state,
      [ title, { desc, auth } ] = this.props.cert;
    return (
      <Card style={{margin: '6px 8px', position: 'relative'}}>
        <CardMedia style={{paddingTop: '70%', marginBottom: 82, cursor: 'pointer', position: 'relative'}}
          image={url(`certs/small/${title}.jpg`)} onClick={() => this.setState({image: true})}>
          <Button class="dark-hover" style={{position: 'absolute', top: 0, bottom: 0, width: '100%'}}/>
        </CardMedia>
        <Gallery title={title} folder="certs" isOpen={image} onClose={() => this.setState({image: false})}/>
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: false})}}>
          <Collapse in={text} collapsedHeight="82px" timeout="auto"
            style={{position: 'absolute', bottom: 0, backgroundColor: 'white', maxHeight: '100%', width: '100%'}}>
            <CardContent style={{padding: 16}}>
              <Typography variant="title" style={{fontSize: 19, marginBottom: 8}} noWrap>
                {title}
              </Typography>
              <CardActions style={{padding: 0}}>
                <Typography style={{flex: 1, color: '#616161'}} noWrap>
                  <i class="fas fa-university" style={{marginRight: 4}}/> {auth}
                </Typography>
                <IconButton onClick={() => this.setState({text: !text})}
                  style={{margin: '-8px -10px -12px', width: 40, height: 40}}>
                  <i style={{fontSize: 12}} class={'fas fa-chevron-' + (text ? 'down' : 'up')}/>
                </IconButton>
              </CardActions>
            </CardContent>
            <Typography style={{padding: '0 16px 16px'}}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
