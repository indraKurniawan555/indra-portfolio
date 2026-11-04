"use client";

import { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, Code2,
  Download, Expand, GitBranch, Globe2, Camera, Users, Mail, Menu, Moon,
  MousePointer2, Palette, Rocket, Search, Send, Shield, Sparkles, Sun, X, Zap,
} from "lucide-react";

type Theme = "dark" | "light";
type ProjectCategory = "All" | "Web Development" | "SEO" | "Mobile";

const navItems = ["Home", "About", "Skills", "Gallery", "Projects", "Experience", "Contact"];
const skillGroups = [
  { label: "01 / Development", title: "Building useful systems", icon: Code2, skills: ["HTML", "PHP", "Python", "Kotlin", "WordPress", "MySQL"] },
  { label: "02 / SEO", title: "Growing visibility", icon: Search, skills: ["Keyword Research", "On-page SEO", "Content Optimization", "Technical SEO", "Google Search Console"] },
  { label: "03 / Professional", title: "Working with intent", icon: Palette, skills: ["Microsoft Word", "Microsoft Excel", "Google Colab", "Teamwork", "Communication", "Time Management"] },
];
const projects = [
  { number: "01", title: "Outbound Gresik", description: "WordPress website for an outbound and tour provider. Applied keyword research, on-page SEO, content optimization, and technical SEO; achieved first position for the keyword “Outbound Gresik”.", tags: ["WordPress", "SEO", "Google Search Console"], category: "SEO" as ProjectCategory, accent: "orange", image: "/uploads/tampilan%20Website.jpeg" },
  { number: "02", title: "Koperasi Merah Putih Desa Pongangan", description: "Digital cooperative information system with member data, UMKM marketplace, announcements, management structure, admin authentication, and management dashboard.", tags: ["Information System", "PHP", "MySQL"], category: "Web Development" as ProjectCategory, accent: "violet", image: "/uploads/Koperasi.jpeg" },
  { number: "03", title: "Blog Ayam Bakar Pak D", description: "A content website with a clear editorial structure and performance-focused experience, supported by SEO monitoring and optimization.", tags: ["WordPress", "SEO", "Performance"], category: "Web Development" as ProjectCategory, accent: "blue", image: "/uploads/Blog%20Ayam%20Bakar%20Pak%20D.jpeg" },
  { number: "04", title: "Budaya Indonesia", description: "Android project exploring Indonesian culture through a native mobile experience and REST API integration.", tags: ["Kotlin", "REST API", "Android"], category: "Mobile" as ProjectCategory, accent: "pink", image: "/uploads/Budaya%20Indonesia.jpeg" },
  { number: "05", title: "Technotainment", description: "Information platform developed through UKM-FT ITC to share competitions and provide participant registration.", tags: ["PHP", "Web Development", "Content"], category: "Web Development" as ProjectCategory, accent: "cyan", image: "/uploads/foto%20itc.jpeg" },
];
const timeline = [
  { period: "Feb 2025 – Jun 2025", title: "Web Developer · CV Besar Anugrah Djaya IT Consultant", description: "Developed Outbound Gresik with WordPress, improved structure and performance, and implemented SEO that reached first position for “Outbound Gresik”.", icon: Rocket },
  { period: "Jan 2025 – Feb 2025", title: "Business Analyst · Dinas Komunikasi dan Informatika Kota Kediri", description: "Prepared technical and functional documentation, testing plans, user manuals, and workflow guides for SIMALIK, PECUT, and Web KediriKota.", icon: BriefcaseBusiness },
  { period: "2024", title: "Research & Development · UKM-FT ITC", description: "Managed the organization website and developed Technotainment, an information and competition registration platform.", icon: GitBranch },
];
const fadeUp: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } };
const photoSlots = [
  { label: "Portrait / 01", caption: "Indra Kurniawan — Web Developer & SEO Specialist", tone: "portrait", src: "/uploads/Foto.jpeg" },
  { label: "Field notes / 02", caption: "Practical work and professional growth", tone: "field", src: "/uploads/Foto%20KP.jpeg" },
  { label: "Project / 03", caption: "Outbound Gresik — WordPress and SEO", tone: "lab", src: "/uploads/tampilan%20Website.jpeg" },
  { label: "Project / 04", caption: "Koperasi Merah Putih Desa Pongangan", tone: "field", src: "/uploads/Koperasi.jpeg" },
  { label: "SEO evidence / 05", caption: "Search performance for Outbound Gresik", tone: "lab", src: "/uploads/SEO%20BEAD.jpeg" },
  { label: "SEO evidence / 06", caption: "KOPDES Pongangan search optimization", tone: "portrait", src: "/uploads/SEO%20KOPDES.jpeg" },
  { label: "Project / 07", caption: "Blog Ayam Bakar Pak D", tone: "field", src: "/uploads/Blog%20Ayam%20Bakar%20Pak%20D.jpeg" },
  { label: "Project / 08", caption: "Technotainment — UKM-FT ITC", tone: "lab", src: "/uploads/foto%20itc.jpeg" },
  { label: "Project / 09", caption: "Budaya Indonesia — Android study club", tone: "portrait", src: "/uploads/Budaya%20Indonesia.jpeg" },
  { label: "Performance / 10", caption: "PageSpeed and website optimization results", tone: "field", src: "/uploads/pagespeed1_outbound.jpeg" },
  { label: "SEO evidence / 11", caption: "SEO progress and search visibility", tone: "lab", src: "/uploads/seo.jpeg" },
  { label: "SEO evidence / 12", caption: "KOPDES Pongangan SEO report", tone: "portrait", src: "/uploads/SEO%20KOPDES%20crop.jpeg" },
  { label: "SEO evidence / 13", caption: "Outbound Gresik SEO report", tone: "field", src: "/uploads/SEO%20BEAD%20crop.jpeg" },
  { label: "Performance / 14", caption: "Blog Ayam Bakar Pak D PageSpeed result", tone: "lab", src: "/uploads/Pagespeed_blogpakd.jpeg" },
  { label: "Performance / 15", caption: "Outbound website mobile performance", tone: "portrait", src: "/uploads/pagespeed2_outbond.jpeg" },
  { label: "Performance / 16", caption: "Blog Ayam Bakar Pak D performance result", tone: "field", src: "/uploads/pagespeed2_blogpakd.jpeg" },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [sent, setSent] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [themeTransition, setThemeTransition] = useState(false);
  const [webShot, setWebShot] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const webShotTimerRef = useRef<number | null>(null);
  const webScrollTimerRef = useRef<number | null>(null);
  const webTargetTimerRef = useRef<number | null>(null);
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);
  const galleryPhotos = useMemo(() => uploadedPhoto ? [{ label: "Your signal / 00", caption: "Personal hero mode", tone: "custom", src: uploadedPhoto }, ...photoSlots] : photoSlots, [uploadedPhoto]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("indra-theme");
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = initialTheme;
    window.queueMicrotask(() => setTheme(initialTheme));
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePhoto]);

  function navigatePhoto(direction: 1 | -1) {
    setActivePhoto((current) => current === null ? 0 : (current + direction + galleryPhotos.length) % galleryPhotos.length);
  }
  function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedPhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }
  const motionProps = reduceMotion ? {} : { variants: fadeUp, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.15 } };

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setThemeTransition(true);
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("indra-theme", nextTheme);
    window.setTimeout(() => setThemeTransition(false), reduceMotion ? 80 : 1500);
  }
  function navigateToSection(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget.getAttribute("href");
    if (!target?.startsWith("#")) return;
    const section = document.querySelector(target);
    if (!section) return;
    event.preventDefault();
    setMenuOpen(false);
    if (webScrollTimerRef.current !== null) window.clearTimeout(webScrollTimerRef.current);
    if (webShotTimerRef.current !== null) window.clearTimeout(webShotTimerRef.current);
    if (webTargetTimerRef.current !== null) window.clearTimeout(webTargetTimerRef.current);
    section.classList.remove("web-pull-target");
    void (section as HTMLElement).offsetWidth;
    section.classList.add("web-pull-target");
    setWebShot(true);
    webScrollTimerRef.current = window.setTimeout(() => {
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, reduceMotion ? 0 : 140);
    webTargetTimerRef.current = window.setTimeout(() => section.classList.remove("web-pull-target"), reduceMotion ? 80 : 820);
    webShotTimerRef.current = window.setTimeout(() => setWebShot(false), reduceMotion ? 80 : 900);
  }
  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="site-shell">
      {webShot && <div className="web-shot" aria-hidden="true"><span className="web-shot-single" /></div>}
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Indra home"><span className="brand-mark">I</span><span>INDRA<span className="brand-dot">{"//"}</span>HERO</span></a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={navigateToSection}>{item}</a>)}</nav>
        <div className="header-actions"><button type="button" className={`theme-toggle ${themeTransition ? "is-switching" : ""}`} onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button><a className="header-cta" href="#contact" onClick={navigateToSection}>Let&apos;s talk <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      </header>

      <section id="home" className="hero section-pad"><div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy"><motion.div className="eyebrow" {...(reduceMotion ? {} : { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7 } })}><span className="eyebrow-line" /> Web Developer <span className="eyebrow-slash">/</span> SEO Specialist</motion.div>
          <motion.h1 {...(reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.7 } })}>Building digital<br />experiences with<br /><em>heroic impact.</em></motion.h1>
          <motion.p className="hero-intro" {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.35, duration: 0.7 } })}>I&apos;m Indra Kurniawan from Trenggalek, East Java — an Information Systems fresh graduate focused on fullstack development, SEO optimization, and practical digital solutions.</motion.p>
          <motion.div className="hero-actions" {...(reduceMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.7 } })}><a className="button button-primary" href="#projects" onClick={navigateToSection}>Explore my projects <ArrowUpRight size={17} /></a><a className="button button-ghost" href="/uploads/CV_INDRA%20KURNIAWAN_MAGANGHUB%202%20.pdf" target="_blank" rel="noreferrer"><Download size={16} /> Download my CV</a></motion.div>
        </div>
        <motion.div className="hero-visual" aria-label="Abstract illustration of a technology hero" {...(reduceMotion ? {} : { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.15, duration: 1 } })}><div className="visual-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="hero-core"><img className="hero-photo" src="/uploads/Fotoku.png" alt="Foto Indra Kurniawan" /></div><div className="core-beam beam-one" /><div className="core-beam beam-two" /><span className="signal signal-one"><Zap size={14} /></span><span className="signal signal-two"><Sparkles size={14} /></span><span className="signal signal-three" /><div className="visual-caption"><span>01</span><span>ENERGY ONLINE</span></div></motion.div>
        <motion.div className="hero-bottom-note" {...(reduceMotion ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8, duration: 0.6 } })}>Based in Indonesia · Available for opportunities</motion.div>
      </section>

      <section id="about" className="about section-pad"><div className="section-kicker">About me <span>/ 01</span></div><div className="about-layout"><motion.h2 {...motionProps}>Not just building<br /><em>websites.</em></motion.h2><motion.div className="about-text" {...motionProps}><p className="lead">I turn code, content, and search strategy into useful digital solutions.</p><p>As an Information Systems fresh graduate from Universitas Trunojoyo Madura with an IPK of 3.84/4.00, I focus on fullstack development, SEO optimization, and data-driven problem solving. My experience includes WordPress development, business analysis documentation, Android projects, and research using machine learning for sentiment analysis.</p><a className="text-link" href="#skills">Discover my capabilities <ChevronRight size={16} /></a></motion.div></div><div className="about-note"><span className="note-icon"><Shield size={18} /></span><span>Curiosity is the superpower.<br /><strong>Craft is the mission.</strong></span></div></section>

      <section id="skills" className="skills section-pad section-dark"><div className="section-kicker">My arsenal <span>/ 02</span></div><div className="section-heading-row"><h2>Tools for turning<br /><em>ideas into impact.</em></h2><p>From interface to indexability, I work across the full digital experience.</p></div><div className="skill-grid">{skillGroups.map((group, index) => { const Icon = group.icon; return <motion.article className={`skill-card skill-card-${index + 1}`} key={group.label} {...motionProps} transition={{ delay: index * 0.1 }}><div className="skill-card-top"><span>{group.label}</span><Icon size={21} /></div><h3>{group.title}</h3><div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>; })}</div></section>

      <section id="gallery" className="gallery section-pad"><div className="section-kicker">Through my lens <span>/ 03</span></div><div className="section-heading-row gallery-heading"><h2>Moments behind<br /><em>the mission.</em></h2><p>A visual corner for the person, process, and little sparks that shape the work.</p></div><div className="photo-grid">{galleryPhotos.map((photo, index) => <motion.button type="button" className={`photo-card photo-${photo.tone}`} key={photo.label} onClick={() => setActivePhoto(index)} {...motionProps} transition={{ delay: index * 0.12 }} aria-label={`Open ${photo.label}`}><span className="photo-placeholder"><img src={photo.src} alt={photo.caption} onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="photo-cross" /><span className="photo-orbit" /></span><span className="photo-overlay"><span>{photo.label}</span><Expand size={17} /></span><span className="photo-caption">{photo.caption}</span></motion.button>)}</div><div className="photo-upload-panel"><input ref={photoInputRef} className="photo-input" type="file" accept="image/*" onChange={handlePhotoUpload} /><button type="button" className="button button-primary" onClick={() => photoInputRef.current?.click()}><Camera size={16} /> {uploadedPhoto ? "Change hero photo" : "Add your photo"}</button>{uploadedPhoto && <button type="button" className="photo-remove" onClick={() => setUploadedPhoto(null)}>Remove photo</button>}<p className="gallery-note"><Camera size={15} /> Upload a portrait and activate the Iron Man-inspired HUD effect.</p></div></section>

      <section id="projects" className="projects section-pad"><div className="section-kicker">Selected work <span>/ 03</span></div><div className="section-heading-row projects-heading"><h2>Proof of<br /><em>possibility.</em></h2><p>Every project is a chance to make something simpler, sharper, and more useful.</p></div><div className="filter-row" role="group" aria-label="Filter projects">{(["All", "Web Development", "SEO", "Mobile"] as ProjectCategory[]).map((item) => <button key={item} className={filter === item ? "filter-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => <motion.article className={`project-card accent-${project.accent}`} key={project.title} layout {...motionProps}><div className="project-top"><span>{project.number} / 05</span><ArrowUpRight size={19} /></div><div className="project-visual"><div className="mockup-window"><span /><span /><span /><img className="project-image" src={project.image} alt={`${project.title} project preview`} /></div></div><div className="project-info"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></motion.article>)}</div></section>

      <section id="experience" className="experience section-pad section-dark"><div className="section-kicker">The journey <span>/ 04</span></div><div className="experience-layout"><div><h2>Still early.<br /><em>Already moving.</em></h2><p className="experience-lead">A timeline of learning, building, and showing up for the work.</p></div><div className="timeline">{timeline.map((item, index) => { const Icon = item.icon; return <motion.div className="timeline-item" key={item.title} {...motionProps} transition={{ delay: index * 0.15 }}><div className="timeline-marker"><Icon size={16} /></div><div><span className="timeline-period">{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></div></motion.div>; })}</div></div><div className="education-strip"><Globe2 size={18} /><span>Education</span><strong>S1 Sistem Informasi · Universitas Trunojoyo Madura</strong><span className="education-status">Fresh graduate</span></div></section>

      <section id="contact" className="contact section-pad"><div className="section-kicker">Open channel <span>/ 05</span></div><div className="contact-layout"><div><h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2><p className="contact-lead">Have a project, an idea, or a challenge worth solving? Send a signal. I&apos;d love to hear about it.</p><div className="social-links"><a href="mailto:indrasaya520@gmail.com"><Mail size={17} /> indrasaya520@gmail.com</a><a href="tel:+6285257433490"><Users size={17} /> 085-257-433-490</a><a href="/uploads/CV_INDRA%20KURNIAWAN_MAGANGHUB%202%20.pdf" target="_blank" rel="noreferrer"><Download size={17} /> Download CV <ArrowUpRight size={14} /></a></div></div><form className="contact-form" onSubmit={submitContact}><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label><label>Message<textarea name="message" placeholder="Tell me a little about your project..." rows={4} required /></label><button className="button button-primary" type="submit">{sent ? <><Check size={17} /> Signal received</> : <>Send a signal <Send size={16} /></>}</button>{sent && <p className="form-note">Thanks — your message is ready to start the conversation.</p>}</form></div></section>

      <footer className="site-footer"><a href="#home" className="brand"><span className="brand-mark">I</span><span>INDRA<span className="brand-dot">{"//"}</span>HERO</span></a><span>Designed & built with intent · 2025</span><a href="#home" className="back-top"><MousePointer2 size={15} /> Back to top</a></footer>

      {activePhoto !== null && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Photo preview" onClick={() => setActivePhoto(null)}><div className="lightbox-panel" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" type="button" onClick={() => setActivePhoto(null)} aria-label="Close photo preview"><X size={20} /></button><div className={`lightbox-art photo-${galleryPhotos[activePhoto].tone}`}><span className="photo-placeholder"><img src={galleryPhotos[activePhoto].src} alt={galleryPhotos[activePhoto].caption} /><span className="photo-cross" /><span className="photo-orbit" /></span></div><div className="lightbox-meta"><div><span>{galleryPhotos[activePhoto].label}</span><h3>{galleryPhotos[activePhoto].caption}</h3></div><div className="lightbox-controls"><button type="button" onClick={() => navigatePhoto(-1)} aria-label="Previous photo"><ArrowLeft size={18} /></button><span>{String(activePhoto + 1).padStart(2, "0")} / {String(galleryPhotos.length).padStart(2, "0")}</span><button type="button" onClick={() => navigatePhoto(1)} aria-label="Next photo"><ArrowRight size={18} /></button></div></div></div></div>}

      {themeTransition && <div className={`theme-epic-overlay theme-epic-${theme}`} aria-hidden="true"><div className="theme-epic-burst" /><div className="theme-epic-villain"><div className="theme-epic-head"><span className="theme-epic-eye theme-epic-eye-left" /><span className="theme-epic-eye theme-epic-eye-right" /></div><div className="theme-epic-shoulders" /><div className="theme-epic-gauntlet"><span className="infinity-stone stone-space" /><span className="infinity-stone stone-mind" /><span className="infinity-stone stone-reality" /><span className="infinity-stone stone-power" /><span className="infinity-stone stone-time" /><span className="infinity-stone stone-soul" /></div></div><div className="theme-epic-copy"><strong>THANOS PROTOCOL</strong><span>{theme === "light" ? "LIGHT REALM" : "DARK REALM"}{" // "}INFINITY STONES ONLINE</span></div></div>}
    </main>
  );
}
