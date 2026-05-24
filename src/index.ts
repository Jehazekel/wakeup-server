import express from 'express';
import Bree from 'bree';
import path from 'path';
import { HOSTED_URLS } from '../core/urls';

const app = express();

const bree = new Bree({
  root: path.join(__dirname, 'jobs'),
  jobs: [
    {
      name: 'fetch-urls',
      interval: '10m',
      worker: {
        workerData: {
          urls: HOSTED_URLS
        }
      }
    }
  ]
});

bree.start();


app.get('/', (req, res) => {
 
  res.status(200).send('Welcome to the Wakeup Server!');
  
});


app.get('/alive-status', (req, res) => {
  res.status(200).send("I'm alive!");
  
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
