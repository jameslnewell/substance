import React from 'react';
import styled from 'styled-components';
import {ResponsiveValue} from 'styled-system';

import {Box} from '../../Box';
import {Space} from '../../theming';

export interface StackProps {
  space?: ResponsiveValue<Space>;
}

export const ItemBox = styled(Box)`
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Stack: React.FC<StackProps> = ({space, children}) => (
  <Box>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return <ItemBox marginBottom={space}>{child}</ItemBox>;
    })}
  </Box>
);
