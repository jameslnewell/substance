import React from 'react';
import styled from 'styled-components';
import {StackLayout} from './stack';

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

export const WithAlignment: React.FC = () => (
  <>
    <StackLayout align="left">{content}</StackLayout>
    <br />
    <StackLayout align="center">{content}</StackLayout>
    <br />
    <StackLayout align="right">{content}</StackLayout>
  </>
);

export const WithClassName: React.FC = () => (
  <CustomStackLayout space={3}>{content}</CustomStackLayout>
);
