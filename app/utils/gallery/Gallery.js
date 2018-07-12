import { Component } from 'react';
import { ClickAwayListener, Typography, Modal, Grid } from 'material-ui';
import { url } from 'db';
import './Gallery.css';

export default class Gallery extends Component {
  state = {loaded: false};

  render() {
    const { images, isOpen, onClose } = this.props;
    return (
      <Modal open={isOpen} class="gallery">
        <Grid container justify="center" class="container">
          <ClickAwayListener onClickAway={onClose}>
            <div class="white-text">
              <Typography variant="subheading" style={{margin: '16px 0 8px', height: '24px'}}>
                {this.state.loaded && <span>
                  {images[0]}
                  <i class="fas fa-times" onClick={onClose}
                    style={{lineHeight: '24px', float: 'right', cursor: 'pointer'}}/>
                </span>}
              </Typography>
              <img src={url(`certs/${images[0]}.jpg`)}
                style={{maxHeight: 'calc(100vh - 68px)', margin: 'auto'}}
                onLoad={() => this.setState({loaded: true})}/>
            </div>
          </ClickAwayListener>
        </Grid>
      </Modal>
    );
  }
}
