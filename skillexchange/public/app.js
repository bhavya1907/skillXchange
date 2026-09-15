const mentors = [
  { id: 1, name: 'Maya Khanna', initials: 'MK', role: 'Design Engineer · Vercel', skill: 'Design Systems', category: 'Design', rate: 38, color: '#c46f5c' },
  { id: 2, name: 'Arjun Mehta', initials: 'AM', role: 'Senior Frontend · Razorpay', skill: 'React & TypeScript', category: 'Engineering', rate: 32, color: '#54758f' },
  { id: 3, name: 'Ira Banerjee', initials: 'IB', role: 'Product Lead · Notion', skill: 'Product Strategy', category: 'Product', rate: 45, color: '#a87a55' },
  { id: 4, name: 'Kunal Shah', initials: 'KS', role: 'ML Engineer · Postman', skill: 'Practical AI', category: 'Data & AI', rate: 40, color: '#546d5b' },
  { id: 5, name: 'Neha Kapoor', initials: 'NK', role: 'Engineering Manager · CRED', skill: 'Career Growth', category: 'Engineering', rate: 35, color: '#a15c71' },
  { id: 6, name: 'Dev Malhotra', initials: 'DM', role: 'Staff Designer · Meesho', skill: 'Portfolio Review', category: 'Design', rate: 30, color: '#8a7853' }
];

const state = { filter: 'All', query: '', saved: new Set(JSON.parse(localStorage.getItem('sx-saved') || '[]')), user: JSON.parse(localStorage.getItem('sx-user') || 'null'), token: localStorage.getItem('sx-token') };
const grid = document.querySelector('#mentorGrid');
const toast = document.querySelector('#toast');
const authModal = document.querySelector('#authModal');
const bookingModal = document.querySelector('#bookingModal');
const message = (text) => { toast.textContent = text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); };
const safe = (value) => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function renderMentors() {
  const list = mentors.filter(m => (state.filter === 'All' || m.category === state.filter) && `${m.name} ${m.role} ${m.skill}`.toLowerCase().includes(state.query.toLowerCase()));
  grid.innerHTML = list.length ? list.map(m => `<article class="mentor"><button class="save ${state.saved.has(m.id) ? 'saved' : ''}" data-save="${m.id}" aria-label="Save ${m.name}">${state.saved.has(m.id) ? '♥' : '♡'}</button><div class="mentor-top"><div class="portrait" style="background:${m.color}">${m.initials}</div><div><h3>${m.name}</h3><p class="role">${m.role}</p></div></div><span class="tag">${m.skill}</span><div class="mentor-bottom"><span class="rate">₹${m.rate * 100}/session <small>· 45 min</small></span><button class="book" data-book="${m.id}">Book a chat →</button></div></article>`).join('') : '<p>No mentors match that search yet. Try another topic.</p>';
}
function persistSaved(){ localStorage.setItem('sx-saved', JSON.stringify([...state.saved])); }
function authView(mode = 'login') {
  const signup = mode === 'signup';
  document.querySelector('#authContent').innerHTML = `<form class="modal-body" id="authForm"><p class="eyebrow">${signup ? 'JOIN SKILLXCHANGE' : 'WELCOME BACK'}</p><h2>${signup ? 'Your next leap starts here.' : 'Good to see you again.'}</h2><p>${signup ? 'Create your free account to book a session and keep your momentum.' : 'Log in to manage your mentorship journey.'}</p>${signup ? '<label class="field">NAME<input required name="name" autocomplete="name" placeholder="Your full name"></label>' : ''}<label class="field">EMAIL<input required type="email" name="email" autocomplete="email" placeholder="you@example.com"></label><label class="field">PASSWORD<input required minlength="8" type="password" name="password" autocomplete="${signup ? 'new-password' : 'current-password'}" placeholder="At least 8 characters"></label><button class="lime-btn form-submit">${signup ? 'Create my account →' : 'Log in →'}</button><p class="form-note">${signup ? 'Already a member?' : 'New to SkillXchange?'} <button type="button" data-switch="${signup ? 'login' : 'signup'}">${signup ? 'Log in' : 'Create an account'}</button></p></form>`;
  authModal.showModal();
}
function bookView(id) {
  const m = mentors.find(x => x.id === Number(id));
  document.querySelector('#bookingContent').innerHTML = `<form class="modal-body" id="bookForm"><p class="eyebrow">BOOK A 1:1 SESSION</p><h2>Make the most of your 45 minutes.</h2><div class="booking-person"><div class="portrait" style="background:${m.color}">${m.initials}</div><div><h3>${m.name}</h3><p>${m.skill} · ₹${m.rate * 100}</p></div></div><label class="field">WHAT WOULD YOU LIKE HELP WITH?<textarea required name="message" rows="4" placeholder="Tell ${m.name.split(' ')[0]} a little about your goal or challenge."></textarea></label><button class="lime-btn form-submit">Request this session →</button><p class="form-note">Your mentor will confirm a time within 24 hours.</p></form>`;
  bookingModal.showModal();
}
async function api(path, body, auth = false) {
  const response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && state.token ? { Authorization: `Bearer ${state.token}` } : {}) }, body: JSON.stringify(body) });
  return response.json();
}
document.querySelector('#chips').addEventListener('click', e => { const button = e.target.closest('[data-filter]'); if (!button) return; state.filter = button.dataset.filter; document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === button)); renderMentors(); });
document.querySelector('#searchInput').addEventListener('input', e => { state.query = e.target.value; renderMentors(); });
grid.addEventListener('click', e => { const save = e.target.closest('[data-save]'); const book = e.target.closest('[data-book]'); if (save) { const id = Number(save.dataset.save); state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id); persistSaved(); renderMentors(); message(state.saved.has(id) ? 'Mentor saved to your shortlist.' : 'Removed from your shortlist.'); } if (book) bookView(book.dataset.book); });
document.querySelectorAll('#joinBtn,#ctaJoin').forEach(b => b.addEventListener('click', () => state.user ? message(`You’re signed in as ${state.user.name || 'a member'}.`) : authView('signup')));
document.querySelector('#loginBtn').addEventListener('click', () => authView('login'));
document.querySelector('#storyBtn').addEventListener('click', () => document.querySelector('#how').scrollIntoView({ behavior: 'smooth' }));
document.addEventListener('click', e => { if (e.target.closest('.close')) e.target.closest('dialog').close(); const sw = e.target.closest('[data-switch]'); if (sw) authView(sw.dataset.switch); });
document.addEventListener('submit', async e => {
  if (e.target.id === 'authForm') { e.preventDefault(); const form = new FormData(e.target); const isSignup = !!form.get('name'); const body = Object.fromEntries(form); const button = e.target.querySelector('button[type="submit"]'); button.disabled = true; button.textContent = 'One moment…'; try { const result = await api(`/apis/user/${isSignup ? 'register' : 'login'}`, body); if (!result.success) throw new Error(Array.isArray(result.message) ? result.message[0] : result.message); if (isSignup) { message('Account created. Please log in to continue.'); authView('login'); } else { state.user = result.data; state.token = result.token; localStorage.setItem('sx-user', JSON.stringify(result.data)); localStorage.setItem('sx-token', result.token); authModal.close(); message(`Welcome back, ${result.data.name}!`); } } catch (err) { message(err.message || 'Could not connect to the API. Please try again.'); button.disabled = false; button.textContent = isSignup ? 'Create my account →' : 'Log in →'; } }
  if (e.target.id === 'bookForm') { e.preventDefault(); if (!state.token) { bookingModal.close(); authView('login'); message('Log in first, then your booking will be ready to send.'); return; } const mentorName = e.target.closest('#bookingContent').querySelector('h3').textContent; try { const result = await api('/apis/requests/add', { title: `Mentorship with ${mentorName}`, message: new FormData(e.target).get('message') }, true); if (!result.success) throw new Error(typeof result.message === 'string' ? result.message : 'Booking could not be created.'); bookingModal.close(); message('Request sent — your mentor will respond within 24 hours.'); } catch (err) { message(err.message || 'Unable to send booking request.'); } }
});
renderMentors();
