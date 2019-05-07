const weatherForm = document.getElementById('searchForm');
const messagePlaceHolder1 = document.getElementById('messagePlaceHolder1');
const messagePlaceHolder2 = document.getElementById('messagePlaceHolder2');

messagePlaceHolder1.textContent = 'Loading...'

weatherForm.addEventListener('submit', ( event ) => {

    event.preventDefault(); // Prevents the browser from reloading the page

    const searchInput = document.getElementById('locationInput');
    const location = searchInput.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    fetch(url).then( (response) => {

        response.json().then( ( data ) => {
    

            if ( data.error ) {
    
                messagePlaceHolder1.textContent = data.error;
                messagePlaceHolder2.textContent = '';
    
            } else {
    
                messagePlaceHolder1.textContent = data.location;
                messagePlaceHolder2.textContent = data.forecast;
    
            }
    
        });
    
    });

});