function-gpt

# function-gpt

## Table of contents

### Classes

- [FunctionCallingProvider](classes/FunctionCallingProvider.md)

### Functions

- [gptFunction](README.md#gptfunction)
- [gptObjectField](README.md#gptobjectfield)
- [gptString](README.md#gptstring)
- [gptNumber](README.md#gptnumber)
- [gptBoolean](README.md#gptboolean)
- [gptObject](README.md#gptobject)
- [gptEnum](README.md#gptenum)
- [gptArray](README.md#gptarray)

## Functions

### gptFunction

▸ **gptFunction**(`description`, `inputType`): (`target`: `object`, `propertyKey`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Use this decorator on a method within a FunctionCallingProvider subclass
to enable it for function-calling.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | A description of the function. |
| `inputType` | () => `unknown` | Input for the function should be an object instance of a custom class. This parameter specifies the class of the object. |

#### Returns

`fn`

▸ (`target`, `propertyKey`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`See`**

[gptObjectField](README.md#gptobjectfield)

#### Defined in

[src/decorators.ts:20](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L20)

___

### gptObjectField

▸ **gptObjectField**(`type`, `description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | ``"string"`` \| ``"number"`` \| ``"boolean"`` \| { `enum`: `string`[]  } \| [``"string"`` \| ``"number"`` \| ``"boolean"`` \| { `enum`: `string`[]  } \| () => `unknown`] \| () => `unknown` | `undefined` | Type of the field. Use `'string'`, `'number'`, `'boolean'` for primitive types. Use `['string']`, `['number']`, `['boolean']` for arrays of primitive types. Use a ClassName for custom types. Use `[ClassName]` for arrays of custom types. |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:61](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L61)

___

### gptString

▸ **gptString**(`description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a string property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:158](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L158)

___

### gptNumber

▸ **gptNumber**(`description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a number property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:168](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L168)

___

### gptBoolean

▸ **gptBoolean**(`description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a boolean property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:178](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L178)

___

### gptObject

▸ **gptObject**(`type`, `description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a custom class property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | () => `unknown` | `undefined` | Type of the field. |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:189](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L189)

___

### gptEnum

▸ **gptEnum**(`values`, `description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on a custom class property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `values` | `string`[] | `undefined` | Possible values of the enum. |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:204](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L204)

___

### gptArray

▸ **gptArray**(`type`, `description`, `optional?`): (`target`: `object`, `propertyKey`: `string`) => `void`

Use this decorator on an array of strings property within a custom class to include it as a parameter for function-calling.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | ``"string"`` \| ``"number"`` \| ``"boolean"`` \| { `enum`: `string`[]  } \| () => `unknown` | `undefined` | - |
| `description` | `string` | `undefined` | Description of the field. |
| `optional` | `boolean` | `false` | Whether the field is optional. Default to `false`. |

#### Returns

`fn`

▸ (`target`, `propertyKey`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |

##### Returns

`void`

#### Defined in

[src/decorators.ts:218](https://github.com/atinylittleshell/function-gpt/blob/51cdc39/src/decorators.ts#L218)
