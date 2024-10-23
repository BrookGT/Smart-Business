import {
  ensureModuleParamInUrl,
  getCurrentModuleParam,
  getModuleIdentifier,
  getSavedModuleIdentifier,
  getSavedModuleParam,
  saveModuleParam,
} from '../../src/utils/moduleParamManager';

describe('moduleParamManager', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = 'selectedModule=; path=/; max-age=0';
  });

  describe('getModuleIdentifier', () => {
    it('returns slug when available', () => {
      expect(getModuleIdentifier({ slug: 'food', id: 1 })).toBe('food');
    });

    it('falls back to id', () => {
      expect(getModuleIdentifier({ id: 42 })).toBe(42);
    });

    it('handles undefined module', () => {
      expect(getModuleIdentifier(undefined)).toBeUndefined();
    });
  });

  describe('saveModuleParam', () => {
    it('persists id, identifier, and cookie', () => {
      saveModuleParam(7, 'grocery');

      expect(localStorage.getItem('selectedModuleId')).toBe('7');
      expect(localStorage.getItem('selectedModuleIdentifier')).toBe('grocery');
      expect(document.cookie).toContain('selectedModule=grocery');
    });

    it('uses id when slug is omitted', () => {
      saveModuleParam(3);

      expect(localStorage.getItem('selectedModuleIdentifier')).toBe('3');
      expect(document.cookie).toContain('selectedModule=3');
    });
  });

  describe('getSavedModuleParam', () => {
    it('reads saved module id', () => {
      localStorage.setItem('selectedModuleId', '9');
      expect(getSavedModuleParam()).toBe('9');
    });

    it('returns null during server-side execution', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
      expect(getSavedModuleParam()).toBeNull();
      windowSpy.mockRestore();
    });
  });

  describe('getSavedModuleIdentifier', () => {
    it('reads saved identifier', () => {
      localStorage.setItem('selectedModuleIdentifier', 'pharmacy');
      expect(getSavedModuleIdentifier()).toBe('pharmacy');
    });

    it('returns null during server-side execution', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
      expect(getSavedModuleIdentifier()).toBeNull();
      windowSpy.mockRestore();
    });
  });

  describe('getCurrentModuleParam', () => {
    it('prefers router query module', () => {
      const router = { query: { module: 'parcel' } };
      expect(getCurrentModuleParam(router)).toBe('parcel');
      expect(localStorage.getItem('selectedModuleIdentifier')).toBe('parcel');
    });

    it('supports module_id query key', () => {
      const router = { query: { module_id: '5' } };
      expect(getCurrentModuleParam(router)).toBe('5');
    });

    it('falls back to saved identifier then id', () => {
      localStorage.setItem('selectedModuleIdentifier', 'rental');
      const router = { query: {} };
      expect(getCurrentModuleParam(router)).toBe('rental');

      localStorage.removeItem('selectedModuleIdentifier');
      localStorage.setItem('selectedModuleId', '11');
      expect(getCurrentModuleParam(router)).toBe('11');
    });
  });

  describe('ensureModuleParamInUrl', () => {
    it('injects module into url when missing', () => {
      localStorage.setItem('selectedModuleIdentifier', 'food');
      const replace = jest.fn();
      const router = {
        query: {},
        pathname: '/home',
        replace,
      };

      ensureModuleParamInUrl(router);

      expect(replace).toHaveBeenCalledWith(
        { pathname: '/home', query: { module: 'food' } },
        undefined,
        { shallow: true }
      );
    });

    it('skips when module already present', () => {
      const replace = jest.fn();
      const router = {
        query: { module: 'food' },
        pathname: '/home',
        replace,
      };

      ensureModuleParamInUrl(router);
      expect(replace).not.toHaveBeenCalled();
    });

    it('no-ops during server-side execution', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
      const replace = jest.fn();
      ensureModuleParamInUrl({ query: {}, pathname: '/home', replace });
      expect(replace).not.toHaveBeenCalled();
      windowSpy.mockRestore();
    });
  });
});
