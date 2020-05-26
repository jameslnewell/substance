import * as React from 'react';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import {ColumnLayout} from '@substance/layout';

export const CodeSample: React.FC<{code: string}> = ({code}) => (
  <LiveProvider code={code} scope={{Columns: ColumnLayout}}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);
