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

const form = document.querySelector(".class")
console.log(form);
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    formData.append("userId", "1",)
    formData.append("characterName", "pikachu",)
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,
    })
})