import "@/styles/app.css";

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body style={{ margin: 0 }}>{children}</body>
  </html>
);

export default RootLayout;
