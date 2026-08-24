"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CHECKOUT_URL = "https://whop.com/zimsko-tijelo-7bd0/zimsko-tijelo-0e/";

type Gender = "musko" | "zensko";
type Goal = "mrsavljenje" | "odrzavanje" | "masa";
type Activity = "sjedilacki" | "umjereno" | "aktivan" | "veoma";

function calcMacros(gender: Gender, weight: number, height: number, age: number, activity: Activity, goal: Goal) {
  const bmr = gender === "musko"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const mult = { sjedilacki: 1.2, umjereno: 1.375, aktivan: 1.55, veoma: 1.725 };
  const adj = { mrsavljenje: -400, odrzavanje: 0, masa: 300 };
  const cal = Math.round(bmr * mult[activity] + adj[goal]);
  const prot = Math.round(weight * (goal === "masa" ? 2.0 : goal === "mrsavljenje" ? 2.2 : 1.8));
  const fat = Math.round((cal * 0.25) / 9);
  const carbs = Math.round((cal - prot * 4 - fat * 9) / 4);
  return { calories: cal, protein: prot, fat, carbs };
}

interface Meal { time: string; name: string; cal: number; protein: number; icon: string; }

function genPlan(cal: number, prot: number): { day: string; meals: Meal[] }[] {
  const days = ["Ponedjeljak", "Utorak", "Srijeda", "Cetvrtak", "Petak", "Subota", "Nedjelja"];
  const names = [
    [{ t: "Dorucak", n: "Zobena kasa sa bananom i orasima", i: "🥣" }, { t: "Uzina", n: "Grcki jogurt sa medom i borovnicama", i: "🫐" }, { t: "Rucak", n: "Pileca prsa sa ruzom i povrcem", i: "🍗" }, { t: "Uzina", n: "Proteinski sejk sa kikiriki puterom", i: "🥤" }, { t: "Vecera", n: "Losos sa slatkim krompirom i salatom", i: "🐟" }],
    [{ t: "Dorucak", n: "Omlet sa povrcem i sirom (3 jaja)", i: "🍳" }, { t: "Uzina", n: "Jabuka sa bademovim puterom", i: "🍎" }, { t: "Rucak", n: "Tuna salata sa kvinojom i avokadoom", i: "🥗" }, { t: "Uzina", n: "Cottage cheese sa orasima", i: "🧀" }, { t: "Vecera", n: "Curetina sa integralnom tjesteninom", i: "🍝" }],
    [{ t: "Dorucak", n: "Palacinke od banana i jaja sa medom", i: "🥞" }, { t: "Uzina", n: "Smoothie sa spinatom i proteinima", i: "🥤" }, { t: "Rucak", n: "Govedji biftek sa krompirom i brokolijem", i: "🥩" }, { t: "Uzina", n: "Rice cake sa humusom", i: "🍘" }, { t: "Vecera", n: "Pileci wrap sa povrcem i tzatzikijem", i: "🌯" }],
    [{ t: "Dorucak", n: "Overnight oats sa chia sjemenkama", i: "🥣" }, { t: "Uzina", n: "Kuhano jaje i avokado na tostu", i: "🥑" }, { t: "Rucak", n: "Pileci burito bowl sa pirincem", i: "🥘" }, { t: "Uzina", n: "Proteinska plocica i banana", i: "🍌" }, { t: "Vecera", n: "Bijela riba sa salatom i maslinovim uljem", i: "🐟" }],
    [{ t: "Dorucak", n: "Skramblana jaja sa toskanom kobasicom", i: "🍳" }, { t: "Uzina", n: "Vocni mix sa bademima", i: "🥜" }, { t: "Rucak", n: "Curecji medaljoni sa kusom i povrcem", i: "🍽️" }, { t: "Uzina", n: "Grcki jogurt sa granolom", i: "🥄" }, { t: "Vecera", n: "Pasta sa lososom i kremastim sosom", i: "🍝" }],
    [{ t: "Dorucak", n: "Avokado tost sa jajima i cherry paradajzom", i: "🥑" }, { t: "Uzina", n: "Proteinski muffin sa borovnicama", i: "🧁" }, { t: "Rucak", n: "Grilled pileca salata sa feta sirom", i: "🥗" }, { t: "Uzina", n: "Hummus sa povrcem", i: "🥕" }, { t: "Vecera", n: "Steak sa pecenim povrcem", i: "🥩" }],
    [{ t: "Dorucak", n: "French toast sa vocem i sirupom", i: "🍞" }, { t: "Uzina", n: "Smoothie bowl sa granolom", i: "🍇" }, { t: "Rucak", n: "Pecena piletina sa povrcem iz rerne", i: "🍗" }, { t: "Uzina", n: "Cottage cheese sa ananasom", i: "🍍" }, { t: "Vecera", n: "Lazanje sa mljevenim mesom i sirom", i: "🧀" }],
  ];
  const splits = [0.22, 0.10, 0.30, 0.12, 0.26];
  const protSplits = [0.15, 0.10, 0.30, 0.15, 0.30];
  return days.map((day, d) => ({
    day,
    meals: names[d].map((m, j) => ({
      time: m.t, name: m.n, icon: m.i,
      cal: Math.round(cal * splits[j]),
      protein: Math.round(prot * protSplits[j]),
    })),
  }));
}

const TOTAL_STEPS = 4;

export default function PlanIshrane() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = steps
  const [dir, setDir] = useState(1); // 1=forward, -1=back

  const [gender, setGender] = useState<Gender | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState<Activity | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const [showResults, setShowResults] = useState(false);
  const [macros, setMacros] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });
  const [plans, setPlans] = useState<{ day: string; meals: Meal[] }[]>([]);
  const [activeDay, setActiveDay] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [showResults, activeDay]);

  function next() {
    if (step === 0) { setDir(1); setStep(1); return; }
    if (step === 1 && !gender) return;
    if (step === 2 && (!weight || !height || !age)) return;
    if (step === 3 && !activity) return;
    if (step === 4 && !goal) return;

    if (step === TOTAL_STEPS) {
      const m = calcMacros(gender!, parseFloat(weight), parseFloat(height), parseInt(age), activity!, goal!);
      setMacros(m);
      setPlans(genPlan(m.calories, m.protein));
      setActiveDay(0);
      setShowResults(true);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    if (step <= 1) return;
    setDir(-1);
    setStep((s) => s - 1);
  }

  const canNext =
    step === 0 ||
    (step === 1 && !!gender) ||
    (step === 2 && !!weight && !!height && !!age) ||
    (step === 3 && !!activity) ||
    (step === 4 && !!goal);

  const currentPlan = plans[activeDay];

  const stepTitles = ["Spol", "Tijelo", "Aktivnost", "Cilj"];

  return (
    <>
      {/* Onboarding */}
      {!showResults && (
        <section className="onboarding">
          <div className="onboarding-inner">
            {/* Progress - only show for steps 1-4 */}
            {step > 0 && (
              <div className="ob-progress">
                <div className="ob-progress-bar">
                  <div className="ob-progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
                </div>
                <div className="ob-steps-labels">
                  {stepTitles.map((t, i) => (
                    <span key={t} className={`ob-step-label ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
                      <span className="ob-step-num">{step > i + 1 ? "✓" : i + 1}</span>
                      <span className="ob-step-text">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step content */}
            <div className="ob-content" key={step} style={{ animation: `stepSlide${dir > 0 ? "In" : "Back"} 0.35s ease forwards` }}>

              {step === 0 && (
                <div className="ob-step" style={{ textAlign: "left" }}>
                  <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <Image src="/icon-color.png" alt="" width={44} height={44} style={{ opacity: 0.5, marginBottom: 20 }} />
                    <h2 className="ob-title">Plan <span className="serif">ishrane</span></h2>
                  </div>

                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24 }}>
                    Ne postoji jedan plan ishrane za sve. Tvoje tijelo, tvoja aktivnost i tvoj cilj odredjuju sta ti zapravo treba &ndash; zato smo napravili alat koji to racuna za tebe, u par sekundi.
                  </p>

                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#C7DAE7" }}>Kako funkcionise:</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 28 }}>
                    Unosis svoje podatke (tezinu, visinu, godine, nivo aktivnosti) i alat po Mifflin-St Jeor formuli &ndash; naucno priznatoj metodi za racunanje energetskih potreba &ndash; izracunava tvoj personalizovani plan ishrane.
                  </p>

                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#C7DAE7" }}>Kako da ga koristis:</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {[
                      "Unesi trazene podatke \u2013 budi iskren/a, rezultat je onoliko tacan koliko su podaci tacni",
                      "Dobijas svoj plan, prilagodjen tebi",
                      "Preuzmi ga, isprintaj ili sacuvaj na telefonu \u2013 kako god ti najvise odgovara da ga imas pri ruci",
                      "Vrati se i provjeri ponovo svake 2 sedmice ili kad upises mjere (str. 18) \u2013 ako se tvoja tezina ili aktivnost promijene, plan treba da prati tvoje tijelo, ne obrnuto",
                    ].map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(86,125,144,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#567D90", flexShrink: 0 }}>{i + 1}</span>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, paddingTop: 3 }}>{t}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "rgba(86,125,144,0.08)", border: "1px solid rgba(86,125,144,0.15)", borderRadius: 14, padding: "20px 24px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
                      <strong style={{ color: "#C7DAE7" }}>Ovo nije dijeta.</strong> Ovo je gorivo koje gradi tijelo koje zelis &ndash; okvir koji ti daje jasnocu koliko ti treba i kako to rasporediti tokom dana, da Zimski program i ishrana rade zajedno, ne jedno protiv drugog.
                    </p>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="ob-step">
                  <p className="label" style={{ marginBottom: 12, textAlign: "center" }}>Korak 1 od 4</p>
                  <h2 className="ob-title">Koji je tvoj <span className="serif">spol?</span></h2>
                  <p className="ob-desc">Ovo nam pomaze da preciznije izracunamo tvoje kaloricne potrebe.</p>
                  <div className="ob-options-2">
                    <button className={`ob-option-card ${gender === "musko" ? "selected" : ""}`} onClick={() => setGender("musko")}>
                      <span className="ob-option-icon">♂</span>
                      <span className="ob-option-label">Musko</span>
                    </button>
                    <button className={`ob-option-card ${gender === "zensko" ? "selected" : ""}`} onClick={() => setGender("zensko")}>
                      <span className="ob-option-icon">♀</span>
                      <span className="ob-option-label">Zensko</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="ob-step">
                  <p className="label" style={{ marginBottom: 12, textAlign: "center" }}>Korak 2 od 4</p>
                  <h2 className="ob-title">Tvoji <span className="serif">podatci</span></h2>
                  <p className="ob-desc">Unesite tezinu, visinu i godine kako bismo izracunali bazalni metabolizam.</p>
                  <div className="ob-inputs">
                    <div className="ob-input-group">
                      <label className="form-label">Tezina</label>
                      <div className="ob-input-wrap">
                        <input type="number" className="form-input" placeholder="75" value={weight} onChange={(e) => setWeight(e.target.value)} min={30} max={250} autoFocus />
                        <span className="ob-input-unit">kg</span>
                      </div>
                    </div>
                    <div className="ob-input-group">
                      <label className="form-label">Visina</label>
                      <div className="ob-input-wrap">
                        <input type="number" className="form-input" placeholder="178" value={height} onChange={(e) => setHeight(e.target.value)} min={120} max={230} />
                        <span className="ob-input-unit">cm</span>
                      </div>
                    </div>
                    <div className="ob-input-group">
                      <label className="form-label">Godine</label>
                      <div className="ob-input-wrap">
                        <input type="number" className="form-input" placeholder="28" value={age} onChange={(e) => setAge(e.target.value)} min={14} max={80} />
                        <span className="ob-input-unit">god</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="ob-step">
                  <p className="label" style={{ marginBottom: 12, textAlign: "center" }}>Korak 3 od 4</p>
                  <h2 className="ob-title">Koliko si <span className="serif">aktivan/na?</span></h2>
                  <p className="ob-desc">Odaberi nivo koji najbolje opisuje tvoj svakodnevni zivot i trening.</p>
                  <div className="ob-options-list">
                    {([
                      ["sjedilacki", "Sjedilacki", "Malo ili nimalo vjezbe, kancelarijski posao"],
                      ["umjereno", "Umjereno aktivan", "Trening 3-4x sedmicno"],
                      ["aktivan", "Aktivan", "Trening 5-6x sedmicno"],
                      ["veoma", "Veoma aktivan", "Svaki dan + fizicki posao"],
                    ] as const).map(([val, label, desc]) => (
                      <button key={val} className={`ob-list-option ${activity === val ? "selected" : ""}`} onClick={() => setActivity(val)}>
                        <div className="ob-list-radio"><div className="ob-list-radio-dot" /></div>
                        <div>
                          <div className="ob-list-label">{label}</div>
                          <div className="ob-list-desc">{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="ob-step">
                  <p className="label" style={{ marginBottom: 12, textAlign: "center" }}>Korak 4 od 4</p>
                  <h2 className="ob-title">Koji je tvoj <span className="serif">cilj?</span></h2>
                  <p className="ob-desc">Na osnovu cilja prilagodjavamo kalorije i raspodjelu makronutrijenata.</p>
                  <div className="ob-goal-cards">
                    {([
                      ["mrsavljenje", "Mrsavljenje", "Gubitak masti uz ocuvanje misicne mase", "🔥"],
                      ["odrzavanje", "Odrzavanje", "Zadrzi formu i trenutnu tezinu", "⚖️"],
                      ["masa", "Izgradnja mase", "Rast misica uz kontrolirani visak kalorija", "💪"],
                    ] as const).map(([val, label, desc, emoji]) => (
                      <button key={val} className={`ob-goal-card ${goal === val ? "selected" : ""}`} onClick={() => setGoal(val)}>
                        <span className="ob-goal-emoji">{emoji}</span>
                        <span className="ob-goal-label">{label}</span>
                        <span className="ob-goal-desc">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="ob-nav">
              {step > 1 ? (
                <button className="ob-back" onClick={back}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Nazad
                </button>
              ) : step === 1 ? (
                <button className="ob-back" onClick={back}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Nazad
                </button>
              ) : <div />}
              <button className={`btn btn-primary ${step === 0 || step === TOTAL_STEPS ? "btn-lg" : ""} ${!canNext ? "btn-disabled" : ""}`} onClick={next} disabled={!canNext}>
                {step === 0 ? "Zapocni" : step === TOTAL_STEPS ? "Izracunaj plan" : "Dalje"}
                <span className="btn-arrow">&rarr;</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {showResults && currentPlan && (
        <>
          <div ref={resultsRef} style={{ paddingTop: 80 }} />

          {/* Macros */}
          <section style={{ background: "#304256" }}>
            <div className="wrap" style={{ paddingTop: 64, paddingBottom: 64 }}>
              <p className="label reveal" style={{ textAlign: "center", marginBottom: 8 }}>Tvoj personalizirani plan</p>
              <h2 className="subheading reveal" style={{ textAlign: "center", marginBottom: 48 }}>Dnevni <span className="serif">makronutrijenti</span></h2>
              <div className="macros-grid reveal">
                {[
                  { val: macros.calories, unit: "", label: "Kalorije", suffix: " kcal" },
                  { val: macros.protein, unit: "g", label: "Proteini", suffix: "" },
                  { val: macros.carbs, unit: "g", label: "Ugljikohidrati", suffix: "" },
                  { val: macros.fat, unit: "g", label: "Masti", suffix: "" },
                ].map((m) => (
                  <div key={m.label} className="macro-cell">
                    <div className="macro-val">{m.val}<span className="macro-unit">{m.unit || m.suffix}</span></div>
                    <div className="macro-label">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Reset */}
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button
                  onClick={() => { setShowResults(false); setStep(1); setGender(null); setWeight(""); setHeight(""); setAge(""); setActivity(null); setGoal(null); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  Ponovi izracun sa drugim podatcima
                </button>
              </div>
            </div>
          </section>

          {/* Day tabs */}
          <div className="day-tabs">
            <div className="wrap" style={{ display: "flex", padding: 0 }}>
              {plans.map((p, i) => (
                <button key={p.day} className={`day-tab ${activeDay === i ? "active" : ""}`} onClick={() => setActiveDay(i)}>
                  {p.day}
                </button>
              ))}
            </div>
          </div>

          {/* Meals */}
          <section style={{ background: "#0d1820" }}>
            <div className="wrap section">
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
                <h2 className="subheading">{currentPlan.day}</h2>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#567D90", fontSize: 15 }}>{macros.calories} kcal</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {currentPlan.meals.map((meal, i) => (
                  <div key={`${activeDay}-${i}`} className={`meal-row reveal ${i > 0 ? `reveal-d${Math.min(i, 5)}` : ""}`}>
                    <div className="meal-emoji">{meal.icon}</div>
                    <div>
                      <div className="meal-time">{meal.time}</div>
                      <div className="meal-name">{meal.name}</div>
                    </div>
                    <div className="meal-meta">
                      <div className="meal-cal">{meal.cal} kcal</div>
                      <div className="meal-prot">{meal.protein}g proteina</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="meal-total">
                <span style={{ fontWeight: 700, fontSize: 14 }}>Ukupno</span>
                <div style={{ display: "flex", gap: 24 }}>
                  <span style={{ fontWeight: 700, color: "#C7DAE7", fontSize: 15 }}>{currentPlan.meals.reduce((s, m) => s + m.cal, 0)} kcal</span>
                  <span style={{ fontWeight: 700, color: "#567D90", fontSize: 15 }}>{currentPlan.meals.reduce((s, m) => s + m.protein, 0)}g proteina</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: "#1a2a38" }}>
            <div className="wrap section" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Image src="/icon-color.png" alt="" width={48} height={48} className="reveal" style={{ opacity: 0.5, marginBottom: 28 }} />
              <h2 className="heading reveal" style={{ marginBottom: 20 }}>
                Kompletan plan sa receptima<br />dobijas <span className="serif">unutar programa</span>
              </h2>
              <p className="body reveal reveal-d1" style={{ maxWidth: 520, marginBottom: 40 }}>
                Ovo je pregled. Detaljne recepte, liste namirnica, zamjene i individualizirane prilagodbe dobijas kao clan Zimskog Tijela.
              </p>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg reveal reveal-d2">
                Pridruzi se sada <span className="btn-arrow">&rarr;</span>
              </a>
            </div>
          </section>
        </>
      )}


      <style>{`
        /* ─── ONBOARDING ─── */
        .onboarding {
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(170deg, #1a2a38 0%, #0d1820 50%, #111f2b 100%);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }
        .onboarding::before {
          content: '';
          position: absolute;
          top: -40%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(86,125,144,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .onboarding::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -15%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(48,66,86,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .onboarding-inner {
          width: 100%;
          max-width: 580px;
          position: relative;
          z-index: 2;
        }

        /* Progress */
        .ob-progress { margin-bottom: 48px; }
        .ob-progress-bar {
          height: 3px;
          background: rgba(199,218,231,0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .ob-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #567D90, #C7DAE7);
          border-radius: 99px;
          transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ob-steps-labels {
          display: flex;
          justify-content: space-between;
        }
        .ob-step-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          font-weight: 600;
          transition: color 0.3s;
        }
        .ob-step-label.active { color: var(--white); }
        .ob-step-label.done { color: var(--steel); }
        .ob-step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          background: rgba(199,218,231,0.06);
          border: 1px solid rgba(199,218,231,0.1);
          transition: all 0.3s;
        }
        .ob-step-label.active .ob-step-num {
          background: var(--steel);
          border-color: var(--steel);
          color: #fff;
        }
        .ob-step-label.done .ob-step-num {
          background: rgba(86,125,144,0.2);
          border-color: var(--steel);
          color: var(--steel);
        }
        .ob-step-text { display: none; }
        @media (min-width: 520px) {
          .ob-step-text { display: inline; }
        }

        /* Step content */
        .ob-content { min-height: 340px; }
        .ob-step { text-align: center; }
        .ob-title {
          font-size: clamp(28px, 5vw, 40px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.15;
        }
        .ob-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto 40px;
        }

        /* Step 1 - Gender cards */
        .ob-options-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 400px;
          margin: 0 auto;
        }
        .ob-option-card {
          background: rgba(199,218,231,0.04);
          border: 1.5px solid rgba(199,218,231,0.08);
          border-radius: 20px;
          padding: 36px 20px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          font-family: inherit;
          color: rgba(255,255,255,0.6);
        }
        .ob-option-card:hover {
          background: rgba(199,218,231,0.06);
          border-color: rgba(199,218,231,0.15);
          color: #fff;
        }
        .ob-option-card.selected {
          background: rgba(86,125,144,0.15);
          border-color: var(--steel);
          color: #fff;
          box-shadow: 0 0 0 1px var(--steel), 0 8px 32px rgba(86,125,144,0.15);
        }
        .ob-option-icon { font-size: 40px; }
        .ob-option-label { font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }

        /* Step 2 - Inputs */
        .ob-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          max-width: 480px;
          margin: 0 auto;
        }
        @media (max-width: 480px) {
          .ob-inputs { grid-template-columns: 1fr; max-width: 280px; }
        }
        .ob-input-group { text-align: left; }
        .ob-input-wrap {
          position: relative;
        }
        .ob-input-wrap .form-input {
          padding-right: 48px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          padding-top: 20px;
          padding-bottom: 20px;
          border-radius: 16px;
        }
        .ob-input-unit {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.25);
        }

        /* Step 3 - Activity list */
        .ob-options-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 480px;
          margin: 0 auto;
          text-align: left;
        }
        .ob-list-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: rgba(199,218,231,0.03);
          border: 1.5px solid rgba(199,218,231,0.07);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          color: #fff;
        }
        .ob-list-option:hover {
          background: rgba(199,218,231,0.06);
          border-color: rgba(199,218,231,0.12);
        }
        .ob-list-option.selected {
          background: rgba(86,125,144,0.12);
          border-color: var(--steel);
          box-shadow: 0 0 0 1px var(--steel);
        }
        .ob-list-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(199,218,231,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .ob-list-option.selected .ob-list-radio {
          border-color: var(--steel);
        }
        .ob-list-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--steel);
          transform: scale(0);
          transition: transform 0.2s;
        }
        .ob-list-option.selected .ob-list-radio-dot { transform: scale(1); }
        .ob-list-label { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
        .ob-list-desc { font-size: 13px; color: rgba(255,255,255,0.35); }

        /* Step 4 - Goal cards */
        .ob-goal-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 520px;
          margin: 0 auto;
        }
        @media (max-width: 560px) {
          .ob-goal-cards { grid-template-columns: 1fr; max-width: 320px; }
        }
        .ob-goal-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
          background: rgba(199,218,231,0.03);
          border: 1.5px solid rgba(199,218,231,0.07);
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          color: rgba(255,255,255,0.7);
        }
        .ob-goal-card:hover {
          background: rgba(199,218,231,0.06);
          border-color: rgba(199,218,231,0.12);
          color: #fff;
        }
        .ob-goal-card.selected {
          background: rgba(86,125,144,0.15);
          border-color: var(--steel);
          color: #fff;
          box-shadow: 0 0 0 1px var(--steel), 0 8px 32px rgba(86,125,144,0.15);
        }
        .ob-goal-emoji { font-size: 32px; }
        .ob-goal-label { font-size: 14px; font-weight: 700; }
        .ob-goal-desc { font-size: 11px; color: rgba(255,255,255,0.35); text-align: center; line-height: 1.4; }

        /* Nav buttons */
        .ob-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid rgba(199,218,231,0.06);
        }
        .ob-back {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: color 0.3s;
          padding: 8px 0;
        }
        .ob-back:hover { color: var(--white); }
        .btn-disabled {
          opacity: 0.3;
          pointer-events: none;
        }

        /* Animations */
        @keyframes stepSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepSlideBack {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
