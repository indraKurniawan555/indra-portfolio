"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, Code2,
  Download, Expand, GitBranch, Globe2, Camera, Users, Mail, Menu, Moon,
  MousePointer2, Palette, Rocket, Search, Send, Shield, Sparkles, Sun, X, Zap,
} from "lucide-react";

type Theme = "dark" | "light";
type ProjectCategory = "All" | "Web Development" | "SEO" | "Mobile";

const navItems = ["Home", "About", "Skills", "Gallery", "Projects", "Experience", "Contact"];
const skillGroups = [
  { label: "01 / Web Development", title: "Building the web", icon: Code2, skills: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "PHP", "WordPress"] },
  { label: "02 / Search & Strategy", title: "Growing visibility", icon: Search, skills: ["SEO Optimization", "Google Search Console", "Content Strategy", "Technical SEO"] },
  { label: "03 / Tools", title: "Thinking in systems", icon: Palette, skills: ["Kotlin", "SQL", "Python", "REST API", "Git", "Elementor"] },
];
const projects = [
  { number: "01", title: "Outbound Gresik", description: "Website experience for an outdoor activity brand, shaped around clear journeys and discoverability.", tags: ["WordPress", "Elementor", "SEO"], category: "SEO" as ProjectCategory, accent: "orange" },
  { number: "02", title: "Ayam Bakar Pak’D Blog", description: "A content platform connecting editorial storytelling, a focused visual identity, and search performance.", tags: ["WordPress", "Next.js", "Node.js"], category: "Web Development" as ProjectCategory, accent: "blue" },
  { number: "03", title: "Koperasi Desa Pongangan", description: "Information system concept designed to make cooperative operations more organized and accessible.", tags: ["Information System", "SQL", "Web"], category: "Web Development" as ProjectCategory, accent: "violet" },
  { number: "04", title: "Indonesian Culture", description: "An Android exploration of Indonesian culture, powered by a native experience and REST API integration.", tags: ["Kotlin", "REST API", "Android"], category: "Mobile" as ProjectCategory, accent: "pink" },
  { number: "05", title: "Technotainment", description: "A technology and entertainment platform with a clean content architecture and responsive interface.", tags: ["Laravel", "Tailwind CSS", "PHP"], category: "Web Development" as ProjectCategory, accent: "cyan" },
];
const timeline = [
  { period: "Recent", title: "SEO & Web Development Projects", description: "Working across content, technical SEO, and website builds to turn digital ideas into useful experiences.", icon: Rocket },
  { period: "Academic Journey", title: "Information Systems · Universitas Trunojoyo Madura", description: "Building a foundation across systems thinking, software development, data, and digital problem solving.", icon: BriefcaseBusiness },
];
const fadeUp: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } };
const photoSlots = [
  { label: "Portrait / 01", caption: "The person behind the pixels", tone: "portrait", src: "/photos/indra-portrait.jpg" },
  { label: "Field notes / 02", caption: "Learning by building", tone: "field", src: "/photos/indra-field.jpg" },
  { label: "Creative lab / 03", caption: "Ideas in motion", tone: "lab", src: "/photos/indra-lab.jpg" },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [sent, setSent] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

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
    setActivePhoto((current) => current === null ? 0 : (current + direction + photoSlots.length) % photoSlots.length);
  }
  const motionProps = reduceMotion ? {} : { variants: fadeUp, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.15 } };

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("indra-theme", nextTheme);
  }
  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Indra home"><span className="brand-mark">I</span><span>INDRA<span className="brand-dot">.</span></span></a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
        <div className="header-actions"><button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button><a className="header-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      </header>

      <section id="home" className="hero section-pad"><div className="hero-grid" aria-hidden="true" /><div className="hero-rail" aria-hidden="true"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
        <div className="hero-copy"><motion.div className="eyebrow" {...(reduceMotion ? {} : { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7 } })}><span className="eyebrow-line" /> Web Developer <span className="eyebrow-slash">/</span> SEO Specialist</motion.div>
          <motion.h1 {...(reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.7 } })}>Building digital<br />experiences with<br /><em>heroic impact.</em></motion.h1>
          <motion.p className="hero-intro" {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.35, duration: 0.7 } })}>I&apos;m Indra Kurniawan — a fresh graduate turning thoughtful ideas into fast, discoverable, and meaningful digital experiences.</motion.p>
          <motion.div className="hero-actions" {...(reduceMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.7 } })}><a className="button button-primary" href="#projects">Explore my projects <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#contact"><Download size={16} /> CV available on request</a></motion.div>
        </div>
        <motion.div className="hero-visual" aria-label="Abstract illustration of a technology hero" {...(reduceMotion ? {} : { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.15, duration: 1 } })}><div className="visual-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="hero-core"><span>IK</span></div><div className="core-beam beam-one" /><div className="core-beam beam-two" /><span className="signal signal-one"><Zap size={14} /></span><span className="signal signal-two"><Sparkles size={14} /></span><span className="signal signal-three" /><div className="visual-caption"><span>01</span><span>ENERGY ONLINE</span></div></motion.div>
        <div className="hero-bottom-note">Based in Indonesia · Available for opportunities</div>
      </section>

      <section id="about" className="about section-pad"><div className="section-kicker">About me <span>/ 01</span></div><div className="about-layout"><motion.h2 {...motionProps}>Not just building<br /><em>websites.</em></motion.h2><motion.div className="about-text" {...motionProps}><p className="lead">I build digital identities that feel clear, capable, and built to move forward.</p><p>As a fresh graduate in Information Systems from Universitas Trunojoyo Madura, I bring together development and search strategy. I care about the details behind a great website — how it works, how it feels, and how people find it.</p><a className="text-link" href="#skills">Discover my capabilities <ChevronRight size={16} /></a></motion.div></div><div className="about-note"><span className="note-icon"><Shield size={18} /></span><span>Curiosity is the superpower.<br /><strong>Craft is the mission.</strong></span></div></section>

      <section id="skills" className="skills section-pad section-dark"><div className="section-kicker">My arsenal <span>/ 02</span></div><div className="section-heading-row"><h2>Tools for turning<br /><em>ideas into impact.</em></h2><p>From interface to indexability, I work across the full digital experience.</p></div><div className="skill-grid">{skillGroups.map((group, index) => { const Icon = group.icon; return <motion.article className={`skill-card skill-card-${index + 1}`} key={group.label} {...motionProps} transition={{ delay: index * 0.1 }}><div className="skill-card-top"><span>{group.label}</span><Icon size={21} /></div><h3>{group.title}</h3><div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>; })}</div></section>

      <section id="gallery" className="gallery section-pad"><div className="section-kicker">Through my lens <span>/ 03</span></div><div className="section-heading-row gallery-heading"><h2>Moments behind<br /><em>the mission.</em></h2><p>A visual corner for the person, process, and little sparks that shape the work.</p></div><div className="photo-grid">{photoSlots.map((photo, index) => <motion.button type="button" className={`photo-card photo-${photo.tone}`} key={photo.label} onClick={() => setActivePhoto(index)} {...motionProps} transition={{ delay: index * 0.12 }} aria-label={`Open ${photo.label}`}><span className="photo-placeholder"><img src={photo.src} alt={photo.caption} onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="photo-cross" /><span className="photo-orbit" /></span><span className="photo-overlay"><span>{photo.label}</span><Expand size={17} /></span><span className="photo-caption">{photo.caption}</span></motion.button>)}</div><p className="gallery-note"><Camera size={15} /> Replace these framed placeholders with your own photos in <code>public/photos</code>.</p></section>

      <section id="projects" className="projects section-pad"><div className="section-kicker">Selected work <span>/ 03</span></div><div className="section-heading-row projects-heading"><h2>Proof of<br /><em>possibility.</em></h2><p>Every project is a chance to make something simpler, sharper, and more useful.</p></div><div className="filter-row" role="group" aria-label="Filter projects">{(["All", "Web Development", "SEO", "Mobile"] as ProjectCategory[]).map((item) => <button key={item} className={filter === item ? "filter-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => <motion.article className={`project-card accent-${project.accent}`} key={project.title} layout {...motionProps}><div className="project-top"><span>{project.number} / 05</span><ArrowUpRight size={19} /></div><div className="project-visual"><div className="mockup-window"><span /><span /><span /><div className="mockup-content"><div className="mockup-line" /><div className="mockup-line short" /><div className="mockup-block" /></div></div></div><div className="project-info"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></motion.article>)}</div></section>

      <section id="experience" className="experience section-pad section-dark"><div className="section-kicker">The journey <span>/ 04</span></div><div className="experience-layout"><div><h2>Still early.<br /><em>Already moving.</em></h2><p className="experience-lead">A timeline of learning, building, and showing up for the work.</p></div><div className="timeline">{timeline.map((item, index) => { const Icon = item.icon; return <motion.div className="timeline-item" key={item.title} {...motionProps} transition={{ delay: index * 0.15 }}><div className="timeline-marker"><Icon size={16} /></div><div><span className="timeline-period">{item.period}</span><h3>{item.title}</h3><p>{item.description}</p></div></motion.div>; })}</div></div><div className="education-strip"><Globe2 size={18} /><span>Education</span><strong>S1 Sistem Informasi · Universitas Trunojoyo Madura</strong><span className="education-status">Fresh graduate</span></div></section>

      <section id="contact" className="contact section-pad"><div className="section-kicker">Open channel <span>/ 05</span></div><div className="contact-layout"><div><h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2><p className="contact-lead">Have a project, an idea, or a challenge worth solving? Send a signal. I&apos;d love to hear about it.</p><div className="social-links"><a href="#contact"><Mail size={17} /> Email placeholder — replace me</a><a href="#contact"><Users size={17} /> LinkedIn placeholder <ArrowUpRight size={14} /></a><a href="#contact"><GitBranch size={17} /> GitHub placeholder <ArrowUpRight size={14} /></a><a href="#contact"><Camera size={17} /> Instagram placeholder <ArrowUpRight size={14} /></a></div></div><form className="contact-form" onSubmit={submitContact}><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label><label>Message<textarea name="message" placeholder="Tell me a little about your project..." rows={4} required /></label><button className="button button-primary" type="submit">{sent ? <><Check size={17} /> Signal received</> : <>Send a signal <Send size={16} /></>}</button>{sent && <p className="form-note">Thanks — your message is ready to start the conversation.</p>}</form></div></section>

      <footer className="site-footer"><a href="#home" className="brand"><span className="brand-mark">I</span><span>INDRA<span className="brand-dot">.</span></span></a><span>Designed & built with intent · 2025</span><a href="#home" className="back-top"><MousePointer2 size={15} /> Back to top</a></footer>

      {activePhoto !== null && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Photo preview" onClick={() => setActivePhoto(null)}><div className="lightbox-panel" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" type="button" onClick={() => setActivePhoto(null)} aria-label="Close photo preview"><X size={20} /></button><div className={`lightbox-art photo-${photoSlots[activePhoto].tone}`}><span className="photo-placeholder"><span className="photo-cross" /><span className="photo-orbit" /></span></div><div className="lightbox-meta"><div><span>{photoSlots[activePhoto].label}</span><h3>{photoSlots[activePhoto].caption}</h3></div><div className="lightbox-controls"><button type="button" onClick={() => navigatePhoto(-1)} aria-label="Previous photo"><ArrowLeft size={18} /></button><span>{String(activePhoto + 1).padStart(2, "0")} / {String(photoSlots.length).padStart(2, "0")}</span><button type="button" onClick={() => navigatePhoto(1)} aria-label="Next photo"><ArrowRight size={18} /></button></div></div></div></div>}
    </main>
  );
}
