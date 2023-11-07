# Function-GPT

> This is a typescript library that helps handle [function calling](https://platform.openai.com/docs/guides/gpt/function-calling) with OpenAI.

[![NPM](https://img.shields.io/npm/v/function-gpt.svg)](https://www.npmjs.com/package/function-gpt)
[![Build Status](https://github.com/atinylittleshell/function-gpt/actions/workflows/publish.yml/badge.svg)](https://github.com/atinylittleshell/function-gpt/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/atinylittleshell/function-gpt/graph/badge.svg?token=1R81CX1Z14)](https://codecov.io/gh/atinylittleshell/function-gpt)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/atinylittleshell/function-gpt/blob/main/license)

- Uses typescript decorators to provide metadata for function calling
- Automatically generate function calling JSON schema from decorated typescript functions
- Automatically call functions based on name and JSON-formatted arguments
- Can be used with OpenAI's Chat Completion API as well as the Assistants API

## Example

```typescript
import { gptFunction, gptString, FunctionCallingProvider } from 'function-gpt';

// Define the type of the input parameter for functions above.
class BrowseParams {
  // Decorate each field with @gptObjectField to provide necessary metadata.
  @gptString('url of the web page to browse')
  public url!: string;
}

// Create your own class that extends FunctionCallingProvider.
class BrowseProvider extends FunctionCallingProvider {
  // Define functions that you want to provide to OpenAI for function calling.
  // Decorate each function with @gptFunction to provide necessary metadata.
  // The function should accept a single parameter that is a typed object.
  @gptFunction('make http request to a url and return its html content', BrowseParams)
  async browse(params: BrowseParams) {
    const response = await fetch(params.url);
    return await response.text();
  }
}

const provider = new BrowseProvider();

const schema = await provider.getSchema();
const result = await provider.handleFunctionCall(
  'browse',
  JSON.stringify({ url: 'https://www.google.com' }),
);
```

## API References

See [API references](./doc/README.md) for more detailed information on how to use the library.

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
