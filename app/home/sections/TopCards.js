import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import cardTypes from '~/utils/card';

export default class Cards extends Component {
  state = {cards: []};

  componentWillMount() {
    const { type } = this.props;
    this.props.Card = cardTypes[type + 'Card']
    get(type.toLowerCase() + 's/top').then(({ order, ...cards }) => {
      const orderedCards = [];
      cards = Object.entries(cards);
      order.split(',').map(index => orderedCards.push(cards[index - 1]));
      this.setState({cards: orderedCards});
    });
  }

  render() {
    const { Card } = this.props;
    return (
      <Grid container justify="center">
        {this.state.cards.map(cardData =>
          <Grid item md={4} sm={6} xs={12}>
            <Card data={cardData} full/>
          </Grid>
        )}
      </Grid>
    );
  }
}
