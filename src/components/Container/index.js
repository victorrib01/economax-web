export default function Container({ children }) {
  return (
    <div className="flex items-center justify-center max-w-full">
      <main className="min-h-screen h-screen w-full max-w-[512px] p-8 bg-slate-50">
        <div
          className="
                flex flex-col items-center justify-between h-full
                "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
