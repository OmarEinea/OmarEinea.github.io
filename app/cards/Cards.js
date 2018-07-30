import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import cardTypes from '~/utils/card';

export default class Cards extends Component {
  state = {allCards: []};

  componentWillMount() {
    get(this.props.type.toLowerCase() + 's').then(cards => {
      const { top } = cards;
      delete cards.top;
      for(let key in cards) {
        let category = cards[key];
        for(let card in category)
          if(category[card] === -1)
            category[card] = top[card];
        cards[key] = Object.entries(category);
      }
      this.setState({allCards: Object.entries(cards)});
    });
  }

  render() {
    const { type, wide } = this.props, Card = cardTypes[type + 'Card'];
    return (
      <Grid container class="container" style={{marginBottom: 24}}>
        {this.state.allCards.map(([category, cards]) =>
          <Grid container justify="center">
            <Typography variant="display1" class="category">{category}</Typography>
            {cards.map(cardData =>
              <Grid item md={wide ? 6 : 4} sm={6} xs={12}>
                <Card data={cardData}/>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
