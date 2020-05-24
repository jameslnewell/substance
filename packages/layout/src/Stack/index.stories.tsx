import React from 'react';
import styled from 'styled-components';
import {Hidden} from '../Hidden';
import {StackLayout} from '.';

export default {
  title: 'layout/StackLayout',
  component: StackLayout,
};

const CustomStackLayout = styled(StackLayout)({
  backgroundColor: 'red',
});

const content = (
  <>
    <h1 style={{margin: 0, padding: 0}}>Hello World!</h1>
    <h2 style={{margin: 0, padding: 0}}>We come in peace!</h2>
    <p style={{margin: 0, padding: 0}}>
      We come from outer space looking for safe harbor.
    </p>
    <button>Run for your lives!</button>
  </>
);

export const WithoutSpace: React.FC = () => (
  <StackLayout>{content}</StackLayout>
);

export const WithSpace: React.FC = () => (
  <StackLayout space={3}>{content}</StackLayout>
);

export const WithResponsiveSpace: React.FC = () => (
  <StackLayout space={{mobile: 2, tablet: 4}}>{content}</StackLayout>
);

export const WithAlignX: React.FC = () => (
  <>
    <StackLayout alignX="left">{content}</StackLayout>
    <br />
    <StackLayout alignX="center">{content}</StackLayout>
    <br />
    <StackLayout alignX="right">{content}</StackLayout>
    <br />
    <StackLayout alignX={{xs: 'left', md: 'center', lg: 'right'}}>
      {content}
    </StackLayout>
  </>
);

export const WithClassName: React.FC = () => (
  <CustomStackLayout space={3}>{content}</CustomStackLayout>
);

export const DoesNotAddSpaceOnHiddenChildren = () => (
  <StackLayout space={4}>
    <span>A</span>
    <Hidden hide={{sm: true, md: false, lg: true}}>
      <span>B</span>
    </Hidden>
    <span>C</span>
  </StackLayout>
);
