import type { ChatGPTSession } from './session.js';

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

export type GPTClientMetadata = {
  constructor: new () => ChatGPTSession;
  functions: Record<string, GPTFunctionMetadata>;
};

export const GPT_CLIENT_METADATA = new Map<new () => ChatGPTSession, GPTClientMetadata>();
export const GPT_TYPE_METADATA = new Map<new () => unknown, GPTTypeMetadata>();
