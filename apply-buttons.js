// Add per-card Apply buttons for jobs and scholarships.
// This script augments existing rendered cards by inserting an "Apply" button
// that calls applyToJob/applyToScholarship and updates UI/state.

(function () {
  function addApplyButtonsToJobs(root = document) {
    root.querySelectorAll('.job-card').forEach(card => {
      if (card.querySelector('.card-apply-btn')) return; // already added
      const jobId = card.dataset.jobId;
      if (!jobId) return;

      // create button
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm card-apply-btn';
      btn.textContent = 'Apply';
      btn.dataset.jobId = jobId;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.jobId);
        if (state.appliedJobs && state.appliedJobs.includes(id)) {
          showToast('You have already applied for this job.', 'info');
          return;
        }
        if (!state.user) {
          showToast('Please sign in to apply.', 'warning');
          openModal && openModal('signInModal');
          return;
        }
        try {
          // optimistic update
          state.appliedJobs = state.appliedJobs || [];
          state.appliedJobs.push(id);
          updateDashboardStats && updateDashboardStats();
          showToast('Application submitted! 🎉', 'success');

          // persist to Supabase
          if (typeof applyToJob === 'function') {
            await applyToJob(state.user.id, id);
          }

          // update visuals
          btn.textContent = '✓ Applied';
          btn.disabled = true;
          // refresh lists if functions exist
          renderAllJobs && renderAllJobs(JOBS);
          renderFeaturedJobs && renderFeaturedJobs();
        } catch (err) {
          console.error('applyToJob error:', err);
          showToast((err && err.message) || 'Could not submit application. See console.', 'error');
        }
      });

      // attach to footer if exists otherwise append to card
      const footer = card.querySelector('.job-footer') || card;
      const wrapper = document.createElement('div');
      wrapper.style.marginLeft = '8px';
      wrapper.appendChild(btn);
      footer.appendChild(wrapper);
    });
  }

  function addApplyButtonsToScholarships(root = document) {
    root.querySelectorAll('[data-scholarship-id]').forEach(card => {
      if (card.querySelector('.card-apply-btn')) return;
      const id = card.dataset.scholarshipId;
      if (!id) return;

      const btn = document.createElement('button');
      btn.className = 'btn btn-primary btn-sm card-apply-btn';
      btn.textContent = 'Apply';
      btn.dataset.scholarshipId = id;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!state.user) {
          showToast('Please sign in to apply for scholarships.', 'warning');
          openModal && openModal('signInModal');
          return;
        }
        try {
          if (typeof applyToScholarship === 'function') {
            await applyToScholarship(id);
          }
          showToast('Scholarship application recorded! ✅', 'success');
          btn.textContent = '✓ Applied';
          btn.disabled = true;
        } catch (err) {
          console.error('applyToScholarship error:', err);
          showToast((err && err.message) || 'Could not apply. See console.', 'error');
        }
      });

      const footer = card.querySelector('.program-footer') || card;
      const wrapper = document.createElement('div');
      wrapper.style.marginLeft = '8px';
      wrapper.appendChild(btn);
      footer.appendChild(wrapper);
    });
  }

  function init() {
    // initial pass
    addApplyButtonsToJobs(document);
    addApplyButtonsToScholarships(document);

    // observe changes to job/scholarship containers so buttons are added when lists re-render
    const jobsContainer = document.getElementById('allJobs') || document.getElementById('featuredJobs');
    const scholarshipsContainer = document.getElementById('scholarshipsList') || document.getElementById('featuredScholarships') || document.getElementById('scholarships');

    const obsConfig = { childList: true, subtree: true };
    const jobsObserver = new MutationObserver(() => addApplyButtonsToJobs(document));
    const schObserver = new MutationObserver(() => addApplyButtonsToScholarships(document));
    if (jobsContainer) jobsObserver.observe(jobsContainer, obsConfig);
    else jobsObserver.observe(document.body, obsConfig);

    if (scholarshipsContainer) schObserver.observe(scholarshipsContainer, obsConfig);
    else schObserver.observe(document.body, obsConfig);

    // also re-run after auth changes to enable/disable buttons
    if (typeof onAuthChange === 'function') {
      onAuthChange(() => {
        setTimeout(() => {
          addApplyButtonsToJobs(document);
          addApplyButtonsToScholarships(document);
        }, 250);
      });
    }

    // also run once after DOMContentLoaded if script injected before content
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addApplyButtonsToJobs(document);
        addApplyButtonsToScholarships(document);
      });
    }
  }

  // expose for debugging
  window.__applyButtonsInit = init;
  // auto init
  try { init(); } catch (e) { console.error('apply-buttons init error', e); }
})();
