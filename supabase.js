/* ═══════════════════════════════════════════════════════
   LAUNCHPAD NYC — supabase.js
═══════════════════════════════════════════════════════ */

const SUPABASE_URL  = 'https://kfswlcvlxwrvgzysvopx.supabase.co';
const SUPABASE_ANON = 'sb_publishable_wj4tCAKrhkO9CEMY8xFcxQ_l77vylJG';

const { createClient } = supabase; // from the CDN script in your HTML
const db = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ── Auth ──────────────────────────────────────────── */
async function signUp(email, password, meta = {}) {
  const { data, error } = await db.auth.signUp({
    email, password, options: { data: meta }
  });
  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signInWithGoogle() {
  const { error } = await db.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
  if (error) throw error;
}

async function signInWithApple() {
  const { error } = await db.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: window.location.origin }
  });
  if (error) throw error;
}

async function signOut() {
  const { error } = await db.auth.signOut();
  if (error) throw error;
}

async function resetPassword(email) {
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}?reset=true`
  });
  if (error) throw error;
}

async function getCurrentUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

function onAuthChange(callback) {
  return db.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}

/* ── Profiles ──────────────────────────────────────── */
async function fetchProfile(userId) {
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

async function updateProfile(userId, updates) {
  const { data, error } = await db
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function upsertProfile(userId, updates) {
  const { data, error } = await db
    .from('profiles')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function uploadResume(userId, file) {
  const ext  = file.name.split('.').pop();
  const path = `resumes/${userId}.${ext}`;
  const { error: upErr } = await db.storage
    .from('user-uploads')
    .upload(path, file, { upsert: true });
  if (upErr) throw upErr;
  const { data: { publicUrl } } = db.storage
    .from('user-uploads')
    .getPublicUrl(path);
  await updateProfile(userId, { resume_url: publicUrl });
  return publicUrl;
}

/* ── Jobs ──────────────────────────────────────────── */
async function fetchJobs(filters = {}) {
  let query = db
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('posted_at', { ascending: false });

  if (filters.borough)  query = query.eq('borough',  filters.borough);
  if (filters.type)     query = query.eq('type',     filters.type);
  if (filters.industry) query = query.eq('industry', filters.industry);
  if (filters.payMin)   query = query.gte('pay_min', filters.payMin);
  if (filters.payMax)   query = query.lte('pay_max', filters.payMax);
  if (filters.keyword)  query = query.or(
    `title.ilike.%${filters.keyword}%,company.ilike.%${filters.keyword}%`
  );

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/* ── Saved Jobs ────────────────────────────────────── */
async function fetchSavedJobs(userId) {
  const { data, error } = await db
    .from('saved_jobs')
    .select('job_id, saved_at')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function saveJob(userId, jobId) {
  const { error } = await db
    .from('saved_jobs')
    .insert({ user_id: userId, job_id: jobId });
  if (error) throw error;
}

async function unsaveJob(userId, jobId) {
  const { error } = await db
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId);
  if (error) throw error;
}

/* ── Job Applications ──────────────────────────────── */
async function fetchApplications(userId) {
  const { data, error } = await db
    .from('job_applications')
    .select('job_id, applied_at, status')
    .eq('user_id', userId)
    .order('applied_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function applyToJob(userId, jobId) {
  const { data, error } = await db
    .from('job_applications')
    .insert({ user_id: userId, job_id: jobId, status: 'submitted' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Programs ──────────────────────────────────────── */
async function fetchPrograms(filters = {}) {
  let query = db
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('id');
  if (filters.industry) query = query.eq('industry', filters.industry);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function applyToProgram(userId, programId) {
  const { data, error } = await db
    .from('program_applications')
    .insert({ user_id: userId, program_id: programId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Lessons ───────────────────────────────────────── */
async function fetchLessons(category = null) {
  let query = db
    .from('lessons')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  if (category && category !== 'all') query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function fetchCompletedLessons(userId) {
  const { data, error } = await db
    .from('lesson_completions')
    .select('lesson_id, completed_at, points_earned')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

async function markLessonComplete(userId, lessonId, pointsEarned) {
  const { data, error } = await db
    .from('lesson_completions')
    .insert({ user_id: userId, lesson_id: lessonId, points_earned: pointsEarned })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Scholarships ──────────────────────────────────── */
async function fetchScholarships() {
  const { data, error } = await db
    .from('scholarships')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function searchScholarships(filters = {}) {
  const { data, error } = await db.rpc('search_scholarships', {
    p_borough:  filters.borough  || null,
    p_industry: filters.industry || null,
    p_keyword:  filters.keyword  || null,
  });
  if (error) throw error;
  return data;
}

async function saveScholarship(scholarshipId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await db
    .from('user_scholarships')
    .insert({ user_id: user.id, scholarship_id: scholarshipId });
  if (error) throw error;
}

async function applyToScholarship(scholarshipId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not signed in');
  const { data, error } = await db
    .from('scholarship_applications')
    .insert({ user_id: user.id, scholarship_id: scholarshipId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Badges ────────────────────────────────────────── */
async function fetchAllBadges() {
  const { data, error } = await db.from('badges').select('*').order('id');
  if (error) throw error;
  return data;
}

async function fetchUserBadges(userId) {
  const { data, error } = await db
    .from('user_badges')
    .select('badge_id, earned_at, badges(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

async function awardBadge(userId, badgeId) {
  const { error } = await db
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId });
  if (error && error.code !== '23505') throw error;
}

/* ── Messages ──────────────────────────────────────── */
async function fetchMessages(userId) {
  const { data, error } = await db
    .from('messages')
    .select('sender_id, receiver_id, body, sent_at, is_read')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('sent_at', { ascending: true });
  if (error) throw error;
  return data;
}

async function sendMessage(senderId, receiverId, body) {
  const { data, error } = await db
    .from('messages')
    .insert({ sender_id: senderId, receiver_id: receiverId, body })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function markMessagesRead(userId, otherUserId) {
  const { error } = await db
    .from('messages')
    .update({ is_read: true })
    .eq('receiver_id', userId)
    .eq('sender_id', otherUserId);
  if (error) throw error;
}

/* ── Readiness Progress ────────────────────────────── */
async function fetchReadinessProgress(userId) {
  const { data, error } = await db
    .from('readiness_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

async function updateReadinessTrack(userId, track, percent) {
  const { error } = await db
    .from('readiness_progress')
    .upsert({ user_id: userId, track, percent, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/* ── Dashboard Summary ─────────────────────────────── */
async function fetchDashboardSummary(userId) {
  const { data, error } = await db
    .from('user_dashboard')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

/* ── Realtime Messages ─────────────────────────────── */
function subscribeToMessages(userId, onNewMessage) {
  return db
    .channel(`messages:${userId}`)
    .on('postgres_changes', {
      event:  'INSERT',
      schema: 'public',
      table:  'messages',
      filter: `receiver_id=eq.${userId}`,
    }, (payload) => onNewMessage(payload.new))
    .subscribe();
}
