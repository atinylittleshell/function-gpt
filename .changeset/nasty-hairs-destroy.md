---
'function-gpt': major
---

Revamped public API to provide only the core functionality

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
