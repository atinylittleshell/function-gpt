import {
  GPT_CLIENT_METADATA,
  GPT_TYPE_METADATA,
  GPTClientMetadata,
  GPTObjectTypeMetadata,
  GPTTypeMetadata,
} from './internals.js';
import { ChatGPTSession } from './session.js';

export function gptFunction(description: string, inputType: new () => unknown) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ctor = target.constructor as new () => ChatGPTSession;
    if (!ctor) {
      throw new Error(`@gptFunction decorator was used on '${propertyKey}' which is not a class instance method`);
    }

    const metadata: GPTClientMetadata = GPT_CLIENT_METADATA.get(ctor) || {
      constructor: ctor,
      functions: {},
    };

    metadata.functions[propertyKey] = {
      name: propertyKey,
      value: descriptor.value,
      description,
      inputType: GPT_TYPE_METADATA.get(inputType) as GPTObjectTypeMetadata,
    };

    GPT_CLIENT_METADATA.set(ctor, metadata);
  };
}

export function gptObjectField(
  type: 'string' | 'number' | 'boolean' | (new () => unknown) | [new () => unknown],
  description: string,
  required = true,
) {
  return function (target: object, propertyKey: string) {
    const ctor = target.constructor as new () => unknown;
    if (!ctor) {
      throw new Error(`@gptObjectField decorator was used on '${propertyKey}' which is not a class instance property`);
    }

    const metadata = (GPT_TYPE_METADATA.get(ctor) as GPTObjectTypeMetadata) || {
      type: 'object',
      fields: [],
    };

    if (type === 'string') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'string' },
        required,
      });
    } else if (type === 'number') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'number' },
        required,
      });
    } else if (type === 'boolean') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'boolean' },
        required,
      });
    } else if (Array.isArray(type)) {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: {
          type: 'array',
          elementType: GPT_TYPE_METADATA.get(type[0]) as GPTTypeMetadata,
        },
        required,
      });
    } else if (typeof type === 'function') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: GPT_TYPE_METADATA.get(type) as GPTTypeMetadata,
        required,
      });
    }

    GPT_TYPE_METADATA.set(ctor, metadata);
  };
}
