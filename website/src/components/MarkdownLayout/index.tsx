import React from 'react';
import {Layout} from '../Layout';
import {ContainerLayout} from '@substance/layout';

export const MarkdownLayout: React.FC = ({children}) => (
  <Layout>
    <ContainerLayout>{children}</ContainerLayout>
  </Layout>
);
