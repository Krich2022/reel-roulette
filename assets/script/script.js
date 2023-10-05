

  document.getElementById('get-movie').addEventListener('click', function () {
    document.getElementById('modal').classList.remove('hidden');
  });

  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.add('hidden');
    }
  });

  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modal').classList.add('hidden');
  });


  $(document).ready(function () {
    $(".toggleList").click(function () {
      $(this).siblings("#checkboxList").toggleClass("hidden");
    });
  });

