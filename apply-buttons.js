// Add per-card Apply buttons for jobs and scholarships and style them like the reference (Apply Now, green pill on the right)
// This file was updated to set button text to "Apply Now" and to inject a small CSS file into <head> if missing.

(function () {
  // inject CSS file if not present
  const cssHref = 'apply-buttons.css';
  if (!document.querySelector(`link[href="${cssHref}"]`)) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = cssHref;
    document.head.appendChild(l);
  }

  function addApplyButtonsToJobs(root = document) {
    root.querySelectorAll('.job-card').forEach(card => {
      if (card.querySelector('.card-apply-btn')) return; // already added
      const jobId = card.dataset.jobId;
      if (!jobId) return;

      const btn = document.createElement('button');
      btn.className = 'card-apply-btn';
      btn.setAttribute('data-apply-job', jobId);
      btn.type = 'button';
      btn.textContent = 'Apply Now';

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.applyJob);
        if (!id) return;

        if (state.appliedJobs && state.appliedJobs.includes(id)) {
          showToast('You have already applied for this job.', 'info');
          btn.disabled = true;
          btn.textContent = '✓ Applied';
          return;
        }
        if (!state.user) {
          showToast('Please sign in to apply.', 'warning');
          openModal && openModal('signInModal');
          return;
        }

        try {
          btn.disabled = true;
          btn.textContent = 'Applying…';

          // optimistic UI update
          state.appliedJobs = state.appliedJobs || [];
          if (!state.appliedJobs.includes(id)) state.appliedJobs.push(id);
          updateDashboardStats && updateDashboardStats();

          if (typeof applyToJob === 'function') {
            await applyToJob(state.user.id, id);
          }

          btn.textContent = '✓ Applied';
          showToast('Application submitted! Good luck 🎉', 'success');

          // update visuals
          renderAllJobs && renderAllJobs(JOBS);
          renderFeaturedJobs && renderFeaturedJobs();
        } catch (err) {
          console.error('applyToJob error:', err);
          btn.disabled = false;
          btn.textContent = 'Apply Now';
          showToast((err && err.message) || 'Could not submit application. See console.', 'error');
        }
      });

      // attach button: for list-style cards position absolute to right; otherwise add to footer
      const footer = card.querySelector('.job-footer');
      if (footer) {
        // create actions wrapper
        let actions = footer.querySelector('.job-actions');
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'job-actions';
          actions.style.marginLeft = '12px';
          footer.appendChild(actions);
        }
        actions.appendChild(btn);
      } else {
        // fallback: append to card
        card.appendChild(btn);
      }
    });
  }

  function addApplyButtonsToScholarships(root = document) {
    root.querySelectorAll('[data-scholarship-id]').forEach(card => {
      if (card.querySelector('.card-apply-btn')) return;
      const id = card.dataset.scholarshipId;
      if (!id) return;

      const btn = document.createElement('button');
      btn.className = 'card-apply-btn';
      btn.setAttribute('data-apply-scholarship', id);
      btn.type = 'button';
      btn.textContent = 'Apply Now';

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!state.user) {
          showToast('Please sign in to apply for scholarships.', 'warning');
          openModal && openModal('signInModal');
          return;
        }
        try {
          btn.disabled = true;
          btn.textContent = 'Applying…';
          if (typeof applyToScholarship === 'function') {
            await applyToScholarship(id);
          }
          btn.textContent = '✓ Applied';
          showToast('Scholarship application recorded! ✅', 'success');
        } catch (err) {
          console.error('applyToScholarship error:', err);
          btn.disabled = false;
          btn.textContent = 'Apply Now';
          showToast((err && err.message) || 'Could not apply. See console.', 'error');
        }
      });

      const footer = card.querySelector('.program-footer') || card;
      let actions = footer.querySelector('.job-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'job-actions';
        actions.style.marginLeft = '12px';
        footer.appendChild(actions);
      }
      actions.appendChild(btn);
    });
  }

  function init() {
    // initial pass
    addApplyButtonsToJobs(document);
    addApplyButtonsToScholarships(document);

    // observe changes to job/scholarship containers so buttons are added when lists re-render
    const obsConfig = { childList: true, subtree: true };
    const jobsObserver = new MutationObserver(() => addApplyButtonsToJobs(document));
    const schObserver = new MutationObserver(() => addApplyButtonsToScholarships(document));
    jobsObserver.observe(document.body, obsConfig);
    schObserver.observe(document.body, obsConfig);

    // re-run after auth changes to enable/disable buttons
    if (typeof onAuthChange === 'function') {
      onAuthChange(() => {
        setTimeout(() => {
          addApplyButtonsToJobs(document);
          addApplyButtonsToScholarships(document);
        }, 250);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addApplyButtonsToJobs(document);
        addApplyButtonsToScholarships(document);
      });
    }
  }

  window.__applyButtonsInit = init;
  try { init(); } catch (e) { console.error('apply-buttons init error', e); }
})();
