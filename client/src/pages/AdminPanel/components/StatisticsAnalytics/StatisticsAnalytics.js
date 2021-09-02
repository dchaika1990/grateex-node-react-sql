import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CountUp from "react-countup";
import {getUsersStatistics} from "@services/userAPI";
import Loading from "@components/Loading";
import {getProductsStatistics} from "@services/productAPI";

const StatisticsAnalytics = () => {
	const [fetch, setFetch] = useState(true)

	const [usersCount, setUsersCount] = useState(0)
	const [usersPendingCount, setUsersPendingCount] = useState(0)
	const [usersApprovedCount, setUsersApprovedCount] = useState(0)

	const [productsCount, setProductsCount] = useState(0)
	const [productsPendingCount, setProductsPendingCount] = useState(0)
	const [productsApprovedCount, setProductsApprovedCount] = useState(0)
	const [productsRejectedCount, setProductsRejectedCount] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			const {usersAll, usersPending, usersApproved} = await getUsersStatistics()
			const {productsAll, productsPending, productsApproved, productsRejected} = await getProductsStatistics()
			setUsersCount(usersAll)
			setUsersPendingCount(usersPending)
			setUsersApprovedCount(usersApproved)
			setProductsCount(productsAll)
			setProductsPendingCount(productsPending)
			setProductsApprovedCount(productsApproved)
			setProductsRejectedCount(productsRejected)
		}
		fetchData().then(() => {
			setFetch(false)
		})
	}, [])

	return (
		<>
			{fetch && (<Loading/>)}
			<section className="py-5">
				<Container>
					<Row>
						<Col lg={6}>
							<div className="ls p-3 shadow rounded">
								<h3 className="color-main">Number Of Users</h3>
								<h6 className="fw-bold fs-3"><CountUp end={usersCount} duration={0.7}/></h6>
								<hr/>
								<Row>
									<Col lg={6}>
										<h5>Approve Users</h5>
										<h6 className="fw-bold fs-3"><CountUp end={usersApprovedCount} duration={0.7}/>
										</h6>
									</Col>

									<Col lg={6}>
										<h5>Pending Users</h5>
										<h6 className="fw-bold fs-3"><CountUp end={usersPendingCount} duration={0.7}/>
										</h6>
									</Col>
								</Row>
							</div>
						</Col>
						<Col lg={6}>
							<div className="ls p-3 shadow rounded">
								<h3 className="color-main">Number Of Products</h3>
								<h6 className="fw-bold fs-3"><CountUp end={productsCount} duration={0.7}/></h6>
								<hr/>
								<Row>
									<Col lg={4}>
										<h5>Approve Products</h5>
										<h6 className="fw-bold fs-3"><CountUp end={productsApprovedCount}
																			  duration={0.7}/></h6>
									</Col>

									<Col lg={4}>
										<h5>Pending Products</h5>
										<h6 className="fw-bold fs-3"><CountUp end={productsPendingCount}
																			  duration={0.7}/></h6>
									</Col>
									<Col lg={4}>
										<h5>Rejected Products</h5>
										<h6 className="fw-bold fs-3"><CountUp end={productsRejectedCount}
																			  duration={0.7}/></h6>
									</Col>
								</Row>
							</div>
						</Col>
						<Col lg={6}>
							<div className="ls mt-3 p-3 shadow rounded">
								<h3 className="color-main">Five Best-Sellers in This Month Users</h3>
								<ol>
									<li>
										<h6>Dima</h6>
										<span>15 products</span>
									</li>
									<li>
										<h6>VAsys</h6>
										12 products
									</li>
									<li>
										<h6>Petya</h6>
										10 products
									</li>
									<li>
										<h6>Pavel</h6>
										5 products
									</li>
									<li>
										<h6>John</h6>
										3 products
									</li>
								</ol>
							</div>
						</Col>
						<Col lg={6}>
							<div className="ls mt-3 p-3 shadow rounded">
								<h3 className="color-main">Five Best-Sellers in This Month Products</h3>
								<ol>
									<li>
										<h6>React</h6>
										12 sales
									</li>
									<li>
										<h6>Angular</h6>
										10 sales
									</li>
									<li>
										<h6>Vue</h6>
										8 sales
									</li>
									<li>
										<h6>Wordpress</h6>
										6 sales
									</li>
									<li>
										<h6>Laravel</h6>
										4 sales
									</li>
								</ol>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default StatisticsAnalytics;
