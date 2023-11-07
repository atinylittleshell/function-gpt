import { afterEach, expect, test, vi } from 'vitest';

import { gptFunction, gptObjectField } from '../index.js';
import { FunctionCallingProvider } from '../src/public.js';

afterEach(() => {
  vi.clearAllMocks();
});

const fetch = vi.fn().mockImplementation(() => Promise.resolve());

test('function calling should work', async () => {
  class BrowseParams {
    @gptObjectField('string', 'url of the web page to browse', true)
    public url: string = '';
  }

  class BrowseProvider extends FunctionCallingProvider {
    @gptFunction('browse a web page and return its html content', BrowseParams)
    async browse(params: BrowseParams) {
      await fetch(params.url);
      return 'this is a test response';
    }
  }

  const provider = new BrowseProvider();
  const response = await provider.handleFunctionCalling(
    'browse',
    JSON.stringify({ url: 'https://www.google.com' }),
  );

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(response).toEqual('this is a test response');
});
