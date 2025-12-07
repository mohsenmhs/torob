import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./packages/api/openapi.json",
    },
    output: {
      mode: "tags-split",
      target: "./packages/api/src",
      schemas: "./packages/api/src/models",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "./packages/api/src/mutator/axios-instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "page",
        },
      },
      prettier: true,
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});

