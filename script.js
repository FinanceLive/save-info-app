let pageCount = 0;

function createPage(title = '', category = '', content = '') {
  const book = document.getElementById('book');
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML = `
    <input class="title" type="text" placeholder="العنوان / Title" value="${title}">
    <select>
      <option value="">-- التصنيف / Category --</option>
      <option value="شخصي">شخصي / Personal</option>
      <option value="دراسة">دراسة / Study</option>
      <option value="عمل">عمل / Work</option>
      <option value="أفكار">أفكار / Ideas</option>
    </select>
    <textarea placeholder="اكتب ملاحظتك هنا... / Write your note here...">${content}</textarea>
  `;
  book.appendChild(page);
  pageCount++;
}

function addPage() {
  createPage();
  createPage();
}

function saveNotes() {
  const pages = document.querySelectorAll('.page');
  const data = [];
  pages.forEach(page => {
    const title = page.querySelector('.title').value;
    const category = page.querySelector('select').value;
    const content = page.querySelector('textarea').value;
    data.push({ title, category, content });
  });
  localStorage.setItem('saveInfoNotes', JSON.stringify(data));
  alert('✅ تم حفظ الملاحظات!');
}

function loadNotes() {
  const data = JSON.parse(localStorage.getItem('saveInfoNotes')) || [];
  document.getElementById('book').innerHTML = '';
  data.forEach(note => createPage(note.title, note.category, note.content));
}

function clearNotes() {
  if (confirm('هل تريد مسح جميع الملاحظات؟')) {
    localStorage.removeItem('saveInfoNotes');
    document.getElementById('book').innerHTML = '';
  }
}

window.onload = loadNotes;