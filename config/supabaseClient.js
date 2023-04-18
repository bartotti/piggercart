import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://jegrrxcwskznudgdebik.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3JyeGN3c2t6bnVkZ2RlYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyMDgyOTMsImV4cCI6MTk5NTc4NDI5M30._doAzzn9qvhXUF_hRpbib-EftdeFIxrcIUOz12l3KQA";
const supabaseUrl = "https://rswrrvoovwdrjkwmtdnf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzd3Jydm9vdndkcmprd210ZG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3NTAwOTMsImV4cCI6MTk5NzMyNjA5M30.mXNaEpfYoKwMxPOpEScM_IecmKtzFeH6BWKM6zDUfvo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
