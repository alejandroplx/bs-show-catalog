import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { bsShowCatalogPlugin, BsShowCatalogPage } from '../src/plugin';

createDevApp()
  .registerPlugin(bsShowCatalogPlugin)
  .addPage({
    element: <BsShowCatalogPage />,
    title: 'Root Page',
    path: '/bs-show-catalog'
  })
  .render();
