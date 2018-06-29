import { Component } from 'react';
import { ClickAwayListener, Typography, Collapse } from 'material-ui';
import { Card, CardMedia, CardContent, CardActions, IconButton } from 'material-ui';
import { url } from '../../db';

export default class CertCard extends Component {
  state = {expanded: false};

  render() {
    const [ title, { desc, auth } ] = this.props.data, { expanded } = this.state;
    return (
      <Card style={{margin: '8px 6px', position: 'relative'}}>
        <CardMedia style={{paddingTop: '70%', marginBottom: 82}}
          image={url(`certs/${title}.jpg`)}/>
        <ClickAwayListener onClickAway={() => {if(expanded) this.setState({expanded: false})}}>
          <Collapse in={expanded} collapsedHeight="82px" timeout="auto"
            style={{position: 'absolute', bottom: 0, backgroundColor: 'white', maxHeight: '100%', width: '100%'}}>
            <CardContent style={{padding: 16}}>
              <Typography variant="title" style={{fontSize: 19, marginBottom: 8}} noWrap>
                {title}
              </Typography>
              <CardActions style={{padding: 0}}>
                <Typography style={{flex: 1, color: '#616161'}} noWrap>
                  <i class="fas fa-university" style={{marginRight: 4}}/> {auth}
                </Typography>
                <IconButton onClick={() => this.setState({expanded: !expanded})}
                  style={{margin: '-8px -10px -12px', width: 40, height: 40}}>
                  <i style={{fontSize: 12}} class={'fas fa-chevron-' + (expanded ? 'down' : 'up')}/>
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
