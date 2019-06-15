
import React from 'react';
import PropTypes from 'prop-types';

class Layer extends React.Component {

    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.layer.addTo(this.props.map);
    }

    componentWillUnmount() {
        this.props.layer.removeFrom(this.props.map);
    }

    render() { return null; }
};

export default Layer;