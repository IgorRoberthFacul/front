import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Code2, TestTube2, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                QA Automation Engineer
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 py-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
             Igor Roberth
            </h1>
            {/* Texto de Introdução com Destaque */}
            <div className="mb-8">
              <p className="text-2xl font-light text-gray-700 mb-4">
                Transformando complexidade em <span className="font-semibold text-blue-600">Qualidade</span> há mais de 4 anos.
              </p>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50/50 rounded-r-lg">
                <p className="text-gray-600 leading-relaxed italic">
                  "Especialista em QA focado em projetos ágeis (Scrum), unindo análise de riscos e técnicas estratégica para garantir que cada entrega seja impecável."
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <Code2 className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Automação</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <TestTube2 className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-600">Testes</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <Zap className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-600">Performance</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Entrar em Contato
              </a>
              <a 
                href="#skills" 
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all"
              >
                Ver Habilidades
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <ImageWithFallback
                  src="/eu.png"
                  alt="Igor Roberth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
