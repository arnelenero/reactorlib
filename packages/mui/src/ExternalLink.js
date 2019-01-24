import React from 'react';
import Link from '@material-ui/core/Link';

/**
 * This component renders a link that opens a new browser window/tab,
 * with the requisite rel="noopener noreferrer" security measure.
 *
 * @param {*} props
 */
export const ExternalLink = ({ children, ...props }) => (
  <Link target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </Link>
);

export default ExternalLink;
