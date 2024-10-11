import { EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import DefaultLayout from '../components/DefaultLayout';
import '../styles/InvoiceStyles.css';

const BillsPage = () => {
	const componentRef = useRef();
	const dispatch = useDispatch();
	const [billsData, setBillsData] = useState([]);
	const [popupModal, setPopupModal] = useState(false);
	const [selectedBill, setSelectedBill] = useState(null);

	// Fetch all bills from API
	const getAllBills = async () => {
		try {
			dispatch({
				type: 'SHOW_LOADING',
			});
			const { data } = await axios.get('https://group-bsse24-25-2.onrender.com/api/bills/get-bills');
			setBillsData(data);
			dispatch({ type: 'HIDE_LOADING' });
		} catch (error) {
			dispatch({ type: 'HIDE_LOADING' });
			console.error(error);
		}
	};

	// UseEffect to fetch bills on component mount
	useEffect(() => {
		getAllBills();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Print function using useReactToPrint hook
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	// Table columns definition
	const columns = [
		{ title: 'ID', dataIndex: '_id', key: '_id' },
		{ title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
		{ title: 'Contact No', dataIndex: 'customerNumber', key: 'customerNumber' },
		{ title: 'Subtotal', dataIndex: 'subTotal', key: 'subTotal' },
		{ title: 'Tax', dataIndex: 'tax', key: 'tax' },
		{ title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
		{
			title: 'Actions',
			dataIndex: '_id',
			key: 'actions',
			render: (id, record) => (
				<EyeOutlined
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setSelectedBill(record);
						setPopupModal(true);
					}}
				/>
			),
		},
	];

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between'>
				<h1>Invoice list</h1>
			</div>

			<Table
				columns={columns}
				dataSource={billsData}
				bordered
				pagination={false}
			/>

			{popupModal && (
				<Modal
					width={400}
					visible={popupModal}
					title='Invoice Details'
					onCancel={() => setPopupModal(false)}
					footer={null}
				>
					{/* Invoice Modal Content */}
					<div id='invoice-POS' ref={componentRef}>
						<center id='top'>
							<div className='info'>
								<h2>ABC Food Cafe</h2>
								<p>
									Contact: +8801812345678
									<br />
									Dhaka, Bangladesh
								</p>
							</div>
						</center>

						<div id='mid' className='mt-2'>
							<p>
								Customer Name: <b>{selectedBill?.customerName}</b>
								<br />
								Phone No: <b>{selectedBill?.customerNumber}</b>
								<br />
								Date:{' '}
								<b>
									{new Date(selectedBill?.date).toLocaleDateString('en-GB')}
								</b>
							</p>
							<hr style={{ margin: '5px' }} />
						</div>

						<div id='bot'>
							<table>
								<thead>
									<tr className='tabletitle'>
										<th className='item'>Item</th>
										<th className='quantity'>Quantity</th>
										<th className='rate'>Price</th>
										<th className='total'>Total</th>
									</tr>
								</thead>
								<tbody>
									{selectedBill?.cartItems.map((item) => (
										<tr key={item._id} className='service'>
											<td className='tableitem'>{item.name}</td>
											<td className='tableitem'>{item.quantity}</td>
											<td className='tableitem'>{item.price}</td>
											<td className='tableitem'>
												{item.quantity * item.price}
											</td>
										</tr>
									))}
									<tr className='tabletitle'>
										<td colSpan={2} />
										<td className='rate'>Tax</td>
										<td className='payment'>BDT {selectedBill?.tax}</td>
									</tr>
									<tr className='tabletitle'>
										<td colSpan={2} />
										<td className='rate'>
											<b>Grand Total</b>
										</td>
										<td className='payment'>
											<b>BDT {selectedBill?.totalAmount}</b>
										</td>
									</tr>
								</tbody>
							</table>

							<div id='legalcopy'>
								<p className='legal'>
									<strong>Thank you for your order!</strong> 15% VAT applied to
									the total amount. This amount is non-refundable. For
									assistance, email <b>help123@gmail.com</b>.
								</p>
							</div>
						</div>
					</div>

					<div className='d-flex justify-content-end mt-3'>
						<Button type='primary' onClick={handlePrint}>
							Print
						</Button>
					</div>
				</Modal>
			)}
		</DefaultLayout>
	);
};

export default BillsPage;
