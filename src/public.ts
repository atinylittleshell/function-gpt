import {
  describeField,
  FUNCTION_CALLING_PROVIDER_METADATA,
  FunctionCallingProviderMetadata,
} from './internals.js';

/**
 * Extend this class to create your own function-calling provider.
 * Provide functions to be called by decorating them with the `@gptFunction` decorator.
 *
 * @see {@link gptFunction}
 */
export class FunctionCallingProvider {
  private readonly metadata: FunctionCallingProviderMetadata;

  constructor() {
    const metadata = FUNCTION_CALLING_PROVIDER_METADATA.get(
      this.constructor as new () => FunctionCallingProvider,
    );
    if (!metadata) {
      throw new Error('No metadata found for this class');
    }
    this.metadata = metadata;
  }

  /**
   * @param name - Name of the function that is being called.
   * @param argumentsJson - JSON string of all input arguments to the function call.
   * @returns Result value of the function call.
   */
  public async handleFunctionCalling(name: string, argumentsJson: string) {
    const result = this.metadata.functions[name].value.bind(this)(
      JSON.parse(argumentsJson),
    );

    let resultValue: unknown;
    if (result instanceof Promise) {
      resultValue = await result;
    } else {
      resultValue = result;
    }

    return resultValue;
  }

  /**
   * Generate function schema objects that can be passed directly to
   * OpenAI's Node.js client whenever function calling schema is needed.
   *
   * @returns An array of function schema objects.
   */
  public getSchema() {
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
