"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CHECKOUT_URL =
  "https://whop.com/zimsko-tijelo-7bd0/zimsko-tijelo-0e/";

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
        className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-all duration-600 ${
          loaded ? "opacity-0 invisible pointer-events-none" : ""
        }`}
      >
        <Image
          src="/icon-color.png"
          alt=""
          width={60}
          height={60}
          className="animate-[pulse_1.2s_ease-in-out_infinite]"
        />
      </div>

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? "py-3 px-6 md:px-12 bg-black/92 backdrop-blur-xl border-b border-ice/8"
            : "py-5 px-6 md:px-12"
        }`}
      >
        <a href="#">
          <Image
            src="/logo-white.png"
            alt="Zimsko Tijelo"
            width={160}
            height={36}
            className={`transition-all duration-300 ${scrolled ? "h-[30px] w-auto" : "h-[36px] w-auto"}`}
          />
        </a>
        <button
          className="md:hidden relative z-200 w-8 h-6 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`block absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </button>
        <ul
          className={`list-none flex items-center gap-9 ${
            menuOpen
              ? "!flex fixed inset-0 bg-black/98 backdrop-blur-xl flex-col items-center justify-center gap-8 z-100"
              : "hidden md:flex"
          }`}
        >
          <li>
            <a
              href="#program"
              onClick={() => setMenuOpen(false)}
              className="text-white/70 no-underline text-[13px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors"
            >
              Program
            </a>
          </li>
          <li>
            <a
              href="#treneri"
              onClick={() => setMenuOpen(false)}
              className="text-white/70 no-underline text-[13px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors"
            >
              Treneri
            </a>
          </li>
          <li>
            <a
              href="#rezultati"
              onClick={() => setMenuOpen(false)}
              className="text-white/70 no-underline text-[13px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors"
            >
              Rezultati
            </a>
          </li>
          <li>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="bg-steel text-white px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-[2px] uppercase hover:bg-steel/80 hover:-translate-y-0.5 transition-all"
            >
              Prijavi se
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-[1]">
          <Image
            src="/training-squat.png"
            alt="Zimsko Tijelo trening"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-black/10 via-40% via-black/50 via-70% to-black/95" />
        <div className="relative z-[3] px-6 md:px-12 pb-20 w-full max-w-[1400px] mx-auto">
          <p
            className="font-serif italic font-normal text-ice tracking-wide mb-4 opacity-0 translate-y-[30px]"
            style={{ animation: "fadeUp 0.8s ease forwards 0.6s", fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            Transformacija pocinje ove zime
          </p>
          <h1
            className="font-bold leading-[0.95] tracking-tight mb-6 opacity-0 translate-y-[30px]"
            style={{ animation: "fadeUp 0.8s ease forwards 0.8s", fontSize: "clamp(42px, 7vw, 96px)", letterSpacing: "-2px" }}
          >
            <em className="font-serif italic text-ice">Zimsko</em>
            <br />
            Tijelo
          </h1>
          <p
            className="text-white/60 max-w-[520px] leading-relaxed mb-10 opacity-0 translate-y-[30px]"
            style={{ animation: "fadeUp 0.8s ease forwards 1s", fontSize: "clamp(15px, 1.5vw, 18px)" }}
          >
            Ne cekaj proljece. Pocni sada i docekaj ljeto u najboljoj formi svog
            zivota. Program treninga i ishrane kreiran da te transformise.
          </p>
          <div
            className="flex gap-4 items-center flex-wrap opacity-0 translate-y-[30px]"
            style={{ animation: "fadeUp 0.8s ease forwards 1.2s" }}
          >
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-steel text-white font-bold text-[13px] tracking-[2px] uppercase no-underline hover:bg-steel/80 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(86,125,144,0.35)] transition-all duration-400 group"
            >
              Zapocni transformaciju
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
            <a
              href="#program"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-transparent text-white border border-white/25 font-bold text-[13px] tracking-[2px] uppercase no-underline hover:border-ice hover:text-ice hover:-translate-y-0.5 transition-all duration-400"
            >
              Saznaj vise
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-0"
          style={{ animation: "fadeUp 0.8s ease forwards 1.6s" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-steel to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy border-t border-b border-ice/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12">
          {[
            { num: "12", label: "Sedmica programa" },
            { num: "500+", label: "Transformacija" },
            { num: "2", label: "Eksperta za tebe" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`reveal text-center py-6 md:py-10 ${i < 2 ? "border-b md:border-b-0 border-ice/6" : ""} ${
                i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : ""
              }`}
            >
              <div
                className="font-bold text-ice leading-none mb-2"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                {s.num}
              </div>
              <div className="text-[13px] tracking-[2px] uppercase text-white/50 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="bg-black" id="rezultati">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-30 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="reveal text-[11px] font-bold tracking-[4px] uppercase text-steel mb-5">
              O programu
            </p>
            <h2
              className="reveal reveal-delay-1 font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 64px)", letterSpacing: "-1px" }}
            >
              Pripremi tijelo
              <br />
              <em className="font-serif italic text-ice">dok svi cekaju</em>
            </h2>
            <p className="reveal reveal-delay-2 text-[17px] leading-relaxed text-white/65 mb-5">
              <strong className="text-white font-semibold">Zimsko Tijelo</strong>{" "}
              je vise od programa - to je sistem koji te vodi kroz zimu sa jasnim
              planom treninga, ishrane i oporavka. Dok drugi odlazu, ti gradi
              navike koje ce te dovesti do rezultata.
            </p>
            <p className="reveal reveal-delay-3 text-[17px] leading-relaxed text-white/65 mb-5">
              Svaki trening je pazljivo osmisljen, svaki obrok planiran.{" "}
              <strong className="text-white font-semibold">
                Ana i Bezdrob
              </strong>{" "}
              donose godine iskustva u jedinstven pristup koji radi - dokazano na
              stotinama klijenata.
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal reveal-delay-4 inline-flex items-center gap-2.5 mt-6 px-9 py-4 rounded-full bg-steel text-white font-bold text-[13px] tracking-[2px] uppercase no-underline hover:bg-steel/80 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(86,125,144,0.35)] transition-all duration-400 group"
            >
              Pridruzi se
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
          <div className="reveal relative order-first md:order-last">
            <Image
              src="/team-standing.png"
              alt="Ana i Bezdrob"
              width={600}
              height={800}
              className="w-full rounded-2xl object-cover aspect-[3/4]"
            />
            <div className="absolute inset-0 rounded-2xl border border-ice/10 pointer-events-none" />
            <div className="absolute -top-5 -right-5 w-30 h-30 border border-steel/30 rounded-full hidden md:block" />
          </div>
        </div>
      </section>

      {/* Program */}
      <section
        className="bg-gradient-to-b from-black to-dark"
        id="program"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-30">
          <p className="reveal text-[11px] font-bold tracking-[4px] uppercase text-steel mb-5">
            Sta dobijas
          </p>
          <h2
            className="reveal reveal-delay-1 font-bold leading-[1.1] mb-16"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)", letterSpacing: "-1px" }}
          >
            Sve sto ti treba
            <br />
            <em className="font-serif italic text-ice">na jednom mjestu</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M6 5v14M18 5v14M6 12h12M3 8h3M3 16h3M18 8h3M18 16h3"/></svg>
                ),
                title: "Plan treninga",
                desc: "Strukturirani treninzi prilagodjeni tvom nivou. Progresivno opterecenje za konstantan napredak kroz svih 12 sedmica.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                ),
                title: "Plan ishrane",
                desc: "Detaljan plan obroka sa receptima. Ukusna i jednostavna ishrana koja podrzava tvoje ciljeve bez nepotrebnih restrikcija.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ),
                title: "Grupna podrska",
                desc: "Pristup zatvorenoj grupi sa direktnom komunikacijom. Motivacija, odgovori na pitanja i zajednica koja te gura naprijed.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                ),
                title: "Sedmicni check-in",
                desc: "Redovne provjere napretka sa individualiziranim feedbackom. Nisi sam/a - pratimo tvoj put od pocetka do kraja.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                ),
                title: "Edukacija",
                desc: "Nauci principe treninga i ishrane koji ce ti sluziti zauvijek. Razumij zasto radis to sto radis - znanje je trajno.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#567D90" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                ),
                title: "Video demonstracije",
                desc: "Svaka vjezba dolazi sa detaljnom video demonstracijom. Pravilna tehnika znaci bolje rezultate i manje povreda.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`reveal ${i % 3 === 1 ? "reveal-delay-1" : i % 3 === 2 ? "reveal-delay-2" : ""} group relative overflow-hidden bg-ice/4 border border-ice/8 rounded-2xl p-10 md:p-12 transition-all duration-400 hover:bg-ice/7 hover:border-ice/15 hover:-translate-y-1`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-steel to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="w-14 h-14 rounded-[14px] bg-steel/15 flex items-center justify-center mb-7">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3.5 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/50">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="bg-dark" id="treneri">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-30">
          <p className="reveal text-[11px] font-bold tracking-[4px] uppercase text-steel mb-5">
            Tvoji treneri
          </p>
          <h2
            className="reveal reveal-delay-1 font-bold leading-[1.1] mb-16"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)", letterSpacing: "-1px" }}
          >
            Iskustvo koje
            <br />
            <em className="font-serif italic text-ice">pravi razliku</em>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div className="reveal relative">
              <Image
                src="/team-sitting.png"
                alt="Ana Bavrka i Bezdrob"
                width={800}
                height={600}
                className="w-full rounded-2xl object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-3 -left-3 right-10 top-10 border border-steel/20 rounded-2xl -z-1 hidden lg:block" />
            </div>
            <div>
              <h3
                className="reveal font-bold mb-2"
                style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                Ana Bavrka & Bezdrob
              </h3>
              <p className="reveal reveal-delay-1 font-serif italic text-steel text-base mb-6">
                Certificirani treneri & nutricionisti
              </p>
              <p className="reveal reveal-delay-2 text-base leading-relaxed text-white/60 mb-4">
                Zajedno kombinuju godine iskustva u treningu i ishrani kako bi
                kreirali programe koji zaista funkcionisu. Njihov pristup je
                direktan, iskren i baziran na nauci - bez trikova i laznih
                obecanja.
              </p>
              <p className="reveal reveal-delay-3 text-base leading-relaxed text-white/60 mb-4">
                Stotine klijenata je proslo kroz njihove programe i postiglo
                rezultate koji traju. Sada je tvoj red.
              </p>
              <div className="reveal reveal-delay-4 flex gap-8 flex-wrap mt-8 pt-8 border-t border-ice/10">
                {[
                  { val: "10+", label: "Godina iskustva" },
                  { val: "500+", label: "Klijenata" },
                  { val: "98%", label: "Zadovoljstvo" },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col gap-1">
                    <span className="text-[28px] font-bold text-ice">
                      {c.val}
                    </span>
                    <span className="text-[12px] uppercase tracking-[2px] text-white/40 font-semibold">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-navy">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ),
              title: "Dokazana metoda",
              desc: "Sistem baziran na nauci i prakticnom iskustvu",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              ),
              title: "Zajednica",
              desc: "Motivacija i podrska grupe koja te razumije",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ),
              title: "Fleksibilnost",
              desc: "Prilagodi program svom rasporedu i zivotu",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C7DAE7" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              ),
              title: "Pracenje napretka",
              desc: "Mjerljivi rezultati svake sedmice",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`reveal ${
                i > 0 ? `reveal-delay-${i}` : ""
              } py-14 px-9 text-center lg:text-center border-b sm:border-b lg:border-b-0 border-ice/8 ${
                i < 3 ? "sm:border-r lg:border-r border-ice/8" : ""
              } ${i % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} lg:odd:border-r hover:bg-ice/4 transition-colors`}
            >
              <span className="block mb-5">{f.icon}</span>
              <h4 className="text-base font-bold mb-2.5">{f.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-dark overflow-hidden">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-20 md:py-30 text-center">
          <div className="reveal font-serif text-[120px] text-steel leading-[0.5] opacity-30 mb-5">
            &ldquo;
          </div>
          <p
            className="reveal reveal-delay-1 font-serif italic leading-relaxed text-ice mb-8"
            style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
          >
            Najbolje vrijeme da pocnes je bilo jucer. Drugo najbolje vrijeme je
            danas. Ova zima je tvoja prilika.
          </p>
          <p className="reveal reveal-delay-2 text-sm tracking-[3px] uppercase text-white/40 font-semibold">
            Ana & Bezdrob
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-black" id="prijava">
        <div className="absolute inset-0 z-[1]">
          <Image
            src="/ana-dumbbell.png"
            alt=""
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>
        <div className="relative z-[2] max-w-[1400px] mx-auto px-6 md:px-12 py-36 md:py-44 flex flex-col items-center text-center">
          <Image
            src="/icon-color.png"
            alt=""
            width={56}
            height={56}
            className="reveal mb-8 opacity-60"
          />
          <h2
            className="reveal reveal-delay-1 font-bold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-2px" }}
          >
            Spreman/na za
            <br />
            <em className="font-serif italic text-ice">transformaciju?</em>
          </h2>
          <p className="reveal reveal-delay-2 text-[17px] text-white/55 max-w-[560px] leading-relaxed mb-12">
            Prijave za novi ciklus Zimskog Tijela su otvorene. Osiguraj svoje
            mjesto i zapocni put ka najboljoj verziji sebe.
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-3 inline-flex items-center gap-2.5 px-12 py-[18px] rounded-full bg-steel text-white font-bold text-sm tracking-[2px] uppercase no-underline hover:bg-steel/80 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(86,125,144,0.35)] transition-all duration-400 group"
          >
            Prijavi se sada
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-ice/6 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <Image
              src="/logo-white.png"
              alt="Zimsko Tijelo"
              width={120}
              height={28}
              className="h-7 w-auto opacity-50"
            />
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-white/30 no-underline text-[13px] tracking-wider hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white/30 no-underline text-[13px] tracking-wider hover:text-white transition-colors"
            >
              TikTok
            </a>
          </div>
          <p className="text-[13px] text-white/25">
            &copy; 2026 Zimsko Tijelo. Sva prava zadrzana.
          </p>
        </div>
      </footer>
    </>
  );
}
