import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import ProjectCard from '~/projects/card/ProjectCard';
import EventCard from '~/events/card/EventCard';
import CertCard from '~/certs/card/CertCard';

const types = {ProjectCard, EventCard, CertCard};

export default class Cards extends Component {
  state = {cards: []};

  componentWillMount() {
    get(this.props.type.toLowerCase() + 's/top').then(cards => {
      const { order } = cards, orderedCards = [];
      delete cards.order;
      cards = Object.entries(cards);
      order.split(',').map(index => orderedCards.push(cards[index - 1]));
      this.setState({cards: orderedCards});
    });
  }

  render() {
    const Card = types[this.props.type + 'Card'];
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
