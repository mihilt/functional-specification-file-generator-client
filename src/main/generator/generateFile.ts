import generateInstaportsFiles from '../generator-sdk/instaports/generator/generate-instaports-files';

const refineExcelData = (args: any) => {
  return args.level3.map((level3Item: any) => {
    level3Item.detail = [];
    args.level4
      .filter((level4Item: any) => level3Item.id === level4Item.level3Id)
      .forEach((level4Item: any) => {
        delete level4Item.level3Id;
        level3Item.detail.push(level4Item);
      });
    return level3Item;
  });
};

export default (event: any, args: any) => {
  const refinedExcelData = refineExcelData(args);
  generateInstaportsFiles({
    resData: refinedExcelData,
    backendPath: args.backendPath,
    frontendPath: args.frontendPath,
  });
  event.reply(
    'generateFile',
    `${args.backendPath}\n${args.frontendPath}\n경로에 각각 백엔드와 프론트엔드 관련한 폴더들과 파일들이 생성이 완료되었습니다.`
  );
};
