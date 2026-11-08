/**
 * NexaCorp Solutions CTF Write-Up Interactive Engine
 * Handles Scrollspy, Reading Progress, Clipboard Actions,
 * Scanline FX, and Responsive Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scanlines by default for hacker aesthetic
  document.body.classList.add('scanlines-active');

  initScrollProgress();
  initScrollSpy();
  initCopyActions();
  initScanlineToggle();
  initMobileMenu();
});

/**
 * Updates top progress bar based on user scroll position
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }, { passive: true });
}

/**
 * ScrollSpy: Highlights active link in sidebar as user scrolls past sections
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Clipboard Copy system for IPs, commands, and Root Flag
 */
function initCopyActions() {
  // 1. Mini IP copy buttons
  document.querySelectorAll('.copy-mini').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        copyToClipboard(textToCopy, `Copied IP: ${textToCopy}`);
      }
    });
  });

  // 2. Terminal copy buttons
  document.querySelectorAll('.terminal-copy-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // Extract command text without prompt or comments
      let cleanText = '';
      const cmdTexts = targetEl.querySelectorAll('.cmd-text');
      if (cmdTexts.length > 0) {
        cleanText = Array.from(cmdTexts).map(el => el.innerText.trim()).join('\n');
      } else {
        cleanText = targetEl.innerText.trim();
      }

      copyToClipboard(cleanText, 'Terminal commands copied to clipboard!');

      // Visual feedback on button
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<span>✓ Copied</span>`;
      btn.style.color = '#00ff41';
      btn.style.borderColor = '#00ff41';

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  });

  // 3. Root Flag Copy Button
  const copyFlagBtn = document.getElementById('copyFlagBtn');
  if (copyFlagBtn) {
    copyFlagBtn.addEventListener('click', () => {
      const flag = copyFlagBtn.getAttribute('data-flag');
      copyToClipboard(flag, '🏆 Flag copied! Ready for submission.');

      const textSpan = copyFlagBtn.querySelector('.flag-btn-text');
      if (textSpan) {
        const originalText = textSpan.innerText;
        textSpan.innerText = '✓ Copied!';
        copyFlagBtn.style.backgroundColor = '#00ff41';
        copyFlagBtn.style.boxShadow = '0 0 20px #00ff41';

        setTimeout(() => {
          textSpan.innerText = originalText;
          copyFlagBtn.style.backgroundColor = '';
          copyFlagBtn.style.boxShadow = '';
        }, 2200);
      }
    });
  }
}

/**
 * Universal clipboard copy with toast feedback
 */
function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMsg))
      .catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Failed to copy to clipboard.');
  }
  document.body.removeChild(textArea);
}

/**
 * Toast notification component
 */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2800);
}

/**
 * Toggle terminal scanlines overlay
 */
function initScanlineToggle() {
  const btn = document.getElementById('toggleScanlines');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('scanlines-active');
    const isActive = document.body.classList.contains('scanlines-active');
    showToast(isActive ? 'CRT Scanlines: Enabled' : 'CRT Scanlines: Disabled');
  });
}

/**
 * Mobile drawer navigation toggle
 */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');

  if (!mobileBtn || !sidebar) return;

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('mobile-open');
  });

  // Close mobile sidebar on link click
  document.querySelectorAll('.sidebar-link').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

