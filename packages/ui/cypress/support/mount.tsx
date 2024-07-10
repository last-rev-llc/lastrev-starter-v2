import React from 'react';
import { mount as ogMount } from 'cypress/react18';
import { AppProvider } from '../../src/AppProvider/AppProvider';

const mount = (component: any, options?: any, routerOptions?: any) =>
  ogMount(<AppProvider>{component}</AppProvider>, options);

export default mount;
