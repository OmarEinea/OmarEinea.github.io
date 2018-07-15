import { Component } from 'react';
import { Typography, Modal } from 'material-ui';
import { url } from 'db';
import './Gallery.css';

export default class Gallery extends Component {
  state = {loaded: false, index: 0};

  componentWillMount() {
    let { title, images, folder } = this.props;
    this.urls = [];
    if(images)
      for(let i = 1; i <= images.length; i++)
        this.urls.push(`${folder}/${title}/${i}.jpg`);
    else {
      this.urls.push(`${folder}/${title}.jpg`);
      images = [title];
    }
    this.images = images;
  }

  gotoImage(index) {
    return () => this.setState({index, loaded: false});
  }

  render() {
    const { isOpen, onClose } = this.props, { loaded, index } = this.state;
    return (
      <Modal open={isOpen} onBackdropClick={onClose} class="gallery">
        <div class="content white-text">
          <div>
            <Typography variant="subheading" style={{height: 28}}>
              {loaded && <span>
                {this.images[index]}
                <i class="fas fa-times" onClick={onClose}
                  style={{float: 'right', marginRight: -5}}/>
              </span>}
            </Typography>
            <img src={url(this.urls[index])}
              style={{maxHeight: 'calc(100vh - 68px)', maxWidth: '100%'}}
              onLoad={() => this.setState({loaded: true})}/>
          </div>
          {index > 0 &&
            <div class="nav" style={{left: 0}}>
              <i onClick={this.gotoImage(index - 1)} class="fas fa-chevron-left"/>
            </div>
          }
          {this.images.length > 1 && index + 1 < this.images.length &&
            <div class="nav" style={{right: 0}}>
              <i onClick={this.gotoImage(index + 1)} class="fas fa-chevron-right"/>
            </div>
          }
        </div>
      </Modal>
    );
  }
}
