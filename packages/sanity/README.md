## Migrating contentful to sanity

1. Run the migration

```bash
pnpm contentful-to-sanity -s <space-id> -t <management-token> -a <access-token> .
```

2. Fix the schema: There may be errors relating to `Contentful{Type}Type fields`. You have to change them to `contentful_{type}Type`: `ContentfulTextType` -> `contentful_textType`;

3. Remove Tables from the data:

```bash
pnpm remove-tables
```

4. Generate the dataset

```bash
pnpm contentful-to-sanity dataset .
```

5. Run the data migration

```bash
pnpm sanity dataset import ./dataset.ndjson

## Running the sanity studio
```

1. Start the sanity server

```bash
pnpm dev
```

2. If everything looks good. You can deploy to production:

```bash
pnpm deploy
```
