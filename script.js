const nameInput = document.getElementById('nameInput');
const previewName = document.getElementById('previewName');

nameInput.addEventListener('input', (e) => {
  previewName.textContent = e.target.value || "الاسم الكامل";
});
