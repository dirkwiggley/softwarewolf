# About this project
Awhile back I experimented with WordPress to see what that was like and to build out a hobby website. I did build it out, https://softwarewolf.org/, but WordPress turned out to be awful and WordPress security issues are so bad I would encourage everyone to avoid it. Anyway, after that experiment failed I started to work on a new website with my own client and server. When I have enough of this built out I'll replace the the crappy WordPress site with this.

# A few notes
My hosting service would make me pay extra to use Docker and PgSQL so I'm going cheap and using MariaDB with Prisma for the DB. Since Prisma _should_ allow you to connect to the db of your choice I thought it would be OK to use.

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
npm dlx turbo build
npm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
npm exec turbo build --filter=docs
npm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
npm exec turbo dev
npm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
npm exec turbo dev --filter=web
npm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
npm exec turbo login
npm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
npm exec turbo link
npm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)


## Image sizing in ImageWrapCard
The image size is controlled separately for desktop and mobile layouts.
- Desktop image sizing
The desktop image classes are created here:
  const desktopImgClasses = `${maxImageWidth} h-auto rounded-lg object-cover ${getDesktopAlignmentClasses()}`;

The maxImageWidth property is defined here:
  `maxImageWidth?: string;`
It has a default value of:
  `maxImageWidth = 'w-40'`

- The Tailwind class w-40 sets the image width to 10rem, which is typically 160 pixels.
- The h-auto class automatically calculates the image height based on its aspect ratio.
The desktop image uses these classes here:
  `className={desktopImgClasses}`
The desktop image width can be changed when using the component. For example:
  In this example, w-56 determines the desktop image width instead of the default w-40.
Note that the property maxImageWidth is optional so it can be overridden as desired. Some sample values:
maxImageWidth="w-32"       // 8rem, typically 128px
maxImageWidth="w-48"       // 12rem, typically 192px
maxImageWidth="w-64"       // 16rem, typically 256px
maxImageWidth="w-full"     // 100% width
maxImageWidth="w-[280px]"  // exactly 280px

- Mobile image sizing
The mobile image uses these classes directly:
  `className="w-full max-w-xs h-auto rounded-lg object-cover self-center"`

The mobile sizing classes mean:
  - `w-full:`
    The image can expand to the full width of its parent container.
  - `max-w-xs:`
    The image cannot become wider than 20rem, which is typically 320 pixels.
  - `h-auto:`
    The image height is calculated automatically to preserve its aspect ratio.
  - `self-center:`
    The image is centered within the flex container.

Summary
Desktop image width:
  Controlled by maxImageWidth, which defaults to w-40, or approximately 160 pixels.

Mobile image width:
  Controlled by w-full max-w-xs. The image can fill the available width but is limited to approximately 320 pixels.

Image height:
  Controlled by h-auto on both desktop and mobile.