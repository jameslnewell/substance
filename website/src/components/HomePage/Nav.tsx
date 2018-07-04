import * as React from 'react';
import styled from 'styled-components';
import {bg} from '@substance/color';
import {Consumer} from '../ProjectInfoContext';

const Wrapper = styled.div`
  ${bg('grey')}
  width: 300px;
`;

export class Nav extends React.Component {
  render() {
    return (
      <Consumer>
        {(project: any): React.ReactNode => (
          <Wrapper>
            <h1>{project.root.name}</h1>
            {project.workspaces.map(workspace => {
              return (
                <>
                  <h4 key={workspace.name}>{workspace.name}</h4>
                  {workspace.examples.map(example => {
                    return (
                      <>
                        <button key={example.name}>
                          {example.name}
                        </button>
                      </>
                    );
                  })}
                </>
              );
            })}
          </Wrapper>
        )}
      </Consumer>
    )
  }
}