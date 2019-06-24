/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Route } from "react-router-dom";

export default function SubNav(props) {
  console.info("subNav")
  console.info(props);
  return (
    <div style={{position: "relative"}}>
      <div style={{position: "absolute", top: 0, right: -250, zIndex: 10000, width: 250, height: "calc(100vh - 64px)", backgroundColor: "rgba(1,1,1,.4)"}}>
        <div>Pippo</div>
      </div>
    </div>
  );
}

