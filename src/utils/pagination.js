/**
 * Builds page numbers with ellipses (e.g. 1 … 5 6 7 … 24).
 * @param {number} current
 * @param {number} total
 * @returns {(number | "ellipsis")[]}
 */
export const buildPageItems = (current, total) => {
   if (total < 1) {
      return [];
   }
   if (total <= 9) {
      return Array.from({ length: total }, (_, i) => i + 1);
   }
   const pages = new Set([1, total, current]);
   for (let d = -2; d <= 2; d += 1) {
      pages.add(current + d);
   }
   const filtered = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
   const out = [];
   for (let i = 0; i < filtered.length; i += 1) {
      if (i > 0 && filtered[i] - filtered[i - 1] > 1) {
         out.push("ellipsis");
      }
      out.push(filtered[i]);
   }
   return out;
};
