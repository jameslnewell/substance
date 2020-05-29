import React from 'react';
import {GetStaticProps, GetStaticPaths} from 'next';
import style from '../../docs/style.json';

export interface DocumentProps {
  name: string;
}

const getName = (child: any) => {
  return child.name.replace(/"/g, '');
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: style.children.map((child) => {
      return {
        params: {
          id: String(child.id),
          doc: getName(child),
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<DocumentProps> = async (
  context,
) => {
  const child = style.children.find((c) => getName(c) === context.params?.doc);
  if (!child) {
    throw 'Unable to find child.';
  }
  return {
    props: {
      name: getName(child),
    },
  };
};

const Document: React.FC<DocumentProps> = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Document;
