import 'dotenv/config';
import { app } from './init-app';
import { runDb } from './db/runDb';
import { settings } from './settings';

export async function startApp() {
  await runDb();

  app.listen(settings.PORT, () => {
    console.log(`Example app listening on port: ${settings.PORT}`);
  });
}

startApp();
