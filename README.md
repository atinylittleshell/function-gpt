# Function-GPT

> This is a typescript library that helps handle [function calling](https://platform.openai.com/docs/guides/gpt/function-calling) with OpenAI's ChatGPT API.

[![NPM](https://img.shields.io/npm/v/function-gpt.svg)](https://www.npmjs.com/package/function-gpt)
[![Build Status](https://github.com/atinylittleshell/function-gpt/actions/workflows/publish.yml/badge.svg)](https://github.com/atinylittleshell/function-gpt/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/atinylittleshell/function-gpt/graph/badge.svg?token=1R81CX1Z14)](https://codecov.io/gh/atinylittleshell/function-gpt)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/atinylittleshell/function-gpt/blob/main/license)

- Leverages the official [openai](https://www.npmjs.com/package/openai) npm package for communicating with OpenAI's API
- Uses typescript decorators to provide metadata for function calling
- Automatically generate function calling JSON schema from decorated typescript functions
- Automatically parse function calling response
- Automatically call functions and send back results to OpenAI

## Example

```typescript
import { gptFunction, gptObjectField, ChatGPTSession } from 'function-gpt';

// First create your own class that extends ChatGPTSession.
class BrowseSession extends ChatGPTSession {
  // Define functions that you want to provide to ChatGPT for function calling.
  // Decorate each function with @gptFunction to provide necessary metadata.
  // The function should accept a single parameter that is a typed object.
  @gptFunction('make http request to a url and return its html content', BrowseParams)
  async browse(params: BrowseParams) {
    const response = await fetch(params.url);
    return await response.text();
  }
}

// Define the type of the input parameter for functions above.
class BrowseParams {
  // Decorate each field with @gptObjectField to provide necessary metadata.
  @gptObjectField('string', 'url of the web page to browse', true)
  public url: string = '';
}

const session = new BrowseSession();
const response = await session.send('count characters in the html content of https://www.google.com.');

// BrowseSession will first call OpenAI's ChatGPT API with the above prompt
// along with metadata about the browse function.

// OpenAI's ChatGPT API will then return a function calling response that
// asks for making a call to the browse function.

// BrowseSession will then call the browse function with the parameters
// specified in OpenAI's function calling response, and then send back the
// result to OpenAI's ChatGPT API.

// OpenAI's ChatGPT API will then return a message that contains the
// chat response.
expect(response).toBe('There are 4096 characters in the html content of https://www.google.com/.');
```

## Installation

```bash
npm install function-gpt --save
# or
yarn add function-gpt
# or
pnpm add function-gpt
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for more info.