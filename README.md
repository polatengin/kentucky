# kentucky project

Using [Playwright](https://playwright.dev/) to parse a website, generate json-line (`jsonl`) files to be used in an [OpenAI](https://openai.com/) chat completion request.

Using [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/) service to ask user questions and respond with answers.

## Parser project

[parser](./src/parser/tests/example.spec.ts) project uses [Playwright](https://playwright.dev/) to parse a website and generate json-line (`jsonl`) files.

## API project

[api](./src/api) project uses has only one endpoint, which is the root endpoint (`/`). It uses [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/) service to ask user questions and respond with the first answer.
