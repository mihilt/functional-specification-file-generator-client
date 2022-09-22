import { mkdir } from 'fs';

/**
 * make directory with path array
 * @param {string[]} pathArray
 */
export default (pathArray) => {
  pathArray.forEach((path) => {
    mkdir(path, { recursive: true }, (error) => {
      if (error) {
        console.log(`error occur while make directory: ${error}`);
        console.log(error);
      }
    });
  });
};
