import { Component } from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from 'material-ui';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from 'material-ui';
import { url, logo } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProjectCard extends Component {
  state = {text: false, image: false};

  render() {
    let { text, image } = this.state, { full } = this.props,
      [ title, { desc, type, images, skills, repo, demo } ] = this.props.data;
    return (
      <Card class="card">
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: !text})}}>
          <Collapse in={text} collapsedHeight={`${full ? 80 : 60}px`} timeout="auto" class="collapse down">
            <CardHeader subheader={full && type} style={{paddingLeft: 20, height: full || 28}}
              title={
                <b style={{fontSize: 19, verticalAlign: 'bottom', color: '#424242'}}>{title}</b>
              }
              avatar={
                full && <Avatar src={url(`projects/${title}/logo.png`)}/>
              }
              action={
                <IconButton onClick={() => this.setState({text: !text})}
                  style={{margin: '2px 5px'}} class="mini">
                  <i style={{fontSize: 14}} class={'fas fa-chevron-' + (text ? 'up' : 'down')}/>
                </IconButton>
              }
            />
            <Typography style={{padding: '0 16px 16px'}}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
        <CardMedia style={{paddingTop: '60%', marginTop: full ? 80 : 60, position: 'relative'}}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <i class="fas fa-images"
            style={{position: 'absolute', bottom: 20, right: 20, color: '#757575', fontSize: 20}}/>
          <Button class="image-button"/>
        </CardMedia>
        <Gallery title={title} images={images.split(',')} folder="projects"
          isOpen={image} onClose={() => this.setState({image: false})} format="png"/>
        <CardActions style={{padding: 16}}>
          <div style={{flex: 1, height: 44}}>
            {skills.split(',').map(skill =>
              <Tooltip title={skill}>
                <img width="44" style={{marginRight: 10}} src={logo(skill)}/>
              </Tooltip>
            )}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', margin: '-4px 0'}}>
            <Tooltip title="code" placement="left">
              <IconButton href={'https://github.com/' + repo}
                style={{width: 30, height: 30, fontSize: 22}}>
                <i class="fab fa-github-alt"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="demo" placement="left">
              <IconButton href={demo}
                style={{width: 30, height: 30, fontSize: 19}}>
                <i class="fas fa-eye"/>
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  }
}
