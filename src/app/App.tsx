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

    const checkPageBreak = (heightNeeded: number) => {
      if (yPos + heightNeeded >= pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
    };

    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string | number = 0) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        if (typeof color === 'string') {
            doc.setTextColor(color);
        } else {
            doc.setTextColor(color);
        }
        
        const splitText = doc.splitTextToSize(text, contentWidth);
        const height = splitText.length * (fontSize / 2.5); // Approximation
        
        checkPageBreak(height);
        doc.text(splitText, margin, yPos);
        yPos += height + 2;
    };

    // --- Cabeçalho do PDF ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("IGOR ROBERTH", margin, yPos);
    yPos += 8;
    
    doc.setFontSize(14);
    doc.setTextColor(100); // Cinza
    doc.text("QA Automation Engineer", margin, yPos);
    yPos += 6;
    
    doc.setDrawColor(0, 0, 255); // Linha azul
    doc.line(margin, yPos, pageWidth - margin, yPos); 
    yPos += 10;

    // --- Seção: Resumo ---
    addText("RESUMO PROFISSIONAL", 12, true, 0);
    const resumo = `Profissional de Qualidade de Software (QA) com mais de 4 anos de experiência em projetos ágeis usando o framework Scrum. Tenho habilidades em analisar requisitos, identificar riscos e criar casos de uso, aplicando técnicas de testes ao longo do desenvolvimento para garantir entregas de alta qualidade.`;
    addText(resumo, 10, false, 0);
    yPos += 5;

    // --- Seção: Habilidades ---
    addText("HABILIDADES TÉCNICAS", 12, true, 0);
    
    SKILL_CATEGORIES.forEach(cat => {
        const skillsList = cat.skills.map(s => s.name).join(", ");
        const line = `• ${cat.title}: ${skillsList}`;
        addText(line, 10, false, 0);
    });
    yPos += 5;

    // --- Seção: Experiência ---
    addText("EXPERIÊNCIA PROFISSIONAL", 12, true, 0);
    
    experiences.forEach(exp => {
        checkPageBreak(20); // Minimal space for title
        
        // Title and Company
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(exp.title, margin, yPos);
        
        const dateText = exp.period;
        const dateWidth = doc.getTextWidth(dateText);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(dateText, pageWidth - margin - dateWidth, yPos);
        yPos += 5;

        doc.setFont("helvetica", "bold");
        doc.setTextColor(80);
        doc.text(`${exp.worker} ${exp.location ? `- ${exp.location}` : ''}`, margin, yPos);
        yPos += 6;

        // Description
        if (exp.description) {
            addText(exp.description, 10, false, 50);
        }

        // Responsibilities
        if (exp.responsibilities && exp.responsibilities.length > 0) {
            yPos += 2;
            addText("Principais Responsabilidades:", 10, true, 0);
            exp.responsibilities.forEach(resp => {
                addText(`• ${resp}`, 10, false, 50);
            });
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
            yPos += 2;
            addText("Principais Conquistas:", 10, true, 0);
            exp.achievements.forEach(ach => {
                addText(`• ${ach}`, 10, false, 50);
            });
        }
        
        yPos += 5; 
    });

    // Rodapé
    const footerText = `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(footerText, margin, pageHeight - 10);

    // Comando final para baixar
    doc.save("Igor_Roberth_CV.pdf");
    
    toast.success('Currículo PDF gerado com sucesso!', {
      description: 'O arquivo foi salvo na sua pasta de downloads.',
    });
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
