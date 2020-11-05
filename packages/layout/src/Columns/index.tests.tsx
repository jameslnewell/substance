import 'jest-styled-components';
import React from 'react';
import {render} from '@testing-library/react';
import {
  Default,
  AlignXLeft,
  AlignXCenter,
  AlignXRight,
  AlignXResponsive,
  AlignYTop,
  AlignYCenter,
  AlignYBottom,
  AlignYResponsive,
  WidthMin,
  WidthMax,
  WidthNumber,
  WidthResponsive,
  WithOffset,
  WithReverse,
  WithReverseAlignXRight,
  WithReverseAlignXLeft,
  WithReverseResponsive,
} from './index.stories';
import {exampleQueries} from '@substance/test-utilities';

const getColumnsWrapper = (html: HTMLElement) => {
  const element = html.firstChild;
  if (!element) {
    throw new Error('Could not find columns wrapper.');
  }
  return element;
};

const getColumnsContainer = (html: HTMLElement) => {
  const element = getColumnsWrapper(html).firstChild;
  if (!element) {
    throw new Error('Could not find columns container.');
  }
  return element;
};

const getColumnsColumn = (html: HTMLElement) => {
  const element = getColumnsContainer(html).firstChild;
  if (!element) {
    throw new Error('Could not find column.');
  }
  return element;
};

describe('Columns', () => {
  describe('alignX', () => {
    test('has default style', () => {
      const {container} = render(<Default />);
      expect(getColumnsContainer(container)).not.toHaveStyleRule(
        'justify-content',
      );
    });
    test('has style for align left', () => {
      const {container} = render(<AlignXLeft />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-start',
      );
    });
    test('has style for align center', () => {
      const {container} = render(<AlignXCenter />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'center',
      );
    });
    test('has style for align right', () => {
      const {container} = render(<AlignXRight />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-end',
      );
    });
    test('has style for align responsive', () => {
      const {container} = render(<AlignXResponsive />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-start',
        {media: exampleQueries['sm']},
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'center',
        {media: exampleQueries['md']},
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-end',
        {media: exampleQueries['lg']},
      );
    });
  });

  describe('reverse', () => {
    test('has default style', () => {
      const {container} = render(<Default />);
      expect(getColumnsContainer(container)).not.toHaveStyleRule(
        'flex-direction',
      );
      expect(getColumnsContainer(container)).not.toHaveStyleRule('flex-wrap');
    });
    test('has reverse style', () => {
      const {container} = render(<WithReverse />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-direction',
        'row-reverse',
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-wrap',
        'wrap-reverse',
      );
    });
    test('has reverse and aligned right style', () => {
      const {container} = render(<WithReverseAlignXRight />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-direction',
        'row-reverse',
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-wrap',
        'wrap-reverse',
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-start',
      );
    });
    test('has reverse and aligned left style', () => {
      const {container} = render(<WithReverseAlignXLeft />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-direction',
        'row-reverse',
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-wrap',
        'wrap-reverse',
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'justify-content',
        'flex-end',
      );
    });
    test.skip('has reverse responsive style', () => {
      const {container} = render(<WithReverseResponsive />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'flex-direction',
        'row-reverse',
        {media: exampleQueries['sm']},
      );
    });
  });

  describe('alignY', () => {
    test('has default style', () => {
      const {container} = render(<Default />);
      expect(container.firstChild).not.toHaveStyleRule('align-items');
    });
    test('has style for align top', () => {
      const {container} = render(<AlignYTop />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'flex-start',
      );
    });
    test('has style for align center', () => {
      const {container} = render(<AlignYCenter />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'center',
      );
    });
    test('has style for align bottom', () => {
      const {container} = render(<AlignYBottom />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'flex-end',
      );
    });
    test('has style for align responsive', () => {
      const {container} = render(<AlignYResponsive />);
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'flex-start',
        {media: exampleQueries['sm']},
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'center',
        {media: exampleQueries['md']},
      );
      expect(getColumnsContainer(container)).toHaveStyleRule(
        'align-items',
        'flex-end',
        {media: exampleQueries['lg']},
      );
    });
  });

  describe('offset', () => {
    test('has default style', () => {
      const {container} = render(<Default />);
      const column = getColumnsColumn(container);
      expect(column).not.toHaveStyleRule('margin-left');
    });

    test('has style for specific offset', () => {
      const {container} = render(<WithOffset />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('margin-left', '25%');
    });
  });

  describe('width', () => {
    test('has default style', () => {
      const {container} = render(<Default />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('flex-grow', 'initial');
      expect(column).toHaveStyleRule('flex-basis', '100%');
      expect(column).toHaveStyleRule('max-width', '100%');
    });

    test('has style for min width', () => {
      const {container} = render(<WidthMin />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('flex-grow', '0');
      expect(column).toHaveStyleRule('flex-basis', 'auto');
      expect(column).toHaveStyleRule('max-width', 'none');
    });

    test('has style for max width', () => {
      const {container} = render(<WidthMax />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('flex-grow', '1');
      expect(column).toHaveStyleRule('flex-basis', 'auto');
      expect(column).toHaveStyleRule('max-width', '100%');
    });

    test('has style for specific width', () => {
      const {container} = render(<WidthNumber />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('flex-grow', 'initial');
      expect(column).toHaveStyleRule('flex-basis', '50%');
      expect(column).toHaveStyleRule('max-width', '50%');
    });

    test('has style for responsive width', () => {
      const {container} = render(<WidthResponsive />);
      const column = getColumnsColumn(container);
      expect(column).toHaveStyleRule('flex-grow', 'initial', {
        media: exampleQueries['sm'],
      });
      expect(column).toHaveStyleRule('flex-basis', '100%', {
        media: exampleQueries['sm'],
      });
      expect(column).toHaveStyleRule('max-width', '100%', {
        media: exampleQueries['sm'],
      });
      expect(column).toHaveStyleRule('flex-grow', '0', {
        media: exampleQueries['md'],
      });
      expect(column).toHaveStyleRule('flex-basis', 'auto', {
        media: exampleQueries['md'],
      });
      expect(column).toHaveStyleRule('max-width', 'none', {
        media: exampleQueries['md'],
      });
      expect(column).toHaveStyleRule('flex-grow', 'initial', {
        media: exampleQueries['lg'],
      });
      expect(column).toHaveStyleRule('flex-basis', '25%', {
        media: exampleQueries['lg'],
      });
      expect(column).toHaveStyleRule('max-width', '25%', {
        media: exampleQueries['lg'],
      });
    });
  });
});
