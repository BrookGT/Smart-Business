import handler from '../../pages/api/health';

function createResponse() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('/api/health', () => {
  it('returns service health payload', () => {
    const req = { method: 'GET' };
    const res = createResponse();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ok',
        service: 'smart-business-web',
      })
    );
  });

  it('rejects non-GET methods', () => {
    const req = { method: 'POST' };
    const res = createResponse();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Method not allowed',
    });
  });
});
