import { compose } from '../../src';

describe('compose', () => {
  it('applies enhancer functions from right to left', () => {
    const a = base => `a(${base})`;
    const b = base => `b(${base})`;
    const c = base => `c(${base})`;
    expect(
      compose(
        a,
        b,
        c
      )('_base_')
    ).toBe('a(b(c(_base_)))');
  });

  it('applies enhancer function even if only one is specified', () => {
    const enhance = base => `enhance(${base})`;
    expect(compose(enhance)('_base_')).toBe('enhance(_base_)');
  });

  it('returns the original value if no functions specified', () => {
    expect(compose()('_base_')).toBe('_base_');
  });
});
