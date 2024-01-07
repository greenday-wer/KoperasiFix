<template>
  <div class="container">
    <div class="blok-judul">
    <h2 class="Judul">Data Tabungan</h2>
    </div>

    <hr>
    <div class="blok">
    <p>Pada bagian ini merupakan Data Khusus Nasabah yang dimana berisikan beberapa menu berupa : </p>

    <ul>Tambah Data :
    <li>Menambahkan informasi tabungan baru ke dalam sistem.</li>
    </ul>
     <ul>Edit :
    <li>Memperbarui informasi tabungan yang telah terdaftar.</li>
    </ul>
      <ul>Hapus :
    <li>Menghapus data tabungan yang tidak aktif atau tidak sesuai dengan kebijakan koperasi.</li>
    </ul>
    </div>
    <!-- Add a search input -->
    <div class="mb-3 form-group">
      <label for="search">Cari Nama :</label>
      <input type="text" class="form-control" v-model="search" id="search" />
    </div>
    <router-link to="/tambahtabungan" class="btn btn-success">Tambah Data</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Nasabah</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tabungan, index) in filteredTabungan" :key="tabungan.id">
          <td>{{ tabungan.id }}</td>
          <td>{{ tabungan.nasabah && tabungan.nasabah.nama }}</td>
          <td>
            <div class="btn-group">
              <router-link :to="{ name: 'EditTabungan', params: { id: tabungan.id } }" class="btn btn-warning">Edit</router-link>
              <button type="button" class="btn btn-danger" @click="remove(tabungan)">Delete</button>
              <router-link :to="{ name: 'HistoryTabungan', params: { nasabahNama: tabungan.nasabah && tabungan.nasabah.nama } }" class="btn btn-info">History</router-link>
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
      search: '',
    };
  },
  computed: {
    filteredTabungan() {
      return this.allTabungan.filter(tabungan =>
        tabungan.nasabah && tabungan.nasabah.nama.toLowerCase().includes(this.search.toLowerCase())
      );
    },
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
      axios.get('https://api-group1-prognet.manpits.xyz/api/tabungan', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.allTabungan = data;
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
      const name = localStorage.getItem('name');
      this.loggedInUser = name ? name : 'name';
    },
    loadToken() {
      this.token = localStorage.getItem('token');
    },
    simpan() {
      const user_id = localStorage.getItem('user_id');
      this.tabungan.user_id = user_id;
      if (this.tabungan.id === '') {
        axios.post('https://api-group1-prognet.manpits.xyz/api/tabungan', this.tabungan, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }).then(() => {
          this.loadAllTabungan();
          this.clear();
        });
      } else {
        axios.put(`https://api-group1-prognet.manpits.xyz/api/tabungan/${this.tabungan.id}`, this.tabungan, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }).then(() => {
          this.loadAllTabungan();
          this.clear();
        });
      }
    },
    clear() {
      this.tabungan.id = '';
      this.tabungan.nasabah_id = '';
      this.tabungan.jenistransaksi_id = '';
      this.tabungan.nominal = '';
      this.tabungan.keterangan = '';
      this.tabungan.user_id = '';
    },
    edit(tabungan) {
      axios.get(`https://api-group1-prognet.manpits.xyz/api/tabungan/${tabungan.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        this.tabungan = data;
      });
    },
    remove(tabungan) {
      axios.delete(`https://api-group1-prognet.manpits.xyz/api/tabungan/${tabungan.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.loadAllTabungan();
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
