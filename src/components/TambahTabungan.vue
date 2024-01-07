<template>
  <div class="container">
    <h2>Data Tabungan</h2>
    <form @submit.prevent="simpan()">
      <!-- Form Input Tabungan -->
      <div class="mb-3 form-group">
        <label>Nasabah:</label>
        <div>
          <input
            type="text"
            v-model="searchNasabah"
            class="form-control"
            placeholder="Cari Nasabah"
            @input="filterNasabah"
          />
          <select v-model="tabungan.nasabah_id" class="form-control" required>
            <option
              v-for="nasabah in filteredNasabah"
              :key="nasabah.id"
              :value="nasabah.id"
            >
              {{ nasabah.nama }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-3 form-group">
        <label>Jenis Transaksi:</label>
        <div class="form-check" v-for="jenis in jenistransaksis" :key="jenis.id">
          <input
            type="radio"
            class="form-check-input"
            :id="jenis.jenistransaksi"
            v-model="tabungan.jenistransaksi_id"
            :value="jenis.id"
          />
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
        <input type="text" class="form-control" v-model="loggedInUser" disabled />
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <button class="btn btn-warning" type="button" @click="clear()">Clear</button>
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
  name: 'Tabungan',
  data() {
    return {
      allTabungan: [],
      tabungan: {
        id: '',
        nasabah_id: '',
        jenistransaksi_id: '',
        nominal: '',
        keterangan: '',
        user_id: '',
      },
      allNasabah: [],
      jenistransaksis: [],
      loggedInUser: '',
      token: '',
      pesanSimpan: '',
      searchNasabah: '',
      filteredNasabah: [],
    };
  },
  created() {
    this.loadAllTabungan();
    this.loadAllNasabah();
    this.loadJenisTransaksi();
    this.loadLoggedInUser();
    this.loadToken();
  },
  methods: {
    loadAllTabungan() {
      axios.get('http://127.0.0.1:8000/api/tabungan', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.allTabungan = data;
      });
    },
    loadAllNasabah() {
      axios.get('http://127.0.0.1:8000/api/nasabah', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.allNasabah = data;
        this.filterNasabah();
      });
    },
    loadJenisTransaksi() {
      axios.get('http://127.0.0.1:8000/api/jenistransaksi', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.jenistransaksis = data;
      });
    },
    loadLoggedInUser() {
      const name = localStorage.getItem('name');
      this.loggedInUser = name ? name : 'name';
    },
    loadToken() {
      this.token = localStorage.getItem('token');
    },
    simpan() {
      const user_id = localStorage.getItem('user_id');
      this.tabungan.user_id = user_id;

      axios
        .post('http://127.0.0.1:8000/api/tabungan', this.tabungan, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          this.loadAllTabungan();
          this.clear();
          this.pesanSimpan = 'Data berhasil disimpan!';
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    },
    clear() {
      this.tabungan.id = '';
      this.tabungan.nasabah_id = '';
      this.tabungan.jenistransaksi_id = '';
      this.tabungan.nominal = '';
      this.tabungan.keterangan = '';
      this.tabungan.user_id = '';
    },
    filterNasabah() {
      this.filteredNasabah = this.allNasabah.filter(nasabah =>
        nasabah.nama.toLowerCase().includes(this.searchNasabah.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 10000px;
  margin: 20px auto;
}
</style>
