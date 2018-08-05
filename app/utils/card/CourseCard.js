import { Component } from 'react';
import { Typography, Card, CardContent, Tooltip } from 'material-ui';
import './Card.css';

export default class CourseCard extends Component {
  colors = {
    'A': '#4CAF50',
    'B+': '#8BC34A', 'B': '#CDDC39',
    'C+': '#FFEB3B', 'C': '#FFC107',
    'D+': '#FF9800', 'D': '#FF5722',
    'F': '#F44336', 'P': '#9E9E9E'
  };

  componentWillMount() {
    const [ grade, desc ] = this.props.data[1].split(';'),
      color = this.colors[grade];
    this.props.data.splice(1, 3, grade, color, desc);
  }

  render() {
    const [ title, grade, color, desc ] = this.props.data;
    return (
      <Card class="card" style={{display: 'flex', height: 'calc(100% - 16px)'}}>
        <CardContent style={{flex: 1}}>
          <Typography variant="title" gutterBottom>{title}</Typography>
          <Typography variant="subheading" color="textSecondary">{desc}</Typography>
        </CardContent>
        <Typography variant="display1" class="grade"
          style={{backgroundColor: color}}>
          <Tooltip title="Course Grade">
            <b style={{padding: '0 36px'}}>{grade}</b>
          </Tooltip>
        </Typography>
      </Card>
    );
  }
}
