import { createClient } from "@supabase/supabase-js";
// export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||'',
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'');

const NEXT_PUBLIC_SUPABASE_URL='https://rcpoovvkbiqrqvbcvcbw.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcG9vdnZrYmlxcnF2YmN2Y2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwODExNDcsImV4cCI6MTk4ODY1NzE0N30.Gqs0SR52tRRFyG8MhloIWUEsM2r8N-FsJz2WGrWKVmA';

export const supabaseAdmin = createClient(NEXT_PUBLIC_SUPABASE_URL||'',
  NEXT_PUBLIC_SUPABASE_ANON_KEY||'');