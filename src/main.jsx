import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, ArrowUpRight, Cpu, Sparkles } from "lucide-react";
import "./styles.css";
import img07 from "../07.png";
import img08 from "../08.png";
import img09 from "../09.png";
import img10 from "../10.png";
import img11 from "../11.png";

const members = [
  {
    pin: "24KT5A0507",
    name: "Sri Harsha",
    number: "01",
    color: "#FFEA00",
    talents: ["bike Rider", "time management", "lover Boy"],
    special: "",
    image: img07,
    mobile: {
      model: "iQOO Z5",
      specs: ["128GB Storage", "6.67\" IPS LCD", "5000 mAh Battery"]
    },
    laptop: {
      model: "Dell",
      specs: ["i5 Processor", "512GB Storage", "15.6\" FHD Display", "42Wh Battery"]
    }
  },
  {
    pin: "24KT5A0510",
    name: "Praveen",
    number: "02",
    color: "#41FFA7",
    talents: ["handsome boy", "fair", "very smart"],
    special: "",
    image: img08,
    mobile: {
      model: "iQOO Z9x",
      specs: ["128GB Storage", "6.72\" IPS LCD", "6000 mAh Battery"]
    },
    laptop: {
      model: "HP Victus",
      specs: ["i5 Processor", "512GB Storage", "15.6\" FHD 144Hz", "70Wh Battery"]
    }
  },
  {
    pin: "24KT5A0510",
    name: "John",
    number: "03",
    color: "#54E6D4",
    talents: ["silent", "introvert", "cool"],
    special: "",
    image: img09,
    mobile: {
      model: "Samsung S21 FE",
      specs: ["8GB RAM", "128GB Storage", "6.4\" Dynamic AMOLED", "4500 mAh Battery"]
    },
    laptop: {
      model: "MacBook M4 Air",
      specs: ["16GB RAM", "256GB Storage", "13.6\" Liquid Retina", "52.6Wh Battery"]
    }
  },
  {
    pin: "24KT5A0510",
    name: "Charan",
    number: "04",
    color: "#B9FF3B",
    talents: ["nonstop", "funny", "mistakes"],
    special: "",
    image: img10,
    mobile: {
      model: "Moto G96 5G",
      specs: ["8GB RAM", "128GB Storage", "6.6\" IPS LCD 120Hz", "5000 mAh Battery"]
    },
    laptop: {
      model: "HP Base",
      specs: ["i3 Processor", "1TB Storage", "15.6\" HD Display", "41Wh Battery"]
    }
  },
  {
    pin: "24KT5A0510",
    name: "SURYA",
    number: "05",
    color: "#E0B4B0",
    talents: ["enjoy", "happy life", "chill"],
    special: "",
    image: img11,
    mobile: {
      model: "iQOO Z9s Pro",
      specs: ["8GB RAM", "128GB Storage", "6.77\" AMOLED 120Hz", "5500 mAh Battery"]
    },
    laptop: {
      model: "Infinix Silver Xero Book 13",
      specs: ["i5 Processor", "512GB Storage", "15.6\" FHD Display", "70Wh Battery"]
    }
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [intro, setIntro] = useState(true);
  const [direction, setDirection] = useState(1);
  const [hoverDevice, setHoverDevice] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const member = members[index];

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const go = (step) => {
    setDirection(step);
    setIndex((i) => (i + step + members.length) % members.length);
    setHoverDevice(null);
  };

  const cssVars = useMemo(() => ({ "--accent": member.color }), [member.color]);

  return (
    <main className="app" style={cssVars}>
      <div className="noise" />
      {intro ? (
        <section className="intro">
          <div className="intro-glow" />
          <div className="intro-mark">LE</div>
          <div className="intro-sub">
            <span>LATERAL</span>
            <span>ENTRIES</span>
          </div>
          <div className="intro-line" />
          <div className="intro-status"><span /> TEAM 2026</div>
        </section>
      ) : (
        <section className="experience">
          <header className="topbar">
            <div className="brand"><b>LE</b><span>LATERAL ENTRIES</span></div>
            <div className="counter">{String(index + 1).padStart(2, "0")} <i>/</i> 05</div>
          </header>

          <div className="stage">
            <button className="nav nav-left" onClick={() => go(-1)} aria-label="Previous member">
              <ArrowLeft />
            </button>
            <button className="nav nav-right" onClick={() => go(1)} aria-label="Next member">
              <ArrowRight />
            </button>

            <div key={member.number} className={`member-shell ${direction > 0 ? "from-right" : "from-left"}`}>
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />

              <div className="squircle">
                <div className="island">
                  <span className="island-dot" />
                  <span>{member.pin}</span>
                  <span className="island-label">MEMBER {member.number}</span>
                </div>

                <div className="member-number">{member.number}</div>

                <div className="person-copy">
                  <div className="eyebrow"><Sparkles size={14} /> TEAM MEMBER</div>
                  <h1>{member.name}</h1>
                  <p className="special">{member.special}</p>
                </div>

                {member.image && (
                  <div className="member-portrait">
                    <img src={member.image} alt={member.name} />
                    <div className="portrait-tags">
                      {member.talents.map((t, i) => (
                        <span key={t} style={{ animationDelay: `${0.6 + (i * 0.15)}s` }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="devices desktop-only">
                  <DeviceCard
                    type="MOBILE"
                    data={member.mobile}
                    icon="phone"
                    active={hoverDevice === "mobile"}
                    onEnter={() => setHoverDevice("mobile")}
                    onLeave={() => setHoverDevice(null)}
                  />
                  <DeviceCard
                    type="LAPTOP"
                    data={member.laptop}
                    icon="laptop"
                    active={hoverDevice === "laptop"}
                    onEnter={() => setHoverDevice("laptop")}
                    onLeave={() => setHoverDevice(null)}
                  />
                </div>

                <div className="hint desktop-only"><span>HOVER</span> DEVICE TO EXPLORE SPECS</div>
              </div>

              <div className="squircle devices-squircle mobile-only">
                <div className="devices">
                  <DeviceCard
                    type="MOBILE"
                    data={member.mobile}
                    icon="phone"
                    active={hoverDevice === "mobile"}
                    onEnter={() => setHoverDevice("mobile")}
                    onLeave={() => setHoverDevice(null)}
                  />
                  <DeviceCard
                    type="LAPTOP"
                    data={member.laptop}
                    icon="laptop"
                    active={hoverDevice === "laptop"}
                    onEnter={() => setHoverDevice("laptop")}
                    onLeave={() => setHoverDevice(null)}
                  />
                </div>
              </div>
            </div>

            <div className="side-label left-label">24 / LATERAL</div>
            <div className="side-label right-label">TEAM INDEX</div>
          </div>

          <footer className="footer">
            <div className="scroll">SCROLL TO EXPLORE <span>↓</span></div>
            <div className="location"><span /> INTERACTIVE TEAM DIRECTORY</div>
          </footer>

          {hoverDevice && (
            <div className="cursor-card" style={{ left: Math.min(cursor.x + 22, window.innerWidth - 310), top: Math.min(cursor.y + 22, window.innerHeight - 250) }}>
              <div className="cursor-card-top">
                <span>{hoverDevice === "mobile" ? "MOBILE" : "LAPTOP"}</span>
                <ArrowUpRight size={17} />
              </div>
              <h3>{member[hoverDevice].model}</h3>
              <ul>
                {member[hoverDevice].specs.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="spec-foot"><Cpu size={13} /> SPECIFICATION PROFILE</div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function DeviceCard({ type, data, active, onEnter, onLeave, icon }) {
  return (
    <div 
      className={`device ${active ? "active" : ""}`} 
      onMouseEnter={onEnter} 
      onMouseLeave={onLeave}
      onClick={() => active ? onLeave() : onEnter()}
    >
      <div className={`device-art ${icon}`}>
        {icon === "phone" ? (
          <div className="phone-shape"><div className="phone-screen"><span /><span /><span /></div></div>
        ) : (
          <div className="laptop-shape"><div className="laptop-screen"><div /></div><div className="laptop-base" /></div>
        )}
      </div>
      <div className="device-info">
        <small>{type}</small>
        <strong>{data.model}</strong>
        <em>Tap/Hover for specs ↗</em>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
