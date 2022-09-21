export default (event: any, args: any) => {
  setTimeout(() => {
    console.log(args);
    event.reply('ipc-api', '파일 생성 완료');
  }, 1000);
};
