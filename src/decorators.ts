import {
  GPT_CLIENT_METADATA,
  GPT_TYPE_METADATA,
  GPTClientMetadata,
  GPTObjectTypeMetadata,
  GPTTypeMetadata,
} from './internals.js';
import { ChatGPTSession } from './session.js';

/**
 * Use this decorator on a method within a ChatGPTSession subclass to enable it for function-calling.
 *
 * @param description - A description of the function.
 * @param inputType - Input for the function should be an object instance of a custom class.
 *                    This parameter specifies the class of the object.
 *
 * @see {@link gptObjectField}
 */
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

/**
 * Use this decorator on a property within a custom class to include it as a parameter for function-calling.
 *
 * @param type - Type of the field.
 *               Use `'string'`, `'number'`, `'boolean'` for primitive types.
 *               Use `['string']`, `['number']`, `['boolean']` for arrays of primitive types.
 *               Use a ClassName for custom types.
 *               Use `[ClassName]` for arrays of custom types.
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptObjectField(
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | { enum: string[] }
    | (new () => unknown)
    | ['string' | 'number' | 'boolean' | { enum: string[] } | (new () => unknown)],
  description: string,
  optional = false,
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
        required: !optional,
      });
    } else if (type === 'number') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'number' },
        required: !optional,
      });
    } else if (type === 'boolean') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'boolean' },
        required: !optional,
      });
    } else if (Array.isArray(type)) {
      const elementType = type[0];
      metadata.fields.push({
        name: propertyKey,
        description,
        type: {
          type: 'array',
          elementType:
            elementType === 'string'
              ? { type: 'string' }
              : elementType === 'number'
              ? { type: 'number' }
              : elementType === 'boolean'
              ? { type: 'boolean' }
              : typeof elementType === 'function'
              ? (GPT_TYPE_METADATA.get(elementType) as GPTTypeMetadata)
              : { type: 'enum', values: elementType.enum },
        },
        required: !optional,
      });
    } else if (typeof type === 'function') {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: GPT_TYPE_METADATA.get(type) as GPTTypeMetadata,
        required: !optional,
      });
    } else {
      metadata.fields.push({
        name: propertyKey,
        description,
        type: { type: 'enum', values: type.enum },
        required: !optional,
      });
    }

    GPT_TYPE_METADATA.set(ctor, metadata);
  };
}

/**
 * Use this decorator on a string property within a custom class to include it as a parameter for function-calling.
 *
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptString(description: string, optional = false) {
  return gptObjectField('string', description, optional);
}

/**
 * Use this decorator on a number property within a custom class to include it as a parameter for function-calling.
 *
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptNumber(description: string, optional = false) {
  return gptObjectField('number', description, optional);
}

/**
 * Use this decorator on a boolean property within a custom class to include it as a parameter for function-calling.
 *
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptBoolean(description: string, optional = false) {
  return gptObjectField('boolean', description, optional);
}

/**
 * Use this decorator on a custom class property within a custom class to include it as a parameter for function-calling.
 *
 * @param type - Type of the field.
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptObject(type: new () => unknown, description: string, optional = false) {
  return gptObjectField(type, description, optional);
}

/**
 * Use this decorator on a custom class property within a custom class to include it as a parameter for function-calling.
 *
 * @param values - Possible values of the enum.
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptEnum(values: string[], description: string, optional = false) {
  return gptObjectField({ enum: values }, description, optional);
}

/**
 * Use this decorator on an array of strings property within a custom class to include it as a parameter for function-calling.
 *
 * @param description - Description of the field.
 * @param optional - Whether the field is optional. Default to `false`.
 */
export function gptArray(
  type: 'string' | 'number' | 'boolean' | { enum: string[] } | (new () => unknown),
  description: string,
  optional = false,
) {
  return gptObjectField([type], description, optional);
}
