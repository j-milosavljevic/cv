function downloadFullCV() {
  window.scrollTo({ top: 0 });
  AmagiLoader.show();
  setTimeout(() => {
    AmagiLoader.hide();
  }, 500);

  html2canvas($(".container"), {
    useCORS: true,
    pagesplit: true,

    onrendered: function (canvas) {
      console.log(canvas);
      var doc = new jsPDF("p", "mm");
      var imgData = canvas.toDataURL();

      var imgHeight =
        (document.getElementById("container").getBoundingClientRect().height *
          25.4) /
        96; //px to mm
      var pageCount = Math.ceil(imgHeight / 297);

      doc.addPage("l", "mm", "a4");
      doc.addImage(imgData, "PNG", 2, 0);

      if (pageCount >= 0) {
        var j = 1;
        while (j != pageCount) {
          doc.addPage("l", "mm", "a4");
          doc.addImage(imgData, "PNG", 2, -(j * 297));
          j++;
        }
      }

      doc.deletePage(1);

      doc.save("jovana_milosavljevic_cv.pdf");
    },
  });
}
