import { checkForName } from '../src/client/js/nameChecker';

test('checks if the input url is invalid', () => {
    expect(checkForName('hello.bye')).toBe(false);
});
