import { Component } from 'react';

export default class Optimize extends Component {
  componentDidMount() {
    this.childType = this.props.children.type;
  }

  shouldComponentUpdate({ children }) {
    if (this.childType !== children.type) {
      this.childType = children.type;
      return true;
    } else return false;
  }

  render() {
    return this.props.children;
  }
}
