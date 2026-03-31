import { parentPort, workerData } from 'worker_threads';
import axios from 'axios';

const fetchUrls = async () => {
  for (const url of workerData.urls) {
    try {
      await axios.get(url);
      console.log(`Successfully fetched ${url}`);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }
  if (parentPort) {
    parentPort.postMessage('done');
  }
};

fetchUrls();
