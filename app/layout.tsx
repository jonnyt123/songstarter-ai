export const metadata = {
  title: "SongStarter AI",
  description: "Generate song lyrics from your ideas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}