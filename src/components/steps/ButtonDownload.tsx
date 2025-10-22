import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ButtonDownload() {
  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById("results-container");

      if (!element) {
        alert("Erro: container de resultados não encontrado (id='results-container').");
        return;
      }

      console.log("📸 Gerando imagem com html2canvas...");
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("comparativo-volvo.pdf");
      console.log("✅ PDF gerado com sucesso.");
    } catch (error) {
      console.error("❌ Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Veja o console para mais detalhes.");
    }
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      size="lg"
      variant="default"
      className="h-16 px-12 text-xl bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
    >
      <Download className="h-6 w-6" />
      Baixar PDF
    </Button>
  );
}
