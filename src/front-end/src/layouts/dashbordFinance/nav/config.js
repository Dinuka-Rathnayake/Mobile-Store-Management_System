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
    title: 'Incomes',
    path: '/finance/incomes/all',
    icon: icon('ic_income'),
  },
  {
    title: 'Expenses',
    path: '/finance/expenses/all',
    icon: icon('ic_lock'),
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
