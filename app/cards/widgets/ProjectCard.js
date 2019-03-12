import { PureComponent } from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from 'material-ui';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from 'material-ui';
import { url, skill } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProjectCard extends PureComponent {
  state = {text: false, image: false, scroll: false};

  render() {
    const { state: { text, image, scroll }, props: { full }} = this,
      [ title, { desc, type, images, skills, repo, demo }] = this.props.data;
    return (
      <Card class="card">
        <ClickAwayListener onClickAway={() => {if(text) this.setState({text: !text})}}>
          <Collapse collapsedHeight={`${full ? 80 : 60}px`} timeout="auto" class={'collapse down' + (scroll ? ' scroll' : '')}
            in={text} onEntered={() => this.setState({scroll: true})} onExit={() => this.setState({scroll: false})}>
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
                  <i style={{fontSize: 14}} class={'fas fa-chevron-down' + (text ? ' rotate' : '')}/>
                </IconButton>
              }
            />
            <Typography style={{padding: '0 16px 14px'}}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
        <CardMedia style={{paddingTop: '60%', marginTop: full ? 80 : 60, position: 'relative'}}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({image: true})}>
          <i class="fas fa-images"
            style={{position: 'absolute', bottom: 20, right: 20, color: '#757575', fontSize: 20}}/>
          <Button class="image-button"><i/></Button>
        </CardMedia>
        {image && <Gallery title={title} images={images} folder="projects"
          onClose={() => this.setState({image: false})} format="png"/>}
        <CardActions style={{padding: 16}}>
          <div style={{flex: 1, height: 44}}>
            {skills.split(',').map(title =>
              <Tooltip title={title}>
                <img width="44" style={{marginRight: 10}} src={skill(title)}/>
              </Tooltip>
            )}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', margin: '-4px 0'}}>
            <Tooltip title="code" placement="left">
              <IconButton href={'https://github.com/' + repo} target="_blank"
                style={{fontSize: 22}} class="project-button">
                <i class="fab fa-github-alt"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="demo" placement="left">
              <IconButton class="project-button" target="_blank"
                style={{fontSize: 19}} href={demo}>
                <i class="fas fa-eye"/>
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  }
}
