import StoreSidebarNav from "./StoreSidebarNav";

/** Shared rail for stream / top-rated pages — matches home sidebar patterns. */
export default function LinksSidebar() {
   return (
      <div className="flex flex-col gap-3 px-1 pb-1 pt-1">
         <header className="px-2">
            <div className="flex gap-3">
               <div
                  className="w-1 shrink-0 self-stretch rounded-full bg-accent shadow-[0_0_12px_rgb(var(--color-accent)/0.45)]"
                  aria-hidden
               />
               <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                     Zone of Games
                  </p>
                  <p className="mt-0.5 text-base font-extrabold tracking-tight text-text">Browse</p>
               </div>
            </div>
         </header>
         <div className="zog-rail-surface p-2.5">
            <StoreSidebarNav />
         </div>
      </div>
   );
}
