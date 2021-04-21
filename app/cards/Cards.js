import { Component } from 'react';
import { Grid, Typography, Grow, Fade } from 'material-ui';
import { get } from 'db';
import Loading from '~/utils/Loading';
import cardTypes from './widgets';
import 'fetch';

export default class Cards extends Component {
  componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type + 'Card'];
    get(type.toLowerCase() + 's').then(({ order, ...cards }) => {
      for (const key in cards) {
        cards[key] = Object.entries(cards[key]).map(([title, card]) => {
          if (card.preload) fetch(card.demo);
          return [title, card];
        });
      }
      const orderedCategories = [];
      cards = Object.entries(cards);
      if (order) order.split(',').map(index => orderedCategories.push(cards[index - 1]));
      else orderedCategories.push(...cards);
      this.setState({ allCards: orderedCategories });
    });
  }

  render() {
    const { state, Card, props: { wide } } = this;
    return state ? (
      <Grid container class="container" style={{ marginBottom: 24 }}>
        {state.allCards.map(([category, cards]) =>
          <Grid container justify="center">
            <Fade in>
              <Typography variant="h4" class="category">{category}</Typography>
            </Fade>
            {cards.map((cardData, index) =>
              <Grow in timeout={(index + 1) * 400}>
                <Grid item md={wide ? 6 : 4} sm={6} xs={12}>
                  <Card data={cardData} />
                </Grid>
              </Grow>
            )}
          </Grid>
        )}
      </Grid>
    ) : <Loading />;
  }
}
