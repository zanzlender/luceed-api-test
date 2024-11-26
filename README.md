# luceed-api-test

This app is divided into web and proxy, because Luceed does not have CORS enabled on their API for development purposes...

To run the app you will have to run both at the same time:

1. In one terminal go to `./web`, run `(p)npm install` then `(p)npm run dev`
2. In another terminal go to `./proxy`, run `(p)npm install` then `(p)npm run dev` (make sure PORT 3001 is available)
3. Start using app at [http://localhost:5173](http://localhost:5173)
