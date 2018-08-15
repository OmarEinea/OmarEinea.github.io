import { PureComponent } from 'react';
import { Grid, Zoom } from 'material-ui';
import { get } from 'db';
import cardTypes from '~/utils/card';

export default class Cards extends PureComponent {
  state = {cards: []};

  componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type + 'Card'];
    get(type.toLowerCase() + 's/top').then(({ order, ...cards }) => {
      const orderedCards = [];
      cards = Object.entries(cards);
      order.split(',').map(index => orderedCards.push(cards[index - 1]));
      this.setState({cards: orderedCards});
    });
  }

  render() {
    const { Card, state: { cards }, props: { visible }} = this;
    return (
      <Grid container justify="center">
        {cards.map((cardData, index) =>
          <Zoom in={visible} timeout={(index + 1) * 400}>
            <Grid item md={4} sm={6} xs={12}>
              <Card data={cardData} full/>
            </Grid>
          </Zoom>
        )}
      </Grid>
    );
  }
}
