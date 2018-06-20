import {loadFrozenModel} from '@tensorflow/tfjs-converter';
import { loadCSV, preprocessing } from 'jskit-learn';
const model = await tf.loadModel('https://drive.google.com/open?id=1Bb8faUY3k3tEAvWPX28Yl5N_8kI-lJHg');

console.log("sss");