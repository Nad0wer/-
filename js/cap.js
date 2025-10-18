function userInfo(event) {
    event.preventDefault();
    
    const userName = document.getElementById("us_Name").value;
    const userSurname = document.getElementById("us_Surname").value;
    
    console.log(userName);
    console.log(userSurname);
    
    localStorage.setItem('NAME', userName);
    localStorage.setItem('SURNAME', userSurname);
    
    // Переход на следующую страницу
    window.location.href = 'gay.html';
    
    return false;
}





