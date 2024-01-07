<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger shadow">
      <div class="container-fluid">
        <button @click="toggleSidebar" type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a href="#" class="navbar-brand">
          <img src="../assets/images/logo.png" height="30" alt="CoolBrand">
          KOPERASI | KSP
        </a>
        
      </div>
    </nav>

    <!-- Dashboard -->
    <div class="dashboard">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
        <header>
          <h1 class="judul">Menu</h1>
        </header>
        <hr>
        <nav class="navigation-links">
          <router-link to="/homepanel" class="router-link">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link to="/tabungan" class="router-link">
            <i class="fas fa-coins"></i> Tabungan
          </router-link>
          <router-link to="/jenistransaksi" class="router-link">
            <i class="fas fa-exchange-alt"></i> Jenis Transaksi
          </router-link>
          <router-link to="/nasabah" class="router-link">
            <i class="fas fa-users"></i> Nasabah
          </router-link>
          <router-link to="/agama" class="router-link">
            <i class="fas fa-praying-hands"></i> Agama
          </router-link>
          <span @click="logout" class="router-link logout-button">
            <i class="fas fa-sign-out-alt"></i> Logout
          </span>
        </nav>
      </aside>

      <!-- Content -->
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'Dashboard',
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    logout() {
      // Hapus token dari localStorage saat logout
      localStorage.removeItem('token');
      // Redirect ke halaman login setelah logout
      this.$router.push({ name: 'Landing' });
    },
  },
};
</script>

<style scoped>
/* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

/* Navbar styles */
.navbar {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding-bottom: 1%;
  padding-top: 1%;
}

.navbar-brand {
  font-weight: bold;
}

/* Dashboard layout */
.dashboard {
  display: flex;
  height: 100vh;
}

/* Sidebar styles */
.sidebar {
  width: 264px;
  height: auto;
  background: linear-gradient(to right, #2c3e50, #273746);
  color: #ffffff;
  transition: margin-left 0.3s ease;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.3);
}

.sidebar.collapsed {
  margin-left: -264px;
}

/* Sidebar header styles */
.sidebar header {
  padding: 20px;
  text-align: center;
}

.sidebar header h1 {
  font-size: 1.5rem;
  color: #ffffff;
}

/* Sidebar navigation styles */
.navigation-links {
  padding-top: 20px;
  padding-left: 20px;
}

.router-link {
  text-decoration: none;
  color: #ffffff;
  display: block;
  padding: 10px 0;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.router-link:hover {
  background-color: #3498db;
}

/* Logout button styles */
.logout-button {
  cursor: pointer;
  padding: 10px 0;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #e74c3c;
}

/* Content styles */
.content {
  flex: 1;
  padding: 20px;
}

/* Responsive styles */
@media (max-width: 767px) {
  .sidebar {
    margin-left: -264px;
  }
  .sidebar.collapsed {
    margin-left: 0;
  }
}
</style>
