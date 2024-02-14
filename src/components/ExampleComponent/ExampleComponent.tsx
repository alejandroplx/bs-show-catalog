import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  Table,
  TableColumn,
} from '@backstage/core-components';

import { useAsync } from 'react-use';
import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi } from '@backstage/catalog-client';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';

export function useCatalogApi<T>(
  f: (api: CatalogApi) => Promise<T>,
  deps: any[] = [],
) {
  const catalogApi = useApi(catalogApiRef);

  return useAsync(async () => {
    return await f(catalogApi);
  }, deps);
}

export const ExampleComponent = () => {
  
  // Your component code
  const {
    value: data,
    loading,
    error,
  } = useCatalogApi(api => api.getEntities(), []);
  
  const renderLabel = label => (
    label ? `${label}={${JSON.stringify(label)}}`:""
  );
  
  const columns: TableColumn[] = [
    {
      title: 'Tipo',
      width: '8rem',
      render: (row: Partial<Entity>) => <Typography>{row.kind}</Typography>,
    },
    {
      title: 'name',
      width: 'auto',
      render: (row: Partial<Entity>) => <Typography>{row.metadata?.name}</Typography>,
    },
    {
      title: 'title',
      width: 'auto',
      render: (row: Partial<Entity>) => <Typography>{row.metadata?.title}</Typography>,
    },
    {
      title: 'description',
      width: 'auto',
      render: (row: Partial<Entity>) => (
        <Typography>{row.metadata?.description}</Typography>
      ),
    },
    {
      title: 'uid',
      width: 'auto',
      render: (row: Partial<Entity>) => <Typography>{row.metadata?.uid}</Typography>,
    },
    {
      title: 'etag',
      width: 'auto',
      render: (row: Partial<Entity>) => <Typography>{row.metadata?.etag}</Typography>,
    },
    {
      title: 'namespace',
      width: 'auto',
      render: (row: Partial<Entity>) => (
        <Typography>{row.metadata?.namespace}</Typography>
      ),
    },
    {
      title: 'labels',
      width: 'auto',
      render: (row: Partial<Entity>) => (
        <Typography>{renderLabel(row.metadata?.labels)}</Typography>
      ),
    },
    {
      title: 'tags',
      width: 'auto',
      render: (row: Partial<Entity>) => <Typography>{row.metadata?.tags}</Typography>,
    },
  ];

  return(
  <Page themeId="tool">
    <Header title="Welcome to Plexus bs-show-catalog!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plexus plugin showing catalog items">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>

      {!loading && !error && (
        <Card>
          <CardContent>
            {data && (
              <Table
                style={{ margin: '30px' }}
                options={{ 
                  paging: false, 
                  toolbar: true,
                  maxBodyHeight: '600px',
                  headerStyle: {
                    position: "sticky",
                    top: 0
                  }
               }}
                columns={columns}
                data={data?.items}

              />
            )}
          </CardContent>
        </Card>
      )}
    </Content>
  </Page>
  );
};
