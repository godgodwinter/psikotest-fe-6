const data = [
  {
    id: 1,
    pertanyaan: "Pertanyaan 1",
    kategori_nama: "Bahasa Indonesia",
    kategori_id: 1,
    tinkatkesulitan: "Sedang",
    tipe: "Pilihan Ganda",
    jml_pilihanjawaban: 4,
    jml_pilihanjawaban_benar: 1,
  },
  {
    id: 2,
    pertanyaan: "Pertanyaan 2",
    kategori_nama: "Bahasa Indonesia",
    kategori_id: 1,
    tinkatkesulitan: "Sulit",
    tipe: "Pilihan Ganda",
    jml_pilihanjawaban: 4,
    jml_pilihanjawaban_benar: 1,
  },
  {
    id: 2,
    pertanyaan: "Pertanyaan 2",
    kategori_nama: "IPA",
    kategori_id: 2,
    tinkatkesulitan: "Mudah",
    tipe: "Pilihan Ganda",
    jml_pilihanjawaban: 4,
    jml_pilihanjawaban_benar: 1,
  },
];

const kategori = [
  {
    id: 1,
    nama: "Bahasa Indonesia",
    prefix: "banksoal",
  },
  {
    id: 2,
    nama: "IPA",
    prefix: "banksoal",
  },
  {
    id: 3,
    nama: "IPS",
    prefix: "banksoal",
  },
];

const Examples = {
  data,
  kategori,
};

export default Examples;
