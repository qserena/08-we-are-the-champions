import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL:
		"https://champions-92a67-default-rtdb.europe-west1.firebasedatabase.app",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputEl = document.getElementById("endorsement-input")
const publishButton = document.getElementById("publish-button")
const endorsementListEl = document.getElementById("endorsement-list")

publishButton.addEventListener("click", function () {
	const endorsement = inputEl.value
	if (endorsement !== "") {
		push(endorsementsInDB, endorsement)
		clearInputField()
	}
})

onValue(endorsementsInDB, function (snapshot) {
	if (snapshot.exists()) {
		let endorsementArray = Object.entries(snapshot.val())

		clearEndorsementListEl()

		for (let i = 0; i < endorsementArray.length; i++) {
			let currentItem = endorsementArray[i]
			let endorsementText = currentItem[1]
			let newItem = document.createElement("li")
			newItem.textContent = endorsementText
			endorsementListEl.append(newItem)
		}
	}
})

function clearInputField() {
	inputEl.value = ""
}

function clearEndorsementListEl() {
	endorsementListEl.innerHTML = ""
}
