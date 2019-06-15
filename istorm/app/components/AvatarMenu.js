/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

export default function AvatarMenu(props) {
  console.info("avatarMenu")
  console.info(props);
  return (
    <>
        <h1>{props.auth.user.email}</h1>
    </>
  );
}

