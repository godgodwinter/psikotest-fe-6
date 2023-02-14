const getKelas = (item = "") => {
  let response = null;
  if (item.indexOf("/") > 0) {
    // console.log('1');
    response = item ? item.split("/") : null;
  } else if (item.indexOf("-") > 0) {
    // console.log('2');
    response = item ? item.split("-") : null;
  } else if (item.indexOf(".") > 0) {
    // console.log('3');
    response = item ? item.split(".") : null;
  } else {
    // console.log('4');
    response = item ? item.split(" ") : null;
  }
  // console.log(item, response[0], item.indexOf("-"));
  // function split string
  // let response = item ? item.split("/") : null;

  return response ? response[0] : null;
};

const kepanjangan = (item = null) => {
  let hasil = item;
  if (item == "SBS") {
    hasil = "Sangat Baik Sekali";
  } else if (item == "BS") {
    hasil = "Baik Sekali";
  } else if (item == "B") {
    hasil = "Baik";
  } else if (item == "CB") {
    hasil = "Cukup Baik";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "HC") {
    hasil = "Hampir Cukup";
  } else if (item == "K") {
    hasil = "Kurang";
  } else if (item == "KS") {
    hasil = "Kurang Sekali";
  } else if (item == "SKS") {
    hasil = "Sangat Kurang Sekali";
    //tambahan
  } else if (item == "STS") {
    hasil = "Sangat Tinggi Sekali";
  } else if (item == "TS") {
    hasil = "Tinggi Sekali";
  } else if (item == "T") {
    hasil = "Tinggi";
  } else if (item == "CT") {
    hasil = "Cukup Tinggi";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "CR") {
    hasil = "Cukup Rendah";
  } else if (item == "AR") {
    hasil = "Agak Rendah";
  } else if (item == "R") {
    hasil = "Rendah";
  } else if (item == "RS") {
    hasil = "Rendah Sekali";
  } else if (item == "SRS") {
    hasil = "Sangat Rendah Sekali";
  }
  return hasil;
};

const iqKet = (item = null) => {
  let hasil = "Moron";
  if (item > 139) {
    hasil = "Genius";
  } else if (140 > item && item >= 130) {
    hasil = "Berbakat";
  } else if (130 > item && item >= 120) {
    hasil = "Superior";
  } else if (120 > item && item >= 110) {
    hasil = "Di Atas Rata - Rata";
  } else if (110 > item && item >= 105) {
    hasil = "Rata - Rata Atas";
  } else if (105 > item && item >= 100) {
    hasil = "Rata - Rata";
  } else if (100 > item && item >= 90) {
    hasil = "Rata - Rata Bawah";
  } else if (90 > item && item >= 80) {
    hasil = "Lambat Belajar";
  } else if (80 > item && item >= 60) {
    hasil = "Borderline";
  } else {
    hasil = "Moron";
  }
  return hasil;
};

const getKesimpulanIq = (item = null) => {
  let hasil = "Kurang Lancar";
  if (item > 119) {
    hasil = "Sangat Lancar Sekali";
  } else if (120 > item && item >= 110) {
    hasil = "Lancar Sekali";
  } else if (110 > item && item >= 105) {
    hasil = "Lancar";
  } else if (105 > item && item >= 90) {
    hasil = "Cukup Lancar";
  } else if (90 > item && item >= 80) {
    hasil = "Kurang Lancar";
  } else {
    hasil = "Sangat Kurang Lancar";
  }
  return hasil;
};

const getKesimpulanEqSq = (item = null) => {
  let hasil = "Lebih Tinggi";
  if (item > 119) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (120 > item && item >= 110) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (110 > item && item >= 105) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (105 > item && item >= 90) {
    hasil = "Lebih Tinggi";
  } else if (90 > item && item >= 80) {
    hasil = "Lebih Tinggi";
  } else {
    hasil = "Lebih Tinggi";
  }
  return hasil;
};

export const fn_studi_ket = (item = null) => {
  let hasil = "Angka tidak valid!";
  if (item > 88) {
    hasil = "Sangat Baik Sekali";
  } else if (88 > item && item >= 78) {
    hasil = "Baik Sekali";
  } else if (78 > item && item >= 68) {
    hasil = "Baik";
  } else if (68 > item && item >= 61) {
    hasil = "Cukup Baik";
  } else if (61 > item && item >= 44) {
    hasil = "Cukup";
  } else if (44 > item && item >= 34) {
    hasil = "Hampir Cukup";
  } else if (34 > item && item >= 28) {
    hasil = "Kurang";
  } else if (28 > item && item >= 18) {
    hasil = "Kurang Sekali";
  } else {
    hasil = "Sangat Kurang Sekali";
  }
  return hasil;
};
export const fn_studi_ket_singkatan = (item = null) => {
  let hasil = "Angka tidak valid!";
  if (item > 88) {
    hasil = "SBS";
  } else if (88 > item && item >= 78) {
    hasil = "BS";
  } else if (78 > item && item >= 68) {
    hasil = "B";
  } else if (68 > item && item >= 61) {
    hasil = "CB";
  } else if (61 > item && item >= 44) {
    hasil = "C";
  } else if (44 > item && item >= 34) {
    hasil = "HC";
  } else if (34 > item && item >= 28) {
    hasil = "K";
  } else if (28 > item && item >= 18) {
    hasil = "KS";
  } else {
    hasil = "SKS";
  }
  return hasil;
};

const Fungsi = {
  getKelas,
  kepanjangan,
  iqKet,
  getKesimpulanIq,
  getKesimpulanEqSq,
  fn_studi_ket,
  fn_studi_ket_singkatan,
};
export default Fungsi;
