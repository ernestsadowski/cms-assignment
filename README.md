#### 1. Set environment variables

Configure your Environment Variables

```ini
NEXT_PUBLIC_BASE_URL="" # http://localhost:3000

NEXT_PUBLIC_SANITY_PROJECT_ID="" # your sanity project id
NEXT_PUBLIC_SANITY_DATASET="production" # your sanity project dataset
SANITY_API_READ_TOKEN="" # "Viewer" token from https://sanity.io/manage
```

### 2. Start local server

Run the following command to start the development server:

```sh
pnpm install
```

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/admin

```sh
pnpm dev
```

### 3. Add content

In your new Sanity Studio, publish the **required** `site` and `page` documents. (create new documents and fill initial values)

| Document | Slug    | Use             | Required? | Notes |
| -------- | ------- | --------------- | :-------: | ----- |
| `site`   |         | Global settings |    ✅     |       |
| `page`   | `index` | Homepage        |    ✅     |       |
| `page`   | `404`   | Page not found  |           |       |

### 4. Task

I want you to implement this [Component](https://www.relume.io/components/layout-55) component in CMS & NextJS.
I want you to implement a new module schema in CMS.
I need this module to be available on the list of modules that we can use to build pages.
I need this module to be responsive and work on mobile too.

I want to be able to build page and use this module as a part of my page.
