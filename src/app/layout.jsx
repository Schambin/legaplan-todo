import '../styles/global.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <title>LegaPlan Todo</title>
      <body>{children}</body>
    </html>
  );
}
