import { Component } from 'react';
import { Typography, Modal, Zoom } from 'material-ui';
import { url } from 'db';
import Loading from '~/utils/Loading';
import './Gallery.css';

export default class Gallery extends Component {
  state = {loaded: false, index: 0};
  loaded = () => this.setState({loaded: true});
  gotoImage = index => () => {
    this.setState({loaded: false});
    setTimeout(() => this.setState({index}), 100);
  };
  onClose = () => {
    this.setState({loaded: false, closing: true});
    setTimeout(this.props.onClose, 250);
  };
  frameStyle = () => {
    if(window.innerWidth / window.innerHeight > 16 / 9)
      return {height: 'calc(100vh - 52px)', width: '162vh'};
    else
      return {width: 'calc(100vw - 16px)', height: '53.75vw'};
  };

  componentWillMount() {
    let { title, images, folder, format = 'jpg' } = this.props;
    this.urls = [];
    if(images) {
      images = images.split(';');
      for(let i = 1; i <= images.length; i++)
        this.urls.push(`${folder}/${title}/${i}.${format}`);
    } else {
      this.urls.push(`${folder}/${title}.${format}`);
      images = [title];
    }
    this.images = images;
  }

  render() {
    const { images, state: { loaded, index, closing }} = this,
      youtube = images[index].split('https://www.youtube.com/watch?v=')[1];
    return (
      <Modal open onClose={this.onClose} class={'gallery' + (closing ? ' closing' : '')}>
        <div class="content">
          {!loaded && !closing && <Loading style={{position: 'absolute'}}/>}
          <Zoom in={loaded} timeout={{enter: 400, exit: 250}}>
            <div class="main">
              <div class="white-text">
                <Typography variant="subheading" style={{flex: 1}} noWrap>
                  {youtube && images[index]}
                </Typography>
                <Typography variant="subheading" style={{marginLeft: 8, marginRight: -8}}>
                  ({index + 1} of {images.length})
                  <i class="fas fa-times" onClick={this.onClose}/>
                </Typography>
              </div>
              {youtube
                ? <iframe style={this.frameStyle()} onLoad={this.loaded} allow="autoplay; encrypted-media"
                  src={`https://www.youtube-nocookie.com/embed/${youtube}?rel=0`} frameborder="0" allowfullscreen/>
                : <img style={{maxHeight: 'calc(100vh - 52px)', maxWidth: '100%'}}
                  src={url(this.urls[index])} onLoad={this.loaded}/>
              }
            </div>
          </Zoom>
          {index > 0 &&
            <div class="nav white-text" style={{left: 0}}>
              <i onClick={this.gotoImage(index - 1)} class="fas fa-chevron-left"/>
            </div>
          }
          {images.length > 1 && index + 1 < images.length &&
            <div class="nav white-text" style={{right: 0}}>
              <i onClick={this.gotoImage(index + 1)} class="fas fa-chevron-right"/>
            </div>
          }
        </div>
      </Modal>
    );
  }
}
