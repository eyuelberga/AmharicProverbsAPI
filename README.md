<p align="center">
  <a href="https://github.com/eyuelberga/AmharicProverbsAPI">
    <img src="https://github.com/eyuelberga/AmharicProverbsAPI/blob/main/banner.png?raw=true" alt="Amharic Proverbs API logo" width="300" />
  </a>
</p>

Amharic Proverbs API is a REST API for accessing a growing list of Amharic proverbs collected from various sources. You can use the API to fetch random Amharic proverbs and also filter proverbs by word.

Check out the [Swagger API Documentation](https://amharicproverbsapi.eyuelberga.com/api/) for the full list of available endpoints.

## Features

- Get random proverbs
- Filter proverbs by words
- API Key based access to endpoints

## Running Locally

If you want to run this project on your local machine, first make sure to set environment variables in `.env` file at the root of the project folder. You can find all the required variables in the `.env.example` file.

This project also uses `MongoDB` database, so make sure you have that on your local machine also.

### Installation

```bash
$ yarn
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## License

MIT © [Eyuel Berga Woldemichael](https://github.com/eyuelberga)
