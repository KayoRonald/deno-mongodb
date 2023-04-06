export APP_MODULE=${APP_MODULE-app/server.ts}

exec deno run --lock=lock.json --lock-write --allow-all "$APP_MODULE"