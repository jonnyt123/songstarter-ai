export const metadata = {
  title: "SongStarter AI",
  description: "Generate structured song lyrics from your ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}