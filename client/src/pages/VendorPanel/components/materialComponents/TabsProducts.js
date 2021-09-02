import React from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Container, Row, Tabs, Tab} from "react-bootstrap";
import MyUploads from "@pages/VendorPanel/components/materialComponents/MyUploads";
import MyPurchases from "@pages/VendorPanel/components/materialComponents/MyPurchases";
import WishList from "@pages/VendorPanel/components/materialComponents/WishList";
import {productIsEditingAction} from "@/actions/products";

const TabsProducts = () => {
	const dispatch = useDispatch()

	return (
		<section className="py-5">
			<Container>
				<Col>
					<Row className="align-items-center">
						<Col md={6}>
							<h2>My materials</h2>
						</Col>
						<Col md={6} className="text-md-end">
							<Button
								type="button"
								variant="success"
								size="lg"
								onClick={() => dispatch(productIsEditingAction(true))}
							>
								Add new product
							</Button>
						</Col>
					</Row>
					<Tabs defaultActiveKey="MyUploads" id="products" className="mt-3">
						<Tab eventKey="MyUploads" title="My uploads">
							<MyUploads />
						</Tab>
						<Tab eventKey="MyPurchases" title="My purchases">
							<MyPurchases />
						</Tab>
						<Tab eventKey="WishList" title="WishList">
							<WishList />
						</Tab>
					</Tabs>
				</Col>
			</Container>
		</section>
	);
};

export default TabsProducts;
