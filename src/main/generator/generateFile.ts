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
  generateInstaportsFiles({ resData: refinedExcelData, path: args.path });
  event.reply(
    'generateFile',
    `${args.path}\n경로에 파일 생성이 완료되었습니다.`
  );
};
