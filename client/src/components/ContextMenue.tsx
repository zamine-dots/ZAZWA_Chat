import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default function ContextMenu({ onContextLoaded }) {
  const handleTxtUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onContextLoaded(reader.result);
    };
    reader.readAsText(file);
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let pdfText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pdfText += content.items.map((item) => item.str).join(" ") + "\n";
      }

      onContextLoaded(pdfText);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Popover>
      <PopoverTrigger className="px-3 py-2 bg-gray-200 rounded">
        Context
      </PopoverTrigger>

      <PopoverContent className="flex flex-col space-y-3 p-4 w-40">
        <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer text-center">
          TXT
          <input
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleTxtUpload}
          />
        </label>

        <label className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer text-center">
          PDF
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfUpload}
          />
        </label>
      </PopoverContent>
    </Popover>
  );
}
