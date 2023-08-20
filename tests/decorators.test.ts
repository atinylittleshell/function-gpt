import { expect, test } from 'vitest';

import { ChatGPTSession, gptFunction, gptObjectField } from '../index.js';

process.env.OPENAI_API_KEY = 'test';

test('basic function schema is generated correctly', async () => {
  class TestFuncInput {
    @gptObjectField('string', 'this is a test string', true)
    public testString!: string;

    @gptObjectField('number', 'this is a test number', false)
    public testNumber!: number;
  }

  class TestSession extends ChatGPTSession {
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
        required: ['testNumber'],
      },
    },
  ]);
});

test('input parameter can be an array of strings', () => {
  class TestParam {
    @gptObjectField(['string'], 'test words')
    words!: string[];
  }

  class TestSession extends ChatGPTSession {
    @gptFunction('this is a test function', TestParam)
    testFunc(params: TestParam) {
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
          words: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'test words',
          },
        },
        required: ['words'],
      },
    },
  ]);
});
