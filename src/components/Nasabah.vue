<template>
  
  <div class="container">
    <div class="blok-judul">
    <h2 class="Judul">Data Nasabah</h2>
    </div>

    <hr>
    <div class="blok">
    <p>Pada bagian ini merupakan Data Khusus Nasabah yang dimana berisikan beberapa menu berupa : </p>

    <ul>Tambah Data Nasabah :
    <li>Menambahkan informasi anggota baru ke dalam sistem.</li>
     <li>Melengkapi data pribadi, informasi kontak, dan detail keanggotaan.</li>
    </ul>
     <ul>Edit Data Nasabah :
    <li>Memperbarui informasi anggota yang telah terdaftar.</li>
     <li>Mengubah data pribadi, informasi kontak, atau detail keanggotaan sesuai dengan perubahan yang diperlukan.</li>
    </ul>
      <ul>Hapus Data Nasabah :
    <li>Menghapus data anggota yang tidak aktif atau tidak sesuai dengan kebijakan koperasi.</li>
    </ul>
    </div>
    <!-- Add a search input -->
    <div class="mb-3 form-group">
      <label for="search">Cari Nama Nasabah:</label>
      <input type="text" class="form-control" v-model="search" id="search" />
    </div>
    <router-link to="/tambahnasabah" class="btn btn-success">Tambah Data</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Alamat</th>
          <th>Telepon</th>
          <th>Tanggal Lahir</th>
          <th>Gender</th>
          <th>Agama</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nasabah, index) in filteredNasabah" :key="nasabah.id">
          <td>{{ nasabah.id }}</td>
          <td>{{ nasabah.nama }}</td>
          <td>{{ nasabah.alamat }}</td>
          <td>{{ nasabah.telepon }}</td>
          <td>{{ nasabah.lahir }}</td>
          <td>{{ nasabah.gender }}</td>
          <td>{{ nasabah.agama.agama }}</td>
          <td>
            <div class="btn-group">
              <router-link :to="{ name: 'EditNasabah', params: { id: nasabah.id } }" class="btn btn-warning">Edit</router-link>
              <button type="button" class="btn btn-danger" @click="remove(nasabah)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      search: '',
    };
  },
  computed: {
    filteredNasabah() {
      return this.allNasabah.filter(nasabah =>
        nasabah.nama.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    this.loadAllNasabah();
    this.loadAgamas();
  },
  methods: {
    loadAllNasabah() {
      axios.get('http://127.0.0.1:8000/api/nasabah').then(({ data }) => {
        this.allNasabah = data;
      });
    },
    loadAgamas() {
      axios.get('http://127.0.0.1:8000/api/agama').then(({ data }) => {
        this.agamas = data;
      });
    },
    simpan() {
      if (this.nasabah.id === '') {
        axios.post('http://127.0.0.1:8000/api/nasabah', this.nasabah).then(() => {
          this.loadAllNasabah();
          this.clear();
        });
      } else {
        axios.put(`http://127.0.0.1:8000/api/nasabah/${this.nasabah.id}`, this.nasabah).then(() => {
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
    remove(nasabah) {
      axios.delete(`http://127.0.0.1:8000/api/nasabah/${nasabah.id}`).then(() => {
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
    color: #000000;
    margin-bottom: 20px;
    text-align: center;
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
    background-color:#000000;
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

.blok{
    /* border: 2px solid #333;  */
    padding: 10px; 
    border-radius: 8px; 
    background-color: #f8f8f8;
}
.blok-judul{
    border: 2px solid #333; 
    padding-top: 15px; 
    border-radius: 8px; 
    background-color: #f8f8f8;

}

.search-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.search-container input {
  flex: 0.3;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
   margin-left: auto;
}

.search-container button {
  margin-left: 10px;
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-container button:hover {
  background-color: #0056b3;
}
.footer{
    border: 2px solid #ffffff; 
    padding-top: 15px; 
    background-color: #f8f8f8;
    text-align: center;
}


</style>
