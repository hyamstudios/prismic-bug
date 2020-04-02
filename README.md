# Gatsby + Prismic

Prismic preview throws errors and does not show the edit.

## Setup

1. `yarn` to install dependencies
2. `yarn start` to run app

There is a chance that an error might be thrown at random as per this [commentor's observation](https://github.com/prismicio/prismic-javascript/issues/18#issuecomment-538329420).

The following two routes can be used for testing:

1. [localhost:8000/en/test](http://localhost:8000/en/test)
2. [localhost:8000/en/news/egestas-tellus-rutrum-tellus-pellentesque-eu](http://localhost:8000/en/news/egestas-tellus-rutrum-tellus-pellentesque-eu)

Both should be error free when not in preview mode.

## Reproduce bug

1. [Preview link for test](https://prismic.link/2UzRBqu) — correspends to `localhost:8000/preview?token=https%3A%2F%2Fibbventures.prismic.io%2Fpreviews%2FXoYb1xAAAHB3n--b%3AXoYzZRAAACIAoFuy%3FwebsitePreviewId%3DXnjmnxIAACcAKLCf&documentId=XoYKjxAAAHB3n6V3`
2. Confirm preview shows the modified `title` field "EN Preview ---- WORKS"
3. [Preview link for news item](https://prismic.link/2R5uVMB) — correspends to `localhost:8000/preview?token=https%3A%2F%2Fibbventures.prismic.io%2Fpreviews%2FXoYb1xAAAHB3n--b%3AXoYzKBAAAHB3oFqb%3FwebsitePreviewId%3DXnjmnxIAACcAKLCf&documentId=XoIsiRAAAB8AjhdG`
4. Preview does not show correct `title` field which should read "PREVIEW WORKS!"
5. Console shows following error:

```
Error: Network error: Error writing result to store for query:
 {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lang"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"data"},"name":{"kind":"Name","value":"allNewss"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"lang"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lang"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"meta"},"name":{"kind":"Name","value":"_meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"uid"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"lang"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alternateLanguages"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"lang"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"metaTitle"},"name":{"kind":"Name","value":"meta_title"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"metaDescription"},"name":{"kind":"Name","value":"meta_description"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"metaImage"},"name":{"kind":"Name","value":"meta_image"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[],"directives":[]},null,{"kind":"Field","alias":{"kind":"Name","value":"eventDate"},"name":{"kind":"Name","value":"event_date"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"eventAddress"},"name":{"kind":"Name","value":"event_address"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}],"loc":{"start":0,"end":455}}
Cannot read property 'directives' of undefined
    at new ApolloError (bundle.esm.js:63)
    at bundle.esm.js:1247
    at bundle.esm.js:1559
    at Set.forEach (<anonymous>)
    at bundle.esm.js:1557
    at Map.forEach (<anonymous>)
    at QueryManager../node_modules/apollo-client/bundle.esm.js.QueryManager.broadcastQueries (bundle.esm.js:1555)
    at bundle.esm.js:1161
```
