<template>
  <div class="container">
    <h2>Edit Nasabah</h2>
    <form @submit.prevent="simpan">
      <div class="mb-3 form-group">
        <label>Nama:</label>
        <input type="text" class="form-control" v-model="nasabah.nama" required />
      </div>
      <div class="mb-3 form-group">
        <label>Alamat:</label>
        <input type="text" class="form-control" v-model="nasabah.alamat" required />
      </div>
      <div class="mb-3 form-group">
        <label>Telepon:</label>
        <input type="text" class="form-control" v-model="nasabah.telepon" required />
      </div>
      <div class="mb-3 form-group">
        <label>Tanggal Lahir:</label>
        <input type="text" class="form-control" v-model="nasabah.lahir" required />
      </div>
      <div class="mb-3 form-group">
        <label>Gender:</label>
        <input type="text" class="form-control" v-model="nasabah.gender" required />
      </div>
      <div class="mb-3 form-group">
        <label>Agama:</label>
        <select class="form-control" v-model="nasabah.agama_id" required>
          <option v-for="agama in agamas" :key="agama.id" :value="agama.id">{{ agama.agama }}</option>
        </select>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <router-link to="/nasabah" class="btn btn-warning">Batal</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditNasabah',
  data() {
    return {
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
    };
  },
  created() {
    const nasabahId = this.$route.params.id;
    if (nasabahId) {
      this.loadNasabah(nasabahId);
    }
    this.loadAgamas();
  },
  methods: {
    loadNasabah(id) {
      axios.get(`https://api-group1-prognet.manpits.xyz/api/nasabah/${id}`).then(({ data }) => {
        this.nasabah = data;
      });
    },
    loadAgamas() {
      axios.get('https://api-group1-prognet.manpits.xyz/api/agama').then(({ data }) => {
        this.agamas = data;
      });
    },
    simpan() {
      const url = this.nasabah.id
        ? `https://api-group1-prognet.manpits.xyz/api/nasabah/${this.nasabah.id}`
        : 'https://api-group1-prognet.manpits.xyz/api/nasabah';

      const method = this.nasabah.id ? 'put' : 'post';

      axios[method](url, this.nasabah).then(() => {
        this.$router.push('/nasabah');
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
