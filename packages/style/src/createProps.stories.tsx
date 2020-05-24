import * as React from 'react';
import styled, {css} from 'styled-components';
import {createProps} from './createProps';

export default {title: 'style/createProps()'};

const circle = css`
  display: inline-flex;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const MedalUsingTaggedTemplateLiteralStyle = styled.div`
  ${circle}
  ${createProps({
    isGold: (isGold: boolean) =>
      isGold ? `background-color: gold;` : undefined,
    isSilver: (isSilver: boolean) =>
      isSilver ? `background-color: silver;` : undefined,
    isBronze: (isBronze: boolean) =>
      isBronze ? `background-color: peru;` : undefined,
  })}
`;

const MedalUsingObjectStyle = styled.div`
  ${circle}
  ${createProps({
    isGold: (isGold: boolean) =>
      isGold ? {backgroundColor: 'gold'} : undefined,
    isSilver: (isSilver: boolean) =>
      isSilver ? {backgroundColor: 'silver'} : undefined,
    isBronze: (isBronze: boolean) =>
      isBronze ? {backgroundColor: 'peru'} : undefined,
  })}
`;

const MedalUsingFunctionStyle = styled.div`
  ${circle}
  ${createProps({
    isGold: (isGold: boolean) =>
      isGold ? () => `background-color: gold;` : undefined,
    isSilver: (isSilver: boolean) =>
      isSilver ? () => `background-color: silver;` : undefined,
    isBronze: (isBronze: boolean) =>
      isBronze ? () => `background-color: peru;` : undefined,
  })}
`;

export const UsingTaggedTemplateLiteralStyle: React.FC = () => {
  return (
    <>
      <MedalUsingTaggedTemplateLiteralStyle isGold>
        Gold
      </MedalUsingTaggedTemplateLiteralStyle>
      <MedalUsingTaggedTemplateLiteralStyle isSilver>
        Silver
      </MedalUsingTaggedTemplateLiteralStyle>
      <MedalUsingTaggedTemplateLiteralStyle isBronze>
        Bronze
      </MedalUsingTaggedTemplateLiteralStyle>
    </>
  );
};

export const UsingObjectStyle: React.FC = () => {
  return (
    <>
      <MedalUsingObjectStyle isGold>Gold</MedalUsingObjectStyle>
      <MedalUsingObjectStyle isSilver>Silver</MedalUsingObjectStyle>
      <MedalUsingObjectStyle isBronze>Bronze</MedalUsingObjectStyle>
    </>
  );
};

export const UsingFunctionStyle = () => {
  return (
    <>
      <MedalUsingFunctionStyle isGold>Gold</MedalUsingFunctionStyle>
      <MedalUsingFunctionStyle isSilver>Silver</MedalUsingFunctionStyle>
      <MedalUsingFunctionStyle isBronze>Bronze</MedalUsingFunctionStyle>
    </>
  );
};
