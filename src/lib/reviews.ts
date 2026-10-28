export type Review = {
  name: string;
  city: string;
  product?: string;
  text: string; // customer ne jo likha (ijazat ke saath)
};

/* ==========================================================
   SIRF ASLI REVIEWS yahan daalo, customer ki ijazat se.
   List khali ho to homepage pe reviews section nahi dikhta.

   Customer se jo asli message mile, wohi yahan paste karo:

   export const REVIEWS: Review[] = [
     { name: "Customer ka naam", city: "Shehar", product: "Product ka naam", text: "Unka likha hua message" },
     { name: "Dusra naam", city: "Shehar", text: "Unka likha hua message" },
   ];
   ========================================================== */
export const REVIEWS: Review[] = [];