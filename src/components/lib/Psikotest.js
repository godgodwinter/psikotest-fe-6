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
  if (item > 87) {
    hasil = "Sangat Baik Sekali";
  } else if (87 > item && item >= 77) {
    hasil = "Baik Sekali";
  } else if (77 > item && item >= 67) {
    hasil = "Baik";
  } else if (67 > item && item >= 60) {
    hasil = "Cukup Baik";
  } else if (60 > item && item >= 42) {
    hasil = "Cukup";
  } else if (42 > item && item >= 32) {
    hasil = "Hampir Cukup";
  } else if (32 > item && item >= 27) {
    hasil = "Kurang";
  } else if (27 > item && item >= 17) {
    hasil = "Kurang Sekali";
  } else {
    hasil = "Sangat Kurang Sekali";
  }
  return hasil;
};
export const fn_studi_ket_singkatan = (item = null) => {
  let hasil = "Angka tidak valid!";
  if (item > 87) {
    hasil = "SBS";
  } else if (87 > item && item >= 77) {
    hasil = "BS";
  } else if (77 > item && item >= 67) {
    hasil = "B";
  } else if (67 > item && item >= 60) {
    hasil = "CB";
  } else if (60 > item && item >= 42) {
    hasil = "C";
  } else if (42 > item && item >= 32) {
    hasil = "HC";
  } else if (32 > item && item >= 27) {
    hasil = "K";
  } else if (27 > item && item >= 17) {
    hasil = "KS";
  } else {
    hasil = "SKS";
  }
  return hasil;
};

export const fn_deteksimasalah = (item) => {
  let hasil = "Angka tidak valid!";
  if (item > 90) {
    hasil = "Sangat Tinggi Sekali / Sangat Mengganggu Sekali";
  } else if (91 > item && item >= 81) {
    hasil = "Tinggi Sekali / Mengganggu Sekali";
  } else if (81 > item && item >= 71) {
    hasil = "Tinggi / Mengganggu";
  } else if (71 > item && item >= 61) {
    hasil = "Cukup Tinggi / Cukup Mengganggu";
  } else if (61 > item && item >= 41) {
    hasil = "Cukup / Terkendali";
  } else if (41 > item && item >= 31) {
    hasil = "Agak Rendah / Cukup Terkendali";
  } else if (31 > item && item >= 21) {
    hasil = "Rendah / Terkendali Baik";
  } else if (21 > item && item >= 11) {
    hasil = "Rendah Sekali / Terkendali Baik Sekali";
  } else {
    hasil = "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali";
  }
  return hasil;
};

export const fn_deteksimasalah_singkatan = (item) => {
  let hasil = "Angka tidak valid!";
  if (item > 90) {
    hasil = "STS";
  } else if (91 > item && item >= 81) {
    hasil = "TS";
  } else if (81 > item && item >= 71) {
    hasil = "T";
  } else if (71 > item && item >= 61) {
    hasil = "CT";
  } else if (61 > item && item >= 41) {
    hasil = "C";
  } else if (41 > item && item >= 31) {
    hasil = "AR";
  } else if (31 > item && item >= 21) {
    hasil = "R";
  } else if (21 > item && item >= 11) {
    hasil = "RS";
  } else {
    hasil = "SRS";
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
