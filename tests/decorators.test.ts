import { expect, test } from 'vitest';

import {
  ChatGPTSession,
  gptArray,
  gptBoolean,
  gptEnum,
  gptFunction,
  gptNumber,
  gptObject,
  gptObjectField,
  gptString,
} from '../index.js';

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

test('all helper decorators should work', () => {
  class TestParam2 {
    @gptString('test string')
    str!: string;
  }

  class TestParam {
    @gptString('test string')
    str!: string;

    @gptNumber('test number')
    num!: number;

    @gptBoolean('test boolean')
    bool!: boolean;

    @gptEnum(['a', 'b', 'c'], 'test enum')
    enum!: 'a' | 'b' | 'c';

    @gptObject(TestParam2, 'test object')
    obj!: TestParam2;

    @gptArray('string', 'test array')
    arr!: string[];
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
          str: {
            type: 'string',
            description: 'test string',
          },
          num: {
            type: 'number',
            description: 'test number',
          },
          bool: {
            type: 'boolean',
            description: 'test boolean',
          },
          enum: {
            type: 'string',
            enum: ['a', 'b', 'c'],
            description: 'test enum',
          },
          obj: {
            type: 'object',
            properties: {
              str: {
                type: 'string',
                description: 'test string',
              },
            },
            required: ['str'],
            description: 'test object',
          },
          arr: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'test array',
          },
        },
        required: ['str', 'num', 'bool', 'enum', 'obj', 'arr'],
      },
    },
  ]);
});
