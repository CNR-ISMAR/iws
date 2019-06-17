
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
        const { map } = this.context;
        const { layer } = this.props;
        layer.removeFrom(map);
        //map.removeLayer(layer)
    }

    render() { return null; }
};
Layer.contextTypes = {
    map: PropTypes.object
};
export default Layer;