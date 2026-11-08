'use client';
import { useEffect, useRef, useState } from 'react';
import { guests } from './guests';

const LAT = 48.729417163726254;
const LON = 7.89373592965961;
const CIBLE = new Date('2026-12-19T18:00:00+01:00').getTime();

function Confettis() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, g = c.getContext('2d');
    const couleurs = ['#e11d48', '#8b5cf6', '#3b82f6', '#fbbf24', '#f472b6'];
    let w, h, raf;
    const taille = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    taille();
    addEventListener('resize', taille);
    const neuf = (y) => ({ x: Math.random() * w, y, s: 5 + Math.random() * 8, v: 1 + Math.random() * 2.2, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2, d: Math.random() * 6, c: couleurs[(Math.random() * couleurs.length) | 0] });
    const p = Array.from({ length: 80 }, () => neuf(Math.random() * h));
    const boucle = () => {
      g.clearRect(0, 0, w, h);
      p.forEach((a, i) => {
        a.y += a.v; a.d += 0.02; a.x += Math.sin(a.d) * 0.8; a.r += a.vr;
        if (a.y > h + 10) p[i] = neuf(-10);
        g.save(); g.translate(a.x, a.y); g.rotate(a.r); g.fillStyle = a.c;
        g.fillRect(-a.s / 2, -a.s / 4, a.s, a.s / 2); g.restore();
      });
      raf = requestAnimationFrame(boucle);
    };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) boucle();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', taille); };
  }, []);
  return <canvas ref={ref} className="confettis" aria-hidden="true" />;
}

function Compte() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const maj = () => setT(Math.max(0, CIBLE - Date.now()));
    maj();
    const id = setInterval(maj, 1000);
    return () => clearInterval(id);
  }, []);
  if (t === null) return <div className="compte" />;
  if (t === 0) return <p className="grand">C’est parti !</p>;
  const s = Math.floor(t / 1000);
  const items = [['jours', Math.floor(s / 86400)], ['heures', Math.floor((s % 86400) / 3600)], ['minutes', Math.floor((s % 3600) / 60)], ['secondes', s % 60]];
  return (
    <div className="compte" role="timer">
      {items.map(([l, v]) => (
        <div key={l} className="bloc"><b>{String(v).padStart(2, '0')}</b><span>{l}</span></div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <Confettis />
      <section className="hero">
        <h1><span>19</span> décembre</h1>
        <p className="sous">Samedi 19 décembre 2026, à partir de 18h</p>
        <Compte />
      </section>

      <section className="infos">
        <div className="carte"><h2>Quand</h2><p>Samedi 19 décembre 2026 dès 18h.</p></div>
        <div className="carte"><h2>Au menu</h2><p>Je sais pas encore.</p></div>
        <div className="carte"><h2>Dormir sur place</h2><p>C’est possible pour ceux qui le veulent. Dis-le moi.</p></div>
      </section>

      <section className="invites">
        <h2>Les invités</h2>
        <p className="legende"><i className="pt rouge" /> pas encore confirmé <i className="pt vert" /> présence confirmée</p>
        <ul>
          {guests.map((g, i) => (
            <li key={i} className={g.ok ? 'ok' : ''} style={{ animationDelay: `${i * 60}ms` }}>{g.nom}</li>
          ))}
        </ul>
      </section>

      <section className="lieu">
        <h2>Où ça se passe</h2>
        <iframe
          title="Carte du lieu de la soirée"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.005}%2C${LAT - 0.0025}%2C${LON + 0.005}%2C${LAT + 0.0025}&layer=mapnik&marker=${LAT}%2C${LON}`}
        />
        <a className="btn" href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LON}`} target="_blank" rel="noreferrer">Lancer l’itinéraire</a>
      </section>
    </main>
  );
}
