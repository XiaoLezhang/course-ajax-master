(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const searchedForText = 'hippos';
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function (err) {
            requestError(err, 'image');
        };
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID a2aee310ed4f8d7485bfb965eabcb255b438d8965a0aae521554c6f2d469e6c0');
        unsplashRequest.send();

        function addImage(){
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

            if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>>
                </figure>`;
            } else {
                htmlContent = '<div class="error-no-image">No images available</div>';
            }
            responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
        }

    });
})();
