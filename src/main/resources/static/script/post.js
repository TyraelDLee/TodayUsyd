'use strict';

const e = React.createElement;

class title extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { liked: false };
  }

  render() {
    return 'You liked this.';
  }
}

const domContainer = document.querySelector('#title');
ReactDOM.render(e(title), domContainer );
