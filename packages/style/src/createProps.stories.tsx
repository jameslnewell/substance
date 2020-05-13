import * as React from 'react';
import styled from 'styled-components';
import {StyleObject} from './types';
import {createProps} from './createProps';

export default {title: 'style/createProps()'};

const circle: StyleObject = {
  display: 'inline-flex',
  width: 100,
  height: 100,
  borderRadius: '100%',
  fontWeight: 'bold',
  justifyContent: 'center',
  alignItems: 'center',
};

export const UsingStyleObjects: React.FC = () => {
  const Medal = styled.div(
    circle,
    createProps({
      isGold: (isGold: boolean) =>
        isGold ? {backgroundColor: 'gold'} : undefined,
      isSilver: (isSilver: boolean) =>
        isSilver ? {backgroundColor: 'silver'} : undefined,
      isBronze: (isBronze: boolean) =>
        isBronze ? {backgroundColor: 'peru'} : undefined,
    }),
  );
  return (
    <>
      <Medal isGold>Gold</Medal>
      <Medal isSilver>Silver</Medal>
      <Medal isBronze>Bronze</Medal>
    </>
  );
};

export const UsingStyleFunctions = () => {
  const Medal = styled.div(
    circle,
    createProps({
      isGold: (isGold: boolean) =>
        isGold ? () => ({backgroundColor: 'gold'}) : undefined,
      isSilver: (isSilver: boolean) =>
        isSilver ? () => ({backgroundColor: 'silver'}) : undefined,
      isBronze: (isBronze: boolean) =>
        isBronze ? () => ({backgroundColor: 'peru'}) : undefined,
    }),
  );
  return (
    <>
      <Medal isGold>Gold</Medal>
      <Medal isSilver>Silver</Medal>
      <Medal isBronze>Bronze</Medal>
    </>
  );
};

export const UsingStyleArrays = () => {
  const Medal = styled.div(
    circle,
    createProps({
      isGold: (isGold: boolean) =>
        isGold ? [() => ({backgroundColor: 'gold'})] : undefined,
      isSilver: (isSilver: boolean) =>
        isSilver ? [() => ({backgroundColor: 'silver'})] : undefined,
      isBronze: (isBronze: boolean) =>
        isBronze ? [() => ({backgroundColor: 'peru'})] : undefined,
    }),
  );
  return (
    <>
      <Medal isGold>Gold</Medal>
      <Medal isSilver>Silver</Medal>
      <Medal isBronze>Bronze</Medal>
    </>
  );
};

export const UsingTaggedTemplateLiterals = () => {
  const Medal = styled.div`
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
  return (
    <>
      <Medal isGold>Gold</Medal>
      <Medal isSilver>Silver</Medal>
      <Medal isBronze>Bronze</Medal>
    </>
  );
};
