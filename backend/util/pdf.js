const valuePositions = {
  startDate: { x: 200, y: 300 },
};

const UtilPdf = {
  editPdf: (page, values) => {
    values.map((value) => {
      page.drawText(value, {
        x: valuePositions[value].x,
        y: valuePositions[value].y,
        size: 14,
      });
    });
  },
};

module.exports = UtilPdf;
