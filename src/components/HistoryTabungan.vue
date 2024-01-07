<template>
  <div class="container">
    <h2>Histori Transaksi Tabungan - {{ nasabahNama }}</h2>
    <div>Saldo: {{ saldo }}</div>
    <div class="right">
    <button @click="sortByDate('asc')" :disabled="sortDirection === 'asc'">terlama ke terbaru</button>
    <button @click="sortByDate('desc')" :disabled="sortDirection === 'desc'">terbaru ke terlama</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Jenis Transaksi</th>
          <th>Nominal</th>
          <th>Keterangan</th>
          <th>
            Tanggal Transaksi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaksi, index) in sortedHistoriTransaksi" :key="transaksi.id">
          <td>{{ index + 1 }}</td>
          <td>{{ transaksi.jenistransaksi.jenistransaksi }}</td>
          <td>{{ transaksi.nominal }}</td>
          <td>{{ transaksi.keterangan }}</td>
          <td>{{ transaksi.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'HistoryTabungan',
  data() {
    return {
      nasabahNama: '',
      saldo: 0,
      historiTransaksi: [],
      token: '',
      sortDirection: 'asc', // Initial sort direction
    };
  },
  created() {
    this.nasabahNama = this.$route.params.nasabahNama || 'N/A';
    console.log('nasabahNama:', this.nasabahNama);
    this.loadToken();
    this.loadHistoriTransaksi();
  },
  methods: {
    loadToken() {
      this.token = localStorage.getItem('token');
    },
    loadHistoriTransaksi() {
      const nasabahNama = this.$route.params.nasabahNama;

      axios.get(`http://127.0.0.1:8000/api/tabungan?nasabah_id=${nasabahNama}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(({ data }) => {
        console.log('Data from API:', data);
        // Filter transactions based on nasabahId
        this.historiTransaksi = data.filter(transaksi => transaksi.nasabah.nama === nasabahNama);

        // Calculate saldo based on filtered historiTransaksi
        this.calculateSaldo();
      }).catch(error => {
        console.error('Error loading historical transactions:', error);
      });
    },
    calculateSaldo() {
      // Calculate saldo based on historiTransaksi (you may need to adjust this logic)
      this.saldo = 0;

      this.historiTransaksi.forEach(transaksi => {
        if (transaksi.jenistransaksi.jenistransaksi === 'Simpanan') {
          this.saldo += transaksi.nominal;
        } else if (transaksi.jenistransaksi.jenistransaksi === 'Penarikan') {
          this.saldo -= transaksi.nominal;
        }
      });
    },
    sortByDate() {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

      // Sort the historiTransaksi array based on the created_at property
      this.historiTransaksi.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
    },
  },
  computed: {
    sortedHistoriTransaksi() {
      // Return a sorted copy of historiTransaksi based on the sortDirection
      return [...this.historiTransaksi];
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

.right{
  display: flex;
  justify-content: right;
  align-items: right;
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
</style>
