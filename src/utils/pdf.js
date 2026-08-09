import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createElement } from "react";

export async function exportToPDF(element) {
    if (!element) {
        return;
    }

    const pdf_btn = element.querySelector(".pdf_btn");
    const theme = element.querySelector(".theme");

    // PDF olishdan oldin yashirish
    if (pdf_btn && theme) {
        pdf_btn.style.display = "none";
        theme.style.display = "none";
    }
    const btns = element.querySelector('.btns')
    const el = document.createElement("div");
    let today = new Date();

    el.innerHTML = `
  <p>Yuklangan: ${today.toLocaleDateString()}
   </p >
        `;

    btns.appendChild(el);
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
    });

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imageWidth = pageWidth;
    const imageHeight =
        (canvas.height * imageWidth) / canvas.width;

    let heightLeft = imageHeight;
    let position = 0;

    pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        imageWidth,
        imageHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imageHeight;

        pdf.addPage();

        pdf.addImage(
            imageData,
            "PNG",
            0,
            position,
            imageWidth,
            imageHeight
        );

        heightLeft -= pageHeight;
    }

    pdf.save("uzbekistan-population-1991-2026.pdf");
}