async function fetchUsersnAvatar() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users'); //fetch n keep 
        let responseData = await response.json(); // turn kept response into json 

        for (let user of responseData) {

            let userImageResponse = await fetch(`https://robohash.org/${user.id}.png?set=set4`);

            if (!userImageResponse.ok) {
                throw new Error('no image');
            } 

            let userContainer = document.createElement('div');
            userContainer.classList.add('user-container');

            let userId = document.createElement('h2');
            userId.textContent = `${user.id}`;

            let userName = document.createElement('h3');
            userName.textContent = `Name: ${user.name}`;

            let userNickName = document.createElement('p');
            userNickName.textContent = `Username: ${user.username}`; 

            let userEmail = document.createElement('p');
            userEmail.textContent = `Email: ${user.email}`; 

            let image = document.createElement('img');
            image.src = userImageResponse.url; // Get the URL of the image

            
            // add image + user info always
            userContainer.appendChild(userName);
            userContainer.appendChild(userNickName);
            userContainer.appendChild(userEmail);
            userContainer.appendChild(image); 

            
            document.getElementById('people-container').appendChild(userContainer);
        }
    } catch (error) {
        console.log('Error here:', error);
    }
}

fetchUsersnAvatar();
