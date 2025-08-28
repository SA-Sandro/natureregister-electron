import { describe, expect, it } from 'vitest';
import { toFileSrc } from '../../../src/utils/UrlToFileSrc';

describe('Test toFileSrc function', () => {
  it('transform backslashes into normal slashes', () => {
    expect(toFileSrc('C:\\Users\\Juan\\file.txt')).toBe('file:///C:/Users/Juan/file.txt');
  });

  it('Add file:// protocol if not present', () => {
    expect(toFileSrc('/home/juan/file.txt')).toBe('file:///home/juan/file.txt');
  });

  it('Does not duplicate file:// protocol if present', () => {
    expect(toFileSrc('file:///home/juan/file.txt')).toBe('file:///home/juan/file.txt');
  });
});
