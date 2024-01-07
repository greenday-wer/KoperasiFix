<template>
    <div class="container">
      <h2>Data Jenis Transaksi</h2>
      <form @submit.prevent="simpanJenisTransaksi()">
        <div class="mb-3 form-group">
          <label>Jenis Transaksi:</label>
          <input type="text" class="form-control" v-model="jenisTransaksi.jenistransaksi" required>
        </div>
        <div class="mb-3 form-group">
          <label>Operator:</label>
          <input type="text" class="form-control" v-model="jenisTransaksi.operator" required>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" type="submit">Simpan</button>
          <button class="btn btn-warning" type="button" @click="clearJenisTransaksi()">Clear</button>
        </div>
      </form>
    </div>
    <div v-if="pesanSimpan" class="alert alert-success" role="alert">
      {{ pesanSimpan }}
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
        pesanSimpan: '',
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
            this.pesanSimpan = 'Data berhasil disimpan!';
          });
        } else {
          var url = `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${this.jenisTransaksi.id}`;
          axios.put(url, this.jenisTransaksi).then(() => {
            this.loadAllJenisTransaksis();
            this.clearJenisTransaksi();
            this.pesanSimpan = 'Data berhasil disimpan!';
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
  </style>
  
