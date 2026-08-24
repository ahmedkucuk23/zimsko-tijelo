"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CHECKOUT_URL = "https://whop.com/zimsko-tijelo-7bd0/zimsko-tijelo-0e/";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <>
      {/* Preloader */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0d1820",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.6s ease, visibility 0.6s ease",
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
          pointerEvents: loaded ? "none" : "auto",
        }}
      >
        <Image
          src="/icon-color.png"
          alt=""
          width={60}
          height={60}
          style={{ animation: "pulse 1.2s ease-in-out infinite" }}
        />
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(13,24,32,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(199,218,231,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a href="#">
          <Image
            src="/logo-white.png"
            alt="Zimsko Tijelo"
            width={160}
            height={36}
            style={{ height: scrolled ? 30 : 36, width: "auto", transition: "height 0.3s" }}
          />
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            width: 32,
            height: 24,
            position: "relative",
            zIndex: 200,
          }}
          className="mobile-menu-btn"
        >
          <span style={{ display: "block", position: "absolute", left: 0, width: "100%", height: 2, background: "#fff", transition: "all 0.3s", ...(menuOpen ? { top: "50%", transform: "translateY(-50%) rotate(45deg)" } : { top: 0 }) }} />
          <span style={{ display: "block", position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "100%", height: 2, background: "#fff", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", position: "absolute", left: 0, width: "100%", height: 2, background: "#fff", transition: "all 0.3s", ...(menuOpen ? { bottom: "50%", transform: "translateY(50%) rotate(-45deg)" } : { bottom: 0 }) }} />
        </button>
        <ul
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
          style={{
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            gap: 36,
          }}
        >
          <li><a href="#program" onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const }}>Program</a></li>
          <li><a href="#treneri" onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const }}>Treneri</a></li>
          <li><Link href="/planishrane" onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const }}>Plan ishrane</Link></li>
          <li>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{ background: "#567D90", color: "#fff", padding: "10px 24px", borderRadius: 40, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, textDecoration: "none" }}
            >
              Prijavi se
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image src="/training-squat.png" alt="Zimsko Tijelo trening" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} priority />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(180deg, rgba(13,24,32,0.3) 0%, rgba(13,24,32,0.1) 40%, rgba(13,24,32,0.5) 70%, rgba(13,24,32,0.95) 100%)" }} />
        <div className="container-main" style={{ position: "relative", zIndex: 3, paddingBottom: 80, width: "100%" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7", letterSpacing: 1, marginBottom: 16, opacity: 0, transform: "translateY(30px)", animation: "fadeUp 0.8s ease forwards 0.6s", fontSize: "clamp(14px, 1.5vw, 18px)" }}>
            Transformacija pocinje ove zime
          </p>
          <h1 style={{ fontWeight: 700, lineHeight: 0.95, letterSpacing: -2, marginBottom: 24, opacity: 0, transform: "translateY(30px)", animation: "fadeUp 0.8s ease forwards 0.8s", fontSize: "clamp(42px, 7vw, 96px)" }}>
            <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7" }}>Zimsko</em>
            <br />Tijelo
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40, opacity: 0, transform: "translateY(30px)", animation: "fadeUp 0.8s ease forwards 1s", fontSize: "clamp(15px, 1.5vw, 18px)" }}>
            Ne cekaj proljece. Pocni sada i docekaj ljeto u najboljoj formi svog zivota. Program treninga i ishrane kreiran da te transformise.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" as const, opacity: 0, transform: "translateY(30px)", animation: "fadeUp 0.8s ease forwards 1.2s" }}>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Zapocni transformaciju <span>&rarr;</span>
            </a>
            <a href="#program" className="btn-outline">Saznaj vise</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, opacity: 0, animation: "fadeUp 0.8s ease forwards 1.6s" }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #567D90, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#304256", borderTop: "1px solid rgba(199,218,231,0.08)", borderBottom: "1px solid rgba(199,218,231,0.08)" }}>
        <div className="container-main" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
            {[
              { num: "12", label: "Sedmica programa" },
              { num: "500+", label: "Transformacija" },
              { num: "2", label: "Eksperta za tebe" },
            ].map((s, i) => (
              <div key={s.label} className={`reveal ${i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : ""}`} style={{ textAlign: "center" as const, padding: "40px 20px" }}>
                <div style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, color: "#C7DAE7", lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: "#0d1820" }} id="rezultati">
        <div className="container-main section-pad">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <p className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" as const, color: "#567D90", marginBottom: 20 }}>O programu</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 24 }}>
                Pripremi tijelo<br /><em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7" }}>dok svi cekaju</em>
              </h2>
              <p className="reveal reveal-delay-2" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
                <strong style={{ color: "#fff", fontWeight: 600 }}>Zimsko Tijelo</strong> je vise od programa - to je sistem koji te vodi kroz zimu sa jasnim planom treninga, ishrane i oporavka. Dok drugi odlazu, ti gradi navike koje ce te dovesti do rezultata.
              </p>
              <p className="reveal reveal-delay-3" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
                Svaki trening je pazljivo osmisljen, svaki obrok planiran. <strong style={{ color: "#fff", fontWeight: 600 }}>Ana i Bezdrob</strong> donose godine iskustva u jedinstven pristup koji radi - dokazano na stotinama klijenata.
              </p>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary reveal reveal-delay-4" style={{ marginTop: 24 }}>
                Pridruzi se <span>&rarr;</span>
              </a>
            </div>
            <div className="reveal" style={{ position: "relative" }}>
              <Image src="/team-standing.png" alt="Ana i Bezdrob" width={600} height={800} style={{ width: "100%", borderRadius: 16, objectFit: "cover", aspectRatio: "3/4" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid rgba(199,218,231,0.1)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section style={{ background: "linear-gradient(180deg, #0d1820 0%, #1a2a38 100%)" }} id="program">
        <div className="container-main section-pad">
          <p className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" as const, color: "#567D90", marginBottom: 20 }}>Sta dobijas</p>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 64 }}>
            Sve sto ti treba<br /><em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7" }}>na jednom mjestu</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M6 5v14M18 5v14M6 12h12M3 8h3M3 16h3M18 8h3M18 16h3"/></svg>, title: "Plan treninga", desc: "Strukturirani treninzi prilagodjeni tvom nivou. Progresivno opterecenje za konstantan napredak kroz svih 12 sedmica." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: "Plan ishrane", desc: "Detaljan plan obroka sa receptima. Ukusna i jednostavna ishrana koja podrzava tvoje ciljeve bez nepotrebnih restrikcija." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: "Grupna podrska", desc: "Pristup zatvorenoj grupi sa direktnom komunikacijom. Motivacija, odgovori na pitanja i zajednica koja te gura naprijed." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: "Sedmicni check-in", desc: "Redovne provjere napretka sa individualiziranim feedbackom. Nisi sam/a - pratimo tvoj put od pocetka do kraja." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>, title: "Edukacija", desc: "Nauci principe treninga i ishrane koji ce ti sluziti zauvijek. Razumij zasto radis to sto radis - znanje je trajno." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>, title: "Video demonstracije", desc: "Svaka vjezba dolazi sa detaljnom video demonstracijom. Pravilna tehnika znaci bolje rezultate i manje povreda." },
            ].map((card, i) => (
              <div key={card.title} className={`reveal ${i % 3 === 1 ? "reveal-delay-1" : i % 3 === 2 ? "reveal-delay-2" : ""} program-card`}
                style={{ background: "rgba(199,218,231,0.04)", border: "1px solid rgba(199,218,231,0.08)", borderRadius: 20, padding: "48px 36px", transition: "all 0.4s ease", position: "relative", overflow: "hidden" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(86,125,144,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>{card.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>{card.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section style={{ background: "#1a2a38" }} id="treneri">
        <div className="container-main section-pad">
          <p className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" as const, color: "#567D90", marginBottom: 20 }}>Tvoji treneri</p>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 64 }}>
            Iskustvo koje<br /><em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7" }}>pravi razliku</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 64, alignItems: "center" }}>
            <div className="reveal" style={{ position: "relative" }}>
              <Image src="/team-sitting.png" alt="Ana Bavrka i Bezdrob" width={800} height={600} style={{ width: "100%", borderRadius: 20, objectFit: "cover", aspectRatio: "4/3" }} />
            </div>
            <div>
              <h3 className="reveal" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 8 }}>Ana Bavrka & Bezdrob</h3>
              <p className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, color: "#567D90", marginBottom: 24 }}>Certificirani treneri & nutricionisti</p>
              <p className="reveal reveal-delay-2" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Zajedno kombinuju godine iskustva u treningu i ishrani kako bi kreirali programe koji zaista funkcionisu. Njihov pristup je direktan, iskren i baziran na nauci - bez trikova i laznih obecanja.
              </p>
              <p className="reveal reveal-delay-3" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Stotine klijenata je proslo kroz njihove programe i postiglo rezultate koji traju. Sada je tvoj red.
              </p>
              <div className="reveal reveal-delay-4" style={{ display: "flex", gap: 32, flexWrap: "wrap" as const, marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(199,218,231,0.1)" }}>
                {[
                  { val: "10+", label: "Godina iskustva" },
                  { val: "500+", label: "Klijenata" },
                  { val: "98%", label: "Zadovoljstvo" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: "#C7DAE7" }}>{c.val}</span>
                    <span style={{ fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 2, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{ background: "#304256" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))" }}>
          {[
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Dokazana metoda", desc: "Sistem baziran na nauci i prakticnom iskustvu" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, title: "Zajednica", desc: "Motivacija i podrska grupe koja te razumije" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, title: "Fleksibilnost", desc: "Prilagodi program svom rasporedu i zivotu" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Pracenje napretka", desc: "Mjerljivi rezultati svake sedmice" },
          ].map((f, i) => (
            <div key={f.title} className={`reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}
              style={{ padding: "56px 36px", textAlign: "center" as const, borderRight: "1px solid rgba(199,218,231,0.08)", borderBottom: "1px solid rgba(199,218,231,0.08)" }}>
              <span style={{ display: "block", marginBottom: 20 }}>{f.icon}</span>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{f.title}</h4>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ background: "#1a2a38", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", textAlign: "center" as const }}>
          <div className="reveal" style={{ fontFamily: "var(--font-serif)", fontSize: 120, color: "#567D90", lineHeight: 0.5, opacity: 0.3, marginBottom: 20 }}>&ldquo;</div>
          <p className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.5, color: "#C7DAE7", marginBottom: 32 }}>
            Najbolje vrijeme da pocnes je bilo jucer. Drugo najbolje vrijeme je danas. Ova zima je tvoja prilika.
          </p>
          <p className="reveal reveal-delay-2" style={{ fontSize: 14, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Ana & Bezdrob</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0d1820" }} id="prijava">
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image src="/ana-dumbbell.png" alt="" fill style={{ objectFit: "cover", opacity: 0.25 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d1820 0%, rgba(13,24,32,0.6) 50%, #0d1820 100%)" }} />
        </div>
        <div className="container-main" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 140, display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const }}>
          <Image src="/icon-color.png" alt="" width={56} height={56} className="reveal" style={{ marginBottom: 32, opacity: 0.6 }} />
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginBottom: 24 }}>
            Spreman/na za<br /><em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C7DAE7" }}>transformaciju?</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
            Prijave za novi ciklus Zimskog Tijela su otvorene. Osiguraj svoje mjesto i zapocni put ka najboljoj verziji sebe.
          </p>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary reveal reveal-delay-3" style={{ fontSize: 14, padding: "18px 48px" }}>
            Prijavi se sada <span>&rarr;</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d1820", borderTop: "1px solid rgba(199,218,231,0.06)", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 24 }}>
          <Image src="/logo-white.png" alt="Zimsko Tijelo" width={120} height={28} style={{ height: 28, width: "auto", opacity: 0.5 }} />
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13, letterSpacing: 1 }}>Instagram</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13, letterSpacing: 1 }}>TikTok</a>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Zimsko Tijelo. Sva prava zadrzana.</p>
        </div>
      </footer>

      <style>{`
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          background: #567D90;
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .btn-primary:hover {
          background: #6a92a5;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(86,125,144,0.35);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .btn-outline:hover {
          border-color: #C7DAE7;
          color: #C7DAE7;
          transform: translateY(-2px);
        }
        .program-card:hover {
          background: rgba(199,218,231,0.07) !important;
          border-color: rgba(199,218,231,0.15) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .nav-links { display: none !important; }
          .nav-links.nav-open {
            display: flex !important;
            position: fixed;
            inset: 0;
            background: rgba(13,24,32,0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
          }
        }
      `}</style>
    </>
  );
}
