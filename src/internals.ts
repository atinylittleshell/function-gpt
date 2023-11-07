import { FunctionCallingProvider } from './public.js';

export type GPTPrimitiveTypeMetadata = {
  type: 'string' | 'number' | 'boolean';
};

export type GPTObjectFieldMetadata = {
  name: string;
  description: string;
  type: GPTTypeMetadata;
  required: boolean;
};

export type GPTObjectTypeMetadata = {
  type: 'object';
  fields: GPTObjectFieldMetadata[];
};

export type GPTArrayTypeMetadata = {
  type: 'array';
  elementType: GPTTypeMetadata;
};

export type GPTEnumTypeMetadata = {
  type: 'enum';
  values: string[];
};

export type GPTTypeMetadata =
  | GPTPrimitiveTypeMetadata
  | GPTObjectTypeMetadata
  | GPTArrayTypeMetadata
  | GPTEnumTypeMetadata;

export type GPTFunctionMetadata = {
  name: string;
  value: (...args: unknown[]) => unknown;
  description: string;
  inputType: GPTObjectTypeMetadata;
};

export type FunctionCallingProviderMetadata = {
  constructor: new () => FunctionCallingProvider;
  functions: Record<string, GPTFunctionMetadata>;
};

export const GPT_TYPE_METADATA = new Map<new () => unknown, GPTTypeMetadata>();

export const FUNCTION_CALLING_PROVIDER_METADATA = new Map<
  new () => FunctionCallingProvider,
  FunctionCallingProviderMetadata
>();

export const describeField = (
  description: string | null,
  fieldType: GPTTypeMetadata,
) => {
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
