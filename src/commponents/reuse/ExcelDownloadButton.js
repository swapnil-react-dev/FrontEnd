import React from 'react';
import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = ({ data, fields, labels, filename }) => {
  const downloadExcel = () => {
    const formattedData = data.map((item) => {
      const rowData = {};
      fields.forEach((field, index) => {
        const fieldParts = field.split(' (');
        if (fieldParts.length > 1) {
          const mainField = fieldParts[0];
          const subField = fieldParts[1].substring(0, fieldParts[1].length - 1);
          rowData[labels[index]] = `${item[mainField]} (${item[subField]})`;
        } else {
          rowData[labels[index]] = item[field];
        }
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  return (
    <Tooltip title="Download Excel File" >
      <Box className="excelIconBox" onClick={downloadExcel}>
        <Icon icon="vscode-icons:file-type-excel2" width="28" height="28" style={{ padding: '2px' }} />
      </Box>
    </Tooltip>
  );
};

export default ExcelDownloadButton;
