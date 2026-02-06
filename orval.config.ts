import { defineConfig } from "orval"

export default defineConfig({
  api: {
    input: "https://dev.buy-or-not.com/v3/api-docs",
    output: {
      mode: "tags-split",
      target: "src/api",
      schemas: "src/api/model",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "",
      override: {
        mutator: {
          path: "src/api/custom-fetch.ts",
          name: "customFetch",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
})
