<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger shadow">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/images/logo.png" height="30" alt="CoolBrand">
        | KOPERASI
      </router-link>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-item nav-link active">Home</router-link>
          <router-link to="/register" class="nav-item nav-link">
            <i class="fa-regular fa-user pe-2"></i>
            Register
          </router-link>
          <router-link to="/login" class="nav-item nav-link">
            <i class="fa-regular fa-user pe-2"></i>
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container d-flex align-items-center flex-column">
      <!-- Masthead Avatar Image-->
      <img class="masthead-avatar mb-5" src="../assets/images/logo.png" alt="..." />
      <!-- Masthead Heading-->
      <h1 class="masthead-heading text-uppercase text-danger mb-0">Koperasi Simpan Pinjam</h1>
      <!-- Icon Divider-->
      <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
          <div class="divider-custom-line"></div>
      </div>
      <!-- Masthead Subheading-->
      <p class="masthead-subheading font-weight-light text-danger mb-0">--Selamat Datang Di Website Kami--</p>
  </div>

  <div class="footer">
<p>Koperasi Simpan Pinjam</p>
<p>Copyright © 2023 All rights reserved.KSP</p>

  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
  
.navbar-brand img {
transition: transform 0.3s ease-in-out;
}

.navbar-brand:hover img {
transform: scale(1.1);
}

.navbar-nav .nav-item {
margin-right: 15px;
}

/* Masthead styles */
.masthead-avatar {
border-radius: 50%;
transition: transform 0.3s ease-in-out;
margin-top: 5%;
}

.masthead-avatar:hover {
transform: scale(1.1);
}

.masthead-heading {
font-size: 2.5em;
}

.divider-custom-line,
.divider-custom-icon {
display: inline-block;
vertical-align: middle;
width: 30px;
height: 2px;
background-color: #fff;
}

.divider-custom-icon i {
color: #f39c12;
}

.divider-custom {
margin: 20px 0;
}

/* Masthead Subheading Animation */
.masthead-subheading {
opacity: 0;
transform: translateY(20px);
transition: opacity 0.6s ease, transform 0.6s ease;
}

.container:hover .masthead-subheading {
opacity: 1;
transform: translateY(0);
}

.masthead-heading {
  font-size: 2.5em;
  animation: bounce 1s infinite;
}

.footer{
  border: 2px solid #ffffff; 
  padding-top: 15px; 
  background-color: #f8f8f8;
  text-align: center;
  margin-top: 3%;
}



</style>
