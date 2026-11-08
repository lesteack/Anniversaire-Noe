import './globals.css';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';

const titre = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-titre', weight: ['700', '800'] });
const texte = Figtree({ subsets: ['latin'], variable: '--f-texte' });

export const metadata = {
  title: 'Soirée du 19 décembre',
  description: 'Toutes les infos sur la soirée du samedi 19 décembre 2026',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${titre.variable} ${texte.variable}`}>{children}</body>
    </html>
  );
}
