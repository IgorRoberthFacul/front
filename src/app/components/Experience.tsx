import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, MapPin, Info, Award } from 'lucide-react'; 

export interface ExperienceData {
  title: string;
  worker: string;
  period: string;
  description: string;
  responsibilities: string[]; 
  achievements: string[];    
  location?: string;
}

interface ExperienceProps {
  experiences: ExperienceData[];
  loading?: boolean;
}

export function Experience({ experiences, loading = false }: ExperienceProps) {
  if (loading) return <div className="text-center py-20 text-gray-500">A carregar...</div>;

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Experiência Profissional</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                
                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-lg text-gray-600 font-medium">{exp.worker}</p>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-4 py-1 rounded-full self-start">
                    {exp.period}
                  </span>
                </div>

                {/* Sobre */}
                <div className="mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <h4 className="text-[15px] font-bold uppercase tracking-widest text-blue-600">Sobre o Projeto</h4>
                  </div>
                  <p className="text-[20px] text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>

               {/* Responsabilidades */}
               {exp.responsibilities.length > 0 && (
                <div className="mb-0"> {/* Reduzido para mb-0 */}
               <h4 className="text-[15px] font-bold uppercase tracking-widest text-blue-600 mb-2">
                   Principais Responsabilidades
                </h4>
              <div className="space-y-1"> {/* Reduzido de 3 para 1 para aproximar os itens da lista */}
            {exp.responsibilities.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
          <span className="text-gray-700 text-[20px] leading-tight">{item}</span>
        </div>
      ))}
    </div>
  </div>
)}

{/* Seção 2: Conquistas */}
{exp.achievements.length > 0 && (
  <div className="mt-0 pt-0 border-t border-gray-100/50"> {/* mt-0 e pt-0 para encostar na seção de cima */}
    <div className="flex items-center gap-2 mb-2">
      <Award className="w-4 h-4 text-amber-500" />
      <h4 className="text-[15px] font-bold uppercase tracking-widest text-blue-600">
        Principais Conquistas
      </h4>
    </div>
    <div className="space-y-1"> {/* space-y-1 para comprimir a lista */}
      {exp.achievements.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
          <span className="text-gray-700 text-[20px] leading-tight">{item}</span>
        </div>
      ))}
    </div>
  </div>
)}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
