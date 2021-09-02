export function flatten(array, id) {
	for (let j = 0; j < array.length; j++) {
		if (+array[j].id === +id) {
			array[j].isDefaultValue = true
		}
		if (array[j].children.length) {
			flatten(array[j].children, id)
		}
	}
}

export function separator(array, name, sign = ',') {
	let length = array.length
	return array.map((item, index) => {
		return (
			index === length - 1
                ? <span key={item.id}>{item[name]}</span>
                : <span key={item.id}>{item[name]}{sign} </span>
		)
	})
}
