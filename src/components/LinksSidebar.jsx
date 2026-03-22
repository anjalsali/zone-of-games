import StoreSidebarNav from "./StoreSidebarNav";

/** Shared rail for stream/game pages (matches home store sidebar discover section). */
export default function LinksSidebar() {
   return (
      <div className="px-2 pb-1 pt-1">
         <div className="zog-store-sidebar-header px-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Zone of Games</p>
            <p className="mt-0.5 text-sm font-black tracking-tight text-text">Store</p>
         </div>
         <div className="mt-3 px-1">
            <StoreSidebarNav />
         </div>
      </div>
   );
}
