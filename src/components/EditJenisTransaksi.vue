<template>
  <div class="container">
    <h2>Edit Jenis Transaksi</h2>
    <form @submit.prevent="simpanJenisTransaksi()">
      <div class="mb-3 form-group">
        <label>Jenis Transaksi:</label>
        <input type="text" class="form-control" v-model="jenisTransaksi.jenistransaksi" required />
      </div>
      <div class="mb-3 form-group">
        <label>Operator:</label>
        <input type="text" class="form-control" v-model="jenisTransaksi.operator" required />
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <router-link to="/jenistransaksi" class="btn btn-warning">Batal</router-link>
      </div>

      <!-- Pesan Simpan -->
      <div v-if="pesanSimpan" class="alert alert-success" role="alert">
        {{ pesanSimpan }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'EditJenisTransaksi',
  data() {
    return {
      jenisTransaksi: {
        id: '',
        jenistransaksi: '',
        operator: '',
      },
      pesanSimpan: '', // Add pesanSimpan property
    };
  },
  created() {
    const jenisTransaksiId = this.$route.params.id;
    if (jenisTransaksiId) {
      this.loadJenisTransaksi(jenisTransaksiId);
    }
  },
  methods: {
    loadJenisTransaksi(id) {
      const url = `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${id}`;
      axios.get(url).then(({ data }) => {
        this.jenisTransaksi = data;
      });
    },
    simpanJenisTransaksi() {
      const url = this.jenisTransaksi.id
        ? `https://api-group1-prognet.manpits.xyz/api/jenistransaksi/${this.jenisTransaksi.id}`
        : 'https://api-group1-prognet.manpits.xyz/api/jenistransaksi';

      const method = this.jenisTransaksi.id ? 'put' : 'post';

      axios[method](url, this.jenisTransaksi).then(() => {
        this.pesanSimpan = 'Jenis Transaksi berhasil disimpan'; // Set success message
      }).catch((error) => {
        // Handle errors if needed
        console.error('Error saving jenis transaksi:', error);
        this.pesanSimpan = 'Terjadi kesalahan saat menyimpan Jenis Transaksi';
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

