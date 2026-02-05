export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
