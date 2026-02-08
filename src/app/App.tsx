import { useRef, useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import Papa from 'papaparse';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills, SKILL_CATEGORIES } from './components/Skills';
import { Experience, ExperienceData } from './components/Experience';
import { Projects, PROJECTS_DATA } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

const SHEET_URL = (import.meta as any).env.VITE_PUBLIC_SHEET_URL || "";

export default function App() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SHEET_URL) return;

    Papa.parse(`${SHEET_URL}&t=${new Date().getTime()}`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data: ExperienceData[] = results.data.map((row: any) => ({
          title: row.title || "",
          worker: row.worker || "",
          period: row.period || "",
          description: (row.description || "").replaceAll('\\n', '\n'),
          responsibilities: row.responsibilities 
            ? row.responsibilities.split('|').map((i: string) => i.trim()) 
            : [],
          achievements: row.achievements 
            ? row.achievements.split('|').map((i: string) => i.trim()) 
            : [],
          location: row.location || ""
        }));

        setExperiences(data);
        setLoading(false);
      }
    });
  }, []);
  
  const downloadCV = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - (margin * 2);

    // Função para gerenciar quebras de página automáticas
    const checkPageBreak = (heightNeeded: number) => {
      if (yPos + heightNeeded >= pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Função otimizada (sem erros do Sonar) para adicionar texto
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string | number = 0) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(color as any); 
      
      const splitText = doc.splitTextToSize(text, contentWidth);
      const lineHeight = fontSize * 0.5; // Ajuste de entrelinha proporcional
      const height = splitText.length * lineHeight;
      
      checkPageBreak(height);
      doc.text(splitText, margin, yPos);
      yPos += height + 2;
    };

    // --- Cabeçalho ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102); // Azul Marinho profissional
    doc.text("IGOR ROBERTH", margin, yPos);
    yPos += 8;
    
    doc.setFontSize(14);
    doc.setTextColor(100); 
    doc.text("QA Automation Engineer", margin, yPos);
    yPos += 6;
    
    doc.setDrawColor(0, 0, 255); 
    doc.line(margin, yPos, pageWidth - margin, yPos); 
    yPos += 10;

    // --- Resumo ---
    addText("RESUMO PROFISSIONAL", 12, true, 0);
    const resumo = `Profissional de Qualidade de Software (QA) com mais de 4 anos de experiência em projetos ágeis usando o framework Scrum. Especialista em automação de testes, análise de requisitos e garantia de qualidade em aplicações complexas.`;
    addText(resumo, 10, false, 50);
    yPos += 5;

    // --- Habilidades (Dinâmico) ---
    addText("HABILIDADES TÉCNICAS", 12, true, 0);
    SKILL_CATEGORIES.forEach(cat => {
        const skillsList = cat.skills.map(s => s.name).join(", ");
        addText(`• ${cat.title}: ${skillsList}`, 10, false, 50);
    });
    yPos += 5;

    // --- Experiências (Dinâmico do CSV) ---
    addText("EXPERIÊNCIA PROFISSIONAL", 12, true, 0);
    experiences.forEach(exp => {
        checkPageBreak(15);
        
        // Título e Período
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(exp.title, margin, yPos);
        
        const dateWidth = doc.getTextWidth(exp.period);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(exp.period, pageWidth - margin - dateWidth, yPos);
        yPos += 5;

        // Empresa e Localização
        doc.setFont("helvetica", "bold");
        doc.setTextColor(80);
        doc.text(`${exp.worker} ${exp.location ? `- ${exp.location}` : ''}`, margin, yPos);
        yPos += 6;

        // Conteúdo
        addText(exp.description, 10, false, 50);

        if (exp.responsibilities?.length > 0) {
            addText("Principais Responsabilidades:", 10, true, 0);
            exp.responsibilities.forEach(resp => addText(`• ${resp}`, 10, false, 60));
        }

        if (exp.achievements?.length > 0) {
            yPos += 1;
            addText("Principais Conquistas:", 10, true, 0);
            exp.achievements.forEach(ach => addText(`• ${ach}`, 10, false, 60));
        }
        yPos += 5; 
    });

    // --- Rodapé ---
    const footerText = `Página 1 | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(footerText, margin, pageHeight - 10);

    // --- Lógica de Download Robusta (Correção para Xiaomi/Samsung Mobile) ---
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Igor_Roberth_QA_CV.pdf');
    document.body.appendChild(link);
    link.click();
    
    // Cleanup de memória
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    toast.success('Currículo PDF gerado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onDownloadCV={downloadCV} />
      <main>
        <Hero />
        <Skills />
        <Experience experiences={experiences} loading={loading} />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}