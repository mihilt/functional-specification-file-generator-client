import { writeFile } from 'fs';

export default ({ fileName, path, content }) => {
  writeFile(`${path}/${fileName}`, content, (error) => {
    console.log(
      error ? `error occur while create file: ${error}` : `create: ${fileName}`
    );
  });
};
