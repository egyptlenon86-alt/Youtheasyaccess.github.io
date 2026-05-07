/* ═══════════════════════════════════════════════════════
   LAUNCHPAD NYC — supabase.js
   All Supabase database interactions
═══════════════════════════════════════════════════════ */

'use strict';

// ── Config ─────────────────────────────────────────────
// Replace these two values with your actual credentials
// from Supabase Dashboard → Settings → API
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

/* ══════════════════════════════════════════════════════
   SCHOLARSHIPS
══════════════════════════════════════════════════════ */

/**
 * Fetch all active scholarships with their tags
 * @returns {Promise<Array>}
 */
async function fetchScholarships() {
  const { data, error } = await db
    .from('scholarships')
    .select(`
      *,
      scholarship_tags ( tag )
    `)
    .eq('is_active', true)
    .order('deadline', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('fetchScholarships error:', error.message);
    return [];
  }

  // Flatten tags array for easy use: [{tag:'No Essay'}, ...] → ['No Essay', ...]
  return data.map(s => ({
    ...s,
    tags: s.scholarship_tags.map(t => t.tag),
  }));
}

/**
 * Search scholarships with filters using the DB function
 * @param {Object} filters - { borough, industry, minAge, keyword }
 * @returns {Promise<Array>}
 */
async function searchScholarships({ borough, industry, minAge, keyword } = {}) {
  const { data, error } = await db.rpc('search_scholarships', {
    p_borough:  borough  || null,
    p_industry: industry || null,
    p_min_age:  minAge   || null,
    p_keyword:  keyword  || null,
  });

  if (error) {
    console.error('searchScholarships error:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Fetch a single scholarship by ID
 * @param {string} id - UUID
 */
async function fetchScholarshipById(id) {
  const { data, error } = await db
    .from('scholarships')
    .select(`*, scholarship_tags ( tag )`)
    .eq('id', id)
    .single();

  if (error) { console.error('fetchScholarshipById error:', error.message); return null; }
  return { ...data, tags: data.scholarship_tags.map(t => t.tag) };
}

/* ══════════════════════════════════════════════════════
   USER AUTH
══════════════════════════════════════════════════════ */

/**
 * Sign up a new user with email/password
 * @param {string} email
 * @param {string} password
 */
async function signUp(email, password) {
  const { data, error } = await db.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Sign in with email/password
 */
async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Sign in with Google OAuth
 */
async function signInWithGoogle() {
  const { error } = await db.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
  if (error) throw new Error(error.message);
}

/**
 * Sign out the current user
 */
async function signOut() {
  const { error } = await db.auth.signOut();
  if (error) throw new Error(error.message);
}

/**
 * Send a password reset email
 */
async function resetPassword(email) {
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw new Error(error.message);
}

/**
 * Get the currently logged-in user (or null)
 */
async function getCurrentUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

/**
 * Listen for auth state changes (login/logout)
 * @param {Function} callback - receives (event, session)
 */
function onAuthStateChange(callback) {
  return db.auth.onAuthStateChange(callback);
}

/* ══════════════════════════════════════════════════════
   USER SCHOLARSHIPS (saves & applications)
══════════════════════════════════════════════════════ */

/**
 * Get all scholarships saved/applied by the current user
 * @returns {Promise<Array>}
 */
async function getUserScholarships() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await db
    .from('user_scholarships')
    .select(`
      status,
      scholarships (*)
    `)
    .eq('user_id', user.id);

  if (error) { console.error('getUserScholarships error:', error.message); return []; }
  return data;
}

/**
 * Save a scholarship for the current user
 * @param {string} scholarshipId - UUID
 */
async function saveScholarship(scholarshipId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Must be logged in to save scholarships.');

  const { error } = await db
    .from('user_scholarships')
    .upsert({
      user_id:        user.id,
      scholarship_id: scholarshipId,
      status:         'saved',
    }, { onConflict: 'user_id,scholarship_id' });

  if (error) throw new Error(error.message);
}

/**
 * Mark a scholarship as applied
 * @param {string} scholarshipId - UUID
 */
async function applyToScholarship(scholarshipId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Must be logged in to apply.');

  const { error } = await db
    .from('user_scholarships')
    .upsert({
      user_id:        user.id,
      scholarship_id: scholarshipId,
      status:         'applied',
    }, { onConflict: 'user_id,scholarship_id' });

  if (error) throw new Error(error.message);
}

/**
 * Remove a saved/applied scholarship
 * @param {string} scholarshipId - UUID
 */
async function removeUserScholarship(scholarshipId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Must be logged in.');

  const { error } = await db
    .from('user_scholarships')
    .delete()
    .eq('user_id',        user.id)
    .eq('scholarship_id', scholarshipId);

  if (error) throw new Error(error.message);
}
