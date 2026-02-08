import { motion } from 'motion/react';
import { Card } from './ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';

export const PROJECTS_DATA = [
  {
    title: 'Framework de Testes Unitários',
    description: 'Framework completo de automação de testes unitário usando RestAssured, Java, e Page Object Model em uma aplicação local.',
    technologies: ['Java', 'Selenium', 'JUnit', 'Maven'],
    github: 'https://github.com/IgorRoberth/cadastrorest/tree/RestAtualizado'
  }
];

export function Projects() {
  const projects = PROJECTS_DATA;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Projetos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Portfólio de projetos em automação de testes e frameworks desenvolvidos
          </p>
          <a
            href="https://github.com/IgorRoberth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Github className="w-5 h-5" />
            Ver todos no GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold flex-1">{project.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500">
                 </div>
                </div>
                
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Github className="w-4 h-4" />
                  Ver no GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
