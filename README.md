# Hub Developer Portal

## running locally

```
npm i -g sails
git clone https://github.com/BroadsoftLabs/hubDeveloperPortal.git
cd hubDeveloperPortal
npm i && bower i
mkdir /Users/<yourUsername>/secure
cd /Users/<yourUsername>/secure

//These are the keys off of our servers sor https
vi server.crt
vi server.key

sudo sails lift
```

## deploying on staging

