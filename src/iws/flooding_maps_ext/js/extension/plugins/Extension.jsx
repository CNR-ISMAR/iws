/*
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Glyphicon } from 'react-bootstrap';
import { createSelector } from 'reselect';
import Rx from "rxjs";

import { connect } from 'react-redux';

/* EPICS */

/* ACTIONS */
// mapstore
import { zoomToExtent } from "@mapstore/framework/actions/map";
import { setControlProperty, toggleControl } from "@mapstore/framework/actions/controls";
import { updateNode } from "@mapstore/framework/actions/layers";

/* COMPONENTS */
// mapstore
import DockablePanel from '@mapstore/framework/components/misc/panels/DockablePanel';
import Message from "@mapstore/framework/components/I18N/Message";

/* SELECTORS */
// mapstore
import { mapSelector } from '@mapstore/framework/selectors/map';
import { layersSelector, groupsSelector, rawGroupsSelector } from '@mapstore/framework/selectors/layers';
// custom
import { geotourEnabledSelector, wholeSelector } from '../selectors/geotour';

/* CUSTOM LOCAL STYLE */
import '@js/extension/assets/style.css';

/**
* Extension is a functional component, i.e. it's a function that returns a React component
* @prop {object} props passed to the component, in this case from the connect function
* @returns {React.Component} the component to be used inside the plugin
*/
function Extension({           
    id = "geo-tour-plugin",
    dockStyle = {},
    // coming from connect function connected to the store
    enabled = false,
    showCloseButton = true,
    // use tmap from connect if we need (eg for get center)
    groups,
    updateNode,
    //  coming from connect function mapDispatch
    onClose = () => {},
    flyTo = () => {}
}) {

    // Add code to do something to change what we have in what we Render with return 
   
   const [flyToEnabled, setFlyToEnabled] = useState(true);

    const showOnlyGroup = (groupIndex) => {
        console.log(groups, groupIndex);
        groups.forEach((g, i) => {
            g.nodes.forEach(n => {
                updateNode(n.id ,'wms', { visibility: groupIndex === i })
            })
        })
    }

   return enabled ? (<DockablePanel
    open={enabled}
    // dock // If dock -> the panel is placed in the following position
    // position="right"
    dock
    bsStyle="primary"
    draggable={false}
    size={200}
    title={<Message msgId="geotour.title"/>}
    onClose={showCloseButton ? onClose : null}
    // glyph="globe"
    style={dockStyle}
 >
        { groups.map((group, index) => {
        //   console.log(group.title)
            return (
                <div className="gd-center">
                <Button variant="secondary" style={{ width: "80%" }} disabled={!flyToEnabled} onClick={() => {
                    showOnlyGroup(index)
                    if (group.nodes.length > 0) {
                        flyTo(group.nodes[0].bbox.bounds, group.nodes[0].bbox.crs, 20, {duration: 1000});
                    }
                    }}> {group.title} </Button>
                </div>    
            );            
        }) }
     </DockablePanel>) : null;
}

/** Define the types of props */
Extension.propTypes = {};
 
/** Set default props */
Extension.defaultProps = {}

const ConnectedExtension = connect(   
    createSelector([
        /** SELECTORS */
        geotourEnabledSelector,
        groupsSelector,
       ], (enabled, groups) => ({
           enabled,
           groups,
    })),
   {
      /** ACTIONS */
      // Custom
      // mapstore
        flyTo: zoomToExtent,
        updateNode,
        onClose: setControlProperty.bind(null, "geotour", "enabled", false, false)
   })(Extension);


/** Plugin export */   
export default {
    name: __MAPSTORE_EXTENSION_CONFIG__.name,
    component: ConnectedExtension,    
    reducers: {},
    epics: {},
    containers: {
      Toolbar: {
        name: "GeoTour",
        position: 10,
        tooltip: <Message msgId="geotour.title" />,
        icon: <Glyphicon glyph="bookmark" />,
        doNotHide: true,
        action: toggleControl.bind(null, 'geotour', null),
        priority: 1
     }
    }
};
