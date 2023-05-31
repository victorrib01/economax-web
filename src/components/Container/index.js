export default function Container({ children }) {
  return (
    <main className="flex min-h-screen max-w-[512px] flex-col items-center justify-center">
      <div className="min-h-screen min-w-[100%] bg-slate-50">
        <div className="flex flex-col min-h-screen items-center justify-between p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
