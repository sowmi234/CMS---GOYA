document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').files[0];

        if (!name || !price || !description || !image) {
            e.preventDefault();
            alert('All fields are required.');
        }
    });
});
