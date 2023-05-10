import { Navigate, useRoutes } from 'react-router-dom';
import React, {useState} from "react"
// layouts
// import DashboardLayout from './layouts/dashboard';
import DashboardLayout from './layouts/dashboard';

import SimpleLayout from './layouts/simple';
//


import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';

import AllProducts from './layouts/products/AllProducts';
import AddProducts from './layouts/products/AddProducts';
import EditProducts from './layouts/products/EditProducts';

import AllIncomes from './layouts/finance/AllIncomes';
import AddIncomes from './layouts/finance/AddIncomes';
import EditIncomes from './layouts/finance/EditIncomes';

import AllExpenses from './layouts/finance/AllExpenses';
import AddExpenses from './layouts/finance/AddExpenses';
import EditExpenses from './layouts/finance/EditExpenses';

import AddEmployeePage from './pages/AddEmployeePage';
import EmployeeList from './pages/EmployeeListPage2';
import CalculateSalaryPage from './pages/CalculateSalaryPage';
import SalaryReportPage from './pages/SalaryReportPage';

/* import SupplierPages */
import AddSuppliers from './components/Suppliers/Addsuppliers';
import SupplierList from './components/Suppliers/SupplierList';
import EditSuppliers from './components/Suppliers/EditSuppliers';
import SupplyHistory from './components/Suppliers/SupplyHistory';
import AddSupplyDetails from './components/Suppliers/AddSupplyDetails';

import Orders from './pages/orders';

import AddDeliveryGuy from './pages/addDeliveryGuy';
import DeliveryGuy from './pages/DeliveryGuy';
import AddOrder from './pages/addOrder';
import ViewOrder from './pages/viewOrders'; 

import CustomerInquiry from './components/CustomerFeedBack/CustomerInquiry';
import ViewCustomerInquiry from './components/CustomerFeedBack/ViweCustomerInquiry';
import ViewAddinquiry from './components/CustomerFeedBack/ViewAddinquiry'
import Addinquiry from './components/CustomerFeedBack/Addinquiry';


// ----------------------------------------------------------------------

export default function Router() {

  //take id by all students
  const [selectId, setId] = useState()

  //finance
  const [selectExpensesId, setExpensesId] = useState();
  console.log("This is route id "+selectExpensesId);

  const routes = useRoutes([
    {
      path: '/product',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/product/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'all', element: <AllProducts setId={setId} /> },
        { path: 'all/add', element: <AddProducts /> },
        { path: 'all/edit', element: <EditProducts selectId={selectId}/> },

      ],
    },

    //finance
    {
      path: '/finance',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/finance/app" /> },
        { path: 'app', element: <DashboardAppPage /> },

        { path: 'incomes/all', element: <AllIncomes setId={setId} /> },
        { path: 'incomes/all/add', element: <AddIncomes  /> },
        { path: 'incomes/all/edit', element: <EditIncomes selectId={selectId} /> },

        { path: 'expenses/all', element: <AllExpenses setExpensesId={setExpensesId} /> },
        { path: 'expenses/all/add', element: <AddExpenses  /> },
        { path: 'expenses/all/edit', element: <EditExpenses selectExpensesId={selectExpensesId}/> },
      ],
    },

    //salary
    {
      path: '/employee',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'EmployeeListPage', element: <EmployeeList /> },
        { path: 'CalculateSalaryPage', element: <CalculateSalaryPage/> },
        { path: 'AddEmployeePage', element: <AddEmployeePage /> },
        
        // { path: 'EditEmployee', element: <EditEmployee /> },
        { path: 'SalaryReportPage', element: <SalaryReportPage /> },
       
        
      ],
    },

    //supplier
    {
      path: '/supplier',
      element: <DashboardLayout />,
      children: [
       /*  { element: <Navigate to="/dashboard/app" />, index: true }, */
       /*  { element: <Navigate to="/dashboard/loging" />, index: true }, */
        { path: 'app', element: <DashboardAppPage /> },
        
        
        { path: 'addsuppliers', element: <AddSuppliers /> },
        { path: 'supplierList', element: <SupplierList/>},
        { path: 'editSuppliers', element: <EditSuppliers/>},
        { path: 'supplyHistory', element: <SupplyHistory />},
        { path: 'addSupplyDetails', element: <AddSupplyDetails />},
        

      ],
    },

    //order
    {
      path: '/order',
      element: <DashboardLayout />,
      children: [
       /*  { element: <Navigate to="/dashboard/app" />, index: true }, */
       /*  { element: <Navigate to="/dashboard/loging" />, index: true }, */
        { path: 'app', element: <DashboardAppPage /> },
        
        
        { path: 'orders', element: <Orders /> },
      ],
    },

        //supplier
    {
      path: '/supplier',
      element: <DashboardLayout />,
      children: [
       /*  { element: <Navigate to="/dashboard/app" />, index: true }, */
       /*  { element: <Navigate to="/dashboard/loging" />, index: true }, */
        { path: 'app', element: <DashboardAppPage /> },
        
        
        { path: 'addsuppliers', element: <AddSuppliers /> },
        { path: 'supplierList', element: <SupplierList/>},
        { path: 'editSuppliers', element: <EditSuppliers/>},
        { path: 'supplyHistory', element: <SupplyHistory />},
        { path: 'addSupplyDetails', element: <AddSupplyDetails />},
        

      ],
    },
      //deliver
    {
      path: '/deliver',
      element: <DashboardLayout />,
      children: [
       /*  { element: <Navigate to="/dashboard/app" />, index: true }, */
       /*  { element: <Navigate to="/dashboard/loging" />, index: true }, */
        { path: 'app', element: <DashboardAppPage /> },
        
        
        { path: 'addDeliveryGuy', element: <AddDeliveryGuy /> },
        { path: 'DeliveryGuy', element: <DeliveryGuy/> },
        { path: 'addOrder', element: <AddOrder/> },
        { path: 'viewOrder', element: <ViewOrder/> },
        

      ],
    },

    //inquire
    {
      path: '/inquire',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        { path: 'app', element: <DashboardAppPage /> },
        
        { path: 'customerinquiry', element: <CustomerInquiry /> },
        { path: 'viewCustomerInquiry', element: <ViewCustomerInquiry /> },
        

        { path: 'Addinquiry', element: <Addinquiry /> },
        { path: 'ViewAddinquiry', element: <ViewAddinquiry /> },
      ],
    },

    //repair





    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/product/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
