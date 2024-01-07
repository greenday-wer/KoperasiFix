<template>
  <div class="container">
    <h2>Edit Data Tabungan</h2>
    <form @submit.prevent="simpan()">
      <!-- Form Input Tabungan -->
      <div class="mb-3 form-group">
        <label>Nasabah:</label>
        <select v-model="tabungan.nasabah_id" class="form-control" required>
          <option v-for="nasabah in allNasabah" :key="nasabah.id" :value="nasabah.id">{{ nasabah.nama }}</option>
        </select>
      </div>
      <div class="mb-3 form-group">
        <label>Jenis Transaksi:</label>
        <div class="form-check" v-for="jenis in jenistransaksis" :key="jenis.id">
          <input type="radio" class="form-check-input" :id="jenis.jenistransaksi" v-model="tabungan.jenistransaksi_id" :value="jenis.id">
          <label class="form-check-label" :for="jenis.jenistransaksi">{{ jenis.jenistransaksi }}</label>
        </div>
      </div>
      <div class="mb-3 form-group">
        <label>Nominal:</label>
        <input type="text" class="form-control" v-model="tabungan.nominal" required />
      </div>
      <div class="mb-3 form-group">
        <label>Keterangan:</label>
        <input type="text" class="form-control" v-model="tabungan.keterangan" />
      </div>
      <div class="mb-3 form-group">
        <label>User:</label>
        <!-- Menampilkan nama pengguna yang sudah login -->
        <input type="text" class="form-control" v-model="loggedInUser" disabled />
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <router-link to="/" class="btn btn-warning">Batal</router-link>
      </div>
    </form>

    <!-- Pesan Simpan -->
    <div v-if="pesanSimpan" class="alert alert-success" role="alert">
      {{ pesanSimpan }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditTabungan',
  data() {
    return {
      tabungan: {
        id: '',
        nasabah_id: '',
        jenistransaksi_id: '',
        nominal: '',
        keterangan: '',
        user_id: '', // Ini tidak perlu karena kita akan mengambil user_id dari data login
      },
      allNasabah: [],
      jenistransaksis: [],
      loggedInUser: '',
      token: '',
      pesanSimpan: '',
    };
  },
  created() {
    const tabunganId = this.$route.params.id;
    console.log('Tabungan ID:', tabunganId);
    this.loadTabungan();
    this.loadAllNasabah();
    this.loadJenisTransaksi();
    this.loadLoggedInUser();
    this.loadToken();
  },
  methods: {
    loadTabungan() {
      const tabunganId = this.$route.params['id'];

      axios.get(`https://api-group1-prognet.manpits.xyz/api/tabungan/${tabunganId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.tabungan = data;
      });
    },

    loadAllNasabah() {
      axios.get('https://api-group1-prognet.manpits.xyz/api/nasabah', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.allNasabah = data;
      });
    },
    loadJenisTransaksi() {
      axios.get('https://api-group1-prognet.manpits.xyz/api/jenistransaksi', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.jenistransaksis = data;
      });
    },
    loadLoggedInUser() {
      // Mengambil nama pengguna dari localStorage
      const name = localStorage.getItem('name');
      this.loggedInUser = name ? name : 'name';
    },
    loadToken() {
      this.token = localStorage.getItem('token');
    },
    simpan() {
      axios.put(`https://api-group1-prognet.manpits.xyz/api/tabungan/${this.tabungan.id}`, this.tabungan, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.pesanSimpan = 'Data berhasil disimpan.';
      }).catch((error) => {
        console.error('Error saving data:', error);
        this.pesanSimpan = 'Gagal menyimpan data. Silakan coba lagi.';
      });
    }

  },
};
</script>

<style scoped>
.container {
  max-width: 10000px;
  margin: 20px auto;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-group {
  margin-top: 15px;
}

.btn {
  margin-right: 10px;
}

.alert {
  margin-top: 15px;
}

.btn-primary,
.btn-warning {
  color: #fff;
}

.btn-primary:hover,
.btn-warning:hover {
  color: #fff;
}
</style>
