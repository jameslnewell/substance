import React from 'react';
import styled from 'styled-components';
import {LightAsync as SyntaxHighlighter} from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';
import {darcula} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {padding} from '@substance/mixin';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  ${padding(4)}
  font-size: 14px;
  border-radius: 3px;
`;

export const Code: React.FC = (props) => {
  return (
    <StyledSyntaxHighlighter
      language="javascript"
      style={darcula}
      customStyle={{padding: undefined}}
    >
      {props.children}
    </StyledSyntaxHighlighter>
  );
};
