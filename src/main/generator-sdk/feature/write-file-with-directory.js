import { mkdir, writeFile } from 'fs';

export default ({ fileName, path, content }) => {
  mkdir(path, { recursive: true }, (err) => {
    if (err) {
      console.log('error occur while make directory');
      console.log(err);
      return;
    }
    writeFile(`${path}/${fileName}`, content, (error) => {
      console.log(
        error
          ? `error occur while create file: ${error}`
          : `create: ${fileName}`
      );
    });
  });
};
