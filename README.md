# SafeSpeak
![CI](https://img.shields.io/github/actions/workflow/status/myferr/safespeak/publish.yml?logo=github&label=Build+and+Publish+SDK)
![Vercel](https://vercelbadge.vercel.app/api/myferr/safespeak)

SafeSpeak is an API for profanity monitoring with **numeric** scores, the higher the more profane/toxic the message content is.

* [NPM](https://npmjs.com/package/safespeak)
* [Website](https://safespeak-api.vercel.app)

## API reference

| Method | Route | Parameters |
| --- | --- | --- |
| GET | /api | `message`, `showMessage?` |


### Optional query params:
- `showMessage=true` – include original message in response

### Response Format

```json
{
  "score": 0.6,
  "tags": ["profanity"],
  "content": "your message here" // Only if showMessage=true
}
```

---

## SDK
SafeSpeak provides a TypeScript/JavaScript SDK [package](https://npmjs.com/package/safespeak) to easily integrate with SafeSpeak without using `fetch()`.
You can get started by running
```
npm i safespeak@latest
```

### Getting the score of content
You can get the numeric `score` of content by using the `getScore` function provided by the SDK
```ts
import { safespeak } from "safespeak";

async function myTestFunction(message: string) {
  console.log(await safespeak.getScore(message))
}

myTestFunction("All crispy clean 🔥")
```

### Is this profane?
The `isProfane` function provided by the SDK returns a boolean value
* `true` if the `score` is larger than the threshold
* `false` if the `score` is lesser than the threshold
```ts
import { safespeak } from "safespeak";

async function myTestFunction(message: string) {
  const THRESHOLD = 0.6;
  console.log(await safespeak.isProfane(message, THRESHOLD))
}

myTestFunction("All crispy clean 🔥")
```

# Tech stack
### Frontend
* Next.js 15
* TypeScript
* shadcn/ui
* Prism.js
* TailwindCSS
### Backend
* TypeScript
* Express
* Ollama (w/ llama3 model)
