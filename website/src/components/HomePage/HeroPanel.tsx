import * as React from 'react';
import styled from 'styled-components';
import {color, bg} from '@substance/color';
import {container} from '@substance/container';
import {py, px} from '@substance/spacing';
import {font, align} from '@substance/typography';

const HeroWrapper = styled.div`
  font-weight: bold;
  ${font()}
  line-height: 1.5em;
  border-bottom: 1px solid ${color('dark')};
  ${bg('light')};
`;

const HeroContent = styled.div`
  ${container}
  ${py({mobile: 4, tablet: 5, desktop: 6})}
  ${px({mobile: 2, desktop: 0})}
  ${align({mobile: 'center', tablet: 'left'})}
`;

export const HeroPanel = () => (
  <HeroWrapper>
    <HeroContent>
      Primitives for building design systems with <code>styled-components 💅</code>.
    </HeroContent>
  </HeroWrapper>
);
