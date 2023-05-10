// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashbord',
    path: '/finance/app',
    icon: icon('ic_analytics'),
  },
  
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'product',
    path: '/product/all',
    icon: icon('ic_cart'),
  },
  {
    title: 'Incomes',
    path: '/finance/incomes/all',
    icon: icon('ic_income'),
  },
  {
    title: 'Expenses',
    path: '/finance/expenses/all',
    icon: icon('ic_lock'),
  },

  //employee
  {
    title: 'Employee',
    path: '/employee/EmployeeListPage',
    icon: icon('ic_user'),
  },

  {
    title: 'Salary',
    path: '/employee/CalculateSalaryPage',
    icon: icon('ic_list'),
  },


  //suplier
  {
    title: 'Supplier List',
    path: '/supplier/SupplierList',
    icon: icon('ic_list'),
  },


//supplier
  {
    title: 'Supply History',
    path: '/supplier/SupplyHistory',
    icon: icon('ic_list'),
  },

//order
  {
    title: 'Order',
    path: '/order/orders',
    icon: icon('ic_list'),
  },

//deliver
  {
    title: 'Delivery Guys',
    path: '/deliver/DeliveryGuy',
    icon: icon('ic_list'),
  },

  {
    title: 'Delivery Orders',
    path: '/deliver/viewOrder',
    icon: icon('ic_list'),
  },

  //cus
  {
    title: 'Add inquiry',
    path: '/inquire/Addinquiry',
    icon: icon('ic_list'),
  },
 

  {
    title: 'inquiry',
    path: '/inquire/ViewAddinquiry',
    icon: icon('ic_list'),
  }, 
    
  {
    title: 'respond inquiry',
    path: '/inquire/viewCustomerInquiry',
    icon: icon('ic_list'),
  },



   //{
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  {
    title: 'login',
    path: '/LoginPage',
    icon: icon('ic_lock'),
  },

 



];

export default navConfig;
