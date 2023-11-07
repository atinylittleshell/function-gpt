# function-gpt

## 2.0.0

### Major Changes

- 095c534: Revamped public API to provide only the core functionality

  OpenAI has just announced their Assistants API which also allows function
  calling. The previous API design of function-gpt was coupled with the chat
  completion API thus won't be flexible enough for this library to work well
  with the new Assistants API.

  As a result, the public API of this library has been revamped to provide only
  the core functionality of generating function calling schema, and executing
  function calling on demand.

  The previous ChatGPTSession class was removed, as it was coupled with the chat
  completion API. A new class FunctionCallingProvider is introduced and can be
  used instead of ChatGPTSession for defining functions to be used by function
  calling.

## 1.4.0

### Minor Changes

- 66a372d: added a few helper decorators for common types

## 1.3.0

### Minor Changes

- a43afe8: Add API reference documentation

## 1.2.1

### Patch Changes

- 04eb21b: fix a bug with execute_only mode

## 1.2.0

### Minor Changes

- 5972072: support execute_only mode

## 1.1.0

### Minor Changes

- d67864d: support object fields that are array of primitives

## 1.0.6

### Patch Changes

- 33d02dd: fix exports and readme example

## 1.0.5

### Patch Changes

- 1296757: try fixing publish workflow

## 1.0.4

### Patch Changes

- ec30c37: setup npmrc correctly

## 1.0.3

### Patch Changes

- c0066a4: try fixing the publish workflow

## 1.0.2

### Patch Changes

- e1afed4: fix npm package files

## 1.0.1

### Patch Changes

- 441062d: fix changeset config

## 1.0.0

### Major Changes

- 4a5b3af: Initial release with minimal functionality.
