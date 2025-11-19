import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://flnvwhzhgfouhdxyajml.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbnZ3aHpoZ2ZvdWhkeHlham1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODY1NjYsImV4cCI6MjA3OTA2MjU2Nn0.sKQegnlFQasAGFw_H_8FA5TO8RtkjpGkdlJ0DoMtcXc";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl };
