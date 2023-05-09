import "./globals.css";

export const metadata = {
  title: "Ramon Tilman",
  description:
    "Ramon Tilman is an entrepreneur and developer based in the Netherlands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className=''>{children}</body>
    </html>
  );
}
