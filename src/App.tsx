import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, ArrowRight, Check, Shield, Zap } from 'lucide-react'

const CONTACTS = {
  phone: '+7 (927) 333-33-29',
  phoneHref: 'tel:+79273333329',
  email: 'giaterra.rf@gmail.com',
  emailHref: 'mailto:giaterra.rf@gmail.com?subject=Заявка%20на%20демо%20сервиса%20ГИАТЕРРА&body=Здравствуйте!%20Хочу%20получить%20демо%20и%20условия%20подключения.',
};

const LOGO_SRC = '/left_medium.png'; // файл лежит в /public

const FEATURES = [
  { icon: <Zap className="w-6 h-6" />, title: 'Автоматизация до 80% рутины', text: 'Сценарии подготовки документов, поиск норм и практики, черновики ходатайств и жалоб.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Интеллектуальные подсказки', text: 'Подсветка рисков и рекомендаций прямо в процессе работы, рост квалификации команды.' },
  { icon: <Check className="w-6 h-6" />, title: '×3 скорость с документами', text: 'Шаблоны, автозаполнение реквизитов и ссылки на правовые основания.' },
];

const PRICING = [
  { name: 'Профи', badge: 'Полный пакет', oneTime: 'Единовременная регистрация: 59 000 ₽', subscription: 'Годовая подписка от 20 профилей: 620 000 ₽', cta: 'Запросить счёт', popular: false, features: ['Все модули и обновления','Общий админ‑кабинет','Командные рабочие пространства'] },
  { name: 'Бизнес', badge: 'Гибкий тариф', oneTime: 'Единовременная регистрация: 180 000 ₽', subscription: 'Ежемесячно: 3 000 ₽ за активного пользователя', cta: 'Подключить', popular: true, features: ['Оплата только за активных','Быстрый масштаб в отделах','Приоритезированная поддержка'] },
  { name: 'Стандарт', badge: 'Базовый', oneTime: 'Единовременная регистрация: 59 000 ₽', subscription: 'Ежегодное продление: 56 000 ₽ за 1 профиль', cta: 'Начать', popular: false, features: ['Индивидуальная лицензия','Шаблоны документов','Обновления по подписке'] },
];

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-50 antialiased selection:bg-red-400/30 selection:text-white">
      <BackgroundDecor />
      <Header onOpen={()=>setOpen(true)} />
      <Hero onOpen={()=>setOpen(true)} />
      <section id="about" className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f,i)=>(
              <motion.div key={i} whileHover={{y:-4}} transition={{type:'spring',stiffness:250,damping:20}} className="rounded-3xl p-6 bg-neutral-900/70 ring-1 ring-white/10 shadow-lg backdrop-blur-lg">
                <div className="flex items-center gap-3 text-red-400">
                  <div className="p-2 rounded-xl bg-red-500/10 ring-1 ring-red-500/20">{f.icon}</div>
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="pricing" className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle eyebrow="Тарифные планы" title="Выберите формат подключения" subtitle="Прозрачные условия — без скрытых платежей" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p,idx)=>(<PricingCard key={idx} data={p} />))}
          </div>
          <p className="mt-6 text-sm text-neutral-400">Условия совпадают с коммерческим предложением: точные цены и формулировки сохранены.</p>
        </div>
      </section>
      <SpecialOffer onOpen={()=>setOpen(true)} />
      <Contacts onOpen={()=>setOpen(true)} />
      <Footer />
      {open && <LeadModal onClose={()=>setOpen(false)} />}
    </div>
  )
}

function Header({ onOpen }: { onOpen: ()=>void }) {
  const nav = [{id:'about',label:'О сервисе'},{id:'pricing',label:'Тарифы'},{id:'offer',label:'Спецпредложение'},{id:'contacts',label:'Контакты'}];
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/70 ring-1 ring-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="ГИАТЕРРА логотип" className="h-9 w-auto object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/>
          <span className="text-lg font-semibold tracking-wide text-neutral-200">ГИАТЕРРА</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          {nav.map(n=>(<a key={n.id} href={`#${n.id}`} className="hover:text-white transition-colors">{n.label}</a>))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={CONTACTS.phoneHref} className="hidden md:inline-flex px-3 py-2 text-sm rounded-xl ring-1 ring-white/15 hover:bg-white/5 transition"><Phone className="w-4 h-4 mr-2" /> Позвонить</a>
          <button onClick={onOpen} className="inline-flex items-center px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-medium shadow-lg shadow-red-500/20 transition">Оставить заявку <ArrowRight className="w-4 h-4 ml-2" /></button>
        </div>
      </div>
    </div>
  )
}

function Hero({ onOpen }: { onOpen: ()=>void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-0 opacity-40">
        <div className="absolute -top-24 -left-24 w-[42rem] h-[42rem] rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-[38rem] h-[38rem] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-xs text-neutral-300">
              Сервис для юристов → рост эффективности на 40%
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Коммерческое предложение для адвокатов, юристов и юридических фирм
            </h1>
            <p className="mt-4 text-neutral-300 max-w-xl">
              ООО «ГИАТЕРРА» разработал сервис‑помощник для юристов — аналога нет в России. Он уже помогает автоматизировать до 80% рутины,
              повышать квалификацию сотрудников и в 3 раза ускорять работу с документами.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Посмотреть тарифы <ArrowRight className="w-4 h-4 ml-2" /></a>
              <a href={CONTACTS.emailHref} className="inline-flex items-center px-4 py-2 rounded-xl ring-1 ring-white/15 hover:bg-white/5 transition"><Mail className="w-4 h-4 mr-2" /> Написать на email</a>
              <button onClick={onOpen} className="inline-flex items-center px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-medium shadow-lg shadow-red-500/20 transition">Демо и условия</button>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{duration:0.6,delay:0.1}} className="relative">
            <div className="relative mx-auto w-full max-w-md rounded-3xl bg-neutral-900/70 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <img src={LOGO_SRC} alt="Логотип ГИАТЕРРА" className="h-16 w-16 object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/>
                </div>
                <div>
                  <div className="text-sm text-neutral-300">Девиз</div>
                  <div className="text-xl font-semibold">Порядок создаёт возможности</div>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                <li className="flex gap-2"><Check className="w-5 h-5 text-red-400"/>Автоматизирует 80% рутинных операций</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-red-400"/>Интеллектуальные подсказки повышают квалификацию</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-red-400"/>×3 ускорение работы с документами</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-widest text-red-400/90">{eyebrow}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-2 text-neutral-300">{subtitle}</p>}
    </div>
  )
}

function PricingCard({ data }: { data: any }) {
  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} whileHover={{y:-6}} className={"relative rounded-3xl p-6 ring-1 ring-white/10 bg-neutral-900/70 backdrop-blur-xl shadow-xl overflow-hidden" + (data.popular ? " outline outline-1 outline-red-500/40" : "")}>
      {data.popular && (<div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest bg-red-500 text-white px-2 py-1 rounded-full shadow">Рекомендуем</div>)}
      <div className="text-sm text-neutral-300">{data.badge}</div>
      <h3 className="mt-1 text-2xl font-semibold">{data.name}</h3>
      <div className="mt-3 text-sm space-y-1">
        <div>{data.oneTime}</div>
        <div>{data.subscription}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-300">
        {data.features.map((f:string,i:number)=>(<li key={i} className="flex gap-2 items-start"><Check className="w-4 h-4 mt-0.5 text-red-400" /> {f}</li>))}
      </ul>
      <div className="mt-5 flex gap-2">
        <a href={CONTACTS.emailHref} className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">{data.cta}</a>
        <a href={CONTACTS.phoneHref} className="inline-flex items-center px-3 py-2 rounded-xl ring-1 ring-white/15 hover:bg-white/5 transition"><Phone className="w-4 h-4 mr-1" />Позвонить</a>
      </div>
    </motion.div>
  )
}

function SpecialOffer({ onOpen }: { onOpen: ()=>void }) {
  return (
    <section id="offer" className="relative z-10 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-gradient-to-r from-red-600/20 via-red-500/10 to-red-400/20 ring-1 ring-red-500/30 p-8 md:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-semibold">Специальное предложение</h3>
              <p className="mt-2 text-neutral-100">Заключите договор до 30 сентября и получите <b>14 дней бесплатного теста</b> и <b>персональный onboarding</b> для вашей команды.</p>
            </div>
            <div className="flex md:justify-end gap-3">
              <button onClick={onOpen} className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Забронировать демо <ArrowRight className="w-4 h-4 ml-2" /></button>
              <a href={CONTACTS.emailHref} className="inline-flex items-center px-4 py-2 rounded-xl ring-1 ring-white/15 hover:bg-white/5 transition"><Mail className="w-4 h-4 mr-2" /> Написать</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contacts({ onOpen }: { onOpen: ()=>void }) {
  return (
    <section id="contacts" className="relative z-10 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Контакты" title="Свяжитесь с нами" subtitle="Ответим в течение рабочего дня" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl p-6 bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-red-400"/><a className="hover:text-white" href={CONTACTS.phoneHref}>{CONTACTS.phone}</a></div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-red-400"/><a className="hover:text-white" href={CONTACTS.emailHref}>{CONTACTS.email}</a></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onOpen} className="inline-flex items-center px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-medium shadow-lg shadow-red-500/20 transition">Оставить заявку <ArrowRight className="w-4 h-4 ml-2" /></button>
              <a href="#pricing" className="inline-flex items-center px-4 py-2 rounded-xl ring-1 ring-white/15 hover:bg-white/5 transition">К тарифам</a>
            </div>
            <div className="mt-6 text-sm text-neutral-400">С уважением,<br/><span className="text-neutral-200">Гончаров Игорь</span>, Коммерческий директор ООО «ГИАТЕРРА»</div>
          </div>
          <div className="rounded-3xl p-6 bg-neutral-900/70 ring-1 ring-white/10 backdrop-blur-xl">
            <h4 className="text-lg font-semibold">Дальнейшие шаги</h4>
            <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-neutral-300">
              <li>Ответьте на письмо или оставьте заявку через форму.</li>
              <li>Проведём демо и согласуем список модулей/доступов.</li>
              <li>Выберем тариф и подготовим договор.</li>
            </ol>
            <form onSubmit={(e)=>{e.preventDefault(); window.location.href = CONTACTS.emailHref;}} className="mt-6 space-y-3">
              <input required placeholder="Имя и компания" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400" />
              <input required type="email" placeholder="Ваш email" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400" />
              <textarea placeholder="Кратко о задаче" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[96px]" />
              <button className="w-full inline-flex justify-center items-center px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Отправить заявку</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="Логотип" className="h-8 w-auto object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
          <span className="text-sm text-neutral-300">ООО «ГИАТЕРРА»</span>
        </div>
        <p className="text-sm text-neutral-400 max-w-2xl text-center md:text-right"><b>P.S.</b> По статистике, клиенты окупают подписку уже через <b>2–3 месяца</b> работы с сервисом.</p>
      </div>
    </footer>
  )
}

function LeadModal({ onClose }: { onClose: ()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" role="dialog" aria-modal="true">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-lg rounded-2xl bg-neutral-900 ring-1 ring-white/10 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Заявка на демо</h3>
            <p className="text-sm text-neutral-300 mt-1">Оставьте контакты — отправим письмо и согласуем время.</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); window.location.href = CONTACTS.emailHref;}} className="mt-5 space-y-3">
          <input required placeholder="Имя" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400" />
          <input required type="email" placeholder="Email" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400" />
          <input placeholder="Телефон" className="w-full px-4 py-2 rounded-xl bg-neutral-800/80 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400" />
          <button className="w-full inline-flex justify-center items-center px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Отправить</button>
          <div className="text-xs text-neutral-500 text-center">Нажимая «Отправить», вы даёте согласие на обработку данных для связи по заявке.</div>
        </form>
      </motion.div>
    </div>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
