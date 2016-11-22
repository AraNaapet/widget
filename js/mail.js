function addContacts() {
	var email1 = document.getElementById("email").value;
	
	if (email1 == "araflashe@gmail.com" || email1 == "Ара Наапетян" || email1 == "6150159@gmail.com" || email1 == "Анатолий Хотулёв" || email1 == "gubnich@yandex.ru" || email1 == "Алексей Губаныч" || email1 == "kirill.ivanov.25.08@gmail.com" || email1 == "Кирилл Иванов") {
		var resultUsersSection = document.getElementById("resultUsers");
		var isUserAlreadyAdded = resultUsersSection.innerHTML.indexOf(email1) !== -1;
		if (isUserAlreadyAdded) {
			alert("Такой участник уже добавлен!");
		} else {
			resultUsersSection.hidden = false;
			resultUsersSection.innerHTML = resultUsersSection.innerHTML + "<br>" + email1;
		}
 	} else {
 		alert("Нет такого участника");
 	}
}