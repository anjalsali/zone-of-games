const Loading = () => (
   <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-6 py-16 md:min-h-[50vh]"
      role="status"
      aria-live="polite"
      aria-busy="true"
   >
      <div className="relative h-14 w-14">
         <span className="absolute inset-0 rounded-full border-2 border-borderTheme/40" />
         <span
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/40"
            style={{ animationDuration: "0.85s" }}
         />
      </div>
      <p className="text-sm font-medium tracking-wide text-muted">Loading…</p>
      <span className="sr-only">Loading content</span>
   </div>
);

export default Loading;
