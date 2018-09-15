# start

```
npm run dev
```



# local datastore

```
docker run -h gdatastore -p 8000:8000 google/cloud-sdk gcloud beta emulators datastore start --project=my-datastore-emulator --host-port gdatastore:8000 --no-store-on-disk
```