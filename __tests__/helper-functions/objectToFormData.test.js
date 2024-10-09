import { objectToFormData } from '../../src/helper-functions/objectToFormData';

describe('objectToFormData', () => {
  it('builds form data and skips confirm_password', () => {
    const values = {
      email: 'user@smartbusiness.io',
      password: 'secret',
      confirm_password: 'secret',
    };

    const formData = objectToFormData(values);
    expect(formData.get('email')).toBe('user@smartbusiness.io');
    expect(formData.get('password')).toBe('secret');
    expect(formData.get('confirm_password')).toBeNull();
  });

  it('appends identity images as array fields', () => {
    const fileA = new File(['a'], 'a.png');
    const fileB = new File(['b'], 'b.png');
    const formData = objectToFormData({
      identity_image: [fileA, fileB],
      name: 'Brook',
    });

    expect(formData.getAll('identity_image[]')).toEqual([fileA, fileB]);
    expect(formData.get('name')).toBe('Brook');
  });
});
