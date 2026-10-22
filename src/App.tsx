import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animate } from 'animejs';
import {
  BookOpen,
  Clock,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  FileText,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Smartphone,
  HeartHandshake,
  School,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { UnderlineMarker } from './components/UnderlineMarker';
import { Sticker } from './components/Sticker';
import { triggerSchoolCelebration } from './components/CelebrationStars';

/* Student record definition for the interactive simulator */
interface StudentAttendance {
  id: number;
  name: string;
  status: 'presente' | 'falta' | 'atraso';
  note?: string;
}

export default function App() {
  /* Theme state: persistent in localStorage and syncs with html.dark class */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cognous_theme') === 'dark';
    }
    return false;
  });

  /* Mobile menu open state */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Demo modal dialog state */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Modal form states complying with R-27 (idle, loading, success, error) */
  const [formData, setFormData] = useState({
    nome: '',
    cargo: 'Diretor(a) Pedagógico(a)',
    escola: '',
    cidade: '',
    alunos: '100 a 250 alunos',
    email: '',
    telefone: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  /* Multi-role workbench active tab */
  const [activeRoleTab, setActiveRoleTab] = useState<'gestao' | 'rh' | 'professores' | 'familias'>('gestao');

  /* Predictive Intelligence workbench active tab */
  const [activePredictTab, setActivePredictTab] = useState<'evasao' | 'caixa' | 'turmas'>('evasao');

  /* School simulator states */
  const [selectedTurma, setSelectedTurma] = useState<'1ano' | '3ano' | '5ano'>('1ano');
  const [students, setStudents] = useState<StudentAttendance[]>([
    { id: 1, name: 'Arthur Gabriel Medeiros', status: 'presente' },
    { id: 2, name: 'Beatriz Vasconcelos Lima', status: 'presente' },
    { id: 3, name: 'Clara Silveira Ramos', status: 'falta', note: 'Mãe avisou consulta médica' },
    { id: 4, name: 'Davi Lucas Albuquerque', status: 'presente' },
    { id: 5, name: 'Eduardo Fontes Rocha', status: 'atraso', note: 'Chegou às 07:45' },
    { id: 6, name: 'Fernanda Nogueira Costa', status: 'presente' },
    { id: 7, name: 'Gustavo Henrique Prado', status: 'presente' },
    { id: 8, name: 'Helena Martins Duarte', status: 'presente' },
  ]);
  const [attendanceSavedMessage, setAttendanceSavedMessage] = useState('');

  /* Interactive Calculator state */
  const [numAlunos, setNumAlunos] = useState<number>(180);

  /* FAQ active accordion state */
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  /* Refs for animation timelines */
  const heroRef = useRef<HTMLElement>(null);

  /* GSAP entrance animation for Hero section */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.from('.hero-badge-elem', { y: -16, opacity: 0, duration: 0.6 })
        .from('.hero-title-elem', { y: 24, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-desc-elem', { y: 16, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-cta-elem', { scale: 0.95, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
        .from('.hero-sticker-elem', {
          scale: 0,
          rotation: (i) => (i % 2 === 0 ? -15 : 15),
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.8)',
        }, '-=0.3')
        .from('.hero-preview-elem', { y: 25, opacity: 0, duration: 0.7 }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* Anime.js tactile feedback when calculator value changes */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    animate('.calc-metric-box', {
      scale: [1, 1.03, 1],
      duration: 300,
      ease: 'outBack',
    });
  }, [numAlunos]);

  /* Apply theme change to HTML document */
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('cognous_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('cognous_theme', 'light');
    }
  }, [isDarkMode]);

  /* Keyboard listener for closing modal on Escape (R-32) */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) setIsModalOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isMobileMenuOpen]);

  /* Simulator attendance toggle function with playful Anime.js squish */
  const updateStudentStatus = (id: number, newStatus: 'presente' | 'falta' | 'atraso') => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate(`#student-row-${id}`, {
        scale: [1, 0.99, 1.01, 1],
        duration: 220,
        ease: 'outQuad',
      });
    }
  };

  /* Simulator roll-call submit with school celebration stars */
  const handleSaveAttendance = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    triggerSchoolCelebration(rect.left + rect.width / 2, rect.top);

    const faltasCount = students.filter(s => s.status === 'falta').length;
    setAttendanceSavedMessage(
      `Diário consolidado com sucesso! ${faltasCount} responsável(is) notificado(s) automaticamente via aplicativo escolar.`
    );
    setTimeout(() => {
      setAttendanceSavedMessage('');
    }, 6000);
  };

  /* Form submission handler with validation */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage('');

    if (!formData.nome.trim() || !formData.escola.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      setFormStatus('error');
      setFormErrorMessage('Por favor, preencha todos os campos obrigatórios para prosseguir.');
      return;
    }

    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  /* Reset form state to book another session */
  const handleResetForm = () => {
    setFormData({
      nome: '',
      cargo: 'Diretor(a) Pedagógico(a)',
      escola: '',
      cidade: '',
      alunos: '100 a 250 alunos',
      email: '',
      telefone: '',
    });
    setFormStatus('idle');
    setFormErrorMessage('');
  };

  /* Dynamic calculation metrics based on number of students */
  const calcHorasSecretaria = Math.round((numAlunos * 0.11) + 4);
  const calcEconomiaPapel = Math.round(numAlunos * 28.5);
  const calcDiasFechamento = numAlunos > 250 ? '4 dias para 3 horas' : '3 dias para 2 horas';

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Skip to main content for accessibility (R-32) */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B04B1D] focus:text-white focus:rounded-md focus:shadow-md"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Header & Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-main)] bg-[var(--bg-page)]/95 backdrop-blur-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Product Identification */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#B04B1D] rounded-lg p-1 shrink-0"
            aria-label="COGNOUS - Início"
          >
            <div className="w-10 h-10 rounded-lg bg-[#14241B] dark:bg-[#1E2E25] flex items-center justify-center border border-[var(--border-strong)] shadow-sm shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M18 20C18 18.8954 18.8954 18 20 18H30C31.1046 18 32 18.8954 32 20V44C32 45.1046 31.1046 46 30 46H20C18.8954 46 18 45.1046 18 44V20Z" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round"/>
                <path d="M32 20C32 18.8954 32.8954 18 34 18H44C45.1046 18 46 18.8954 46 20V44C46 45.1046 45.1046 46 44 46H34C32.8954 46 32 45.1046 32 44V20Z" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="32" cy="45" r="3.5" fill="#B04B1D"/>
              </svg>
            </div>
            <span className="font-editorial text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              COGNOUS
            </span>
          </a>

          {/* Desktop Navigation Links with generous spacing and zero wrapping */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-4" aria-label="Navegação principal">
            <a
              href="#papeis"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              Papéis
            </a>
            <a
              href="#inteligencia"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              IA Preditiva
            </a>
            <a
              href="#simulador"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              Simulador
            </a>
            <a
              href="#calculadora"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              Economia
            </a>
            <a
              href="#conformidade"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              Conformidade
            </a>
            <a
              href="#duvidas"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#B04B1D] transition-colors py-2 whitespace-nowrap"
            >
              Dúvidas
            </a>
          </nav>

          {/* Right Action: Theme Toggle & Primary CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
              aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
              title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#B04B1D] hover:bg-[#963C14] text-white font-medium text-sm transition-colors shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B04B1D] whitespace-nowrap"
            >
              Agendar Demonstração
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
              aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-[var(--border-main)] bg-[var(--bg-surface)] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3" aria-label="Menu móvel">
              <a
                href="#papeis"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                Visão por Papéis
              </a>
              <a
                href="#inteligencia"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                Inteligência Preditiva
              </a>
              <a
                href="#simulador"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                Simulador da Escola
              </a>
              <a
                href="#calculadora"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                Economia Operacional
              </a>
              <a
                href="#conformidade"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                BNCC & LGPD
              </a>
              <a
                href="#duvidas"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
              >
                Dúvidas Frequentes
              </a>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-[#B04B1D] text-white font-medium text-center shadow"
                >
                  Agendar Demonstração Guiada
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main id="conteudo-principal">
        {/* HERO SECTION: Editorial, human, authentic and grounded with playful school stickers & animations */}
        <section ref={heroRef} className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[var(--border-main)] overflow-hidden notebook-ruled-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Authentic Value Proposition */}
              <div className="lg:col-span-7 flex flex-col items-start relative z-10">
                {/* Institutional Descriptor + Fun Star Sticker */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="hero-badge-elem inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-semibold tracking-wider uppercase border border-amber-200 dark:border-amber-800/60 shadow-xs">
                    <School className="w-4 h-4 text-[#B04B1D]" />
                    <span>Ensino Fundamental I e II</span>
                  </div>

                  <Sticker
                    type="star"
                    label="Nota 10 no MEC"
                    sublabel="Padrão BNCC"
                    colorTheme="yellow"
                    rotation={-3}
                    className="hero-sticker-elem hidden sm:inline-flex"
                  />
                </div>

                <h1 className="hero-title-elem font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.16] tracking-tight text-[var(--text-primary)] mb-6">
                  A calma que a sua escola precisa para focar no essencial:{' '}
                  <UnderlineMarker color="#F59E0B" variant="squiggle">
                    educar
                  </UnderlineMarker>.
                </h1>

                <p className="hero-desc-elem text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
                  Desenhado exclusivamente para colégios de 50 a 500 alunos. Integre secretaria, ponto docente por hora/aula, chamada de sala e mensalidades sem a complexidade de ERPs corporativos nem a desordem de{' '}
                  <UnderlineMarker color="#38BDF8" variant="sweep">
                    planilhas paralelas
                  </UnderlineMarker>.
                </p>

                {/* Primary & Secondary Call to Actions + Playful Stickers */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hero-cta-elem px-7 py-3.5 rounded-xl bg-[#B04B1D] hover:bg-[#963C14] text-white font-medium text-base transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B04B1D] text-center"
                  >
                    Agendar Demonstração Guiada
                  </button>

                  <a
                    href="#simulador"
                    className="hero-cta-elem px-7 py-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium text-base transition-colors text-center focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                  >
                    Testar Simulador de Sala
                  </a>

                  <Sticker
                    type="pencil"
                    label="1º ao 9º Ano"
                    sublabel="Rotina Viva"
                    colorTheme="blue"
                    rotation={4}
                    className="hero-sticker-elem hidden md:inline-flex"
                  />
                </div>

                {/* Grounded micro-guarantees with colorful touches */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-main)] w-full text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Treinamento para professores de todas as idades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Adequado à BNCC e LGPD Escolar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Migração assistida de fichas e cadastros</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Architectural Preview with Teacher Sticker Accent */}
              <div className="lg:col-span-5 hero-preview-elem relative">
                {/* Floating Apple Sticker on Diary */}
                <div className="absolute -top-4 -right-2 z-20">
                  <Sticker
                    type="apple"
                    label="Professores Felizes"
                    sublabel="Chamada em 40s"
                    colorTheme="coral"
                    rotation={-6}
                    className="hero-sticker-elem shadow-lg"
                  />
                </div>

                <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl shadow-xl overflow-hidden p-6 relative">
                  {/* Ledger Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-main)]">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] block">
                        Diário Oficial de Bordo
                      </span>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Colégio São Bernardo do Campo
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Ano Letivo Ativo
                    </span>
                  </div>

                  <div className="space-y-3.5 text-sm">
                    <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-main)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 flex items-center justify-center font-semibold text-xs">
                          5ºB
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">Chamada da Manhã</p>
                          <p className="text-xs text-[var(--text-muted)]">24 presentes, 1 ausência comunicada</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                        07:35
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-main)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 flex items-center justify-center font-semibold text-xs">
                          RH
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">Substituição Docente</p>
                          <p className="text-xs text-[var(--text-muted)]">Profª Mariana cobre 3ª aula de História</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-[var(--border-main)] text-[var(--text-primary)]">
                        Validado
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-main)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 flex items-center justify-center font-semibold text-xs">
                          R$
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">Baixa de Mensalidade</p>
                          <p className="text-xs text-[var(--text-muted)]">Recebimento via Pix identificado automaticamente</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                        R$ 980,00
                      </span>
                    </div>
                  </div>

                  {/* Micro note on the card */}
                  <div className="mt-5 pt-3 border-t border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Secretaria integrada em tempo real</span>
                    <span className="font-mono">v3.4 Escola</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: MULTI-ROLE WORKBENCH (`#papeis`) */}
        <section id="papeis" className="py-20 border-b border-[var(--border-main)] bg-[var(--bg-subtle)]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block mb-2">
                Conexão entre todas as pontas
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                Quatro realidades. Uma única conversa{' '}
                <UnderlineMarker color="#0284C7" variant="squiggle">
                  transparente
                </UnderlineMarker>.
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)]">
                Em uma escola de ensino fundamental, o sucesso do dia letivo depende da perfeita sintonia entre quem administra, quem fecha a folha, quem ensina e a família que confia o filho.
              </p>
            </div>

            {/* Role Tabs with Playful School Accents */}
            <div className="flex flex-wrap gap-2.5 mb-8 border-b border-[var(--border-main)] pb-3" role="tablist" aria-label="Abas de papéis escolares">
              <button
                role="tab"
                aria-selected={activeRoleTab === 'gestao'}
                onClick={() => setActiveRoleTab('gestao')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeRoleTab === 'gestao'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-main)]'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>1. Direção & Mantenedores</span>
              </button>

              <button
                role="tab"
                aria-selected={activeRoleTab === 'rh'}
                onClick={() => setActiveRoleTab('rh')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeRoleTab === 'rh'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-main)]'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>2. Secretaria & RH Docente</span>
              </button>

              <button
                role="tab"
                aria-selected={activeRoleTab === 'professores'}
                onClick={() => setActiveRoleTab('professores')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeRoleTab === 'professores'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-main)]'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>3. Professores & Sala</span>
              </button>

              <button
                role="tab"
                aria-selected={activeRoleTab === 'familias'}
                onClick={() => setActiveRoleTab('familias')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeRoleTab === 'familias'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-main)]'
                }`}
              >
                <HeartHandshake className="w-4 h-4 shrink-0" />
                <span>4. Famílias & Responsáveis</span>
              </button>
            </div>

            {/* Active Tab Showcase Box with Sticky Note Stickers */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              {activeRoleTab === 'gestao' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 flex items-center justify-center shadow-xs border border-amber-200 dark:border-amber-800">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <Sticker type="award" label="Gestão Eficiente" sublabel="Previsibilidade Total" colorTheme="yellow" rotation={2} />
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                      Controle financeiro e acadêmico sem surpresas no fim do mês
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Tenha previsibilidade total sobre a taxa de ocupação das turmas, renovação de matrículas e índice de adimplência. Dispare lembretes cordiais aos pais via WhatsApp com antecedência, evitando atritos desnecessários na secretaria.
                    </p>
                    <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Emissão do Histórico Escolar e Ficha Individual padrão MEC</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Conciliação automática de Pix e boletos bancários</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600" />
                        <span>Relatório de retenção de alunos ano a ano para planejamento pedagógico</span>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-6 bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
                      <span className="font-semibold text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        Painel da Direção Geral
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">Semestre Letivo Atual</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)]">
                        <p className="text-xs text-[var(--text-muted)]">Taxa de Matrículas Ativas</p>
                        <p className="text-xl font-bold text-[var(--text-primary)] font-mono">184 alunos</p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">92% da capacidade total</p>
                      </div>
                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)]">
                        <p className="text-xs text-[var(--text-muted)]">Mensalidades Recebidas</p>
                        <p className="text-xl font-bold text-[var(--text-primary)] font-mono">96,8%</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-1">Prazo médio de recebimento: dia 7</p>
                      </div>
                    </div>
                    <div className="p-3.5 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] text-xs text-[var(--text-secondary)]">
                      <span className="font-semibold block text-[var(--text-primary)] mb-1">
                        Ação preventiva recomendada:
                      </span>
                      Turma do 6º Ano A possui 2 vagas remanescentes. Lista de espera da secretaria tem 4 famílias cadastradas.
                    </div>
                  </div>
                </div>
              )}

              {activeRoleTab === 'rh' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200 flex items-center justify-center shadow-xs border border-sky-200 dark:border-sky-800">
                        <Clock className="w-6 h-6" />
                      </div>
                      <Sticker type="pencil" label="Folha Docente em 3h" sublabel="Zero Horas Extras" colorTheme="blue" rotation={-3} />
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                      Cálculo de hora/aula e escala docente sem noites em claro
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Gerenciar professores contratados por hora/aula, horários de planejamento pedagógico e substituições emergenciais é o maior gargalo das escolas menores. O COGNOUS organiza o quadro de horários e gera a folha com precisão matemática.
                    </p>
                    <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Controle de horas normais, DSR e horas de atividade de planejamento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600" />
                        <span>Banco de substitutos com acionamento com um toque</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Prontuário digital de professores com atestados e licenças organizados</span>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-6 bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
                      <span className="font-semibold text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        Escala do Dia: Quarta-feira
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-medium">
                        14 Professores Ativos
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">Profª Camila Santos (Ciências)</p>
                          <p className="text-[var(--text-muted)]">3 aulas ministradas (6ºA, 7ºB, 8ºA) + 1h Planejamento</p>
                        </div>
                        <span className="font-mono font-medium">4,0 h/a registradas</span>
                      </div>
                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">Prof. Marcelo Rezende (Educação Física)</p>
                          <p className="text-[var(--text-muted)]">Quadra Coberta (1º ao 5º ano)</p>
                        </div>
                        <span className="font-mono font-medium">3,5 h/a registradas</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] italic">
                      DSR e adicional de atividade calculados de acordo com a convenção coletiva docente.
                    </p>
                  </div>
                </div>
              )}

              {activeRoleTab === 'professores' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 flex items-center justify-center shadow-xs border border-emerald-200 dark:border-emerald-800">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <Sticker type="apple" label="Diário Sem Estresse" sublabel="Professores Amam" colorTheme="green" rotation={3} />
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                      Diário de classe tão simples que até professores tradicionais adoram
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Nenhum professor quer perder 20 minutos de aula preenchendo formulários lentos. No COGNOUS, a chamada é feita em 40 segundos e o registro do conteúdo pedagógico respeita a rotina real de sala de aula.
                    </p>
                    <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chamada por toque em celular, tablet ou computador sem travar</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Registro de ocorrências individuais que chega direto à coordenação</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600" />
                        <span>Lançamento de notas por trimestre ou bimestre com fechamento automático</span>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-6 bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
                      <div>
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">Visão do Professor</span>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">3º Ano Fundamental (Sala 04)</p>
                      </div>
                      <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">08:15</span>
                    </div>
                    <div className="p-3.5 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-[var(--text-primary)]">Conteúdo Ministrado:</span>
                        <span className="text-[var(--text-muted)]">Português / Leitura Compartilhada</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Habilidade EF15LP16: Leitura e interpretação de texto poético com rimas infantis. Alunos engajados na recitação.
                      </p>
                    </div>
                    <div className="p-2.5 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 rounded-lg text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Chamada da 1ª aula salva e validada pela secretaria.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeRoleTab === 'familias' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200 flex items-center justify-center shadow-xs border border-purple-200 dark:border-purple-800">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <Sticker type="heart" label="Famílias Conectadas" sublabel="Avisos em 1 Toque" colorTheme="coral" rotation={-2} />
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                      Comunicação cordial que aproxima pais e escola sem sobrecarga
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Famílias bem informadas apoiam a escola. O canal oficial do COGNOUS organiza autorizações de passeio, cardápio do lanche, boletins e 2ª via de mensalidades sem que os professores precisem compartilhar números pessoais de telefone.
                    </p>
                    <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Notificação imediata caso o aluno não compareça à aula</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Acesso ao boletim pedagógico e observações formativas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600" />
                        <span>Privacidade para os professores: sem mensagens fora do horário letivo</span>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-6 bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
                      <span className="font-semibold text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        Portal da Família no Smartphone
                      </span>
                      <Smartphone className="w-4 h-4 text-[var(--text-muted)]" />
                    </div>
                    <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] text-xs space-y-1">
                      <div className="flex justify-between items-center font-semibold text-[var(--text-primary)]">
                        <span>Autorização: Passeio ao Museu Catavento</span>
                        <span className="text-amber-800 dark:text-amber-300 font-normal">Pendente</span>
                      </div>
                      <p className="text-[var(--text-muted)]">Turma do 4º Ano • Saída às 08h30 do colégio</p>
                      <button className="mt-2 text-xs px-3 py-1.5 rounded bg-[#B04B1D] text-white font-medium">
                        Autorizar Participação com 1 Toque
                      </button>
                    </div>
                    <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] text-xs flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Mensalidade Escolar</p>
                        <p className="text-[var(--text-muted)]">Vencimento: 10 deste mês</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 font-mono font-medium">
                        Cód. Pix Disponível
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: PREDICTIVE INTELLIGENCE & DATA ANALYSIS FOR DIRECTORS (`#inteligencia`) */}
        <section id="inteligencia" className="py-20 border-b border-[var(--border-main)] bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-[#B04B1D] text-xs font-semibold tracking-wider uppercase border border-amber-200 dark:border-amber-900/60 shadow-xs">
                  <BarChart3 className="w-4 h-4" />
                  <span>Exclusivo para Mantenedores e Diretores</span>
                </div>
                <Sticker type="sun" label="Visão Clara" sublabel="Projeção 90 dias" colorTheme="amber" rotation={3} />
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl text-[var(--text-primary)] font-normal leading-tight mb-4">
                Chega de dirigir a escola olhando{' '}
                <UnderlineMarker color="#E11D48" variant="double">
                  apenas pelo retrovisor
                </UnderlineMarker>.
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                A maioria das escolas só descobre que um aluno vai sair quando o responsável pede a transferência, ou que haverá falta de caixa no dia em que os boletos vencem. O COGNOUS cruza dados pedagógicos, de assiduidade diária e histórico de pagamentos para projetar cenários futuros com antecedência e embasar decisões estratégicas com serenidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              <div className="p-7 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-main)] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#B04B1D] dark:bg-amber-950 flex items-center justify-center mb-5">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    Radar de Retenção e Alerta Precoce de Evasão
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    Pequenas variações na frequência matinal, atrasos recorrentes às segundas-feiras e notas atípicas são correlacionados para sinalizar o desengajamento familiar com 60 a 90 dias de antecedência.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] font-medium">
                  Impacto: A coordenação pedagógica acolhe a família antes que a decisão de saída se consolide.
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-main)] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 flex items-center justify-center mb-5">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    Projeção Preditiva de Fluxo de Caixa e Inadimplência
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    Nossos modelos analisam a série temporal histórica de pagamentos da escola e identificam padrões de atraso por turma ou sazonalidade anual (como férias e início de ano), projetando a curva de liquidez dos próximos 3 a 6 meses.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] font-medium">
                  Impacto: Ação de cobrança preventiva amigável antes do vencimento, preservando a relação com os pais.
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-main)] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 flex items-center justify-center mb-5">
                    <School className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    Modelagem de Transição de Turmas e Capacidade
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    O sistema projeta com meses de antecedência a taxa de conversão do 5º para o 6º ano (a transição mais vulnerável do Fundamental), calculando quantas vagas remanescentes existirão em cada sala para guiar a captação de novas matrículas.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] font-medium">
                  Impacto: Dimensionamento exato de contratação docente e eliminação de turmas deficitárias.
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--border-main)] gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] block">
                    Demonstração Interativa do Modelo
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[var(--text-primary)]">
                    Como a Inteligência de Dados orienta a sua reunião de diretoria
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Modelos Preditivos">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePredictTab === 'evasao'}
                    onClick={() => setActivePredictTab('evasao')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activePredictTab === 'evasao'
                        ? 'bg-[#14241B] text-white dark:bg-[#FAF7F2] dark:text-[#14241B] shadow-sm'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--border-main)] border border-[var(--border-main)]'
                    }`}
                  >
                    1. Radar de Evasão
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePredictTab === 'caixa'}
                    onClick={() => setActivePredictTab('caixa')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activePredictTab === 'caixa'
                        ? 'bg-[#14241B] text-white dark:bg-[#FAF7F2] dark:text-[#14241B] shadow-sm'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--border-main)] border border-[var(--border-main)]'
                    }`}
                  >
                    2. Curva de Caixa (90 dias)
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePredictTab === 'turmas'}
                    onClick={() => setActivePredictTab('turmas')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activePredictTab === 'turmas'
                        ? 'bg-[#14241B] text-white dark:bg-[#FAF7F2] dark:text-[#14241B] shadow-sm'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--border-main)] border border-[var(--border-main)]'
                    }`}
                  >
                    3. Projeção de Rematrículas
                  </button>
                </div>
              </div>

              {activePredictTab === 'evasao' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-3.5">
                    <p className="text-xs uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                      Alunos com desvio de padrão estatístico detectado nos últimos 30 dias:
                    </p>

                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                          <span className="font-semibold text-sm text-[var(--text-primary)]">Pedro Henrique M. (7º Ano B)</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1 ml-4.5">
                          Sinais identificados: 16% de queda na assiduidade + 2 tarefas de Geografia sem entrega + atraso habitual às sextas.
                        </p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 font-medium self-start sm:self-center shrink-0">
                        Probabilidade de Evasão: 78%
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                          <span className="font-semibold text-sm text-[var(--text-primary)]">Sofia Albuquerque C. (4º Ano A)</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1 ml-4.5">
                          Sinais identificados: Mudança abrupta no padrão de frequência às segundas-feiras nos últimos dois meses.
                        </p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-medium self-start sm:self-center shrink-0">
                        Probabilidade de Evasão: 42%
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                    <span className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider block">
                      Ação Preventiva Sugerida pelo COGNOUS
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Em vez de esperar a família solicitar a transferência ao final do bimestre, o sistema gera uma pauta de conversa individual para a coordenação pedagógica, apontando os pontos exatos de desmotivação ou rotina familiar que precisam de acolhimento.
                    </p>
                    <div className="p-3 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 rounded-lg text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Colégios parceiros revertem até 82% das intenções de desistência com este acolhimento prévio.</span>
                    </div>
                  </div>
                </div>
              )}

              {activePredictTab === 'caixa' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-xs uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                      Projeção de Liquidez e Entrada de Mensalidades (Próximos 90 dias):
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)]">
                        <span className="text-[11px] text-[var(--text-muted)] block">Mês Atual (Em curso)</span>
                        <p className="text-lg font-bold font-mono text-[var(--text-primary)]">R$ 182.400</p>
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">96,4% consolidado</span>
                      </div>
                      <div className="p-3.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)]">
                        <span className="text-[11px] text-[var(--text-muted)] block">Próximo Mês (Projetado)</span>
                        <p className="text-lg font-bold font-mono text-[#B04B1D]">R$ 179.800</p>
                        <span className="text-[11px] text-[var(--text-muted)] font-medium">Desvio est.: ±1,8%</span>
                      </div>
                      <div className="p-3.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)]">
                        <span className="text-[11px] text-[var(--text-muted)] block">Em 60 dias (Projetado)</span>
                        <p className="text-lg font-bold font-mono text-[var(--text-primary)]">R$ 178.100</p>
                        <span className="text-[11px] text-[var(--text-muted)] font-medium">Sazonalidade de férias</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] text-xs text-[var(--text-secondary)] space-y-1.5">
                      <span className="font-semibold text-[var(--text-primary)] block">Diagnóstico de Inteligência Financeira:</span>
                      <p>
                        Identificamos 14 famílias que historicamente realizam o pagamento entre os dias 12 e 15. O sistema programa o envio automático de um lembrete cordial via WhatsApp no dia 8 com a chave Pix copia e cola, reduzindo em 34% os atrasos desse grupo.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                    <span className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider block">
                      Segurança de Caixa para a Mantenedora
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Chega de incerteza sobre se haverá saldo em conta para cobrir a folha de pagamento do dia 5. Com a previsão de liquidez ajustada diariamente pelos recebimentos em tempo real, a mantenedora programa investimentos e reformas com tranquilidade.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs px-4 py-2 rounded-lg bg-[#B04B1D] text-white font-medium hover:bg-[#963C14] transition-colors"
                      >
                        Ver Demonstração do Modelo Financeiro
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activePredictTab === 'turmas' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-3.5">
                    <p className="text-xs uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                      Taxa de Rematrícula e Ocupação de Vagas Projetada (Ano Letivo Seguinte):
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">1º ao 5º Ano (Fundamental I)</p>
                          <p className="text-[var(--text-muted)]">Índice histórico de permanência estável e consolidado</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">94% de retenção</span>
                          <span className="text-[11px] text-[var(--text-muted)] block">6 vagas p/ novos alunos</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">Transição 5º para o 6º Ano (Ponto Crítico)</p>
                          <p className="text-[var(--text-muted)]">3 famílias sinalizaram dúvida na transição de ciclo</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-amber-700 dark:text-amber-300">81% de retenção estimada</span>
                          <span className="text-[11px] text-[var(--text-muted)] block">Ação com pais em Outubro</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-main)] flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">7º ao 9º Ano (Fundamental II)</p>
                          <p className="text-[var(--text-muted)]">Turmas maduras com alta fidelização familiar</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">91% de retenção</span>
                          <span className="text-[11px] text-[var(--text-muted)] block">Capacidade ideal</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                    <span className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider block">
                      Planejamento de Vagas com 4 Meses de Antecedência
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Saber exatamente quais salas terão vagas excedentes permite que a escola concentre seu esforço de captação e visitas pedagógicas onde realmente precisa, sem gastar recursos promovendo turmas que já estão cheias.
                    </p>
                    <div className="p-3 bg-amber-50 text-amber-950 dark:bg-amber-950/60 dark:text-amber-200 rounded-lg text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B04B1D] shrink-0" />
                      <span>Evita contratação excedente de professores e surpresas de quórum mínimo.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: LIVE ELEMENTARY SCHOOL SIMULATOR (`#simulador`) */}
        <section id="simulador" className="py-20 border-b border-[var(--border-main)] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block">
                  Experimente ao Vivo
                </span>
                <Sticker type="pencil" label="Faça o Teste" sublabel="Em 40 segundos" colorTheme="green" rotation={-3} />
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                Simulador Interativo da{' '}
                <UnderlineMarker color="#10B981" variant="squiggle">
                  Rotina Escolar
                </UnderlineMarker>
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)]">
                Veja como um professor registra a frequência da manhã em menos de um minuto. Altere os estados dos estudantes abaixo e sinta a fluidez do COGNOUS.
              </p>
            </div>

            {/* Simulator Interface Container */}
            <div className="max-w-4xl mx-auto bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl shadow-md overflow-hidden relative">
              {/* Simulator Toolbar with playful badges */}
              <div className="p-4 sm:p-6 bg-[var(--bg-subtle)] border-b border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label htmlFor="turma-select" className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Turma:
                  </label>
                  <select
                    id="turma-select"
                    value={selectedTurma}
                    onChange={(e) => setSelectedTurma(e.target.value as '1ano' | '3ano' | '5ano')}
                    className="px-3.5 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                  >
                    <option value="1ano">1º Ano A (Alfabetização • Manhã)</option>
                    <option value="3ano">3º Ano B (Ensino Fundamental I)</option>
                    <option value="5ano">5º Ano C (Transição Fundamental)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Presentes: {students.filter(s => s.status === 'presente').length}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>Faltas: {students.filter(s => s.status === 'falta').length}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Atrasos: {students.filter(s => s.status === 'atraso').length}</span>
                  </div>
                </div>
              </div>

              {/* Students Interactive Roster with playful student icons */}
              <div className="p-4 sm:p-6 divide-y divide-[var(--border-main)]">
                {students.map((student, idx) => {
                  const avatarColors = [
                    'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
                    'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200',
                    'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200',
                    'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
                    'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200',
                    'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200',
                    'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950 dark:text-orange-200',
                    'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200',
                  ];
                  const avatarColor = avatarColors[idx % avatarColors.length];

                  return (
                    <div
                      key={student.id}
                      id={`student-row-${student.id}`}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${avatarColor}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[var(--text-muted)]">#{student.id.toString().padStart(2, '0')}</span>
                            <span className="font-semibold text-sm text-[var(--text-primary)]">{student.name}</span>
                          </div>
                          {student.note && (
                            <p className="text-xs text-[var(--text-muted)] italic mt-0.5 font-handwritten text-amber-700 dark:text-amber-400">
                              Lembrete: {student.note}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Interactive Attendance Status Switcher */}
                      <div className="flex items-center gap-2 ml-11 sm:ml-0" role="group" aria-label={`Frequência de ${student.name}`}>
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.id, 'presente')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            student.status === 'presente'
                              ? 'bg-emerald-600 text-white shadow-sm scale-105'
                              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-emerald-100 dark:hover:bg-emerald-950'
                          }`}
                        >
                          Presente
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.id, 'falta')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            student.status === 'falta'
                              ? 'bg-rose-600 text-white shadow-sm scale-105'
                              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-rose-100 dark:hover:bg-rose-950'
                          }`}
                        >
                          Falta
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.id, 'atraso')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            student.status === 'atraso'
                              ? 'bg-amber-600 text-white shadow-sm scale-105'
                              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-amber-100 dark:hover:bg-amber-950'
                          }`}
                        >
                          Atraso
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div className="p-4 sm:p-6 bg-[var(--bg-subtle)] border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sincronização imediata com o painel escolar e app dos pais.</span>
                </span>

                <button
                  type="button"
                  onClick={handleSaveAttendance}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#B04B1D] hover:bg-[#963C14] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Consolidar Diário do Dia</span>
                </button>
              </div>

              {/* Feedback Alert for Saved Attendance with Joyful Teacher Stamp */}
              {attendanceSavedMessage && (
                <div className="m-4 p-4 rounded-xl bg-emerald-50 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700 text-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in shadow-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-900 dark:text-emerald-200">Parabéns! Chamada finalizada com sucesso.</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">{attendanceSavedMessage}</p>
                    </div>
                  </div>
                  <Sticker type="star" label="Nota 10!" sublabel="Diário Seguro" colorTheme="yellow" rotation={3} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: OPERATIONAL ROI & TIME SAVED CALCULATOR (`#calculadora`) */}
        <section id="calculadora" className="py-20 border-b border-[var(--border-main)] bg-[var(--bg-subtle)]/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Context & Logic */}
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block">
                    Transparência Operacional
                  </span>
                  <Sticker type="backpack" label="Mochila Mais Leve" sublabel="Menos papelada" colorTheme="purple" rotation={2} />
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                  Quanto tempo a sua escola{' '}
                  <UnderlineMarker color="#F59E0B" variant="smile">
                    pode economizar
                  </UnderlineMarker>{' '}
                  todo mês?
                </h2>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  Em colégios de pequeno e médio porte, a secretária costuma somar faltas manualmente no papel, o RH quebra a cabeça conferindo cartões de ponto de professores e o diretor passa o fim de semana cobrando mensalidades.
                </p>
                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-sm text-[var(--text-secondary)] space-y-2">
                  <p className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Como calculamos esta estimativa:
                  </p>
                  <p className="text-xs">
                    Baseado em dados reais de rotina de 45 escolas brasileiras com turmas do 1º ao 9º ano, considerando 22 dias letivos por mês e folha média de 12 a 28 professores.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Range Slider and Calculation Card with Anime.js feedback */}
              <div className="lg:col-span-7">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-8 shadow-sm">
                  {/* Slider Control */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label htmlFor="alunos-slider" className="text-sm font-semibold text-[var(--text-primary)]">
                        Número de Alunos Matriculados:
                      </label>
                      <span className="font-mono text-2xl font-bold text-[#B04B1D] px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-900">
                        {numAlunos} alunos
                      </span>
                    </div>

                    <input
                      id="alunos-slider"
                      type="range"
                      min="60"
                      max="450"
                      step="10"
                      value={numAlunos}
                      onChange={(e) => setNumAlunos(Number(e.target.value))}
                      className="w-full h-3 bg-[var(--border-main)] rounded-lg appearance-none cursor-pointer accent-[#B04B1D]"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1.5 font-mono">
                      <span>60 alunos</span>
                      <span>250 alunos</span>
                      <span>450 alunos</span>
                    </div>
                  </div>

                  {/* Dynamic Results Grid with Anime.js bounce */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="calc-metric-box p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-center transition-transform">
                      <span className="text-xs uppercase font-semibold text-amber-900 dark:text-amber-200 block mb-1">
                        Horas Salvas na Secretaria
                      </span>
                      <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono">
                        ~{calcHorasSecretaria}h
                      </p>
                      <span className="text-xs text-[var(--text-secondary)] mt-1 block">
                        por mês em conferências
                      </span>
                    </div>

                    <div className="calc-metric-box p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-center transition-transform">
                      <span className="text-xs uppercase font-semibold text-sky-900 dark:text-sky-200 block mb-1">
                        Fechamento da Folha Docente
                      </span>
                      <p className="text-lg font-bold text-[var(--text-primary)] mt-1">
                        {calcDiasFechamento}
                      </p>
                      <span className="text-xs text-[var(--text-secondary)] mt-1 block">
                        apuração imediata
                      </span>
                    </div>

                    <div className="calc-metric-box p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center transition-transform">
                      <span className="text-xs uppercase font-semibold text-emerald-900 dark:text-emerald-200 block mb-1">
                        Economia Anual com Papel
                      </span>
                      <p className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                        R$ {calcEconomiaPapel.toLocaleString('pt-BR')}
                      </p>
                      <span className="text-xs text-[var(--text-secondary)] mt-1 block">
                        diários e fichas impressas
                      </span>
                    </div>
                  </div>

                  {/* Direct Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-main)]">
                    <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
                      Quer ver este impacto detalhado para a realidade da sua escola?
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#B04B1D] hover:bg-[#963C14] text-white font-medium text-sm transition-colors text-center"
                    >
                      Solicitar Estudo de Viabilidade
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: PEDAGOGICAL COMPLIANCE & LEGAL SAFETY (`#conformidade`) */}
        <section id="conformidade" className="py-20 border-b border-[var(--border-main)] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="flex justify-center items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block">
                  Segurança Institucional
                </span>
                <Sticker type="stamp" label="100% Homologado" sublabel="Educação Básica" colorTheme="green" rotation={-3} />
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                Em total conformidade com o{' '}
                <UnderlineMarker color="#0284C7" variant="sweep">
                  MEC
                </UnderlineMarker>
                , a{' '}
                <UnderlineMarker color="#10B981" variant="sweep">
                  BNCC
                </UnderlineMarker>{' '}
                e a{' '}
                <UnderlineMarker color="#8B5CF6" variant="sweep">
                  LGPD Escolar
                </UnderlineMarker>
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)]">
                Gerir dados de crianças e adolescentes exige responsabilidade jurídica rigorosa. O COGNOUS foi construído respeitando as normas brasileiras de educação e proteção de menores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-7 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#B04B1D] dark:bg-amber-950 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Alinhamento com a BNCC
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Os planos de aula e os registros de aprendizagem já contam com a árvore oficial de códigos e competências da Base Nacional Comum Curricular para o Ensino Fundamental.
                </p>
              </div>

              <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-7 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  LGPD para Menores de Idade
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Camada estrita de consentimento dos responsáveis para fotos e registros pedagógicos. Dados de saúde e laudos de inclusão protegidos sob custódia de acesso restrito.
                </p>
              </div>

              <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-7 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Exportação para o Censo Escolar
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Gere o arquivo de migração do Educacenso sem precisar digitar os dados de cada aluno duas vezes, economizando dias de trabalho da secretaria em maio e novembro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTEXTUAL SCHOOL EXPERIENCES (Authentic Scenarios) */}
        <section className="py-20 border-b border-[var(--border-main)] bg-[var(--bg-subtle)]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block mb-2">
                Casos da Vida Real
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                A realidade de quem já migrou do papel para o COGNOUS
              </h2>
              <p className="text-base text-[var(--text-secondary)]">
                Relatos de colégios que precisavam de ordem administrativa sem perder o acolhimento caloroso característico de escolas de bairro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case 1 */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#14241B] text-[#FAF7F2] flex items-center justify-center font-editorial font-bold text-lg">
                      V
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">Colégio Veredas</p>
                      <p className="text-xs text-[var(--text-muted)]">Ensino Fundamental I • 160 alunos • Campinas, SP</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic mb-6">
                    "Nossos professores mais experientes lecionam há mais de vinte anos e tinham pavor de sistemas complicados. O COGNOUS foi o primeiro software em que eles conseguiram fazer a chamada na sala sem pedir ajuda aos estagiários. A secretaria agora encerra o expediente no horário normal."
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] flex justify-between">
                  <span>Resultado: 100% de adesão docente em 3 semanas</span>
                  <span>Migração realizada em 2025</span>
                </div>
              </div>

              {/* Case 2 */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#B04B1D] text-white flex items-center justify-center font-editorial font-bold text-lg">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">Escola Solar da Infância</p>
                      <p className="text-xs text-[var(--text-muted)]">Educação Infantil e 1º ao 5º ano • 110 alunos • Curitiba, PR</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic mb-6">
                    "Tínhamos cinco planilhas soltas e sempre havia discrepância entre as aulas dadas pelos professores de inglês e o que o financeiro pagava. Com o controle de carga horária do COGNOUS, a folha de pagamento fecha em três horas no dia primeiro do mês."
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] flex justify-between">
                  <span>Resultado: Eliminação total de divergências de hora/aula</span>
                  <span>Migração realizada em 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: SPECIFIC SCHOOL LEADER FAQ (`#duvidas`) */}
        <section id="duvidas" className="py-20 border-b border-[var(--border-main)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block mb-2">
                Respostas Transparentes
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-4">
                Dúvidas frequentes de quem dirige uma escola
              </h2>
              <p className="text-base text-[var(--text-secondary)]">
                Perguntas reais que diretores pedagógicos e secretários nos fazem antes de tomar uma decisão.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {[
                {
                  pergunta: 'Como funciona a adaptação para professores que nunca usaram diário digital?',
                  resposta: 'Nós sabemos que escolas de bairro têm docentes excelentes que não têm familiaridade com telas. A interface do professor no COGNOUS tem botões grandes, contraste nítido e é livre de termos técnicos. Além disso, oferecemos um treinamento guiado e humanizado por vídeo ou presencialmente, acompanhando as duas primeiras semanas de lançamento.',
                },
                {
                  pergunta: 'O sistema calcula corretamente as variações de hora/aula e a convenção coletiva dos professores?',
                  resposta: 'Sim. Você configura os valores de hora/aula por disciplina ou titulação, adicionando automaticamente o DSR (Descanso Semanal Remunerado) e a hora de atividade pedagógica exigida pela convenção coletiva do seu estado ou município.',
                },
                {
                  pergunta: 'Como transferir as fichas dos alunos que hoje estão em fichários físicos ou no Excel?',
                  resposta: 'Nossa equipe técnica realiza a importação de todos os cadastros existentes. Você só precisa nos enviar as planilhas ou fotos dos livros de matrícula que estruturamos o banco de dados inicial sem custo adicional.',
                },
                {
                  pergunta: 'O COGNOUS emite a documentação oficial para transferência escolar e Censo Escolar?',
                  resposta: 'Sim. Emite a Ficha Individual do Aluno, o Histórico Escolar com chancela para a Secretaria Estadual de Educação e gera o arquivo com layout oficial para carregamento no Educacenso.',
                },
                {
                  pergunta: 'Como garantimos a privacidade de fotos e notas dos alunos perante a LGPD?',
                  resposta: 'Todos os dados de alunos menores de idade são criptografados e armazenados em servidores com custódia segura. Fotos de atividades pedagógicas só são visíveis para os pais do próprio aluno e da turma mediante termo de autorização assinado no ato da matrícula.',
                },
                {
                  pergunta: 'Existe fidelidade contratual ou multa para cancelamento?',
                  resposta: 'Não exigimos fidelidade de longo prazo. Acreditamos que a escola deve continuar com o COGNOUS pela qualidade do serviço. Caso decida sair, você exporta todos os históricos e diários em formato aberto (PDF e Excel) a qualquer momento.',
                },
              ].map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-[var(--border-main)] rounded-xl bg-[var(--bg-surface)] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.pergunta}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#B04B1D]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-main)] pt-3 animate-in fade-in">
                        {faq.resposta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 8: FINAL MANIFESTO & INVITATION */}
        <section className="py-24 bg-[#14241B] text-[#FAF7F2] dark:bg-[#151F19] dark:border-t dark:border-[var(--border-main)] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <Sticker type="heart" label="Feito para Escolas Reais" sublabel="Educação com Carinho" colorTheme="coral" rotation={-3} />
              <Sticker type="sun" label="Mais Tempo para Ensinar" sublabel="Zero Burocracia" colorTheme="yellow" rotation={4} />
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-normal leading-tight mb-6">
              Sua escola merece mais tempo para acolher famílias e{' '}
              <UnderlineMarker color="#F59E0B" variant="squiggle">
                menos tempo preenchendo papéis
              </UnderlineMarker>.
            </h2>
            <p className="text-lg text-[#C3CEC7] max-w-2xl mx-auto mb-10 leading-relaxed">
              Conheça o COGNOUS em uma conversa calma de 25 minutos. Vamos entender o dia a dia do seu colégio e mostrar exatamente como transformar sua rotina pedagógica e administrativa.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-[#B04B1D] hover:bg-[#963C14] text-white font-semibold text-base transition-all shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white inline-flex items-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Agendar Conversa com um Especialista em Gestão Escolar</span>
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER: Institutional, respectful and comprehensive */}
      <footer className="border-t border-[var(--border-main)] bg-[var(--bg-surface)] py-12 text-sm text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <span className="font-editorial text-2xl font-semibold tracking-tight text-[var(--text-primary)] block">
                COGNOUS
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Sistema Integrado de Gestão Escolar para o Ensino Fundamental. Desenvolvido para apoiar mantenedores, secretários e educadores na valorização da rotina pedagógica.
              </p>
            </div>

            {/* Column 2: Direct Navigation */}
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-3">
                Navegação
              </p>
              <ul className="space-y-2 text-xs">
                <li><a href="#papeis" className="hover:text-[#B04B1D] transition-colors">Visão por Papéis</a></li>
                <li><a href="#inteligencia" className="hover:text-[#B04B1D] transition-colors">Inteligência Preditiva</a></li>
                <li><a href="#simulador" className="hover:text-[#B04B1D] transition-colors">Simulador de Sala</a></li>
                <li><a href="#calculadora" className="hover:text-[#B04B1D] transition-colors">Calculadora Operacional</a></li>
                <li><a href="#conformidade" className="hover:text-[#B04B1D] transition-colors">BNCC e Legislação</a></li>
                <li><a href="#duvidas" className="hover:text-[#B04B1D] transition-colors">Dúvidas Frequentes</a></li>
              </ul>
            </div>

            {/* Column 3: Legislation & Privacy */}
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-3">
                Conformidade Legal
              </p>
              <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                <li>Lei 13.709/2018 (LGPD Escolar)</li>
                <li>Diretrizes Curriculares da BNCC</li>
                <li>Layout Padrão Educacenso / INEP</li>
                <li>Guarda Digital de Prontuários</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-3">
                Atendimento
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                Atendimento consultivo e pedagógico de segunda a sexta, das 07h às 19h.
              </p>
              <p className="font-mono text-xs text-[var(--text-primary)] font-medium">
                contato@cognous.com.br
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-2">
            <span>© 2026 COGNOUS Educação & Tecnologia. Todos os direitos reservados.</span>
            <span>Feito com cuidado e precisão para colégios de ensino fundamental.</span>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE GUIDED DEMO MODAL DIALOG (R-26 & R-32 compliant) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
              aria-label="Fechar janela de agendamento"
            >
              <X className="w-5 h-5" />
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[var(--text-primary)]">
                  Solicitação Registrada com Sucesso!
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                  Obrigado, <strong className="text-[var(--text-primary)]">{formData.nome}</strong>. Nossa equipe especializada em gestão de ensino fundamental entrará em contato pelo telefone <strong className="text-[var(--text-primary)]">{formData.telefone}</strong> nas próximas horas para agendar a demonstração da sua escola (<strong className="text-[var(--text-primary)]">{formData.escola}</strong>).
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      handleResetForm();
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#B04B1D] text-white font-medium text-sm hover:bg-[#963C14] transition-colors"
                  >
                    Concluir e Voltar à Página
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B04B1D] block mb-1">
                    Demonstração Personalizada
                  </span>
                  <h3 id="modal-titulo" className="font-editorial text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
                    Agende uma apresentação guiada para sua escola
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    Sem compromisso. Uma demonstração prática focada nas necessidades do Ensino Fundamental.
                  </p>
                </div>

                {formStatus === 'error' && (
                  <div className="mb-4 p-3.5 rounded-lg bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-200 border border-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formErrorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome-input" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                      Seu Nome Completo: <span className="text-[#B04B1D]">*</span>
                    </label>
                    <input
                      id="nome-input"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Maria Alice Ferreira"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cargo-select" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Seu Cargo no Colégio:
                      </label>
                      <select
                        id="cargo-select"
                        value={formData.cargo}
                        onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      >
                        <option value="Diretor(a) Pedagógico(a)">Diretor(a) Pedagógico(a)</option>
                        <option value="Mantenedor(a) / Proprietário(a)">Mantenedor(a) / Proprietário(a)</option>
                        <option value="Coordenador(a) Pedagógico(a)">Coordenador(a) Pedagógico(a)</option>
                        <option value="Secretário(a) Escolar">Secretário(a) Escolar</option>
                        <option value="Gestor(a) de RH / Financeiro">Gestor(a) de RH / Financeiro</option>
                        <option value="Professor(a) Representante">Professor(a) Representante</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="alunos-select" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Número Aproximado de Alunos:
                      </label>
                      <select
                        id="alunos-select"
                        value={formData.alunos}
                        onChange={(e) => setFormData({ ...formData, alunos: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      >
                        <option value="Até 80 alunos">Até 80 alunos</option>
                        <option value="80 a 180 alunos">80 a 180 alunos</option>
                        <option value="180 a 350 alunos">180 a 350 alunos</option>
                        <option value="Mais de 350 alunos">Mais de 350 alunos</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="escola-input" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Nome da Escola: <span className="text-[#B04B1D]">*</span>
                      </label>
                      <input
                        id="escola-input"
                        type="text"
                        required
                        value={formData.escola}
                        onChange={(e) => setFormData({ ...formData, escola: e.target.value })}
                        placeholder="Ex: Colégio Monteiro Lobato"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="cidade-input" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Cidade e Estado:
                      </label>
                      <input
                        id="cidade-input"
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                        placeholder="Ex: Ribeirão Preto, SP"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        E-mail Institucional: <span className="text-[#B04B1D]">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="diretoria@colegio.com.br"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone-input" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Telefone ou WhatsApp: <span className="text-[#B04B1D]">*</span>
                      </label>
                      <input
                        id="telefone-input"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="(11) 98765-4321"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[#B04B1D]"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)] pt-1">
                    Seus dados serão utilizados unicamente para contato sobre a demonstração escolar, em total conformidade com a LGPD.
                  </p>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#B04B1D] hover:bg-[#963C14] text-white font-medium text-sm transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Processando solicitação...</span>
                        </>
                      ) : (
                        <span>Confirmar Agendamento da Demonstração</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
