import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const content = {
  zh: {
    nav: ['首页', '关于我', '项目与荣誉', '技术栈与基础', '联系方式'],
    hero: { department: '网络安全与密码学部 · 海南大学' },
    about: {
      title: '关于我',
      subtitle: '网络安全与密码学部 · 海南大学',
      paragraphs: [
        '我是一名就读于海南大学的本科生，热衷于将人工智能想法落地为可用的项目，并在持续的实践中探索技术的真实价值。',
        '未来，我计划攻读密码学与网络安全方向的研究生，在夯实密码与安全基础的同时，探索人工智能在安全领域的应用与研究。',
      ],
    },
    portfolio: { title: '项目与荣誉', subtitle: '项目、比赛与荣誉奖项', project: '项目经历', award: '荣誉奖项' },
    skills: { title: '技术栈与基础', subtitle: 'AI 应用开发 · 密码与网络安全', certification: '认证' },
    contact: { title: '联系方式', subtitle: '期待与你的交流', email: '邮箱', wechat: '微信' },
  },
  en: {
    nav: ['Home', 'About', 'Projects & Honors', 'Tech Stack & Foundations', 'Contact'],
    hero: { department: 'Faculty of Cybersecurity & Cryptology · Hainan University' },
    about: {
      title: 'About me',
      subtitle: 'Faculty of Cybersecurity & Cryptology · Hainan University',
      paragraphs: [
        'I am an undergraduate student at Hainan University with a strong interest in turning AI ideas into useful projects. Through continuous hands-on work, I explore how technology creates real value.',
        'Looking ahead, I plan to pursue graduate study in cryptography and cybersecurity, while exploring the application and research of AI in security.',
      ],
    },
    portfolio: { title: 'Projects & Honors', subtitle: 'Projects, competitions, and honors', project: 'PROJECT EXPERIENCE', award: 'HONOR & AWARD' },
    skills: { title: 'Technology Stack & Foundations', subtitle: 'AI Application Development · Cryptography & Cybersecurity', certification: 'CERTIFICATION' },
    contact: { title: 'Contact', subtitle: 'Open to conversations and collaboration', email: 'EMAIL', wechat: 'WECHAT' },
  },
};

const entries = [
  { kind: 'project', date: '2026.08', title: { zh: '面向真实动态末端揽收的可审计混合伊辛优化', en: 'Auditable Hybrid Ising Optimization for Real-World Dynamic Last-Mile Collection' }, description: { zh: '', en: '' }, tags: { zh: ['QUBO', '伊辛计算', '混合求解', '动态车辆路径'], en: ['QUBO', 'Ising Computing', 'Hybrid Solving', 'Dynamic Vehicle Routing'] } },
  { kind: 'award', date: '2026.08', title: { zh: '智慧物流', en: 'Smart Logistics' }, description: { zh: '中国光学工程学会首届伊辛·智算未来挑战赛——新质生产力科技成果万里行活动', en: 'The Chinese Society for Optical Engineering’s 1st Ising & Intelligent Computing Future Challenge — Technology Achievement Roadshow for New Quality Productive Forces' }, tags: { zh: ['风采展示成果'], en: ['Featured Showcase Result'] } },
  { kind: 'award', date: '2026.08', title: { zh: 'A3-基于大模型的个性化资源生成与学习多智能体系统开发', en: 'A3 — Large-Model-Powered Personalized Resource Generation and Multi-Agent Learning System' }, description: { zh: '第十五届“中国软件杯”大学生软件设计大赛', en: '15th “China Software Cup” College Student Software Design Competition' }, tags: { zh: ['国家级二等奖'], en: ['National Second Prize'] } },
  { kind: 'award', date: '2026.8', title: { zh: '第十七届中国大学生服务外包创新创业大赛', en: '17th China College Students Service Outsourcing Innovation and Entrepreneurship Competition' }, description: { zh: '人工智能专项赛', en: 'Artificial Intelligence Special Competition' }, tags: { zh: ['国家级二等奖'], en: ['National Second Prize'] } },
  { kind: 'project', date: '2026.7', title: { zh: '研途智策', en: 'YanTu AI' }, description: { zh: 'AI驱动的考研学习规划与复试训练桌面平台', en: 'An AI-powered desktop platform for postgraduate exam study planning and interview training.' }, tags: { zh: ['Electron', 'Vue 3', 'FastAPI', 'SQLite', '科大讯飞星火'], en: ['Electron', 'Vue 3', 'FastAPI', 'SQLite', 'iFlytek Spark'] } },
  { kind: 'award', date: '2026.7', title: { zh: '第十六届 APMCM 亚太地区大学生数学建模竞赛', en: '16th Asia and Pacific Mathematical Contest in Modeling (APMCM)' }, description: { zh: '中文赛项', en: 'Chinese Division' }, tags: { zh: ['国家级三等奖'], en: ['National Third Prize'] } },
  { kind: 'project', date: '2026.6', title: { zh: 'CarbonChain 碳链可信管理平台', en: 'CarbonChain Trusted Carbon Management Platform' }, description: { zh: '动力电池全生命周期碳核算与区块链可信溯源平台', en: 'A platform for lifecycle carbon accounting and blockchain-based trusted traceability of power batteries.' }, tags: { zh: ['Vue 3', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Hyperledger Besu'], en: ['Vue 3', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Hyperledger Besu'] } },
  { kind: 'project', date: '2026.5', title: { zh: '法律AI应用创新与实践项目', en: 'Legal AI Application Innovation & Practice' }, description: { zh: '基于腾讯元器开发平台的劳动合同审查与维权指引智能体', en: 'An intelligent agent for labor contract review and rights-protection guidance, built with the Tencent Yuanqi development platform.' }, tags: { zh: ['HTML', 'CSS', 'JavaScript', '微信小程序', '腾讯元器'], en: ['HTML', 'CSS', 'JavaScript', 'WeChat Mini Program', 'Tencent Yuanqi'] } },
];

const skillTags = {
  zh: ['Python', 'FastAPI', 'Vue 3', 'TypeScript', 'Electron', 'PostgreSQL', 'SQLite', 'Linux', 'Git', '密码学基础', '网络安全基础', '数据结构与算法'],
  en: ['Python', 'FastAPI', 'Vue 3', 'TypeScript', 'Electron', 'PostgreSQL', 'SQLite', 'Linux', 'Git', 'Cryptography Foundations', 'Cybersecurity Foundations', 'Data Structures & Algorithms'],
};

function SectionArrow({ direction, onClick }) {
  const Icon = direction === 'up' ? ArrowUp : ArrowDown;
  return <button className={`section-arrow ${direction}`} onClick={onClick} aria-label={`Go ${direction}`}><Icon size={19} strokeWidth={2} /></button>;
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'en');
  const [active, setActive] = useState(0);
  const copy = content[language];

  const goTo = (index) => setActive((current) => (index < 0 || index > 4 || index === current ? current : index));

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? '侯吉豪 | 个人主页' : 'HOU JIHAO | Portfolio';
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  useEffect(() => {
    let touchStart = 0;
    let locked = false;
    const unlock = () => { locked = false; };
    const onWheel = (event) => {
      if (locked || Math.abs(event.deltaY) < 20) return;
      locked = true;
      goTo(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(unlock, 500);
    };
    const onKeyDown = (event) => {
      if (['ArrowDown', 'PageDown'].includes(event.key)) { event.preventDefault(); goTo(active + 1); }
      if (['ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); goTo(active - 1); }
    };
    const onTouchStart = (event) => { touchStart = event.touches[0].clientY; };
    const onTouchEnd = (event) => {
      const distance = touchStart - event.changedTouches[0].clientY;
      if (Math.abs(distance) > 50) goTo(active + (distance > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [active]);

  return (
    <>
      <header className="navbar">
        <div className="nav-logo">HOU <span>JIHAO</span></div>
        <nav className="nav-links" aria-label="Main navigation">
          {copy.nav.map((label, index) => <button key={label} className={active === index ? 'active' : ''} onClick={() => goTo(index)}>{label}</button>)}
        </nav>
        <div className="language-switcher" aria-label="Language">
          <button className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中</button>
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </header>
      <aside className="scroll-dots" aria-label="Section navigation">
        {copy.nav.map((label, index) => <button key={label} className={active === index ? 'active' : ''} onClick={() => goTo(index)} aria-label={label} />)}
      </aside>
      <main className="main-container">
        <section className={`section hero ${active === 0 ? 'active' : ''}`}>
          <img className="hero-avatar" src="/1.png" alt="Hou Jihao" />
          <h1 className="hero-title">{language === 'zh' ? '侯吉豪' : 'HOU JIHAO'}</h1>
          <p className="hero-subtitle">{copy.hero.department}</p>
          <SectionArrow direction="down" onClick={() => goTo(1)} />
        </section>
        <section className={`section ${active === 1 ? 'active' : ''}`}>
          <SectionArrow direction="up" onClick={() => goTo(0)} />
          <div className="section-header"><h2>{copy.about.title}</h2><p>{copy.about.subtitle}</p></div>
          <div className="about-content">{copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <SectionArrow direction="down" onClick={() => goTo(2)} />
        </section>
        <section className={`section portfolio-section ${active === 2 ? 'active' : ''}`}>
          <SectionArrow direction="up" onClick={() => goTo(1)} />
          <div className="section-header"><h2>{copy.portfolio.title}</h2><p>{copy.portfolio.subtitle}</p></div>
          <div className="projects-grid">
            {entries.map((entry) => <article className={`project-card ${entry.kind === 'award' ? 'award-card' : ''}`} key={`${entry.date}-${entry.title.en}`}>
              <span className="entry-date">{entry.date}</span>
              <div className="card-meta"><span className={entry.kind === 'award' ? 'award-label' : 'project-label'}>{entry.kind === 'award' ? copy.portfolio.award : copy.portfolio.project}</span></div>
              <h3>{entry.title[language]}</h3>{entry.description[language] && <p className="project-desc">{entry.description[language]}</p>}
              <div className="project-tags">{entry.tags[language].map((tag) => <span className={`tag ${entry.kind === 'award' ? 'award-tag' : ''}`} key={tag}>{tag}</span>)}</div>
            </article>)}
          </div>
          <SectionArrow direction="down" onClick={() => goTo(3)} />
        </section>
        <section className={`section skills-section ${active === 3 ? 'active' : ''}`}>
          <SectionArrow direction="up" onClick={() => goTo(2)} />
          <div className="section-header"><h2>{copy.skills.title}</h2><p>{copy.skills.subtitle}</p></div>
          <div className="skills-container">{skillTags[language].map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
          <div className="certification"><span className="certification-label">{copy.skills.certification}</span><span className="certification-name">{language === 'zh' ? '阿里云大模型工程师 ACA' : 'Alibaba Cloud Certified Associate (ACA) - Large Model Engineer'}</span><span className="certification-date">2026.06</span></div>
          <SectionArrow direction="down" onClick={() => goTo(4)} />
        </section>
        <section className={`section ${active === 4 ? 'active' : ''}`}>
          <SectionArrow direction="up" onClick={() => goTo(3)} />
          <div className="section-header"><h2>{copy.contact.title}</h2><p>{copy.contact.subtitle}</p></div>
          <div className="contact-info">
            <div className="contact-item"><span>EMAIL</span><a href="mailto:h.1.2@qq.com">h.1.2@qq.com</a></div>
            <div className="contact-item"><span>GITHUB</span><a href="https://github.com/HJH-0102" target="_blank" rel="noreferrer">github.com/HJH-0102</a></div>
            <div className="contact-item"><span>{copy.contact.wechat}</span><strong>hjcf7712</strong></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
