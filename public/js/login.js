document.addEventListener('DOMContentLoaded', function() {
    var dropdownBtn = document.querySelector('.dropdown-btn');
    var dropdownContent = document.querySelector('.dropdown-content');
  
    dropdownBtn.addEventListener('click', function() {
      if (dropdownContent.style.display === 'none') {
        dropdownContent.style.display = 'block';
      } else {
        dropdownContent.style.display = 'none';
      }
    });
  });


const registrationBtn = document.querySelector('.registration-container .dropdown-btn');
const registrationContent = document.querySelector('.registration-container .dropdown-content');

registrationBtn.addEventListener('click', () => {
  registrationContent.style.display = registrationContent.style.display === 'none' ? 'block' : 'none';
});