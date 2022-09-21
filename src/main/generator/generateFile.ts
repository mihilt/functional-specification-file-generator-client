export default (event: any, args: any) => {
  setTimeout(() => {
    console.log(args);
    event.reply('generateFile', '파일 생성 완료');
  }, 1000);
};
