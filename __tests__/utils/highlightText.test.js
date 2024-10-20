import React from 'react';
import { render, screen } from '@testing-library/react';
import { highlightMatchingText } from '../../src/utils/highlightText';

describe('highlightMatchingText', () => {
  it('returns text unchanged when query is empty', () => {
    expect(highlightMatchingText('Smart Business', '')).toBe('Smart Business');
  });

  it('returns text unchanged when text is empty', () => {
    expect(highlightMatchingText('', 'smart')).toBe('');
  });

  it('highlights matching segments case-insensitively', () => {
    render(<div>{highlightMatchingText('Smart Business Platform', 'bus')}</div>);

    const bold = screen.getByText('Bus');
    expect(bold.tagName).toBe('SPAN');
    expect(bold).toHaveStyle({ fontWeight: 'bold' });
  });

  it('escapes regex special characters in query', () => {
    render(<div>{highlightMatchingText('price (10%)', '(10%')}</div>);
    expect(screen.getByText('(10%')).toBeInTheDocument();
  });
});
