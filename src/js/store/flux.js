import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			contacts: [

			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createContact: (formData) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(formData);

				let requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://playground.4geeks.com/apis/fake/contact/", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result)
						getActions().loadContacts(formData.agenda_slug)
					})
					.catch(error => console.log('error', error));
			},

			loadContacts: (agendaSlug) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agendaSlug}`)
					.then(response => response.json())
					.then(data => setStore({ contacts: data }))
			},

			deleteContacts: (id) => {
				const requestOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					}
				}



				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.json();
					})
					.then(data => {
						console.log('Contact deleted successfully:', data);
					})
					.then(result => getActions().loadContacts("Nuno"))
					.catch(error => {
						console.error('Error deleting contact:', error);
					});
			},

			deleteAllContacts: (agenda_slug) => {
				const requestOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					}
				}



				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agenda_slug}`, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.json();
					})
					.then(data => {
						console.log("Hello")
						console.log('Contact deleted successfully:', data);
					})
					.then(getActions().loadContacts())
					.catch(error => {
						console.error('Error deleting contact:', error);
					});
			},

			updateContact: (formDataUpdated, id) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(formDataUpdated);

				let requestOptions = {
					method: 'PUT',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result)
						getActions().loadContacts(formDataUpdated.agenda_slug)
					})
					.catch(error => console.log('error', error));
			},
		}
	};
};

export default getState;
