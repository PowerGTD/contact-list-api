const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			
			apiFetch: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/alejo")
				.then(res => res.json())
				.then(res => setStore({ contacts: res }));
			},
			
			addContact: (full_name, email, phone, address) => {
				var tempStore = getStore();
				var newContact = {
					full_name,
					email,
					agenda_slug: "alejo",
					address,
					phone
				};
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: 'PUT',
					body: JSON.stringify(newContact),
					headers:{
					'Content-Type': 'application/json'
				}
				}).then(res => res.text())
					.then(response => console.log('Success:', JSON.stringify(response)))
					.catch(error => console.error('Error:', error));
				tempStore.contacts.push(newContact);
				setStore({ tempStore });
				return true;
			},
			deleteItem: (index) => {
				var newStore = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/" + index, {
					method: 'DELETE'
				}).then(res => res.text())
					.then(response => {
						console.log('Success:', JSON.stringify(response));
						var newerStore = newStore.contacts.filter( (day) => {
							return day.id !== index;
						});
						setStore({ contacts: newerStore });
					})
					.catch(error => console.error('Error:', error));
			}
			//(Arrow) Functions that update the Store
            // Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;


