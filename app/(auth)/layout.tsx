export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg-primary">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
