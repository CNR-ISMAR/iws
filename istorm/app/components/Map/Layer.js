
import React from 'react';
import PropTypes from 'prop-types';

class Layer extends React.Component {

    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.layer.addTo(this.context.map);
    }

    componentWillUnmount() {
        this.props.layer.remove();
    }

    render() { return null; }
};
Layer.contextTypes = {
    map: PropTypes.object
};
export default Layer;