import { proceed } from '../src/client/js/formHandler';

test('checks if its ok to fetch', () => {
    expect(proceed(true, '')).toBe(false);
});
