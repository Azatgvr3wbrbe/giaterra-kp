import React, { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  Layers,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  Wand2,
  Trash2,
} from 'lucide-react'

const FEATURES = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: 'Безопасность по умолчанию',
    description:
      'Локальная обработка в браузере, журнал действий и автоматическое удаление исходных файлов после сессии.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-sky-400" />,
    title: 'Умная анонимизация',
    description:
      'Регулярные выражения и эвристики для ФИО, паспортов, телефонов, e-mail, реквизитов и дат. Настройка словаря замены.',
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: 'Командная работа',
    description:
      'Общий доступ к шаблонам, экспорт обезличенных документов в CRM и контроль версий комментариев.',
  },
]

const WORKFLOW = [
  {
    title: 'Загрузите документ',
    description:
      'Поддерживаем PDF до 15 МБ. Текст извлекается локально в браузере без передачи на сервер.',
    icon: <UploadCloud className="h-5 w-5" />,
  },
  {
    title: 'Проверьте выделения',
    description:
      'Система подсвечивает найденные сущности и показывает статистику по типам данных.',
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    title: 'Экспортируйте результат',
    description:
      'Скачайте обезличенный текст или вставьте его в шаблон документа одним кликом.',
    icon: <Download className="h-5 w-5" />,
  },
]

const FAQ = [
  {
    question: 'Какие данные распознаются сервисом?',
    answer:
      'ФИО, паспортные данные, телефоны, e-mail, реквизиты компаний, номера дел и банковские карты. Дополнительно можно задать пользовательские шаблоны.',
  },
  {
    question: 'Хранятся ли загруженные PDF?',
    answer:
      'Нет. Обработка происходит прямо в вашем браузере. Файл и результаты очищаются при обновлении страницы или по кнопке «Удалить».',
  },
  {
    question: 'Можно ли дообучить модель под отрасль?',
    answer:
      'Да. Через панель администратора добавляются кастомные словари и исключения. Они распространяются на всю команду.',
  },
]

type Stat = {
  label: string
  count: number
}

type AnonymizationResult = {
  text: string
  stats: Stat[]
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/40">
      <BackgroundDecor />
      <Header />
      <main className="relative z-10">
        <Hero />
        <PdfSection />
        <FeatureSection />
        <WorkflowSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const nav = [
    { href: '#upload', label: 'Загрузить PDF' },
    { href: '#features', label: 'Возможности' },
    { href: '#workflow', label: 'Процесс' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacts', label: 'Контакты' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-3 text-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/40">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">LexGuard</div>
            <div className="text-sm text-slate-300">Анонимизация юридических документов</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+79273333329"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
          >
            <Phone className="h-4 w-4" /> Связаться
          </a>
          <a
            href="mailto:lexguard@example.com"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
          >
            Запросить демо <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <Sparkles className="h-4 w-4" /> Сервис для юристов и комплаенс-отделов
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Анонимизируйте юридические документы в браузере и делитесь результатом за минуты
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-300">
            LexGuard помогает защищать персональные данные в договорах, судебных актах и переписке. Загрузка PDF, интеллектуальный поиск сущностей и экспорт готового обезличенного текста.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#upload"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Попробовать сейчас <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400/40 hover:text-white"
            >
              Узнать возможности
            </a>
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 text-sm text-slate-300 md:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-emerald-300">Обработанных документов</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">12 800+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-emerald-300">Экономия времени</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">до 65%</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-emerald-300">Соответствие 152-ФЗ</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">100%</dd>
            </div>
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl">
            <div className="absolute inset-x-12 -top-8 h-32 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-emerald-200">Панель анонимизации</div>
                  <div className="text-xl font-semibold text-white">Документы отдела судебной практики</div>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">live</div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <FileText className="h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Договор поставки.pdf</div>
                    <div className="text-xs text-slate-400">139 найденных персональных данных</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-400">Последние замены</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-300">Иванов И.И.</span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200">→ [ФИО_1]</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-300">+7 (999) 455-21-33</span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200">→ [Телефон]</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-300">passport 4012 567890</span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200">→ [Паспорт]</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PdfSection() {
  return (
    <section id="upload" className="relative border-t border-white/10 bg-slate-950/60 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="PDF → текст"
          title="Загрузите документ и получите обезличенный результат"
          subtitle="LexGuard извлекает текст локально, подсчитывает найденные сущности и предлагает скачать новый файл."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr,1fr]">
          <PdfAnonymizer />
          <div className="space-y-5">
            <Card title="Проверка в 3 шага" icon={<CheckCircle2 className="h-5 w-5 text-emerald-300" />}>
              <ol className="space-y-3 text-sm text-slate-300">
                <li><span className="font-medium text-white">1.</span> Загрузите PDF или перетащите его в область слева.</li>
                <li><span className="font-medium text-white">2.</span> Проверьте подсказки по найденным сущностям.</li>
                <li><span className="font-medium text-white">3.</span> Скачайте обезличенный текст или скопируйте его.</li>
              </ol>
            </Card>
            <Card title="Поддержка форматов" icon={<Layers className="h-5 w-5 text-sky-300" />}>
              <p className="text-sm text-slate-300">
                Помимо PDF, сервис работает с DOCX и TXT (через копирование текста). В ближайшем обновлении — автоматическая очистка сканов через OCR.
              </p>
            </Card>
            <Card title="Соответствие нормам" icon={<Lock className="h-5 w-5 text-purple-300" />}>
              <p className="text-sm text-slate-300">
                Процесс соответствует требованиям 152-ФЗ и рекомендациям Роскомнадзора. Логи действий доступны администраторам.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function PdfAnonymizer() {
  const [file, setFile] = useState<File | null>(null)
  const [rawText, setRawText] = useState<string>('')
  const [result, setResult] = useState<AnonymizationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReset = () => {
    setFile(null)
    setRawText('')
    setResult(null)
    setError(null)
  }

  const handleFile = useCallback(async (selected: File) => {
    if (!selected) return
    if (selected.type !== 'application/pdf') {
      setError('Поддерживаются только PDF-файлы.')
      return
    }
    if (selected.size > 15 * 1024 * 1024) {
      setError('Размер файла не должен превышать 15 МБ.')
      return
    }

    setError(null)
    setLoading(true)
    setFile(selected)

    try {
      const text = await extractTextFromPdf(selected)
      setRawText(text)
      const anonymized = anonymizeText(text)
      setResult(anonymized)
    } catch (err) {
      console.error(err)
      setError('Не удалось прочитать документ. Попробуйте другой файл.')
      setFile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files?.[0]) {
      void handleFile(event.dataTransfer.files[0])
    }
  }

  const downloadAnonymized = () => {
    if (!result) return
    const blob = new Blob([result.text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file ? `${file.name.replace(/\.pdf$/i, '')}_anon.txt` : 'anonymized.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const hasContent = Boolean(rawText)

  return (
    <div className="space-y-6">
      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-emerald-400/60 bg-emerald-500/5 p-8 text-center transition hover:border-emerald-300 hover:bg-emerald-500/10"
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const selected = event.target.files?.[0]
            if (selected) {
              void handleFile(selected)
            }
          }}
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
          <UploadCloud className="h-6 w-6 text-emerald-300" />
        </div>
        <div>
          <p className="text-base font-medium text-white">Перетащите PDF или нажмите для выбора файла</p>
          <p className="mt-2 text-xs text-emerald-200">Обработка проходит локально. Файл не покидает ваш браузер.</p>
        </div>
        {file && (
          <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-slate-950/60 px-4 py-2 text-sm text-emerald-100">
            {file.name} • {(file.size / 1024 / 1024).toFixed(2)} МБ
          </div>
        )}
        {loading && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs text-slate-200">
            <Loader2 className="h-4 w-4 animate-spin" /> Извлечение текста...
          </div>
        )}
      </label>
      {error && <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Исходный текст</h3>
            {hasContent && (
              <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:border-red-400/60 hover:text-white">
                <Trash2 className="h-3.5 w-3.5" /> Очистить
              </button>
            )}
          </div>
          <textarea
            value={rawText}
            onChange={(event) => {
              const text = event.target.value
              setRawText(text)
              setResult(anonymizeText(text))
              setFile(null)
              setError(null)
            }}
            placeholder="Здесь появится текст из PDF. Можно вставить текст вручную."
            className="mt-3 h-56 w-full resize-none rounded-2xl border border-white/5 bg-slate-950/60 p-3 text-sm text-slate-100 focus:border-emerald-400/40 focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Обезличенная версия</h3>
            {result && result.text && (
              <button
                onClick={downloadAnonymized}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-1 text-xs font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                <Download className="h-3.5 w-3.5" /> Скачать txt
              </button>
            )}
          </div>
          <textarea
            value={result?.text ?? ''}
            readOnly
            className="mt-3 h-56 w-full resize-none rounded-2xl border border-white/5 bg-slate-950/60 p-3 text-sm text-emerald-100"
          />
        </div>
      </div>
      <AnonymizationStats stats={result?.stats ?? []} />
    </div>
  )
}

function AnonymizationStats({ stats }: { stats: Stat[] }) {
  const total = useMemo(() => stats.reduce((sum, item) => sum + item.count, 0), [stats])

  if (!stats.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-sm text-slate-400">
        После обработки здесь появится статистика по найденным персональным данным.
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Найдено сущностей</span>
        <span className="font-semibold text-white">{total}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <div className="text-xs uppercase tracking-wide text-emerald-200">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureSection() {
  return (
    <section id="features" className="relative border-t border-white/10 bg-slate-950/80 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Возможности"
          title="Инструменты для юридических отделов и консалтинга"
          subtitle="От быстрой анонимизации до контроля доступа и совместной работы."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkflowSection() {
  return (
    <section id="workflow" className="relative border-t border-white/10 bg-gradient-to-b from-slate-950/80 to-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Как это работает" title="Весь процесс занимает меньше 3 минут" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WORKFLOW.map((step, index) => (
            <div key={step.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <div className="absolute right-6 top-6 text-3xl font-semibold text-white/10">0{index + 1}</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-200">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="relative border-t border-white/10 bg-slate-950/80 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="FAQ" title="Частые вопросы" />
        <div className="mt-10 space-y-4">
          {FAQ.map((item) => (
            <details key={item.question} className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <summary className="flex cursor-pointer items-center justify-between text-left text-sm font-medium text-white">
                <span>{item.question}</span>
                <HelpCircle className="h-5 w-5 text-emerald-300 transition group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-sm text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contacts" className="relative border-t border-white/10 bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <SectionTitle eyebrow="Подключение" title="Получите доступ к демо и тарифам" />
            <p className="mt-4 text-sm text-slate-300">
              Оставьте контакты — наша команда поможет внедрить сервис в вашу практику, перенести шаблоны и настроить права доступа.
            </p>
          </div>
          <div className="space-y-4 text-sm text-slate-200">
            <a
              href="mailto:lexguard@example.com"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition hover:border-emerald-400/40 hover:text-white"
            >
              <Mail className="h-4 w-4 text-emerald-300" /> lexguard@example.com
            </a>
            <a
              href="tel:+79273333329"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition hover:border-emerald-400/40 hover:text-white"
            >
              <Phone className="h-4 w-4 text-emerald-300" /> +7 (927) 333-33-29
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-300">
              <BookOpen className="h-4 w-4 text-emerald-300" />
              Методология обезличивания соответствует ГОСТ Р 57787-2017
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950/90 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} LexGuard. Все права защищены.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-white">
            Политика обработки данных
          </a>
          <a href="#" className="transition hover:text-white">
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </footer>
  )
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute top-1/3 left-0 h-72 w-72 -translate-x-1/3 rounded-full bg-purple-500/10 blur-3xl" />
    </div>
  )
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">{eyebrow}</div>}
      <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-slate-300">{subtitle}</p>}
    </div>
  )
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <div className="flex items-center gap-3 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">{icon}</div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

async function extractTextFromPdf(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const pdfjsLib = (await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.mjs')) as any
  if (pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
  }
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
    text += pageText + '\n\n'
  }
  return text.trim()
}

function anonymizeText(text: string): AnonymizationResult {
  if (!text) {
    return { text: '', stats: [] }
  }

  const patterns: { label: string; regex: RegExp; replacement: string }[] = [
    { label: 'ФИО', regex: /\b[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\b/g, replacement: '[ФИО]' },
    { label: 'ФИО (инициалы)', regex: /\b[А-ЯЁ][а-яё]+\s[А-ЯЁ]\.\s?[А-ЯЁ]\.\b/g, replacement: '[ФИО]' },
    { label: 'Латиница', regex: /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, replacement: '[NAME]' },
    { label: 'Телефоны', regex: /\+?\d[\d\s().-]{7,}\d/g, replacement: '[Телефон]' },
    { label: 'E-mail', regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, replacement: '[Email]' },
    { label: 'Паспорт', regex: /\b\d{4}\s?\d{6}\b/g, replacement: '[Паспорт]' },
    { label: 'ИНН/СНИЛС', regex: /\b\d{3}-\d{3}-\d{3}\s?\d{2}\b/g, replacement: '[ИНН]' },
    { label: 'Карты', regex: /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, replacement: '[Карта]' },
    { label: 'Даты', regex: /\b\d{2}[./-]\d{2}[./-]\d{4}\b/g, replacement: '[Дата]' },
    { label: 'Номера дел', regex: /\b\d{2}-\d{2}-\d{6}\b/g, replacement: '[Дело]' },
  ]

  let anonymized = text
  const stats: Stat[] = []

  for (const pattern of patterns) {
    const matches = anonymized.match(pattern.regex)
    anonymized = anonymized.replace(pattern.regex, pattern.replacement)
    stats.push({ label: pattern.label, count: matches?.length ?? 0 })
  }

  anonymized = anonymized.replace(/\n{3,}/g, '\n\n')

  return {
    text: anonymized,
    stats: stats.filter((item) => item.count > 0),
  }
}
