import * as React from 'react';
import styled from 'styled-components';
import {color, bg} from '@substance/color';
import {container} from '@substance/container';
import {py, px} from '@substance/spacing';
import {font, align} from '@substance/typography';

const FeatureWrapper = styled.div`
  ${font()}
  border-bottom: 1px solid ${color('dark')};
  ${bg('success')};
`;

const FeatureContent = styled.div`
  ${container}
  /* \${grid()} */
  ${py({mobile: 4, tablet: 5, desktop: 6})}
  ${px({mobile: 2, desktop: 0})}
  ${align({mobile: 'center', tablet: 'left'})}
`;

const Feature = styled.div`
  /* \${grid.unit()} */
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
