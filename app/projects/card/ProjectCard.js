import { Component } from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from 'material-ui';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from 'material-ui';
import { url, logo } from 'db';
import Gallery from 'gallery';

export default class ProjectCard extends Component {
  state = {text: false, image: false};

  render() {
    let { text, image } = this.state, { full } = this.props,
      [ title, { desc, type, images, skills, repo, demo } ] = this.props.project;
    return (
      <Card class="card">
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: !text})}}>
          <Collapse in={text} collapsedHeight={`${full ? 80 : 64}px`} timeout="auto" class="collapse down">
            <CardHeader title={title} subheader={full && type}
              style={{paddingLeft: 16, height: full || 28}}
              avatar={
                full && <Avatar src={url(`projects/${title}/logo.png`)}/>
              }
              action={
                <IconButton onClick={() => this.setState({text: !text})}>
                  <i style={{fontSize: 14}} class={'fas fa-chevron-' + (text ? 'up' : 'down')}/>
                </IconButton>
              }
            />
            <Typography style={{padding: '0 16px 16px'}}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
        <CardMedia style={{paddingTop: '60%', marginTop: full ? 80 : 64, position: 'relative'}}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <i class="fas fa-images fa-lg"
            style={{position: 'absolute', bottom: 20, left: 16, color: '#757575'}}/>
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
          <div style={{display: 'flex', flexDirection: 'column', margin: '-4px -2px'}}>
            <Tooltip title="code" placement="right">
              <IconButton href={'https://github.com/' + repo}
                style={{width: 30, height: 30, fontSize: 22}}>
                <i class="fab fa-github-alt fa-1x"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="demo" placement="right">
              <IconButton href={demo}
                style={{width: 30, height: 30, fontSize: 19}}>
                <i class="fas fa-eye fa-1x"/>
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  }
}
