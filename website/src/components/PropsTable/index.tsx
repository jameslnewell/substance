import React from 'react';
import styled from 'styled-components';
import {padding} from '@substance/mixin';

const Table = styled.table`
  margin: auto;
  width: 80%;
  border: 1px solid #ccc;
  border-collapse: collapse;

  th,
  td {
    ${padding(2)}
    text-align: left;
  }

  th {
    border-bottom: 1px solid #ccc;
  }

  td {
    border-bottom: 1px dotted #ccc;
    font-family: 'Courier New', Courier, monospace;
  }
`;

export const PropsTable: React.FC = ({children}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Properties</th>
          <th>Types</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};
