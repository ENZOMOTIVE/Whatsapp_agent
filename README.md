# Whatsapp Agent

> Whatsapp Agent is an AI-assisted workflow project that connects model-powered behavior with application or protocol tooling.

## The Story

Whatsapp Agent starts with a simple goal: make model-driven behavior useful around wallets, tokens, contracts, or blockchain workflows. Its shape tells the same story: the service layer and the AI-assisted workflow live close enough together that a maintainer can see the project as a whole before diving into individual folders.

## What It Includes

- A service layer for APIs, realtime behavior, bot logic, or server-side workflows.
- AI-assisted behavior through model providers, bot flows, or agent-oriented tooling.

## How It Is Put Together

| Path | Role |
| --- | --- |
| `.gitattributes` | project file or folder |
| `Agent` | service, bot, API, or realtime layer |

## Local Development

```bash
git clone https://github.com/ENZOMOTIVE/Whatsapp_agent.git
cd Whatsapp_agent
```

```bash
cd Agent
npm install
```

## Command Surface

| Area | Commands |
| --- | --- |
| `Agent/package.json` | `test` |

## Configuration

- Document API ports, database URLs, third-party credentials, and service endpoints in `.env.example` before deployment.
- Keep wallet private keys, RPC URLs, mnemonics, and contract secrets outside version control.
- Keep model provider keys such as OpenAI or AI SDK credentials in local environment files only.

## Quality Checks

- From `Agent`, run `npm test`.

## Where To Take It Next

- Document the main API routes, bot events, or service responsibilities with example inputs and outputs.
- Describe the model provider, prompt boundaries, and evaluation approach for the AI-assisted parts.
- Keep setup commands current whenever dependencies, scripts, or deployment targets change.
- Record important product decisions here so the repository keeps its story as the code evolves.

## Project Metadata

| Field | Details |
| --- | --- |
| Repository | `ENZOMOTIVE/Whatsapp_agent` |
| Categories | `Agentic AI`, `Protocol` |
| Primary stack | Express, Node.js, TypeScript |


## License

No license file is currently committed. Add one before distributing this project publicly.
