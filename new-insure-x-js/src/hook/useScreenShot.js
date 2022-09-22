const downloadPng = useCallback(() => {
  if (document.getElementById("pdf_modal") === null) {
    return;
  }
  toPng(document.getElementById("pdf_modal"), {
    cacheBust: true,
    width: document.getElementById("pdf_modal").offsetWidth,
    height: 1080,
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}, [pdfExportComponent]);
