import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const bsShowCatalogPlugin = createPlugin({
  id: 'bs-show-catalog',
  routes: {
    root: rootRouteRef,
  },
});

export const BsShowCatalogPage = bsShowCatalogPlugin.provide(
  createRoutableExtension({
    name: 'BsShowCatalogPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
