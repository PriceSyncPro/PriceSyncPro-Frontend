export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white overflow-hidden">
      {children}
    </div>
  );
}
