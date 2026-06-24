export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages use a standalone layout — no public navbar/footer
  return <>{children}</>
}
