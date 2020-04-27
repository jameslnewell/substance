import * as React from 'react';
import styled from 'styled-components';
import {createVariant} from './createVariant';

export default {title: 'createVariant()'};

const common = {
  cursor: 'pointer',
  margin: 0,
  padding: '0.75em 2em',
  borderWidth: 1,
  borderRadius: 3,
  borderStyle: 'solid',
};

const someMixin = () => ({minWidth: '100%'});

const variant = createVariant({
  primary: [
    someMixin(),
    {
      color: 'white',
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
  ],
  secondary: {
    color: 'blue',
    borderColor: 'blue',
    backgroundColor: 'white',
  },
  tertiary: {
    color: 'blue',
    borderColor: 'transparent',
  },
});

const PrimaryButton = styled.button(common, variant('primary'));

const SecondaryButton = styled.button(common, variant('secondary'));

const TertiaryButton = styled.button(common, variant('tertiary'));

export const Primary = () => <PrimaryButton>Click me!</PrimaryButton>;
export const Secondary = () => <SecondaryButton>Click me!</SecondaryButton>;
export const Tertiary = () => <TertiaryButton>Click me!</TertiaryButton>;
