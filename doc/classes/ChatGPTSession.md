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

- [openai](ChatGPTSession.md#openai)
- [metadata](ChatGPTSession.md#metadata)
- [sessionMessages](ChatGPTSession.md#sessionmessages)
- [options](ChatGPTSession.md#options)

### Accessors

- [messages](ChatGPTSession.md#messages)

### Methods

- [send](ChatGPTSession.md#send)
- [processAssistantMessage](ChatGPTSession.md#processassistantmessage)

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

[src/session.ts:252](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L252)

## Properties

### openai

• `Readonly` **openai**: `OpenAI`

#### Defined in

[src/session.ts:243](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L243)

___

### metadata

• `Private` `Readonly` **metadata**: `GPTClientMetadata`

#### Defined in

[src/session.ts:244](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L244)

___

### sessionMessages

• `Private` **sessionMessages**: [`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[] = `[]`

#### Defined in

[src/session.ts:245](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L245)

___

### options

• `Private` `Readonly` **options**: [`ChatGPTSessionOptions`](../README.md#chatgptsessionoptions) = `{}`

Options for the ChatGPTSession constructor.

#### Defined in

[src/session.ts:252](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L252)

## Accessors

### messages

• `get` **messages**(): [`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[]

#### Returns

[`ChatGPTSessionMessage`](../README.md#chatgptsessionmessage)[]

The messages sent to and from the assistant so far.

#### Defined in

[src/session.ts:302](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L302)

## Methods

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

[src/session.ts:269](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L269)

___

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

[src/session.ts:306](https://github.com/atinylittleshell/function-gpt/blob/8014308/src/session.ts#L306)
