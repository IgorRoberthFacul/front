import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onDownloadCV: () => void;
}

export function Header({ onDownloadCV }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg hidden sm:block">Quality Assurance</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href="https://github.com/IgorRoberth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/igorroberth/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <Button 
            onClick={onDownloadCV} 
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Download CV</span>
            <span className="sm:hidden">CV</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
