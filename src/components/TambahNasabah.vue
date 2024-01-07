<template>
  <div class="container">
    <h2>Data Nasabah</h2>
    <form @submit.prevent="simpan()">
      <!-- Form Input Nasabah -->
      <div class="mb-3 form-group">
        <label>Nama:</label>
        <input type="text" class="form-control" v-model="nasabah.nama" required>
      </div>
      <div class="mb-3 form-group">
        <label>Alamat:</label>
        <input type="text" class="form-control" v-model="nasabah.alamat" required>
      </div>
      <div class="mb-3 form-group">
        <label>Telepon:</label>
        <input type="text" class="form-control" v-model="nasabah.telepon" required>
      </div>
      <div class="mb-3 form-group">
        <label>Tanggal Lahir:</label>
        <input type="date" class="form-control" v-model="nasabah.lahir" required>
      </div>
      <div class="mb-3 form-group">
        <label>Gender:</label>
        <select v-model="nasabah.gender" class="form-control" required>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>
      </div>

      <!-- Form Input Agama -->
      <div class="mb-3 form-group">
      <label>Agama:</label>
      <select v-model="nasabah.agama_id" class="form-control" required>
        <option v-for="agama in agamas" :key="agama.id" :value="agama.id">{{ agama.agama }}</option>
      </select>
      </div> 


      <div class="btn-group">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <button class="btn btn-warning" type="button" @click="clear()">Clear</button>
      </div>
    </form>
    <div v-if="pesanSimpan" class="alert alert-success" role="alert">
      {{ pesanSimpan }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Nasabah',
  data() {
    return {
      allNasabah: [],
      nasabah: {
        id: '',
        nama: '',
        alamat: '',
        telepon: '',
        lahir: '',
        gender: '',
        agama_id: '',
      },
      agamas: [], 
      pesanSimpan: '',
    };
  },
  created() {
    this.loadAllNasabah();
    this.loadAgamas();
  },
  methods: {
    loadAllNasabah() {
      axios.get('https://api-group1-prognet.manpits.xyz/api/nasabah').then(({ data }) => {
        this.allNasabah = data;
      });
    },
    loadAgamas() {
      axios.get('https://api-group1-prognet.manpits.xyz/api/agama').then(({ data }) => {
        this.agamas = data;
      });
    },
    simpan() {
      if (this.nasabah.id === '') {
        axios.post('https://api-group1-prognet.manpits.xyz/api/nasabah', this.nasabah).then(() => {
          this.loadAllNasabah();
          this.clear();
          this.pesanSimpan = 'Data berhasil disimpan!';
        });
      } else {
        axios.put(`https://api-group1-prognet.manpits.xyz/api/nasabah/${this.nasabah.id}`, this.nasabah).then(() => {
          this.loadAllNasabah();
          this.clear();
        });
      }
    },
    clear() {
      this.nasabah.id = '';
      this.nasabah.nama = '';
      this.nasabah.alamat = '';
      this.nasabah.telepon = '';
      this.nasabah.lahir = '';
      this.nasabah.gender = '';
      this.nasabah.agama_id = '';
    },
    edit(nasabah) {
      axios.get(`https://api-group1-prognet.manpits.xyz/api/nasabah/${nasabah.id}`).then(({ data }) => {
        this.nasabah = data;
      });
    },
    remove(nasabah) {
      axios.delete(`https://api-group1-prognet.manpits.xyz/api/nasabah/${nasabah.id}`).then(() => {
        this.loadAllNasabah();
      });
    },
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

  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  .btn-warning,
  .btn-danger {
    color: #fff;
  }

  .btn-warning:hover,
  .btn-danger:hover {
    color: #fff;
  }
</style>
