import * as React from 'react';
import styled from 'styled-components';
import {grid, unit} from '@substance/grid';
import {color, bg} from '@substance/color';
import {container} from '@substance/container';
import {py, px, p} from '@substance/spacing';
import {copy} from '@substance/typography';

const FeatureWrapper = styled.div`
  border-bottom: 1px solid ${color('shades.dark')};
  ${bg('alert.success')};
`;

const FeatureContent = styled.div`
  ${container}
  ${grid({})}
  ${py({mobile: 2, tablet: 5, desktop: 6})}
  ${px({mobile: 2, desktop: 0})}
`;

const Feature = styled.div`
  box-sizing: border-box;
  ${unit({size: {tablet: 1/3}})}
  ${p({mobile: 3})}
  ${copy({align: 'center'})}
`;

export const FeaturePanel = () => (
  <FeatureWrapper>
    <FeatureContent>

      <Feature>
        Themeable.
      </Feature>

      <Feature>
        Modular.
      </Feature>

      <Feature>
        Tiny.
      </Feature>

    </FeatureContent>
  </FeatureWrapper>
);
