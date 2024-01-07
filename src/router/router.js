import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../components/Dashboard.vue';
import Homepanel from '../components/Homepanel.vue';
import Jenistransaksi from '../components/Jenistransaksi.vue';
import Tabungan from '../components/Tabungan.vue';
import Nasabah from '../components/Nasabah.vue';
import Agama from '../components/Agama.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Landing from '../components/Landing.vue';
import TambahNasabah from '../components/TambahNasabah.vue';
import TambahAgama from '../components/TambahAgama.vue';
import TambahJenisTransaksi from '../components/TambahJenisTransaksi.vue';
import TambahTabungan from '../components/TambahTabungan.vue';
import EditTabungan from '../components/EditTabungan.vue';
import EditJenisTransaksi from '../components/EditJenisTransaksi.vue';
import EditNasabah from '../components/EditNasabah.vue';
import HistoryTabungan from '../components/HistoryTabungan.vue';


const routes = [
    {
    path: '/',
    name: 'Landing',
    component: Landing,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
        children:[
            {
                path: '/homepanel',
                name: 'Homepanel',
                component: Homepanel,
            },
            {
                path: '/jenistransaksi',
                name: 'Jenistransaksi',
                component: Jenistransaksi,
            },
            {
                path: '/tabungan',
                name: 'Tabungan',
                component: Tabungan,
            },
            {
                path: '/nasabah',
                name: 'Nasabah',
                component: Nasabah,
            },
            {
                path: '/agama',
                name: 'Agama',
                component: Agama,
            },
            {
              path: '/tambahnasabah',
              name: 'TambahNasabah',
              component: TambahNasabah,
            },
            {
              path: '/tambahagama',
              name: 'TambahAgama',
              component: TambahAgama,
            },
            {
              path: '/tambahjenistransaksi',
              name: 'TambahJenisTransaksi',
              component: TambahJenisTransaksi,
            },
            {
              path: '/tambahtabungan',
              name: 'TambahTabungan',
              component: TambahTabungan,
            },
            {
              path: '/edittabungan/:id',
              name: 'EditTabungan',
              component: EditTabungan,
            },
            {
              path: '/editjenistransaksi/:id',
              name: 'EditJenisTransaksi',
              component: EditJenisTransaksi,
            },
            {
              path: '/editnasabah/:id',
              name: 'EditNasabah',
              component: EditNasabah,
            },
            {
              path: '/historytabungan/:nasabahNama',
              name: 'HistoryTabungan',
              component: HistoryTabungan,
            },
        ],
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  console.log('token:', isAuthenticated);

  // Jika pengguna sudah login dan mencoba mengakses halaman login, arahkan ke dashboard
  if (isAuthenticated && to.name === 'Login') {
    console.log('Redirecting to Dashboard because user is already logged in');
    next({ name: 'Dashboard' });
    return;
  }

  // Periksa apakah rute memerlukan otentikasi
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Jika tidak ada token, arahkan ke halaman login
      next({ name: 'Login' });
    } else {
      // Jika sudah ada token, arahkan ke halaman yang diminta
      next();
    }
  } else {
    // Jika rute tidak memerlukan otentikasi, lanjutkan navigasi
    next();
  }
});

export default router;
