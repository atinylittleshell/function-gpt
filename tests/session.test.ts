import OpenAI from 'openai';
import { afterEach, expect, test, vi } from 'vitest';

import { gptFunction, gptObjectField } from '../index.js';
import { GPTFunctionMetadata } from '../src/internals.js';
import { ChatGPTSession, ChatGPTSessionMessage } from '../src/session.js';

vi.mock('openai', () => {
  const mod = vi.importMock('openai');
  return {
    ...mod,
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi
            .fn()
            .mockImplementation(
              ({ messages, functions }: { messages: ChatGPTSessionMessage[]; functions: GPTFunctionMetadata[] }) => {
                if (messages[messages.length - 1].role === 'user') {
                  return Promise.resolve({
                    choices: [
                      {
                        message: {
                          role: 'assistant',
                          content: null,
                          function_call: {
                            name: functions[0].name,
                            arguments: '{}',
                          },
                        },
                      },
                    ],
                  });
                } else if (messages[messages.length - 1].role === 'function') {
                  return Promise.resolve({
                    choices: [
                      {
                        message: {
                          role: 'assistant',
                          content: 'this is a test response',
                        },
                      },
                    ],
                  });
                } else {
                  return Promise.reject(new Error('Unexpected message role'));
                }
              },
            ),
        },
      },
    })),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

const fetch = vi.fn().mockImplementation(() => Promise.resolve());

test('function calling should work', async () => {
  class BrowseParams {
    @gptObjectField('string', 'url of the web page to browse', true)
    public url: string = '';
  }

  class BrowseSession extends ChatGPTSession {
    @gptFunction('browse a web page and return its html content', BrowseParams)
    async browse(params: BrowseParams) {
      await fetch(params.url);
    }
  }

  const session = new BrowseSession();
  const response = await session.send('this is a test message');

  expect(OpenAI).toHaveBeenCalledTimes(1);
  expect(session.openai.chat.completions.create).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(response).toEqual('this is a test response');
});

test('execute_only mode should work', async () => {
  class BrowseParams {
    @gptObjectField('string', 'url of the web page to browse', true)
    public url: string = '';
  }

  class BrowseSession extends ChatGPTSession {
    @gptFunction('browse a web page and return its html content', BrowseParams)
    async browse(params: BrowseParams) {
      await fetch(params.url);
    }
  }

  const session = new BrowseSession();
  const response = await session.send('this is a test message', {
    model: 'gpt-3.5-turbo',
    function_call_execute_only: true,
  });

  expect(OpenAI).toHaveBeenCalledTimes(1);
  expect(session.openai.chat.completions.create).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(session.messages.length).toEqual(3);
  expect(response).toEqual('');
});
