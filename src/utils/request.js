export const request = async (url, method, data) =>
	 await fetch(url,{
		headers: {
			'content-type': "application/json" //для загрузки фото и мероприятий менять на форм-дата, т.е. сделать проверку
		},
		method: method || "GET",
		body: data ? JSON.stringify(data) : undefined
	}).then(res => res.json())

