[function-gpt](../README.md) / ChatGPTSession

# Class: ChatGPTSession

Extend this class to create your own function-calling enabled ChatGPT session.
Provide functions to the assistant by decorating them with the `@gptFunction` decorator.

**`See`**

[gptFunction](../README.md#gptfunction)

## Table of contents

### Constructors

- [constructor](ChatGPTSession.md#constructor)

### Properties

- [metadata](ChatGPTSession.md#metadata)
- [openai](ChatGPTSession.md#openai)
- [options](ChatGPTSession.md#options)
- [sessionMessages](ChatGPTSession.md#sessionmessages)

### Accessors

- [messages](ChatGPTSession.md#messages)

### Methods

- [processAssistantMessage](ChatGPTSession.md#processassistantmessage)
- [send](ChatGPTSession.md#send)

## Constructors

### constructor

• **new ChatGPTSession**(`options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChatGPTSessionOptions`](../README.md#chatgptsessionoptions) | Options for the ChatGPTSession constructor. |

**`See`**

[ChatGPTSessionOptions](../README.md#chatgptsessionoptions)

#### Defined in

[src/session.ts:211](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L211)

## Properties

### metadata

• `Private` `Readonly` **metadata**: `GPTClientMetadata`

#### Defined in

[src/session.ts:203](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L203)

___

### openai

• `Readonly` **openai**: `OpenAI`

#### Defined in

[src/session.ts:202](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L202)

___

### options

• `Private` `Readonly` **options**: [`ChatGPTSessionOptions`](../README.md#chatgptsessionoptions) = `{}`

Options for the ChatGPTSession constructor.

#### Defined in

[src/session.ts:211](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L211)

___

### sessionMessages

• `Private` **sessionMessages**: [`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[] = `[]`

#### Defined in

[src/session.ts:204](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L204)

## Accessors

### messages

• `get` **messages**(): [`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[]

#### Returns

[`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[]

The messages sent to and from the assistant so far.

#### Defined in

[src/session.ts:261](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L261)

## Methods

### processAssistantMessage

▸ `Private` **processAssistantMessage**(`message`, `options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage) |
| `options` | [`ChatGPTSendMessageOptions`](../README.md#chatgptsendmessageoptions) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/session.ts:265](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L265)

___

### send

▸ **send**(`message`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The user message to send to the assistant. |
| `options` | [`ChatGPTSendMessageOptions`](../README.md#chatgptsendmessageoptions) | Options for the ChatGPTSession.send method. |

#### Returns

`Promise`<`string`\>

The assistant's response.

**`See`**

[ChatGPTSendMessageOptions](../README.md#chatgptsendmessageoptions)

#### Defined in

[src/session.ts:228](https://github.com/atinylittleshell/function-gpt/blob/a8c982f/src/session.ts#L228)
