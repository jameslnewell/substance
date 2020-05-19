import React from 'react';
import {Layout} from '../Layout';
import {ContainerLayout} from '@substance/layout';

export const DocumentationLayout: React.FC = ({children}) => (
  <Layout>
    <ContainerLayout>{children}</ContainerLayout>
  </Layout>
);
