// =============================================
// Fix Victoria Road — main.js
// =============================================

// --- Custom cursor ---
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, input').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// --- Floating action bar: show after scrolling past hero ---
const fabBar = document.getElementById('fabBar');
const hero = document.querySelector('.hero');

const fabObserver = new IntersectionObserver(entries => {
  // Show FAB when hero is no longer visible (user has scrolled past it)
  fabBar.classList.toggle('visible', !entries[0].isIntersecting);
}, { threshold: 0.1 });

if (hero && fabBar) fabObserver.observe(hero);

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// --- Email template ---
const EMAIL_SUBJECT = 'Victoria Road — Capital Budget INI-9011 — Request for Engineering Assessment & Proper Reconstruction';

const EMAIL_BODY = `Dear [Name],

I am a resident of Prince Edward County writing to you about Victoria Road and the 2026 Capital Budget allocation of $150,000 for Double Surface Treatment on the 2km section between CR 23 and Badgley Road (Project INI-9011).

I am asking you to halt this allocation and commission an independent engineering assessment before any further surface treatment is applied.

Here is why:

The County applied DST to Victoria Road in 2021. By June 2025, that same section had deteriorated so severely it was pulverized back to gravel as an emergency measure. The 2026 budget proposes repeating the exact same treatment on the exact same road. Without addressing the underlying base failure, this treatment will fail again and the cycle will continue.

The numbers, using the County's own published cost-per-km rates:

  - Status quo (DST every 5 years + patching): ~$3,892,000 over 15 years. Road still broken in 2041.
  - PEC standard full reconstruction ($155K/km x 11km): ~$2,995,000 over 15 years.
  - Grade-A hot-mix asphalt ($250K/km x 11km -- the residential street standard used across Ontario municipalities): ~$3,080,000 over 15 years. Road requires no major work until approximately 2050.

Doing nothing -- continuing the current DST cycle -- costs an estimated $812,000 MORE over 15 years than properly paving the road to a residential grade-A standard. The County has already spent an estimated $2.73 million on Victoria Road since 2015. That is nearly the full cost of fixing it permanently right now.

My specific requests:

  1. Commission an independent engineering assessment of the full 11km Victoria Road corridor to evaluate the base condition before any further surface treatment is approved.
  2. Pause or review the 2026 DST allocation (INI-9011) pending that assessment.
  3. Commit to a public timeline for full base reconstruction of Victoria Road -- not another surface treatment cycle.
  4. Proactively disclose annual maintenance expenditures for Victoria Road so residents can verify the cost trajectory themselves.

I recognise that infrastructure budgeting involves tradeoffs. But the data shows clearly that deferring proper reconstruction on Victoria Road is not saving money -- it is spending more money, repeatedly, for a road that stays broken. Residents are paying for this in vehicle damage, safety risks, and tax dollars. That needs to stop.

Thank you for your attention to this matter. I would welcome a response.

Sincerely,
[Your name]
[Your address / ward, Prince Edward County]

---
Cost sources: PEC Road Rehab FAQ ($75K/km DST; $155K/km reconstruction); 2026 Capital Budget INI-9011; Grade-A estimate from City of Toronto Local Road rate ($91/m2, 2025) applied to 7m rural road. Historical figures estimated from network averages; exact amounts require MFIPPA disclosure.`;

// Track which councillors have been emailed
const emailedCouncillors = new Set();

// Build mailto href
function buildMailto(email) {
  const subjectEncoded = encodeURIComponent(EMAIL_SUBJECT);
  const bodyEncoded = encodeURIComponent(EMAIL_BODY);
  return 'mailto:' + email + '?subject=' + subjectEncoded + '&body=' + bodyEncoded;
}

// Send email to individual councillor
function sendEmail(email, name, event) {
  event.preventDefault();
  window.location.href = buildMailto(email);

  const idMap = {
    'sferguson@pecounty.on.ca': 'btn-mayor',
    'rpennell@pecounty.on.ca':  'btn-pennell',
    'jmaynard@pecounty.on.ca':  'btn-maynard',
    'sgrosso@pecounty.on.ca':   'btn-grosso',
  };

  setTimeout(() => {
    const btn = document.getElementById(idMap[email]);
    if (btn && !emailedCouncillors.has(email)) {
      emailedCouncillors.add(email);
      btn.classList.add('sent');
      btn.textContent = '✓ Email opened';
    }
  }, 1200);
}

// Send email to all four at once
function sendEmailAll(event) {
  event.preventDefault();
  const allEmails = 'sferguson@pecounty.on.ca,rpennell@pecounty.on.ca,jmaynard@pecounty.on.ca,sgrosso@pecounty.on.ca';
  window.location.href = buildMailto(allEmails);

  setTimeout(() => {
    ['btn-mayor','btn-pennell','btn-maynard','btn-grosso'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) { btn.classList.add('sent'); btn.textContent = '✓ Email opened'; }
    });
  }, 1200);
}

// Toggle email preview
let emailVisible = true;
function toggleEmail() {
  const body = document.getElementById('emailBody');
  const btn  = document.querySelector('.email-toggle-btn');
  emailVisible = !emailVisible;
  if (emailVisible) {
    body.classList.remove('collapsed');
    btn.textContent = '▲ Hide preview';
  } else {
    body.classList.add('collapsed');
    btn.textContent = '▼ Show preview';
  }
}

// Copy page link
function copyPageLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    document.querySelectorAll('button').forEach(b => {
      if (b.textContent.includes('Copy')) {
        const orig = b.textContent;
        b.textContent = '✓ Link copied!';
        setTimeout(() => { b.textContent = orig; }, 2500);
      }
    });
  });
}

// Share to Facebook
function shareToFacebook(event) {
  event.preventDefault();
  const url = encodeURIComponent(window.location.href);
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(fbUrl, 'facebook-share', 'width=580,height=480,scrollbars=yes');
}
