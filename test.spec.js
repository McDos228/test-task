const { getBinanceData, addToFavorites, getFavorites } = require('./service');


describe('Test the service', () => {
  it('should display the trade view', async () => {
    const res = await getBinanceData()

    expect(res).toBeInstanceOf(Array);
    expect(res[0]).toHaveProperty('symbol', 'BOMEUSDC');
  });

  it('should add to favorites', async () => {
    const res = await addToFavorites('BTCUSDT')

    expect(res).toBe(true);
  });

  it('should get favorites', async () => {
    const res = await getFavorites()

    expect(res).toBeInstanceOf(Array);
    expect(res).toContain('BTCUSDT');
  });
})
