<template>
    <div class="container">
      <h2>Data Agama</h2>
      <form @submit.prevent="simpanAgama()">
        <div class="mb-3 form-group">
          <label>Agama:</label>
          <input type="text" class="form-control" v-model="agama.agama" required>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" type="submit">Simpan</button>
          <button class="btn btn-warning" type="button" @click="clearAgama()">Clear</button>
        </div>
      </form>
      <div v-if="pesanSimpan" class="alert alert-success" role="alert">
      {{ pesanSimpan }}
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'agama',
    data() {
      return {
        allAgamas: [],
        agama: {
          id: '',
          agama: '',
        },
        pesanSimpan: '',
      };
    },
    created() {
      this.loadAllAgamas();
    },
    methods: {
      loadAllAgamas() {
        var url = 'https://api-group1-prognet.manpits.xyz/api/agama';
        axios.get(url).then(({ data }) => {
          this.allAgamas = data;
        });
      },
      removeAgama(agama) {
        var url = `https://api-group1-prognet.manpits.xyz/api/agama/${agama.id}`;
        axios.delete(url).then(() => {
          this.loadAllAgamas();
        });
      },
      editAgama(agama) {
        var url = `https://api-group1-prognet.manpits.xyz/api/agama/${agama.id}`;
        axios.get(url).then(({ data }) => {
          this.agama = data;
        });
      },
      simpanAgama() {
        if (this.agama.id === '') {
          var url = 'https://api-group1-prognet.manpits.xyz/api/agama';
          axios.post(url, this.agama).then(() => {
            this.loadAllAgamas();
            this.clearAgama();
            this.pesanSimpan = 'Data berhasil disimpan!';
          });
        } else {
          var url = `https://api-group1-prognet.manpits.xyz/api/agama/${this.agama.id}`;
          axios.put(url, this.agama).then(() => {
            this.loadAllAgamas();
            this.clearAgama();
            this.pesanSimpan = 'Data berhasil disimpan!';
          });
        }
      },
      clearAgama() {
        this.agama.id = '';
        this.agama.agama = '';
        this.pesanSimpan = 'Data berhasil disimpan!';
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 10000px;
    margin: 20px auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .btn-group {
    margin-top: 20px;
  }
  
  .table {
    margin-top: 20px;
  }
  
  /* Responsive Styles */
  @media (max-width: 576px) {
    .container {
      padding: 0 10px;
    }
  }
  </style>
  
  
