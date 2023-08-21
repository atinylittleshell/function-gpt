import OpenAI, { ClientOptions } from 'openai';

import { GPT_CLIENT_METADATA, GPTClientMetadata, GPTTypeMetadata } from './internals.js';

const describeField = (description: string | null, fieldType: GPTTypeMetadata) => {
  let result: Record<string, unknown> =
    description === null
      ? {}
      : {
          description,
        };

  switch (fieldType.type) {
    case 'string':
      result = {
        ...result,
        type: 'string',
      };
      break;
    case 'number':
      result = {
        ...result,
        type: 'number',
      };
      break;
    case 'boolean':
      result = {
        ...result,
        type: 'boolean',
      };
      break;
    case 'object':
      result = {
        ...result,
        type: 'object',
        properties: fieldType.fields.reduce((acc, f) => {
          return {
            ...acc,
            [f.name]: describeField(f.description, f.type),
          };
        }, {}),
        required: fieldType.fields.filter((f) => f.required).map((f) => f.name),
      };
      break;
    case 'enum':
      result = {
        ...result,
        type: 'string',
        enum: fieldType.values,
      };
      break;
    case 'array':
      result = {
        ...result,
        type: 'array',
        items: describeField(null, fieldType.elementType),
      };
      break;
    default:
      throw new Error(`Unknown field type: ${fieldType}`);
  }

  return result;
};

/**
 * Options for the ChatGPTSession constructor. Compatible with the OpenAI node client options.
 *
 * @see [OpenAI Node Client](https://github.com/openai/openai-node)
 */
export type ChatGPTSessionOptions = {
  /**
   * Your API key for the OpenAI API.
   *
   * @default process.env["OPENAI_API_KEY"]
   */
  apiKey?: string;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   */
  baseURL?: string;

  /**
   * A system message to send to the assistant before the user's first message.
   * Useful for setting up the assistant's behavior.
   *
   * @default No system message set.
   */
  systemMessage?: string;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
   */
  dangerouslyAllowBrowser?: boolean;
};

/**
 * Represents a function call requested by ChatGPT.
 */
export type ChatGPTFunctionCall = {
  name: string;
  arguments: string;
};

/**
 * Represents a message in a ChatGPT session.
 */
export type ChatGPTSessionMessage = {
  role: 'system' | 'user' | 'assistant' | 'function';
  name?: string;
  content: string | null;
  function_call?: ChatGPTFunctionCall;
};

/**
 * Options for the ChatGPTSession.send method.
 *
 * @see [OpenAI Chat Completion API](https://platform.openai.com/docs/api-reference/chat/create).
 */
export type ChatGPTSendMessageOptions = {
  /**
   * Stop the session after executing the function call.
   * Useful when you don't need to give ChatGPT the result of the function call.
   * Defaults to `false`.
   */
  function_call_execute_only?: boolean;

  /**
   * ID of the model to use.
   *
   * @see [model endpoint compatibility](https://platform.openai.com/docs/models/overview)
   */
  model: string;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
   * existing frequency in the text so far, decreasing the model's likelihood to
   * repeat the same line verbatim.
   *
   * @see [See more information about frequency and presence penalties.](https://platform.openai.com/docs/api-reference/parameter-details)
   */
  frequency_penalty?: number | null;

  /**
   * Controls how the model responds to function calls. "none" means the model does
   * not call a function, and responds to the end-user. "auto" means the model can
   * pick between an end-user or calling a function. Specifying a particular function
   * via `{"name":\ "my_function"}` forces the model to call that function. "none" is
   * the default when no functions are present. "auto" is the default if functions
   * are present.
   */
  function_call?: 'none' | 'auto' | { name: string };

  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a json object that maps tokens (specified by their token ID in the
   * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
   * bias is added to the logits generated by the model prior to sampling. The exact
   * effect will vary per model, but values between -1 and 1 should decrease or
   * increase likelihood of selection; values like -100 or 100 should result in a ban
   * or exclusive selection of the relevant token.
   */
  logit_bias?: Record<string, number> | null;

  /**
   * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's
   * context length.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
   * for counting tokens.
   */
  max_tokens?: number;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood to
   * talk about new topics.
   *
   * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/api-reference/parameter-details)
   */
  presence_penalty?: number | null;

  /**
   * Up to 4 sequences where the API will stop generating further tokens.
   */
  stop?: string | null | Array<string>;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor
   * and detect abuse.
   *
   * @see [Learn more](https://platform.openai.com/docs/guides/safety-best-practices).
   */
  user?: string;
};

/**
 * Extend this class to create your own function-calling enabled ChatGPT session.
 * Provide functions to the assistant by decorating them with the `@gptFunction` decorator.
 *
 * @see {@link gptFunction}
 */
export class ChatGPTSession {
  public readonly openai: OpenAI;
  private readonly metadata: GPTClientMetadata;
  private sessionMessages: ChatGPTSessionMessage[] = [];

  /**
   * @param options - Options for the ChatGPTSession constructor.
   *
   * @see {@link ChatGPTSessionOptions}
   */
  constructor(private readonly options: ChatGPTSessionOptions & ClientOptions = {}) {
    this.openai = new OpenAI(options);

    const metadata = GPT_CLIENT_METADATA.get(this.constructor as new () => ChatGPTSession);
    if (!metadata) {
      throw new Error('No metadata found for this class');
    }
    this.metadata = metadata;
  }

  /**
   * @param message - The user message to send to the assistant.
   * @param options - Options for the ChatGPTSession.send method.
   * @returns The assistant's response.
   *
   * @see {@link ChatGPTSendMessageOptions}
   */
  public async send(
    message: string,
    options: ChatGPTSendMessageOptions = {
      model: 'gpt-3.5-turbo',
    },
  ): Promise<string> {
    if (this.sessionMessages.length === 0 && this.options.systemMessage) {
      this.sessionMessages.push({
        role: 'system',
        content: this.options.systemMessage,
      });
    }

    this.sessionMessages.push({
      role: 'user',
      content: message,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { function_call_execute_only, ...optionsToSend } = options;

    const response = await this.openai.chat.completions.create({
      ...optionsToSend,
      messages: this.sessionMessages,
      functions: this.getFunctionSchema(),
    });

    return await this.processAssistantMessage(response.choices[0].message, options);
  }

  /**
   * @returns The messages sent to and from the assistant so far.
   */
  get messages(): ChatGPTSessionMessage[] {
    return this.sessionMessages;
  }

  private async processAssistantMessage(
    message: ChatGPTSessionMessage,
    options: ChatGPTSendMessageOptions,
  ): Promise<string> {
    if (message.role !== 'assistant') {
      throw new Error(`Expected assistant message, got ${message.role}`);
    }

    if (!message.content && !message.function_call) {
      throw new Error('Expected content or function call');
    }

    this.sessionMessages.push(message);

    if (message.function_call) {
      const result = this.metadata.functions[message.function_call.name].value.bind(this)(
        JSON.parse(message.function_call.arguments),
      );

      let resultValue: unknown;
      if (result instanceof Promise) {
        resultValue = await result;
      } else {
        resultValue = result;
      }

      this.sessionMessages.push({
        role: 'function',
        name: message.function_call.name,
        content: JSON.stringify(resultValue),
      });

      if (options.function_call_execute_only) {
        return '';
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { function_call_execute_only, ...optionsToSend } = options;

      const response = await this.openai.chat.completions.create({
        ...optionsToSend,
        messages: this.sessionMessages,
        functions: this.getFunctionSchema(),
      });

      return await this.processAssistantMessage(response.choices[0].message, options);
    }

    return message.content!;
  }

  /**
   * @ignore
   */
  public getFunctionSchema() {
    const schema = Object.values(this.metadata.functions).map((f) => ({
      name: f.name,
      description: f.description,
      parameters: describeField(null, f.inputType),
    }));

    if (schema.length === 0) {
      return undefined;
    }
    return schema;
  }
}
