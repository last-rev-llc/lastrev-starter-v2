## Migrating contentful to sanity

**Note:** All commands should be run from the root directory to provide the correct environment variables.

1. Export contentful data to sanity:

```bash
pnpm sanity-contentful-export
```

This will creeate two files:

- contentful.json (content types, editor interfaces, and draft content)
- contentful.published.json (published content) I think mostly this one can be ignored.

And then it will remove tables from the rich text fields, as these are not supported in Sanity.

2. Create schemas for the exported types:

```bash
pnpm sanity-create-schema
```

This will generate a schema.js file in the root directory and fix some errors in it.

3. Generate the dataset

```bash
pnpm sanity-create-dataset
```

This will generate a dataset.ndjson file in the root directory.

4. Import the data into the dataset

```bash
pnpm sanity-dataset-import
```

## Running the sanity studio

````

1. Start the sanity server

```bash
pnpm dev
````

2. If everything looks good. You can deploy to production:

```bash
pnpm sanity-studio-deploy
```
