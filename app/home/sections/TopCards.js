import { PureComponent } from 'react';
import { Grid, Zoom } from 'material-ui';
import cardTypes from '~/cards/widgets';

export default class TopCards extends PureComponent {
  state = { cards: [] };

  componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type + 'Card'];
  }

  componentWillReceiveProps(props) {
    if (props.data) this.setState({ cards: props.data });
  }

  render() {
    const { Card, state: { cards }, props: { visible } } = this;
    return (
      <Grid container justify="center">
        {cards.map((cardData, index) =>
          <Zoom in={visible} timeout={(index + 1) * 400}>
            <Grid item md={4} sm={6} xs={12}>
              <Card data={cardData} full />
            </Grid>
          </Zoom>
        )}
      </Grid>
    );
  }
}
