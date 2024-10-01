import {
  filterOutRiderShareModules,
  isRiderShareModule,
} from '../../src/helper-functions/moduleFilter';

describe('moduleFilter', () => {
  it('detects rider share modules from strings', () => {
    expect(isRiderShareModule('rideshare')).toBe(true);
    expect(isRiderShareModule('food')).toBe(false);
  });

  it('detects rider share modules from objects', () => {
    expect(isRiderShareModule({ module_type: 'RideShare' })).toBe(true);
    expect(isRiderShareModule({ slug: 'grocery' })).toBe(false);
  });

  it('returns false for empty values', () => {
    expect(isRiderShareModule(null)).toBe(false);
    expect(isRiderShareModule(undefined)).toBe(false);
  });

  it('filters rider share modules from lists', () => {
    const modules = [
      { slug: 'food' },
      { module_name: 'rider-share' },
      { slug: 'parcel' },
    ];

    expect(filterOutRiderShareModules(modules)).toEqual([
      { slug: 'food' },
      { slug: 'parcel' },
    ]);
  });

  it('handles empty module lists', () => {
    expect(filterOutRiderShareModules()).toEqual([]);
    expect(filterOutRiderShareModules(null)).toEqual([]);
  });
});
