export default function SimpleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute top-24 right-[-8%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[18%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(0,0,0,0.45)_72%)]" />
    </div>
  );
}
