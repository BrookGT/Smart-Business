import { ModuleTypes } from '../../src/helper-functions/moduleTypes';

describe('ModuleTypes', () => {
  it('exposes supported commerce modules', () => {
    expect(ModuleTypes).toEqual({
      GROCERY: 'grocery',
      PHARMACY: 'pharmacy',
      ECOMMERCE: 'ecommerce',
      FOOD: 'food',
      PARCEL: 'parcel',
      RENTAL: 'rental',
    });
  });
});
