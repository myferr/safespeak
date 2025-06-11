export const OllamaConfig = {
  protocol: "http", // Protocol to use (http or https)
  hostname: "localhost:", // Hostname for the Ollama server (include colon if using localhost)
  localhostPort: {
    port: 11434, // Port number for localhost (only used if connecting to localhost)
  },
  apiRoute: "/api/generate", // API route for Ollama requests (default: /api/generate)
  model: "llama3", // Name of the Ollama model to use
  stream: false, // Whether to enable streaming responses from Ollama
};
