# BRIK-STOREFRONT

## RUN INSTRUCTION

### API

installing dependencies

```bash
cd api
yarn install
# or
npm install
```

set the environtment variable

```bash
cp .env.example .env
```

then change the value according to the example guide

initializing the database

```bash
npx prisma db push
```

populate db with seed data

```bash
npx prisma db seed
```

after all the step above success you can run the api server with command `yarn dev` for development or `yarn build` then `yarn start` for production.
then open `http://localhost:5001`

### CLIENT/STOREFRONT

installing dependencies

```bash
cd api
yarn install
# or
npm install
```

set the environtment variable

```bash
cp .env.example .env
```

then change the value according to the example guide, for `API_URL` use the value of the current running api server

after all the step above success you can run the api server with command `yarn dev` for development or `yarn build` then `yarn start` for production.
then open `http://localhost:5001`

## TODO

### API

- [x] product api
  - [x] product list api
  - [x] paginate product list
  - [x] product filter api
  - [x] product search api
  - [x] product detail api
  - [x] create product api
  - [x] edit product api
- [x] product-category api
  - [x] get all product-category api
- [ ] auth api

### CLIENT

- [x] layout and styling
  - [x] setup tailwindcss custom rules
  - [x] navbar
  - [x] footer
  - [x] base layout
- [x] landing page
  - [x] display main prpduct on landing page
  - [x] display carrousel on lanidng page
- [ ] product list page
  - [x] product list
  - [x] product filter
  - [ ] product pagination
  - [x] product search
- [x] product detail page
- [ ] admin page
  - [ ] delete product
  - [ ] edit product
  - [ ] add product
  - [ ] display product as data table
