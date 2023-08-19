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

test('function schema is generated correctly', async () => {
  class TestFuncInput {
    @gptObjectField('string', 'this is a test string', true)
    public testString: string = '';

    @gptObjectField('number', 'this is a test number', false)
    public testNumber: number = 0;
  }

  class TestSession extends ChatGPTSession {
    constructor() {
      super({
        apiKey: 'test',
      });
    }

    @gptFunction('this is a test function', TestFuncInput)
    testFunc(params: TestFuncInput) {
      return params;
    }
  }

  const testSession = new TestSession();
  const schema = testSession.getFunctionSchema();
  expect(schema).toEqual([
    {
      name: 'testFunc',
      description: 'this is a test function',
      parameters: {
        type: 'object',
        properties: {
          testString: {
            type: 'string',
            description: 'this is a test string',
          },
          testNumber: {
            type: 'number',
            description: 'this is a test number',
          },
        },
        required: ['testString'],
      },
    },
  ]);
});

const fetch = vi.fn().mockImplementation(() => Promise.resolve());

test('function calling should work', async () => {
  class BrowseParams {
    @gptObjectField('string', 'url of the web page to browse', true)
    public url: string = '';
  }

  class BrowseSession extends ChatGPTSession {
    constructor() {
      super({
        apiKey: '<MY_OPENAI_API_KEY>',
      });
    }

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
