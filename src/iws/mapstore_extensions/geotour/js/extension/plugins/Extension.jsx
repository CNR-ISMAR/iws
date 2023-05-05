/*
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import React, { useState } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { createSelector } from 'reselect';

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

/* SELECTORS */
// mapstore
import { groupsSelector } from '@mapstore/framework/selectors/layers';
// custom
import { geotourEnabledSelector, getStyleeditor, layerSelector2 } from '../selectors/geotour';
import WMSLegend from "@mapstore/framework/components/TOC/fragments/WMSLegend";

/* CUSTOM LOCAL STYLE */
import '@js/extension/assets/style.css';


function StyleInformation(props) {
  const layer = props.layer;
  return (
    <div>
      <p>
        <b>{layer.title}</b>
      </p>
    </div>
  );
}


function Extension({
  id = "geo-tour-plugin",
  dockStyle = {},
  // coming from connect function connected to the store
  enabled = true,
  showCloseButton = true,
  // use tmap from connect if we need (eg for get center)
  groups,
  updateNode,
  //  coming from connect function mapDispatch
  onClose = () => { },
  flyTo = () => { },
  layers = [],
  styleeditor,
}) {
  // Add code to do something to change what we have in what we Render with return 

  const [flyToEnabled, setFlyToEnabled] = useState(true);

  const showOnlyGroup = (groupIndex) => {
    groups.forEach((g, i) => {
      g.nodes.forEach(n => {
        updateNode(n.id, 'wms', { visibility: groupIndex === i })
      })
    })
  }

  return enabled ? (<DockablePanel
    open={enabled}
    dock
    bsStyle="primary"
    draggable={false}
    size={400}
    title=""
    onClose={showCloseButton ? onClose : null}
    glyph="bookmark"
    style={dockStyle}
  >
    <p style={{ padding: '0.5rem', margin: '0.5rem 0' }}><b>Legenda dei livelli visibili</b></p>
    <div className="collectiveLegendModal" style={{ padding: '0.5rem', marginBottom: '1rem' }}>
      {layers.map((layer) => (
        <div className="legendLayer">
          {styleeditor?.service && (
            <StyleInformation
              layer={layer}
              editor={styleeditor}
            />
          )}
          <WMSLegend node={layer} />
        </div>
      ))}
    </div>
    <p style={{ padding: '0.5rem', margin: '1rem 0' }}><b>Premi sul gruppo da visualizzare</b></p>
    {groups.map((group, index) => {
      return (
        <div className="gd-center">
          <Button bsStyle="primary" style={{ width: "80%" }} disabled={!flyToEnabled} onClick={() => {
            showOnlyGroup(index)
            if (group.nodes.length > 0) {
              flyTo(group.nodes[0].bbox.bounds, group.nodes[0].bbox.crs, 20, { duration: 1000 });
            }
          }}> {group.title} </Button>
        </div>
      );
    })}
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
    layerSelector2,
    getStyleeditor,
  ], (enabled, groups, layers, styleeditor) => ({
    enabled,
    groups,
    layers,
    styleeditor,
  })),
  {
    /** ACTIONS */
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
      position: 5,
      tooltip: "GeoTour",
      icon: <Glyphicon glyph="bookmark" />,
      doNotHide: true,
      action: toggleControl.bind(null, 'geotour', null),
      priority: 1
    }
  }
};
