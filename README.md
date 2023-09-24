### Cloning the repository

```shell
git clone https://github.com/leopico/web3-auth-server.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
PORT=5000
APP_DOMAIN=virtualforest.com
MORALIS_API_KEY= your moralis api key (https://moralis.io/)
REACT_URL=http://127.0.0.1:5173
AUTH_SECRET=[Generate on this link, remember that you have to set up only one time both of development and production state](https://generate-secret.vercel.app/32)
MONGO_CONNECTION=Mongodb connection
```

### Start the app

```shell
npm run start
```
