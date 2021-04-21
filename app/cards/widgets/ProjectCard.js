import { PureComponent } from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from 'material-ui';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from 'material-ui';
import { url, skill } from 'db';
import Gallery from 'gallery';
import './Card.css';

export default class ProjectCard extends PureComponent {
  state = { text: false, image: false, scroll: false };

  render() {
    const { state: { text, image, scroll }, props: { full, data } } = this;
    const [title, { desc, type, images, skills, repo, demo }] = data;

    return (
      <Card class="card">
        <ClickAwayListener onClickAway={() => { if (text) this.setState({ text: !text }) }}>
          <Collapse collapsedHeight={`${full ? 75 : 54}px`} timeout="auto" class={'collapse down' + (scroll ? ' scroll' : '')}
            in={text} onEntered={() => this.setState({ scroll: true })} onExit={() => this.setState({ scroll: false })}>
            <CardHeader subheader={full && type} style={{ padding: '14px 16px', height: full || 26 }}
              title={<b style={{ fontSize: 19, color: '#424242' }}>{title}</b>}
              avatar={full && <Avatar src={url(`projects/${title}/logo.png`)} />}
              action={
                <IconButton onClick={() => this.setState({ text: !text })} style={{ margin: '2px 0' }} class="mini">
                  <i style={{ fontSize: 14 }} class={'fas fa-chevron-down' + (text ? ' rotate' : '')} />
                </IconButton>
              }
            />
            <Typography variant="body2" style={{ padding: '0 16px 14px' }}>{desc}</Typography>
          </Collapse>
        </ClickAwayListener>
        <CardMedia style={{ paddingTop: '60%', marginTop: full ? 75 : 54, position: 'relative' }}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({ image: true })}>
          <i class="fas fa-images" style={{ position: 'absolute', bottom: 20, right: 20, color: '#757575', fontSize: 20 }} />
          <Button class="image-button"><i /></Button>
        </CardMedia>
        {image && <Gallery title={title} images={images} folder="projects"
          onClose={() => this.setState({ image: false })} format="png" />}
        <CardActions style={{ padding: 16 }}>
          <div style={{ flex: 1, height: 44 }}>
            {skills.split(',').map(title =>
              <Tooltip title={title}>
                <img width="44" style={{ marginRight: 10 }} src={skill(title)} />
              </Tooltip>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '-4px 0' }}>
            <Tooltip title="Code" placement="left">
              <IconButton href={'https://github.com/' + repo} target="_blank"
                style={{ fontSize: 22 }} class="project-button">
                <i class="fab fa-github-alt" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Demo" placement="left">
              <IconButton class="project-button" target="_blank"
                style={{ fontSize: 19 }} href={demo}>
                <i class="fas fa-eye" />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  }
}
