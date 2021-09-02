import React, {useMemo} from 'react';

const Tags = ({ids, setIds, list}) => {
	const titles = useMemo(() => {
		let arr = []
		ids.forEach(id => {
			list.forEach(item => {
				if (item.id === id) {
					arr.push({
						id: item.id,
						label: item.label
					})
				}
			})
		})
		return arr
	}, [ids])

	const deleteCat = (id) => {
		setIds(prev => (prev.filter(elem => elem !== id)))
	}

	return (
		<div className="tree-select-tags mb-2">
			{titles.map((title) => {
				return (
					<span key={title.id}>{title.label} <i onClick={e => deleteCat(title.id)} className="close fa fa-close" /></span>
				)
			})}
		</div>
	);
};

export default Tags;
