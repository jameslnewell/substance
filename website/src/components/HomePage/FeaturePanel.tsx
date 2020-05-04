import * as React from 'react';
import styled from 'styled-components';
import {Container, ColumnsLayout} from '@substance/layout';
import {
  color,
  backgroundColor,
  paddingY,
  paddingX,
  padding,
} from '@substance/mixin';
import {copy} from '@substance/typography';

const FeatureWrapper = styled.div`
  border-bottom: 1px solid ${color('shades.dark')};
  ${backgroundColor('alert.success')};
`;

const FeatureContent = styled.div`
  ${container}
  ${grid({})}
  ${py({mobile: 2, tablet: 5, desktop: 6})}
  ${px({mobile: 2, desktop: 0})}
`;

const Feature = styled.div`
  box-sizing: border-box;
  ${unit({size: {tablet: 1 / 3}})}
  ${p({mobile: 3})}
  ${copy({align: 'center'})}
`;

export const FeaturePanel = () => (
  <FeatureWrapper>
    <FeatureContent>
      <Feature>Themeable.</Feature>

      <Feature>Modular.</Feature>

      <Feature>Tiny.</Feature>
    </FeatureContent>
  </FeatureWrapper>
);
