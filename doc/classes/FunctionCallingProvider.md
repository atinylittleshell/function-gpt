[function-gpt](../README.md) / FunctionCallingProvider

# Class: FunctionCallingProvider

Extend this class to create your own function-calling provider.
Provide functions to be called by decorating them with the `@gptFunction` decorator.

**`See`**

[gptFunction](../README.md#gptfunction)

## Table of contents

### Constructors

- [constructor](FunctionCallingProvider.md#constructor)

### Properties

- [metadata](FunctionCallingProvider.md#metadata)

### Methods

- [handleFunctionCalling](FunctionCallingProvider.md#handlefunctioncalling)
- [getSchema](FunctionCallingProvider.md#getschema)

## Constructors

### constructor

• **new FunctionCallingProvider**()

#### Defined in

src/public.ts:16

## Properties

### metadata

• `Private` `Readonly` **metadata**: `FunctionCallingProviderMetadata`

#### Defined in

src/public.ts:14

## Methods

### handleFunctionCalling

▸ **handleFunctionCalling**(`name`, `argumentsJson`): `Promise`<`unknown`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the function that is being called. |
| `argumentsJson` | `string` | JSON string of all input arguments to the function call. |

#### Returns

`Promise`<`unknown`\>

Result value of the function call.

#### Defined in

src/public.ts:31

___

### getSchema

▸ **getSchema**(): `undefined` \| { `name`: `string` = f.name; `description`: `string` = f.description; `parameters`: `Record`<`string`, `unknown`\>  }[]

Generate function schema objects that can be passed directly to
OpenAI's Node.js client whenever function calling schema is needed.

#### Returns

`undefined` \| { `name`: `string` = f.name; `description`: `string` = f.description; `parameters`: `Record`<`string`, `unknown`\>  }[]

An array of function schema objects.

#### Defined in

src/public.ts:52
