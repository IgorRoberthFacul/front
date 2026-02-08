import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const SKILL_CATEGORIES = [

    {
      title: 'Técnicas de Testes',
      icon: '🛠️',
      skills: [
        {name: 'Análise de Requisitos', level: 'Avançado' },
        { name: 'Análise de Valor Limite', level: 'Avançado' },
        { name: 'Testes Exploratórios', level: 'Avançado' },
        { name: 'Testes E2E', level: 'Avançado'},
        { name: 'BDD', level: 'Avançado'},
        { name: 'Heurísticas de Teste', level: 'Avançado'},
      ]
    },
  
    {
      title: 'Automação Web',
      icon: '🌐',
      skills: [
        { name: 'Selenium WebDriver', level: 'Expert' },
        { name: 'Java', level: 'Expert' },
        { name: 'Python', level: 'Studying' },
        { name: 'Robot Framework', level: 'Studying' },
        { name: 'Page Object Model', level: 'Expert' },
      ]
    },
    {
      title: 'Testes Unitários',
      icon: '⚡',
      skills: [
        { name: 'JUnit', level: 'Expert' },
        { name: 'Playwright', level: 'Studying' },
        { name: 'pytest', level: 'Avançado' },
        { name: 'Mockito', level: 'Intermediário' },
        { name: 'Appium', level: 'Studying' },
      ],
    },
    {
      title: 'Testes de Integração',
      icon: '🔗',
      skills: [
        { name: 'REST Assured', level: 'Expert' },
        { name: 'Postman', level: 'Expert' },
        { name: 'Insomnia', level: 'Intermediário' },
        { name: 'Cucumber', level: 'Avançado' }
      ],
    },
    {
      title: 'Testes Não Funcionais',
      icon: '📊',
      skills: [
        { name: 'JMeter', level: 'Intermediário' },
        { name: 'OWASP ZAP', level: 'Studying' },
        { name: 'Security Testing', level: 'Intermediário' },
      ],
    },
    {
      title: 'CI/CD & DevOps',
      icon: '🚀',
      skills: [
        { name: 'GitHub', level: 'Avançado' },
        { name: 'Docker', level: 'Studying' },
        { name: 'Sonarqube', level: 'Studying'},
        { name: 'Git', level: 'Avançado' },
        { name: 'Maven/Gradle', level: 'Avançado'},
      ],
    },
  ];

export function Skills() {
  const skillCategories = SKILL_CATEGORIES;
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-700';
      case 'Avançado':
        return 'bg-blue-100 text-blue-700';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Habilidades Técnicas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experiência abrangente em automação de testes e garantia de qualidade de software
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
