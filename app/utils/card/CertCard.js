import { PureComponent } from 'react';
import { ClickAwayListener, Typography, Collapse } from 'material-ui';
import { Card, CardMedia, CardContent, CardActions, Button, IconButton } from 'material-ui';
import { url } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class CertCard extends PureComponent {
  state = {text: false, image: false, scroll: false};

  render() {
    const { text, image, scroll } = this.state,
      [ title, { desc, auth }] = this.props.data;
    return (
      <Card class="card">
        <CardMedia style={{paddingTop: '70%', marginBottom: 82, position: 'relative'}}
          image={url(`certs/small/${title}.jpg`)} onClick={() => this.setState({image: true})}>
          <Button class="image-button"><i/></Button>
        </CardMedia>
        {image && <Gallery title={title} folder="certs" onClose={() => this.setState({image: false})}/>}
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: false})}}>
          <Collapse in={text} collapsedHeight="82px" timeout="auto" class={'collapse' + (scroll ? ' scroll' : '')}
            onEntered={() => this.setState({scroll: true})} onExit={() => this.setState({scroll: false})}>
            <CardContent style={{padding: '16px 15.5px 16px 18px'}}>
              <Typography variant="title" style={{fontSize: 19, marginBottom: 8, color: '#424242'}} noWrap>
                {title}
              </Typography>
              <CardActions style={{padding: 0}}>
                <Typography style={{flex: 1, color: '#616161'}} noWrap>
                  <i class="fas fa-landmark" style={{marginRight: 4}}/> {auth}
                </Typography>
                <IconButton onClick={() => this.setState({text: !text})}
                  style={{margin: '-10px -10px -12px'}} class="mini">
                  <i style={{fontSize: 12}} class={'fas fa-chevron-' + (text ? 'down' : 'up')}/>
                </IconButton>
              </CardActions>
            </CardContent>
            <Typography style={{padding: '0 16px 14px'}}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
