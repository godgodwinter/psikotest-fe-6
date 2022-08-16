<script setup>
// const data = {
//   no_induk: "17324/7",
//   nama: "Clarissa anastasya",
//   jenis_kelamin: "P",
//   sekolah: "SMP SANTO YOSEPH DENPASAR",
//   umur: 12,
//   kb: 32,
//   kb_persen: 57,
//   lm: 12,
//   lm_persen: 55,
//   ks: 11,
//   ks_persen: 47,
//   km: 13,
//   km_persen: 71,
//   kk: 12,
//   kk_persen: 76,
//   ki: 28,
//   ki_persen: 56,
//   ka: 10,
//   ka_persen: 60,
//   kn: 13,
//   kn_persen: 74,
//   total_km: 131,
//   iq: 80,
//   iq_persen: 46,
//   kbh: "HC",
//   lmh: "HC",
//   ksh: "K",
//   kmh: "BS",
//   kkh: "SBS",
//   kih: "HC",
//   kah: "C",
//   knh: "BS",
//   iqh: "K",
//   hspq_a: 12.0,
//   hspq_a_kn_rank: 12,
//   hspq_a_kn_persen: 59.0,
//   hspq_a_kn_keterangan: "C",
//   hspq_a_kn_aspek_positif:
//     "Aspek faktor sikap Hangat Cukup mengungkap sisi positif :",
//   hspq_a_kn_aspek_negatif:
//     "Aspek faktor sikap Hangat nilainya Cukup juga akan berakibat negatif :",
//   hspq_a_kn_aspek_positif_di_ungkap:
//     "Sikap : Terbuka, ramah tamah, baik, sabar, suka kerja sama, partisipasinya baik, lembut hati, percaya diri, mudah adaptasi, sederhana, mudah tertawa, hangat, suka bergaul.",
//   hspq_a_kn_aspek_negatif_di_ungkap:
//     "Sikap : Kerja seenaknya, ceroboh, tidak formal",
//   hspq_a_kr_rank: 15,
//   hspq_a_kr_persen: 41.0,
//   hspq_a_kr_keterangan: "C",
//   hspq_a_kr_aspek_positif:
//     "Aspek faktor sikap Dingin Cukup mengungkap sisi positif :",
//   hspq_a_kr_aspek_negatif:
//     "Aspek faktor sikap Dingin nilainya Cukup juga akan berakibat negatif :",
//   hspq_a_kr_aspek_positif_di_ungkap:
//     "Sikap : Kritis,Formal,Idealis,Tepat,Teliti,Obyektif",
//   hspq_a_kr_aspek_negatif_di_ungkap:
//     "Sikap : Kurang Terbuka,membatasi diri,kaku,kurang ramah,dingin,individualistik,suka menyendiri.",
//   hspq_c: 7.0,
//   hspq_c_kn_rank: 14,
//   hspq_c_kn_persen: 45.0,
//   hspq_c_kn_keterangan: "C",
//   hspq_c_kn_aspek_positif:
//     "Aspek faktor sikap Emosi stabil Cukup mengungkap sisi positif :",
//   hspq_c_kn_aspek_negatif:
//     "Aspek faktor sikap Emosi stabil nilainya Cukup juga akan berakibat negatif :",
//   hspq_c_kn_aspek_positif_di_ungkap:
//     "Sikap : Emosi stabil, dewasa, matang, tenang, mudah menyesuaikan diri, tidak mudah bingung, menghadapi realitas, minatnya tepat.",
//   hspq_c_kn_aspek_negatif_di_ungkap: "Sikap  Negatif Tidak ada",
//   hspq_c_kr_rank: 13,
//   hspq_c_kr_persen: 55.0,
//   hspq_c_kr_keterangan: "C",
//   hspq_c_kr_aspek_positif:
//     "Aspek faktor sikap Emosi labil Cukup mengungkap sisi positif :",
//   hspq_c_kr_aspek_negatif:
//     "Aspek faktor sikap Emosi labil nilainya Cukup juga akan berakibat negatif :",
//   hspq_c_kr_aspek_positif_di_ungkap: "Sikap Positif Tidak ada",
//   hspq_c_kr_aspek_negatif_di_ungkap:
//     "Sikap :Emosi tdk stabil,mudah marah,jengkel,mudah bimbang,mudah menyerah,putus asah,khawatir,minder,tanggung jawah lemah,mudah terlibat masalah besar,dendam.",
//   hspq_d: 12.0,
//   hspq_d_kn_rank: 5,
//   hspq_d_kn_persen: 70.0,
//   hspq_d_kn_keterangan: "CT",
//   hspq_d_kn_aspek_positif:
//     "Aspek faktor sikap Bergairah Cukup tinggi mengungkap sisi positif :",
//   hspq_d_kn_aspek_negatif:
//     "Aspek faktor sikap Bergairah nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_d_kn_aspek_positif_di_ungkap:
//     "Sikap : Mudah bergairah, terlalu aktif, energik",
//   hspq_d_kn_aspek_negatif_di_ungkap:
//     "Sikap : Tidak sabar, suka menuntut, dan iri hati, suka pamer dan menarik perhatian, gugup, egois, mudah dialihkan perhatiannya.",
//   hspq_d_kr_rank: 22,
//   hspq_d_kr_persen: 30.0,
//   hspq_d_kr_keterangan: "R",
//   hspq_d_kr_aspek_positif:
//     "Aspek faktor sikap Sulit Bergairah Rendah mengungkap sisi positif :",
//   hspq_d_kr_aspek_negatif:
//     "Aspek faktor sikap Sulit Bergairah nilainya Rendah juga akan berakibat negatif :",
//   hspq_d_kr_aspek_positif_di_ungkap:
//     "Sikap : Tenang, hati - hati, pandai mengendalikan nafsu, tidak mudah irihati, tidak sombong, tidak gelisah.",
//   hspq_d_kr_aspek_negatif_di_ungkap:
//     "Sikap : Tidak aktif, kurang energik, motivasinya lemah.",
//   hspq_e: 2.0,
//   hspq_e_kn_rank: 26,
//   hspq_e_kn_persen: 4.0,
//   hspq_e_kn_keterangan: "SRS",
//   hspq_e_kn_aspek_positif:
//     "Aspek faktor sikap Dominasi Sangat rendah sekali mengungkap sisi positif :",
//   hspq_e_kn_aspek_negatif:
//     "Aspek faktor sikap Dominasi Sangat rendah sekali juga akan berakibat negatif :",
//   hspq_e_kn_aspek_positif_di_ungkap:
//     "Sikap : Yakin dan percaya diri, mandiri, salalu sungguh - sungguh.",
//   hspq_e_kn_aspek_negatif_di_ungkap:
//     "Sikap : Sok kuasa, suka bersaing dan pamer, keras kepala, suka brontak, suka memusuhi, anti sosial, tidak taat.",
//   hspq_e_kr_rank: 1,
//   hspq_e_kr_persen: 96.0,
//   hspq_e_kr_keterangan: "STS",
//   hspq_e_kr_aspek_positif:
//     "Aspek faktor sikap Patuh Tunduk Sangat tinggi sekali mengungkap sisi positif :",
//   hspq_e_kr_aspek_negatif:
//     "Aspek faktor sikap Patuh Tunduk nilainya Sangat tinggi sekali juga akan berakibat negatif :",
//   hspq_e_kr_aspek_positif_di_ungkap:
//     "Sikap : Rendah hati, patuh, lembut hati, mudah dipimpin, mudah adaptasi, taat pada aturan, memperhatikan,diplomatis.",
//   hspq_e_kr_aspek_negatif_di_ungkap:
//     "Sikap : Kurang mandiri, mudah bimbang, dan bingung",
//   hspq_f: 10.0,
//   hspq_f_kn_rank: 11,
//   hspq_f_kn_persen: 63.0,
//   hspq_f_kn_keterangan: "CT",
//   hspq_f_kn_aspek_positif:
//     "Aspek faktor sikap Keceriaan Cukup tinggi mengungkap sisi positif :",
//   hspq_f_kn_aspek_negatif:
//     "Aspek faktor sikap Keceriaan nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_f_kn_aspek_positif_di_ungkap:
//     "Sikap : Banyak bicara, ceria, gembira, terus - terang, cepat dan tajam perhatiannya, antusias, Ekspresif.",
//   hspq_f_kn_aspek_negatif_di_ungkap:
//     "Sikap : Acuh tak acuh/tak peduli.impulsif",
//   hspq_f_kr_rank: 16,
//   hspq_f_kr_persen: 37.0,
//   hspq_f_kr_keterangan: "CR",
//   hspq_f_kr_aspek_positif:
//     "Aspek faktor sikap Sungguh-sungguh Cukup rendah mengungkap sisi positif :",
//   hspq_f_kr_aspek_negatif:
//     "Aspek faktor sikap Sungguh-sungguh nilainya Cukup rendah juga akan berakibat negatif :",
//   hspq_f_kr_aspek_positif_di_ungkap:
//     "Sikap : Serius, sungguh - sungguh, hati - hati, intstropeksi.",
//   hspq_f_kr_aspek_negatif_di_ungkap:
//     "Sikap : Pendiam, khawatir, lambat kerjanya.",
//   hspq_g: 9.0,
//   hspq_g_kn_rank: 23,
//   hspq_g_kn_persen: 27.0,
//   hspq_g_kn_keterangan: "R",
//   hspq_g_kn_aspek_positif:
//     "Aspek faktor sikap Taat Peraturan Rendah mengungkap sisi positif :",
//   hspq_g_kn_aspek_negatif:
//     "Aspek faktor sikap Taat Peraturan Rendah juga akan berakibat negatif :",
//   hspq_g_kn_aspek_positif_di_ungkap:
//     "Sikap : Teratur, konsisten, disiplin, tanggung jawab, hati-hati teliti, tekun, cermat, serius, tenang.",
//   hspq_g_kn_aspek_negatif_di_ungkap: "Sikap Negatif Tidak ada",
//   hspq_g_kr_rank: 4,
//   hspq_g_kr_persen: 73.0,
//   hspq_g_kr_keterangan: "T",
//   hspq_g_kr_aspek_positif:
//     "Aspek faktor sikap Menolak Peraturan Tinggi mengungkap sisi positif :",
//   hspq_g_kr_aspek_negatif:
//     "Aspek faktor sikap Menolak Peraturan nilainya Tinggi juga akan berakibat negatif :",
//   hspq_g_kr_aspek_positif_di_ungkap: "Sikap Positif Tidak ada",
//   hspq_g_kr_aspek_negatif_di_ungkap:
//     "Sikap : Sembrono, kurang teratur, puas diri, lamban, malas-malasan, kurang diandalkan , kurang tanggung jawab, tidak setia.",
//   hspq_h: 10.0,
//   hspq_h_kn_rank: 10,
//   hspq_h_kn_persen: 65.0,
//   hspq_h_kn_keterangan: "CT",
//   hspq_h_kn_aspek_positif:
//     "Aspek faktor sikap Lembut Hati/Peka Cukup tinggi mengungkap sisi positif :",
//   hspq_h_kn_aspek_negatif:
//     "Aspek faktor sikap Lembut Hati/Peka nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_h_kn_aspek_positif_di_ungkap:
//     "Sikap : Peka perasa, halus, lembut hati, sopan santun, baik hati, cepat puas diri, kritis, teliti, imajinatif.",
//   hspq_h_kn_aspek_negatif_di_ungkap:
//     "Sikap : Terlalu dilindungi, bergantung rasa tidak aman.",
//   hspq_h_kr_rank: 17,
//   hspq_h_kr_persen: 35.0,
//   hspq_h_kr_keterangan: "CR",
//   hspq_h_kr_aspek_positif:
//     "Aspek faktor sikap Keras Hati Cukup rendah mengungkap sisi positif :",
//   hspq_h_kr_aspek_negatif:
//     "Aspek faktor sikap Keras Hati nilainya Cukup rendah juga akan berakibat negatif :",
//   hspq_h_kr_aspek_positif_di_ungkap:
//     "Sikap : Mandiri, Tanggung jawab besar, praktis, logika, tidak bertele-tele.",
//   hspq_h_kr_aspek_negatif_di_ungkap:
//     "Sikap : Keras hati, kasar, sinis, kurang peka dalam merespon.",
//   hspq_i: 16.0,
//   hspq_i_kn_rank: 3,
//   hspq_i_kn_persen: 77.0,
//   hspq_i_kn_keterangan: "T",
//   hspq_i_kn_aspek_positif:
//     "Aspek faktor sikap Pemberani Tinggi mengungkap sisi positif :",
//   hspq_i_kn_aspek_negatif:
//     "Aspek faktor sikap Pemberani nilainya Tinggi juga akan berakibat negatif :",
//   hspq_i_kn_aspek_positif_di_ungkap:
//     "Sikap : Berani, terus-terang, terbuka, ramah, aktif, responsif, suka petualangan , minat besar.",
//   hspq_i_kn_aspek_negatif_di_ungkap:
//     "Sikap : Kurang peka pada bahaya, impulsif",
//   hspq_i_kr_rank: 24,
//   hspq_i_kr_persen: 23.0,
//   hspq_i_kr_keterangan: "R",
//   hspq_i_kr_aspek_positif:
//     "Aspek faktor sikap Pemalu Rendah mengungkap sisi positif :",
//   hspq_i_kr_aspek_negatif:
//     "Aspek faktor sikap Pemalu nilainya Rendah juga akan berakibat negatif :",
//   hspq_i_kr_aspek_positif_di_ungkap:
//     "Sikap : Peka akan bahaya, hati-hati, manahan diri",
//   hspq_i_kr_aspek_negatif_di_ungkap:
//     "Sikap : Takut, pemalu, ragu - ragu, menarik diri, minat kurang.",
//   hspq_j: 6.0,
//   hspq_j_kn_rank: 18,
//   hspq_j_kn_persen: 34.0,
//   hspq_j_kn_keterangan: "R",
//   hspq_j_kn_aspek_positif:
//     "Aspek faktor sikap Menarik Diri Rendah mengungkap sisi positif :",
//   hspq_j_kn_aspek_negatif:
//     "Aspek faktor sikap Menarik Diri Rendah juga akan berakibat negatif :",
//   hspq_j_kn_aspek_positif_di_ungkap:
//     "Sikap : Selalu berhati - hati, menahan diri.",
//   hspq_j_kn_aspek_negatif_di_ungkap:
//     "Sikap : Menarik diri, individualis, kurang terbuka, merasa lelah, sedikit teman.",
//   hspq_j_kr_rank: 9,
//   hspq_j_kr_persen: 66.0,
//   hspq_j_kr_keterangan: "CT",
//   hspq_j_kr_aspek_positif:
//     "Aspek faktor sikap Bersemangat Cukup tinggi mengungkap sisi positif :",
//   hspq_j_kr_aspek_negatif:
//     "Aspek faktor sikap Bersemangat nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_j_kr_aspek_positif_di_ungkap:
//     "Sikap : Bersemangat, cepat bertindak, suka berkelompok, menyukai aktifitas.",
//   hspq_j_kr_aspek_negatif_di_ungkap: "Sikap Negatif Tidak ada",
//   hspq_o: 11.0,
//   hspq_o_kn_rank: 6,
//   hspq_o_kn_persen: 69.0,
//   hspq_o_kn_keterangan: "CT",
//   hspq_o_kn_aspek_positif:
//     "Aspek faktor sikap Ketakutan Cukup tinggi mengungkap sisi positif :",
//   hspq_o_kn_aspek_negatif:
//     "Aspek faktor sikap Ketakutan nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_o_kn_aspek_positif_di_ungkap:
//     "Sikap : Peka pada bahaya, sensitif, cermat, perasaan kuat akan kewajiban.",
//   hspq_o_kn_aspek_negatif_di_ungkap:
//     "Sikap : Khawatir, takut, mudah sedih, mudah terharu, menyalahkan diri sendiri, kesepian, merenung.",
//   hspq_o_kr_rank: 20,
//   hspq_o_kr_persen: 31.0,
//   hspq_o_kr_keterangan: "CR",
//   hspq_o_kr_aspek_positif:
//     "Aspek faktor sikap Percaya Diri Cukup rendah mengungkap sisi positif :",
//   hspq_o_kr_aspek_negatif:
//     "Aspek faktor sikap Percaya Diri nilainya Cukup rendah juga akan berakibat negatif :",
//   hspq_o_kr_aspek_positif_di_ungkap:
//     "Sikap : Percaya diri, merasa bebas dan aman, tenang, ceria, selalu puas, bersemangat, tabah, tidak takut, sederhana.",
//   hspq_o_kr_aspek_negatif_di_ungkap:
//     "Sikap : Cenderung menentang peraturan, kurang peduli, tidak peka.",
//   hspq_q2: 9.0,
//   hspq_q2_kn_rank: 7,
//   hspq_q2_kn_persen: 69.0,
//   hspq_q2_kn_keterangan: "CT",
//   hspq_q2_kn_aspek_positif:
//     "Aspek faktor sikap Mandiri Cukup tinggi mengungkap sisi positif :",
//   hspq_q2_kn_aspek_negatif:
//     "Aspek faktor sikap Mandiri nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_q2_kn_aspek_positif_di_ungkap:
//     "Sikap : Mandiri, suka mengambil tindakan sendiri, tegas, cerdik, tangkas, percaya diri.",
//   hspq_q2_kn_aspek_negatif_di_ungkap:
//     "Sikap : Kurang puas, cenderung menyendiri.",
//   hspq_q2_kr_rank: 21,
//   hspq_q2_kr_persen: 31.0,
//   hspq_q2_kr_keterangan: "CR",
//   hspq_q2_kr_aspek_positif:
//     "Aspek faktor sikap Kurang Mandiri Cukup rendah mengungkap sisi positif :",
//   hspq_q2_kr_aspek_negatif:
//     "Aspek faktor sikap Kurang Mandiri nilainya Cukup rendah juga akan berakibat negatif :",
//   hspq_q2_kr_aspek_positif_di_ungkap: "Sikap Positif Tidak ada",
//   hspq_q2_kr_aspek_negatif_di_ungkap:
//     "Sikap : Tergantung, mengekor pada kelompok, kurang punya ide, kurang berani.",
//   hspq_q3: 8.0,
//   hspq_q3_kn_rank: 19,
//   hspq_q3_kn_persen: 32.0,
//   hspq_q3_kn_keterangan: "CR",
//   hspq_q3_kn_aspek_positif:
//     "Aspek faktor sikap Disiplin Cukup rendah mengungkap sisi positif :",
//   hspq_q3_kn_aspek_negatif:
//     "Aspek faktor sikap Disiplin Cukup rendah juga akan berakibat negatif :",
//   hspq_q3_kn_aspek_positif_di_ungkap:
//     "Sikap : Disiplin, tepat, cermat, terkendali secara baik, menghargai diri, mengikuti citra diri, melaksanakan kekuatan.",
//   hspq_q3_kn_aspek_negatif_di_ungkap: "Sikap : Cenderung kadang sombong.",
//   hspq_q3_kr_rank: 8,
//   hspq_q3_kr_persen: 68.0,
//   hspq_q3_kr_keterangan: "CT",
//   hspq_q3_kr_aspek_positif:
//     "Aspek faktor sikap Kurang Disiplin Cukup tinggi mengungkap sisi positif :",
//   hspq_q3_kr_aspek_negatif:
//     "Aspek faktor sikap Kurang Disiplin nilainya Cukup tinggi juga akan berakibat negatif :",
//   hspq_q3_kr_aspek_positif_di_ungkap: "Sikap Positif Tidak ada",
//   hspq_q3_kr_aspek_negatif_di_ungkap:
//     "Sikap : Kurang teratur, Kurang rapi, tidak terkendali, lunak , mengikuti kemauan sendiri.",
//   hspq_q4: 14.0,
//   hspq_q4_kn_rank: 2,
//   hspq_q4_kn_persen: 87.0,
//   hspq_q4_kn_keterangan: "TS",
//   hspq_q4_kn_aspek_positif:
//     "Aspek faktor sikap Tegang Tinggi sekali mengungkap sisi positif :",
//   hspq_q4_kn_aspek_negatif:
//     "Aspek faktor sikap Tegang nilainya Tinggi sekali juga akan berakibat negatif :",
//   hspq_q4_kn_aspek_positif_di_ungkap: "Sikap : Mempunyai dorongan tinggi",
//   hspq_q4_kn_aspek_negatif_di_ungkap:
//     "Sikap : Mudah bingung, tegang, khawatir, mudah frustasi, jengkel, kurang rapi.",
//   hspq_q4_kr_rank: 25,
//   hspq_q4_kr_persen: 13.0,
//   hspq_q4_kr_keterangan: "RS",
//   hspq_q4_kr_aspek_positif:
//     "Aspek faktor sikap Rileks Santai Rendah sekali mengungkap sisi positif :",
//   hspq_q4_kr_aspek_negatif:
//     "Aspek faktor sikap Rileks Santai nilainya Rendah sekali juga akan berakibat negatif :",
//   hspq_q4_kr_aspek_positif_di_ungkap: "Sikap : Tenang, sabar.",
//   hspq_q4_kr_aspek_negatif_di_ungkap: "Sikap : Mempunyai dorongan rendah.",
//   hspq_rank_1: "Patuh atau Tunduk",
//   hspq_rank_2: "Tegang",
//   hspq_rank_3: "Pemberani",
//   hspq_rank_4: "Menolak Peraturan",
//   hspq_rank_5: "Bergairah",
//   hspq_rank_1_positif:
//     "Sikap : Rendah hati, patuh, lembut hati, mudah dipimpin, mudah adaptasi, taat pada aturan, memperhatikan,diplomatis.",
//   hspq_rank_2_positif: "Sikap : Mempunyai dorongan tinggi",
//   hspq_rank_3_positif:
//     "Sikap : Berani, terus-terang, terbuka, ramah, aktif, responsif, suka petualangan , minat besar.",
//   hspq_rank_4_positif: "Sikap Positif Tidak ada",
//   hspq_rank_5_positif: "Sikap : Mudah bergairah, terlalu aktif, energik",
//   hspq_rank_1_negatif: "Sikap : Kurang mandiri, mudah bimbang, dan bingung",
//   hspq_rank_2_negatif:
//     "Sikap : Mudah bingung, tegang, khawatir, mudah frustasi, jengkel, kurang rapi.",
//   hspq_rank_3_negatif: "Sikap : Kurang peka pada bahaya, impulsif",
//   hspq_rank_4_negatif:
//     "Sikap : Sembrono, kurang teratur, puas diri, lamban, malas-malasan, kurang diandalkan , kurang tanggung jawab, tidak setia.",
//   hspq_rank_5_negatif:
//     "Sikap : Tidak sabar, suka menuntut, dan iri hati, suka pamer dan menarik perhatian, gugup, egois, mudah dialihkan perhatiannya.",
//   km_kr: 1.0,
//   km_kr_keterangan: "KS",
//   km_p1: 2.0,
//   km_p1_keterangan: "K",
//   km_p9: 4.0,
//   km_p9_keterangan: "HC",
//   mnt_cita2_1: "dokter gigi ",
//   mnt_cita2_2: "-",
//   mnt_cita2_3: "-",
//   mnt_studi_lanjut_smp: "",
//   mnt_studi_lanjut_sma_smk_1_fakultas: "",
//   mnt_studi_lanjut_sma_smk_1_prodi: "",
//   mnt_studi_lanjut_sma_smk_2_fakultas: "",
//   mnt_studi_lanjut_sma_smk_2_prodi: "",
//   mnt_studi_lanjut_sma_smk_kedinasan: "",
//   mnt_jurusan_lanjut_sma: "",
//   mnt_jurusan_lanjut_smk_1: "",
//   mnt_jurusan_lanjut_smk_2: "",
//   mnt_jurusan_lanjut_smk_3: "",
//   saran_fakultas_1: null,
//   saran_fakultas_1_prodi: null,
//   saran_fakultas_2: null,
//   saran_fakultas_2_prodi: null,
//   kesimpulan_tambahan: null,
//   tipe_bakat_1: "Musik dan Seni kreasi",
//   tipe_bakat_2: "Praktis dan Terampil",
//   tipe_bakat_3: "Kesehatan dan Sosial",
//   minat_pekerjaan_1: "MUSICAL",
//   minat_pekerjaan_2: "PRACTICAL",
//   minat_pekerjaan_3: "MEDICAL",
//   minat_pekerjaan_1_persen: "91 %",
//   minat_pekerjaan_2_persen: "83 %",
//   minat_pekerjaan_3_persen: "83 %",
//   sekolah_lanjutan: "/",
//   sekolah_jurusan: "/",
//   eq_persen: 54,
//   eq_persen_keterangan: "C",
//   sq_persen: 48,
//   sq_persen_keterangan: "C",
//   scq_persen: 57,
//   scq_persen_keterangan: "C",
// };

// // get properties from data
// const obj = Object.keys(data);
// console.log(obj);
</script>

<template>
  <div class="flex justify-center flex-col">
    <div class="flex justify-center">
      <img src="@/assets/img/flat/404-error.png" />
    </div>
    <div>
      <!-- {{ obj }} -->
      <p class="text-center font-bold text-2xl">Halaman tidak ditemukan!</p>
      <router-link :to="{ name: 'LandingIndex' }">
        <p class="text-center font-bold text-2xl underline text-primary link">
          Beranda
        </p></router-link
      >
    </div>
  </div>

  <!-- <div class="text-3xl font-bold underline text-red-200 flex justify-center items-center py-32">
    <div>404 NOT FOUND!</div>
  </div> -->
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
