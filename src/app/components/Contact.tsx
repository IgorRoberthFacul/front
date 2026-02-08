import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export function Contact() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'igorroberthm@gmail.com',
      href: 'mailto:igorroberthm@gmail.com',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: 'LinkedIn',
      value: '/in/igorroberth',
      href: 'https://www.linkedin.com/in/igorroberth/',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      value: '@IgorRoberth',
      href: 'https://github.com/IgorRoberth',
      color: 'from-gray-700 to-gray-900',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Vamos Conversar?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estou sempre aberto a discutir novos projetos, oportunidades ou parcerias em automação de testes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-4`}>
                  {method.icon}
                </div>
                <h3 className="font-semibold mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600">{method.value}</p>
              </Card>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 border-none">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Localização</h3>
            <p className="text-gray-600 mb-4">São Paulo - Brasil</p>
            <p className="text-sm text-gray-500">
              Disponível para trabalho remoto.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
