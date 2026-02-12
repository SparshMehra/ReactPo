/**
 * Supabase Client Configuration
 *
 * @file supabase.js
 * @description Initializes and exports the Supabase client for database operations
 *
 * Environment Variables Required:
 * - REACT_APP_SUPABASE_URL: Your Supabase project URL
 * - REACT_APP_SUPABASE_ANON_KEY: Your Supabase anonymous key
 *
 * Get these from: https://app.supabase.com -> Project Settings -> API
 */

import { createClient } from "@supabase/supabase-js";

// Get Supabase configuration from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://flnvwhzhgfouhdxyajml.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "SUPABASE ANON KEY";

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase configuration missing! Please check your .env file.");
  console.error("Required variables: REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY");
}

// Create and export Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl };

