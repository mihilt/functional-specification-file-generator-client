import writeFileWithDirectory from '../../feature/write-file-with-directory';

const backendBasicPath = ({ backendPath, id, type }) =>
  `${backendPath}/src/com/htns/g1e/${id
    .substring(0, 3)
    .toLowerCase()}/${type.toLowerCase()}`;

const frontBasicPath = ({ frontendPath, id }) =>
  `${frontendPath}/WebContent/${id
    .substring(0, 3)
    .toLowerCase()}/app/view/${id.toLowerCase()}`;

const getSVCContent = (data) =>
  `//${data.comment}
${data.id}와 관련한 기본코드
${data.detail.map(
  (detailData) =>
    `//${detailData.comment}
${detailData.id}와 관련한 기본코드`
)}`;

export default ({ resData, backendPath, frontendPath }) => {
  resData.forEach((e) => {
    writeFileWithDirectory({
      fileName: `${e.id}SVC.java`,
      path: backendBasicPath({ backendPath, id: e.id, type: 'SVC' }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}DAO.java`,
      path: backendBasicPath({ backendPath, id: e.id, type: 'DAO' }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}SQL.xml`,
      path: backendBasicPath({ backendPath, id: e.id, type: 'SQL' }),
      content: getSVCContent(e),
    });

    writeFileWithDirectory({
      fileName: `${e.id}C.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}M.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}V.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}V01.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}V0102.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
    writeFileWithDirectory({
      fileName: `${e.id}V0102.js`,
      path: frontBasicPath({ frontendPath, id: e.id }),
      content: getSVCContent(e),
    });
  });
};
