import React from 'react';
import {Col, Form, FormLabel} from "react-bootstrap";

const FiltersComponent = (
	{
		product,
		filters,
		setProduct,
		errors,
		register,
	}
) => {

	return (
		<>
			{filters.map((filter, index) => {
				let key = Object.keys(filter)
				return (
					<Col className="mb-4" key={index} md={4}>
						<FormLabel><h5>{filter[key].name}</h5></FormLabel>
						{filter[key].options.map((subfilter, index) => {
							let checked = filter[key].multiple
								? product[filter[key].slug].some(item => item.id === subfilter.id)
								: (product[filter[key].slug] === subfilter.id)
							let onChange = () => {
								if (filter[key].multiple) {
									checked
										? setProduct({
											...product,
											[filter[key].slug]: product[filter[key].slug].filter(item => item.id !== subfilter.id)
										})
										: setProduct({
											...product,
											[filter[key].slug]: [...product[filter[key].slug], {id: subfilter.id}]
										})
								} else {
									setProduct({...product, [filter[key].slug]: subfilter.id})
								}
							}
							return (
								<Form.Check
									key={index}
									className="d-flex align-items-center">
									<Form.Check.Input
										className="me-2 mt-0"
										id={filter[key].slug + subfilter.name + subfilter.id}
										type={filter[key].multiple ? "checkbox" : "radio"}
										name={!filter[key].multiple ? filter[key].slug : ''}
										defaultChecked={checked}
										onChange={onChange}
									/>
									<Form.Check.Label
										htmlFor={filter[key].slug + subfilter.name + subfilter.id}>{subfilter.name}</Form.Check.Label>
								</Form.Check>
							)
						})}
						{/*<Form.Select*/}
						{/*	className="mb-3"*/}
						{/*	defaultValue={*/}
						{/*		filter[key].multiple*/}
						{/*			? product[filter[key].slug].map(item => item.id)*/}
						{/*			: product[filter[key].slug]*/}
						{/*	}*/}
						{/*	aria-label={key[0]}*/}
						{/*	multiple={filter[key].multiple}*/}
						{/*	name={key[0]}*/}
						{/*	{...register(key[0])}*/}
						{/*>*/}
						{/*	{filter[key].options.map((subfilter, index) => {*/}
						{/*		return (*/}
						{/*			<option*/}
						{/*				key={subfilter.id}*/}
						{/*				value={subfilter.id}*/}
						{/*			>*/}
						{/*				{subfilter.name}*/}
						{/*			</option>*/}
						{/*		)*/}
						{/*	})}*/}
						{/*</Form.Select>*/}
					</Col>
				)
			})}
			<Col md={4}>
				{(product.productTypePriceId === 2) && (
					<Form.Group>
						<FormLabel>Price (required*)</FormLabel>
						<Form.Control
							defaultValue={product.price}
							className={errors.price && 'is-invalid'}
							placeholder="Enter your Price..."
							{...register("price", {required: true})}
						/>
						{errors?.price?.type === "required" &&
						<p className='invalid-feedback'>This field is required</p>}
					</Form.Group>
				)}
			</Col>
		</>
	);
};

export default FiltersComponent;
