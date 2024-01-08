import HeaderSpecEqup from "@/components/layout/headerSpecEqup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSpecEqup />
      {children}
    </>
  );
}
