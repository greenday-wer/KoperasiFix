<template>
    <div class="container">
    <div class="blok-judul">
    <h2 class="Judul">Jenis Transaksi</h2>
    </div>

    <hr>
    <div class="blok">
    <p>Pada bagian ini merupakan Data Khusus Nasabah yang dimana berisikan beberapa menu berupa : </p>

    <ul>Tambah Data :
    <li>Menambahkan informasi jenis transaksi baru ke dalam sistem.</li>
    </ul>
     <ul>Edit :
    <li>Memperbarui informasi jenis transaksi yang telah terdaftar.</li>
    </ul>
      <ul>Hapus :
    <li>Menghapus data jenis transaksi yang tidak aktif atau tidak sesuai dengan kebijakan koperasi.</li>
    </ul>
    </div>
      <router-link to="/tambahjenistransaksi" class="btn btn-success">Tambah Data</router-link>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Transaksi</th>
            <th>Operator</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(jenisTransaksi, index) in allJenisTransaksis" :key="jenisTransaksi.id">
            <td>{{ jenisTransaksi.id }}</td>
            <td>{{ jenisTransaksi.jenistransaksi }}</td>
            <td>{{ jenisTransaksi.operator }}</td>
            <td>
              <div class="btn-group">
                <!-- Use router-link to navigate to EditJenisTransaksi -->
                <router-link :to="{ name: 'EditJenisTransaksi', params: { id: jenisTransaksi.id } }" class="btn btn-warning">Edit</router-link>
                <button type="button" class="btn btn-danger" @click="removeJenisTransaksi(jenisTransaksi)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'jenisTransaksi',
    data() {
      return {
        allJenisTransaksis: [],
        jenisTransaksi: {
          id: '',
          jenistransaksi: '',
          operator: '',
        },
      };
    },
    created() {
      this.loadAllJenisTransaksis();
    },
    methods: {
      loadAllJenisTransaksis() {
        var url = 'https://api-group1-prognet.manpits.xyz/api/jenistransaksi';
        axios.get(url).then(({ data }) => {
          this.allJenisTransaksis = data;
        });
      },
      removeJenisTransaksi(jenisTransaksi) {
        var url = `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${jenisTransaksi.id}`;
        axios.delete(url).then(() => {
          this.loadAllJenisTransaksis();
        });
      },
      editJenisTransaksi(jenisTransaksi) {
        var url = `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${jenisTransaksi.id}`;
        axios.get(url).then(({ data }) => {
          this.jenisTransaksi = data;
        });
      },
      simpanJenisTransaksi() {
        if (this.jenisTransaksi.id === '') {
          var url = 'https://api-group1-prognet.manpits.xyz/api/jenistransaksi';
          axios.post(url, this.jenisTransaksi).then(() => {
            this.loadAllJenisTransaksis();
            this.clearJenisTransaksi();
          });
        } else {
          var url = `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${this.jenisTransaksi.id}`;
          axios.put(url, this.jenisTransaksi).then(() => {
            this.loadAllJenisTransaksis();
            this.clearJenisTransaksi();
          });
        }
      },
      clearJenisTransaksi() {
        this.jenisTransaksi.id = '';
        this.jenisTransaksi.jenistransaksi = '';
        this.jenisTransaksi.operator = '';
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
