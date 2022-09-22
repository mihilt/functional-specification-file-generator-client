import writeFileWithDirectory from '../../feature/write-file-with-directory';

export default ({ resData, path }) => {
  resData.forEach((e) => {
    writeFileWithDirectory({
      fileName: `${e.id}.js`,
      path: `${path}/instaports`,
      content: e.id,
    });
  });
};

const makeInitialDirectory = () => {};

const makeDirectory = () => {};

const makefile = () => {};
