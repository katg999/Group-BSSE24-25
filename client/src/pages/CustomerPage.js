import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = useCallback(async () => { // Use useCallback here
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const { data } = await axios.get('/api/bills/get-bills');
      setBillsData(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      dispatch({ type: 'HIDE_LOADING' });
    }
  }, [dispatch]); // Add dispatch as a dependency

  useEffect(() => {
    getAllBills(); 
  }, [getAllBills]); // Include getAllBills in the dependency array

  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Customer Name', dataIndex: 'customerName' },
    { title: 'Contact No', dataIndex: 'customerNumber' },
    { title: 'Total Amount', dataIndex: 'totalAmount' },
  ];

  return (
    <DefaultLayout>
      <h1>Customer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default CustomerPage;
