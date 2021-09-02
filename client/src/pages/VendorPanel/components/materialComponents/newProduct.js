import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {addProduct, editProduct, getAllFilters} from "@services/productAPI";
import {getCategories, getCategoriesByList} from "@services/categoryAPI";
import {productIsEditingAction, productToEditId} from "@/actions/products";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import Loading from "@components/Loading";
import {ADMIN_ROUTE, VENDOR_PANEL} from "@/utils/consts";
import {socket} from "@services/socket";
import FiltersComponent from "@pages/VendorPanel/components/materialComponents/FiltersComponent";
import TreeSelect from "@components/TreeSelect/TreeSelect";

const NewProduct = ({location}) => {
	const formData = new FormData();
	const dispatch = useDispatch();
	const history = useHistory();
	const {currentUser} = useSelector(state => state.user)
	const {productToEdit} = useSelector(state => state.product)
	const catsReducer = useSelector(state => state.categories)
	const {categoriesList} = useSelector(state => state.categories)
	const {filters} = useSelector(state => state.product)
	const {productsUploads} = useSelector(state => state.product)
	let productEdited;
	if (location) {
		productEdited = location.state.prod
	} else {
		productEdited = productsUploads.filter(prod => prod.id === productToEdit)[0]
	}

	const [fetch, setFetch] = useState(true)
	const [productFile, setProductFile] = useState([])
	const [deleteFileArr, setDeleteFileArr] = useState([])
	const [terms, setTerms] = useState(false)
	const [productPreviewFiles, setPredefinedFile] = useState([])
	const [productImage, setProductImage] = useState('')
	// const [productImageURL, setProductImageURLURL] = useState(process.env.REACT_APP_API_URL + product.productImage)

	const {register, handleSubmit, formState: {errors}, setValue} = useForm()
	const [description, setDescription] = useState(EditorState.createWithContent(
		ContentState.createFromBlockArray(
			convertFromHTML('')
		))
	)
	//------------------------------------------------------//
	const [categories, setCategories] = useState([])
	// const [categoriesList, setCategoriesList] = useState([])
	const [checkedArr, setCheckedArr] = useState([])
	const [searchInput, setSearchInput] = useState('')
	//------------------------------------------------------/

	const [product, setProduct] = useState({
		id: null,
		title: "",
		description: "",
		excerpt: "",
		productFiles: [],
		productPreviewFiles: [],
		price: "",
		productStatusId: 1,
		degreeLevels: [],
		resourceTypes: [],
		productFormats: [],
		typeSellings: [],
		productLanguages: [],
		productTypePriceId: 1,
		cats: "",
		productImage: "/placeholder.png"
	})

	useEffect(() => {
		return () => {
			if (history.action === "POP") {
				dispatch(productIsEditingAction(false))
				dispatch(productToEditId(null))
				location
					? history.push(ADMIN_ROUTE + '/products')
					: history.push(VENDOR_PANEL + '/materials')
			}
		};
	}, [history])

	useEffect(() => {

		const effect = async () => {
			try {
				setCategories(catsReducer.categories)

				if (productEdited) {
					setProduct(productEdited)
					// if (productEdited.productImg !== null) {
					// 	setProductImageURLURL(process.env.REACT_APP_API_URL + productEdited.productImg.name)
					// }
					setValue('productTypePrice', productEdited.productTypePriceId)
					setDescription(EditorState.createWithContent(
						ContentState.createFromBlockArray(
							convertFromHTML(productEdited.description)
						))
					)
					if (productEdited.cats.length) {
						productEdited.cats.forEach(cat => {
							setCheckedArr(prevState => ([...prevState, cat.id]))
						})
					}
				}
			} catch (e) {
				toast.error(e.response?.data?.message)
			}
		}
		effect().then(() => {
			setFetch(false)
		})
	}, [productEdited])

	const handleAddProductFiles = ({meta, file}, status, files) => {
		setTimeout(() => {
			if (['done', 'removed'].includes(status)) {
				setProductFile([...files]);
			}
		}, 0);
	}

	const handleAddProductPreviewFiles = ({meta, file}, status, files) => {
		setTimeout(() => {
			if (['done', 'removed'].includes(status)) {
				setPredefinedFile([...files]);
			}
		}, 0);
	}

	const deleteFileHandler = (id) => {
		setDeleteFileArr([...deleteFileArr, id])
		setProduct(prevState => {
			return {
				...prevState,
				productFiles: product.productFiles?.length ? product.productFiles.filter(item => item.id !== id) : prevState.productFiles,
				productPreviewFiles: product.productPreviewFiles?.length ? product.productPreviewFiles.filter(item => item.id !== id) : prevState.productPreviewFiles
			}
		})
	}

	const onChange = (currentNode, selectedNodes) => {
		product.cats = ''
		let str = ''
		selectedNodes.forEach((item, i) => {
			str += selectedNodes.length - 1 === i ? item.id : item.id + ','
		})
		product.cats = str
	}

	const saveImage = async (e) => {
		setProductImage(e.target.files[0]);
		// setProductImageURLURL(URL.createObjectURL(e.target.files[0]))
	};

	const onSubmit = async (data) => {
		const prodElems = ['id', 'cats', 'status', 'degreeLevels', 'resourceTypes', 'productFormats', 'typeSellings', 'productLanguages', 'productTypePriceId']
		productFile.forEach(({file, meta}) => formData.append(meta.name, file))

		productPreviewFiles.map(({file, meta}) => formData.append('pred-file-' + meta.name, file))
		data.deleteFileArr = deleteFileArr;
		data.description = draftToHtml(convertToRaw(description.getCurrentContent()))
		product.cats =  checkedArr.join(',')
		prodElems.forEach(item => {
			data[item] = product[item]
		})

		if (product.productTypePriceId === 1) data.price = 0

		formData.append('form', JSON.stringify(data))
		formData.append('productImage', productImage)

		const _closeProduct = () => {
			product.status === 1
				? toast.info('Save product to draft')
				: toast.success('Product Saved')
			dispatch(productIsEditingAction(false))
			dispatch(productToEditId(null))
			location && history.push(ADMIN_ROUTE + '/products')
		}

		try {
			productEdited
				? editProduct(formData).then(_closeProduct)
				: addProduct(formData).then(_closeProduct)
		} catch (e) {
			toast.error(e.response?.data?.message)
		}
	}
	const onDraft = () => {
		setProduct({...product, status: 1})
	}
	const onPublish = () => {
		currentUser.isTrusted
			? setProduct({...product, status: 3})
			: setProduct({...product, status: 2})
		socket.emit('vendor_publish_product', {nickName: currentUser.nickName, product: product.title})
	}
	const onSave = () => {
		setProduct({...product, status: 3})
	}

	return (
		<>
			{fetch ? (
				<Loading/>
			) : (
				<>
					<section className="py-5">
						<Container>
							<Col>
								<Row>
									<Col>
										<Form className="mt-5 p-3 p-md-5 shadow ls rounded"
											  onSubmit={handleSubmit(onSubmit)}>
											<Form.Group>
												<FormLabel>Title (required*)</FormLabel>
												<Form.Control
													defaultValue={product.title}
													className={errors.title && 'is-invalid'}
													placeholder="Enter your Title..."
													{...register("title", {required: true})}
												/>
												{errors?.title?.type === "required" &&
												<p className='invalid-feedback'>This field is required</p>}
											</Form.Group>
											<Row>
												{/*<Col lg={4}>*/}
												{/*	<Form.Group className="mt-5">*/}
												{/*		<Form.Label>Choose product image</Form.Label>*/}
												{/*		<div className="mb-3">*/}
												{/*			<Form.Control type="file" name="image" onChange={saveImage}/>*/}
												{/*		</div>*/}
												{/*		<div className="avatar">*/}
												{/*			<Image src={productImageURL}/>*/}
												{/*		</div>*/}
												{/*	</Form.Group>*/}
												{/*</Col>*/}
												<Col xs={12}>
													<Form.Group className="mt-3">
														<FormLabel>Subtitle (required*)</FormLabel>
														<Form.Control
															defaultValue={product.excerpt}
															className={errors.excerpt && 'is-invalid'}
															placeholder="Enter your excerpt..."
															{...register("excerpt", {required: true})}
														/>
														{errors?.excerpt?.type === "required" &&
														<p className='invalid-feedback'>This field is required</p>}
													</Form.Group>
													<Form.Group className="mt-3">
														<FormLabel>Description</FormLabel>
														<div className={errors.description && 'is-invalid'}>
															<Editor
																initialEditorState={description}
																editorState={description}
																onEditorStateChange={setDescription}
															/>
														</div>
													</Form.Group>
													<Form.Group className="mt-3">
														<Form.Label>Change your file(s)</Form.Label>
														<div className="mb-3">
															<Dropzone
																maxSizeBytes="209715200"
																onChangeStatus={handleAddProductFiles}
															/>
															<Form.Text className="text-muted">Please use zip-files for
																collections
																of more than 3 files. (Up to 200 MB)</Form.Text>
															{(!product.productFiles) ? (
																<p>You have not any files</p>
															) : (
																<ul>
																	{product.productFiles.map(file => {
																		return (
																			<li key={file.id}>{file.file_name.slice(file.file_name.lastIndexOf('/') + 1)}
																				<i onClick={e => deleteFileHandler(file.id)}
																				   className="fa fa-close ms-3"/></li>
																		)
																	})}
																</ul>
															)}
														</div>
													</Form.Group>
													<Form.Group className="mt-3">
														<Form.Label>Choose a preview file(s)</Form.Label>
														<div className="mb-3">
															<Dropzone
																maxSizeBytes="209715200"
																onChangeStatus={handleAddProductPreviewFiles}
															/>
															<Form.Text className="text-muted">This file will serve as a
																demo and will be visible to all users.</Form.Text>
															{(!product.productPreviewFiles) ? (
																<p>You have not any files</p>
															) : (
																<ul>
																	{product.productPreviewFiles.map(file => {
																		return (
																			<li key={file.id}>{file.file_name.slice(file.file_name.lastIndexOf('/') + 1)}
																				<i onClick={e => deleteFileHandler(file.id)}
																				   className="fa fa-close ms-3"/></li>
																		)
																	})}
																</ul>
															)}
														</div>
													</Form.Group>
												</Col>
											</Row>
											<Row className="mt-5">
												<FiltersComponent
													product={product}
													filters={filters}
													setProduct={setProduct}
													errors={errors}
													register={register}
												/>
											</Row>
											<Form.Group className="mt-2">
												<FormLabel>Academic field</FormLabel>
												<TreeSelect
													tags={true}
													multiple={true}
													checkedArr={checkedArr}
													setCheckedArr={setCheckedArr}
													arr={categories}
													list={categoriesList}
													setCategories={setCategories}
													searchInput={searchInput}
													setSearchInput={setSearchInput}/>
											</Form.Group>
											{!location && (
												<Form.Group className="mt-5">
													<Form.Check type="checkbox">
														<Form.Check.Input
															id="terms"
															className="me-2"
															type="checkbox"
															onChange={e => setTerms(!terms)} value={terms}
														/>
														<Form.Check.Label htmlFor="terms">
															By publishing this material, I agree with the <a
															className="link-primary" target="_blank" rel="noreferrer"
															href="https://grateex.com/blog/terms-of-use/">terms
															of service</a> and <a target="_blank"
																				  rel="noreferrer"
																				  className="link-primary"
																				  href="https://grateex.com/blog/privacy-policy/">privacy
															policy</a>.
														</Form.Check.Label>
													</Form.Check>
												</Form.Group>
											)}
											<Form.Group className="mt-5">
												<ButtonGroup>
													{!location ? (
														<>
															<Button
																variant="outline-success"
																type="submit"
																onClick={onDraft}
																disabled={!terms}
															>
																Save as draft
															</Button>
															<Button
																variant="success"
																type="submit"
																onClick={onPublish}
																disabled={!terms}
															>
																Publish
															</Button>
														</>
													) : (
														<Button
															variant="success"
															type="submit"
															onClick={onSave}
														>
															Publish
														</Button>
													)}
													<Button
														type="button"
														variant="info"
														size="lg"
														onClick={() => {
															dispatch(productIsEditingAction(false))
															dispatch(productToEditId(null))
															location && history.push(ADMIN_ROUTE + '/products')
														}}
													>
														Go back without saving
													</Button>
												</ButtonGroup>
											</Form.Group>
										</Form>
									</Col>
								</Row>
							</Col>
						</Container>
					</section>
				</>
			)}
		</>
	);
};

export default NewProduct;
