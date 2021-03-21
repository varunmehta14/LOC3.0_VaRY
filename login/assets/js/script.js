const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const thisForm = document.getElementById('SignUp');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    //const formData = new FormData(thisForm).entries()
	//console.log(formData)
	const userName=(document.getElementById('myName').value)
	const email=(document.getElementById('myEmail').value)
	const password=(document.getElementById('myPassword').value)
	const roleTag=(document.getElementsByName('Role'))
	let role;
	for(i = 0; i < roleTag.length; i++) { 
		if(roleTag[i].checked) 
		role=roleTag[i].value;
	} 
	console.log(role);
	const payload={userName,email,password,role}
	console.log(payload)
    const response = await fetch('http://localhost:3000/userApi/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
	console.log(result.auth);
    if(result&&result.auth){window.location.href='../loggedIn.html'}
});

const thisForm2 = document.getElementById('Login');
thisForm2.addEventListener('submit', async function (e) {
    e.preventDefault();
    //const formData = new FormData(thisForm).entries()
	//console.log(formData)
	
	const userName=(document.getElementById('myuserName1').value)
	const password=(document.getElementById('myPassword1').value)
	
	
	const payload={userName,password}
	console.log(payload)
    const response = await fetch('http://localhost:3000/userApi/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(result.success);
	if(result&&result.success){window.location.href="../loggedIn.html"}
});