/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION
   DATA TOPIK 3.0: LINUX SERVER ADMINISTRATION (3.1 - 3.7 LENGKAP)
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push({
  id: "topik-3",
  code: "TOPIK 3.0",
  shortTitle: "Linux Server Administration",
  title: "3.0 Linux Server Administration",
  clo: "CLO 1, CLO 2 & CLO 3",
  slt: "36 Jam (Topik Teras Utama — FHS, Fail, Editor, Pengguna, Sudo & Permissions)",
  summary: "Menguasai keseluruhan pentadbiran pelayan Linux merangkumi struktur direktori Filesystem Hierarchy Standard (FHS), navigasi & carian fail (ls, grep, find), pengurusan fail (touch, mkdir, cp, mv, rm), penyunting teks (nano, vi, gedit), pengurusan akaun pengguna & kumpulan, hak istimewa root/sudo, skrip shell, serta kawalan keizinan fail (chown, chgrp, chmod, umask & special permissions).",
  heroStats: [
    { percent: "3.1-3.4", title: "FHS, File Mgmt & Editors", desc: "Hierarki /, ls, grep, cp, mv, rm, find, nano & vim" },
    { percent: "3.5-3.7", title: "Users, Sudo & Permissions", desc: "useradd, /etc/passwd, sudoers, chmod 755 & SUID" }
  ],
  hasInteractiveSim: "linux-chmod-fhs",
  notes: [
    {
      code: "3.1.1 - 3.1.3",
      subtopic: "3.1",
      title: "Filesystem Hierarchy Standard (FHS) & Pathnames in Linux",
      subtitle: "Struktur pokok direktori Linux bermula daripada Root (/) serta laluan mutlak vs relatif",
      concept: "Berbeza dengan Windows yang menggunakan huruf pemacu (`C:\\`, `D:\\`), Linux menyusun semua fail dan peranti di dalam **satu struktur pokok tunggal (single inverted tree)** yang bermula daripada direktori paling atas dipanggil **Root (`/`)**. Piawaian **Filesystem Hierarchy Standard (FHS)** memastikan semua distro Linux (Ubuntu, Debian, RHEL, SUSE) meletakkan fail konfigurasi, binari, dan log di lokasi yang seragam.",
      features: [
        {
          icon: "🌳",
          title: "3.1.1 & 3.1.2 Direktori Utama Mengikut Piawaian FHS",
          desc: "Setiap sub-direktori di bawah `/` mempunyai tugas khusus yang wajib dihafal oleh pentadbir pelayan.",
          bullets: [
            "`/` (Root Directory): Puncak hierarki sistem fail Linux.",
            "`/bin` & `/sbin`: Menyimpan arahan asas pengguna (`ls`, `cp`, `cat`) dan arahan pentadbiran sistem (`fdisk`, `reboot`, `iptables`).",
            "`/etc`: Menyimpan **semua fail konfigurasi sistem dan pelayan** (contoh: `/etc/passwd`, `/etc/ssh/sshd_config`).",
            "`/home`: Direktori peribadi bagi pengguna biasa (contoh: `/home/ali`), manakala `/root` ialah direktori peribadi khas untuk pentadbir superuser (`root`).",
            "`/var`: Menyimpan data berubah-ubah (variable data) seperti fail log (`/var/log`), laman web (`/var/www`), dan baris gilir e-mel.",
            "`/tmp`: Fail sementara (dipadam apabila reboot); `/dev`: Fail peranti perkakasan (`/dev/sda`); `/proc`: Maklumat maya proses & kernel semasa."
          ]
        },
        {
          icon: "🧭",
          title: "3.1.3 Absolute Pathname vs Relative Pathname",
          desc: "Dua cara menyatakan alamat lokasi sesuatu fail atau direktori di dalam Linux.",
          bullets: [
            "Absolute Pathname (Laluan Mutlak): **Sentiasa bermula dengan tanda palang `/`** dari puncak Root. Ia sah dijalankan dari mana-mana direktori semasa. Contoh: `cd /var/log/apache2`.",
            "Relative Pathname (Laluan Relatif): **TIDAK bermula dengan `/`** dan bergantung pada direktori kerja semasa (`pwd`). Contoh: jika anda berada di `/var`, anda hanya taip `cd log/apache2`.",
            "Simbol Pintasan Laluan: `.` (direktori semasa), `..` (satu aras direktori induk di atas), `~` (direktori `/home/username` pengguna), `-` (direktori sebelumnya)."
          ]
        }
      ],
      tableTitle: "Senarai Lengkap Direktori FHS Linux & Fungsinya",
      tableHeaders: ["Direktori", "Nama Penuh", "Kandungan & Contoh Penting"],
      tableRows: [
        ["`/`", "Root Filesystem", "Titik permulaan semua direktori dan fail dalam Linux"],
        ["`/bin`", "Essential User Binaries", "Program asas (`bash`, `ls`, `mkdir`, `cp`, `rm`, `grep`)"],
        ["`/sbin`", "System Binaries", "Program pentadbiran untuk `root` (`fsck`, `mkfs`, `shutdown`, `ip`)"],
        ["`/etc`", "Editable Text Configuration", "Fail konfigurasi sistem (`/etc/passwd`, `/etc/hosts`, `/etc/fstab`, `/etc/sudoers`)"],
        ["`/home`", "Home Directories", "Folder peribadi pengguna biasa (`/home/pelajar1`, `/home/staf`)"],
        ["`/root`", "Root Home Directory", "Folder peribadi pentadbir tertinggi `root` (Bukan di bawah `/home`!)"],
        ["`/var`", "Variable Files", "Fail log (`/var/log/syslog`), pangkalan data (`/var/lib/mysql`), web (`/var/www`)"],
        ["`/usr`", "Unix System Resources", "Perisian aplikasi pengguna, pustaka (`/usr/bin`, `/usr/share`, `/usr/local`)"],
        ["`/boot`", "Boot Loader Files", "Fail Kernel Linux (`vmlinuz`), `initrd`, dan konfigurasi GRUB bootloader"],
        ["`/dev`", "Device Files", "Mewakili perkakasan sebagai fail (`/dev/sda` = cakera keras, `/dev/null`)"],
        ["`/opt`", "Optional Add-on Apps", "Pakej perisian pihak ketiga (contoh: `/opt/lampp`, `/opt/google`)"],
        ["`/tmp`", "Temporary Files", "Ruang fail sementara yang boleh ditulis oleh semua pengguna"]
      ]
    },
    {
      code: "3.2.1 - 3.2.7",
      subtopic: "3.2",
      title: "Display the Linux Directory Structure to View Files",
      subtitle: "Menggunakan File Manager grafik serta arahan cd, pwd, ls, file, wildcards, cat, more, less, head, tail & grep",
      concept: "Pentadbir perlu mahir menavigasi direktori, mengenal pasti jenis fail sebenar (kerana Linux tidak bergantung semata-mata pada sambungan `.exe` atau `.txt`), membaca isi fail teks yang panjang, dan menapis corak teks menggunakan Regular Expressions (`grep`).",
      features: [
        {
          icon: "📂",
          title: "3.2.1 - 3.2.4 Navigasi & Kenal Pasti Jenis Fail (`cd`, `pwd`, `ls`, `file`)",
          desc: "Empat arahan pertama yang digunakan setiap kali pentadbir log masuk ke pelayan.",
          bullets: [
            "`pwd` (Print Working Directory): Memaparkan laluan penuh direktori semasa anda berada.",
            "`cd` (Change Directory): Menukar direktori (`cd /etc`, `cd ..` naik satu aras, `cd ~` balik ke home).",
            "`ls` (List): Menyenaraikan kandungan direktori. Pilihan popular: `ls -l` (format panjang termasuk keizinan & saiz), `ls -a` (termasuk fail tersembunyi bermula `.`), `ls -lh` (saiz mudah baca KB/MB).",
            "`file <nama_fail>`: Membaca header fail untuk memberitahu jenis sebenar fail (contoh: *ASCII text*, *ELF 64-bit executable*, *gzip compressed data*).",
            "Simbol Jenis Fail pada aksara pertama `ls -l`: `-` (Fail biasa), `d` (Direktori), `l` (Symbolic Link), `b` (Block device), `c` (Character device)."
          ]
        },
        {
          icon: "🎯",
          title: "3.2.5 - 3.2.7 Wildcards, Membaca Fail (`cat/less/head/tail`) & `grep`",
          desc: "Memilih berbilang fail serentak dan menyemak kandungan fail log pelayan dengan pantas.",
          bullets: [
            "Wildcards (Globbing): `*` (sebarang panjang aksara, cth: `ls *.log`), `?` (1 aksara tunggal, cth: `ls bab?.txt`), `[abc]` atau `[0-9]` (julat aksara, cth: `ls laporan[1-3].txt`).",
            "`cat`: Papar keseluruhan isi fail sekali gus (sesuai untuk fail pendek).",
            "`more` & `less`: Membaca fail panjang halaman demi halaman (`less` lebih maju kerana boleh skrol atas/bawah dan cari teks dengan `/`).",
            "`head -n 5` & `tail -n 5`: Memaparkan 5 baris teratas (`head`) atau 5 baris terbawah (`tail`). `tail -f /var/log/syslog` memantau log secara masa nyata (live)!",
            "`grep` (Global Regular Expression Print): Mencari teks di dalam fail. Pilihan: `grep -i` (abaikan huruf besar/kecil), `grep -n` (papar nombor baris), `grep -v` (papar baris yang TIDAK sepadan), `grep '^root'` (bermula dengan root)."
          ]
        }
      ],
      tableTitle: "Perbandingan Arahan Paparan Kandungan Fail Teks di Linux",
      tableHeaders: ["Arahan", "Cara Berfungsi", "Situasi Penggunaan Terbaik"],
      tableRows: [
        ["`cat fail.txt`", "Memaparkan semua baris terus ke skrin terminal", "Fail konfigurasi pendek (< 30 baris)"],
        ["`more fail.txt`", "Paparan muka surat demi muka surat (Tekan Space untuk turun)", "Membaca dokumen sederhana dari atas ke bawah"],
        ["`less fail.txt`", "Pembaca interaktif (Anak panah Atas/Bawah, `/cari`, `q` untuk keluar)", "Membaca fail log besar atau konfigurasi panjang"],
        ["`head -n 10 fail.txt`", "Memaparkan 10 baris paling atas sahaja", "Menyemak tajuk lajur atau permulaan fail"],
        ["`tail -n 20 fail.log`", "Memaparkan 20 baris paling bawah (terkini)", "Menyemak ralat terbaru dalam `/var/log/auth.log`"],
        ["`grep -in 'error' fail.log`", "Menapis hanya baris yang mengandungi perkataan 'error' beserta nombor baris", "Troubleshooting punca kerosakan servis pelayan"]
      ]
    },
    {
      code: "3.3.1 - 3.3.5",
      subtopic: "3.3",
      title: "Trace File and Directory Management in Linux System",
      subtitle: "Mencipta, menyalin, menukar nama, mengalih, memadam dan mencari fail (touch, mkdir, cp, mv, rm, find, locate)",
      concept: "Pengurusan kitar hayat fail dan direktori adalah operasi harian pentadbir. Di dalam Linux CLI, tiada 'Recycle Bin' apabila anda menggunakan arahan `rm` — oleh itu pemahaman tentang pilihan (flags) seperti `-r`, `-i`, dan `-f` amat kritikal.",
      features: [
        {
          icon: "➕",
          title: "3.3.2 Mencipta Fail & Direktori (`touch`, `cat >`, `mkdir`)",
          desc: "Kaedah pantas membina struktur folder projek dan fail kosong atau berisi teks.",
          bullets: [
            "`touch fail_baru.txt`: Mencipta fail kosong baharu (atau mengemas kini cap masa/timestamp jika fail sudah wujud).",
            "`cat > nota.txt`: Mencipta fail dan terus menaip isi teks (tekan `Ctrl+D` untuk simpan dan keluar).",
            "`mkdir projek`: Mencipta sebuah direktori baharu.",
            "`mkdir -p jabatan/jtmk/sem4`: Pilihan `-p` (parents) mencipta keseluruhan pepohon direktori bertingkat serentak!"
          ]
        },
        {
          icon: "✂️",
          title: "3.3.3 & 3.3.4 Memadam (`rm`, `rmdir`), Menyalin (`cp`) & Mengalih (`mv`)",
          desc: "Menguruskan pemindahan, penukaran nama (rename) dan penghapusan fail/direktori.",
          bullets: [
            "`cp sumber.txt salinan.txt`: Menyalin fail. Untuk menyalin keseluruhan direktori berserta isinya, wajib guna `cp -r folder_asal folder_salinan`.",
            "`mv asal.txt baharu.txt`: Digunakan untuk **dua tujuan** — (1) Menukar nama fail (Rename) dan (2) Mengalihkan fail ke direktori lain (`mv laporan.txt /var/backups/`).",
            "`rmdir folder_kosong`: Hanya boleh memadam direktori yang **100% kosong**.",
            "`rm fail.txt`: Memadam fail. `rm -r folder` memadam folder beserta isinya secara rekursif. `rm -rf folder` memadam secara paksa (force) tanpa bertanya — sangat berkuasa dan perlu berhati-hati!"
          ]
        },
        {
          icon: "🔍",
          title: "3.3.5 Mencari Fail & Direktori (`find` vs `locate`)",
          desc: "Dua utiliti carian fail utama di dalam Linux Server dengan mekanisme berbeza.",
          bullets: [
            "`locate nama_fail`: Sangat pantas kerana ia mencari di dalam pangkalan data indeks (`mlocate.db`). Jalankan `sudo updatedb` dahulu supaya fail yang baru dicipta dapat dikesan.",
            "`find <lokasi> <kriteria>`: Mencari secara masa nyata (live) merentasi cakera mengikut nama, saiz, pemilik, masa, atau keizinan.",
            "Contoh `find`: `find /etc -name \"*.conf\"` (ikut nama), `find /home -user ali` (ikut pemilik), `find /var -size +50M` (fail lebih besar daripada 50MB)."
          ]
        }
      ]
    },
    {
      code: "3.4.1 - 3.4.3",
      subtopic: "3.4",
      title: "Display Multiple Graphical and Text Editors in Linux System",
      subtitle: "Menggunakan penyunting teks berasaskan terminal (Nano, Vi/Vim) dan penyunting grafik (Gedit, Kate)",
      concept: "Semua tetapan servis di dalam Linux disimpan sebagai fail teks biasa di dalam `/etc/`. Oleh itu, kemahiran menyunting fail teks — terutamanya menggunakan penyunting berasaskan teks apabila menyambung melalui SSH — adalah kemahiran wajib.",
      features: [
        {
          icon: "📝",
          title: "Penyunting Teks CLI: Nano vs Vi / Vim",
          desc: "Berfungsi di dalam terminal tanpa memerlukan persekitaran desktop GUI.",
          bullets: [
            "**GNU Nano (`nano fail.txt`)**: Mesra pengguna dan terus boleh menaip. Pintasan di bawah skrin: `Ctrl+O` (WriteOut / Simpan), `Enter` (Sahkan nama), `Ctrl+X` (Keluar), `Ctrl+W` (Cari teks).",
            "**Vi / Vim (`vim fail.txt`)**: Penyunting standard yang sentiasa wujud pada semua pelayan Unix/Linux. Mempunyai **3 Mod Utama**:",
            "1. *Command / Normal Mode* (Mod asal apabila dibuka; tekan `dd` padam baris, `yy` salin baris).",
            "2. *Insert Mode* (Tekan `i`, `a`, atau `o` untuk mula menaip teks; tekan `Esc` untuk kembali ke Normal Mode).",
            "3. *Last Line / Ex Mode* (Tekan `:` dari Normal Mode: `:w` simpan, `:q` keluar, `:wq` simpan & keluar, `:q!` keluar paksa tanpa simpan)."
          ]
        },
        {
          icon: "🖼️",
          title: "Penyunting Teks Berasaskan Grafik (GUI Editors)",
          desc: "Digunakan apabila pelayan mempunyai Desktop Environment atau melalui X11 Forwarding.",
          bullets: [
            "**Gedit (`gedit fail.txt`)**: Penyunting teks rasmi bagi persekitaran desktop GNOME.",
            "**Kate / KWrite**: Penyunting teks rasmi bagi persekitaran desktop KDE Plasma.",
            "**Mousepad / Pluma**: Penyunting grafik ringan untuk XFCE dan MATE."
          ]
        }
      ],
      tableTitle: "Rujukan Pantas Pintasan Kekunci Nano vs Vi/Vim",
      tableHeaders: ["Tindakan", "Dalam Penyunting NANO", "Dalam Penyunting VI / VIM"],
      tableRows: [
        ["Mula Menaip Teks", "Terus menaip sebaik dibuka", "Tekan `i` (Insert) atau `a` (Append)"],
        ["Kembali ke Mod Arahan", "Tiada mod berasingan", "Tekan kekunci `Esc`"],
        ["Simpan Fail (Save)", "`Ctrl + O`, kemudian tekan `Enter`", "Tekan `Esc`, taip `:w` dan `Enter`"],
        ["Simpan & Keluar", "`Ctrl + O`, `Enter`, kemudian `Ctrl + X`", "Tekan `Esc`, taip `:wq` atau `ZZ`"],
        ["Keluar Tanpa Simpan", "`Ctrl + X`, kemudian pilih `N` (No)", "Tekan `Esc`, taip `:q!` dan `Enter`"],
        ["Cari Perkataan", "`Ctrl + W`, taip kata kunci & `Enter`", "Tekan `Esc`, taip `/kata_kunci` & `Enter`"]
      ]
    },
    {
      code: "3.5.1 - 3.5.5",
      subtopic: "3.5",
      title: "Construct User and Group Accounts in Linux System Environment",
      subtitle: "Memahami UID/GID, fail konfigurasi (/etc/passwd, /etc/shadow, /etc/group) serta arahan useradd, usermod, userdel & passwd",
      concept: "Linux ialah sistem pengoperasian berbilang pengguna (multi-user). Setiap pengguna dikenal pasti oleh Kernel melalui nombor unik dipanggil **UID (User ID)** dan setiap kumpulan mempunyai **GID (Group ID)**. Mengгрупkan pengguna (contoh: kumpulan `pensyarah`, `pelajar`, `hr`) memudahkan pemberian keizinan fail secara pukal.",
      features: [
        {
          icon: "🪪",
          title: "3.5.1 & 3.5.2 Jenis Akaun & Fail Konfigurasi Pengguna",
          desc: "Tiga jenis akaun utama dan tiga fail pangkalan data pengguna di dalam `/etc/`.",
          bullets: [
            "**Root User (Superuser)**: Sentiasa mempunyai **UID = 0** dan **GID = 0**. Mempunyai kuasa mutlak ke atas sistem.",
            "**System / Service Accounts**: UID `1` hingga `999` (digunakan oleh proses latar belakang seperti `www-data`, `mysql`, `sshd`; tidak boleh log masuk interaktif `/usr/sbin/nologin`).",
            "**Regular Users (Pengguna Biasa)**: Bermula daripada **UID = 1000** ke atas.",
            "**`/etc/passwd`**: Menyimpan 7 medan maklumat pengguna (boleh dibaca semua): `username:x:UID:GID:comment:/home/dir:/bin/bash`.",
            "**`/etc/shadow`**: Menyimpan kata laluan yang telah di-hash (disulitkan) serta dasar tamat tempoh kata laluan (hanya boleh dibaca oleh `root`!).",
            "**`/etc/group`**: Menyimpan senarai kumpulan dan ahli: `group_name:x:GID:member1,member2`."
          ]
        },
        {
          icon: "🛠️",
          title: "3.5.3 - 3.5.5 Arahan CLI & Utiliti Grafik Pengurusan Pengguna",
          desc: "Membina, mengubah suai, menetapkan kata laluan dan memadam akaun pengguna/kumpulan.",
          bullets: [
            "Cipta Pengguna: `sudo useradd -m -s /bin/bash ali` (`-m` cipta folder `/home/ali`, `-s` tetapkan shell) atau guna skrip interaktif `sudo adduser ali`.",
            "Tetapkan / Tukar Kata Laluan: `sudo passwd ali`. Untuk kunci akaun: `sudo passwd -l ali`, buka kunci: `sudo passwd -u ali`.",
            "Ubah Suai Pengguna: `sudo usermod -aG sudo,jtmk ali` (`-aG` menambah pengguna ke kumpulan tambahan tanpa membuang kumpulan sedia ada).",
            "Padam Pengguna: `sudo userdel ali` (kekalkan folder home) atau `sudo userdel -r ali` (padam pengguna berserta folder `/home/ali`).",
            "Urus Kumpulan: `sudo groupadd jtmk`, `sudo groupmod -n jabatan_it jtmk`, `sudo groupdel jabatan_it`."
          ]
        }
      ],
      tableTitle: "Pecahan 7 Medan di dalam Fail `/etc/passwd`",
      tableHeaders: ["Medan", "Contoh (`ali:x:1001:1001:Ali Bin Ahmad:/home/ali:/bin/bash`)", "Penerangan"],
      tableRows: [
        ["1. Username", "`ali`", "Nama log masuk pengguna (unik)"],
        ["2. Password Placeholder", "`x`", "Menandakan kata laluan sebenar yang telah di-hash disimpan secara selamat di dalam `/etc/shadow`"],
        ["3. UID (User ID)", "`1001`", "Nombor pengenalan pengguna (`0` = root, `1-999` = sistem, `1000+` = pengguna biasa)"],
        ["4. GID (Primary Group ID)", "`1001`", "ID bagi kumpulan utama (Primary Group) pengguna tersebut"],
        ["5. GECOS / Comment", "`Ali Bin Ahmad`", "Maklumat penuh seperti nama penuh, nombor bilik atau telefon"],
        ["6. Home Directory", "`/home/ali`", "Direktori kerja awal sebaik sahaja pengguna log masuk"],
        ["7. Default Shell", "`/bin/bash`", "Program shell yang dijalankan semasa log masuk (`/usr/sbin/nologin` jika dihalang log masuk)"]
      ]
    },
    {
      code: "3.6.1 - 3.6.4",
      subtopic: "3.6",
      title: "Display Administrator Privileges Tasks & Basic Shell Scripting",
      subtitle: "Perbezaan Root vs Regular User, su vs sudo, konfigurasi /etc/sudoers (visudo) & automasi skrip Bash",
      concept: "Menggunakan akaun `root` sepanjang masa adalah berisiko tinggi kerana satu kesilapan taip boleh memadam keseluruhan sistem. Amalan terbaik keselamatan (CLO 3) ialah log masuk sebagai pengguna biasa dan gunakan `sudo` hanya apabila perlu menjalankan tugas pentadbiran.",
      features: [
        {
          icon: "👑",
          title: "3.6.1 - 3.6.3 Kuasa Root, `su`, `sudo` & Fail `/etc/sudoers`",
          desc: "Cara menaik taraf hak istimewa secara selamat dan teraudit.",
          bullets: [
              "Prompt Terminal: Pengguna biasa berakhir dengan tanda **`$`** (`ali@svr:~$`), manakala `root` berakhir dengan tanda **`#`** (`root@svr:~#`).",
              "`su -` (Switch User): Bertukar terus menjadi pengguna `root` (memerlukan kata laluan `root`).",
              "`sudo <arahan>` (Superuser Do): Menjalankan satu arahan sebagai `root` menggunakan **kata laluan pengguna itu sendiri**, dan setiap arahan direkodkan dalam `/var/log/auth.log`.",
              "Menyunting `/etc/sudoers`: **Wajib guna arahan `sudo visudo`** kerana `visudo` menyemak ralat sintaks sebelum menyimpan (mengelakkan anda terkunci daripada sudo!).",
              "Format `/etc/sudoers`: `ali ALL=(ALL:ALL) ALL` atau untuk kumpulan: `%admin ALL=(ALL) ALL`."
          ]
        },
        {
          icon: "📜",
          title: "3.6.4 Basic Shell Script untuk Tugas Pentadbiran",
          desc: "Mengautomasikan tugas berulang (seperti semakan ruang cakera, penciptaan pengguna pukal, atau backup) di dalam fail `.sh`.",
          bullets: [
            "Baris Pertama Wajib (**Shebang**): `#!/bin/bash` — memberitahu sistem supaya menjalankan skrip ini menggunakan pentafsir `/bin/bash`.",
            "Komen: Sebarang baris bermula dengan `#` (kecuali shebang) diabaikan sebagai nota penerangan.",
            "Memberi Kebenaran Laku (Executable): Sebelum dijalankan, jalankan `chmod +x skrip.sh`, kemudian laksanakan dengan `./skrip.sh`."
          ]
        }
      ]
    },
    {
      code: "3.7.1 - 3.7.5",
      subtopic: "3.7",
      title: "Trace File and Directory Permissions in Linux System",
      subtitle: "Pemilikan (chown, chgrp), keizinan simbolik & oktal (chmod), keizinan lalai (umask), dan keizinan khas (SUID, SGID, Sticky Bit)",
      concept: "Setiap fail dan direktori di dalam Linux dikawal oleh sistem keselamatan 3-Kategori × 3-Keizinan. Anda boleh mencuba sendiri pengiraan nilai Octal dan Symbolic menggunakan **Kalkulator Chmod Interaktif** di tab Simulasi di bawah!",
      features: [
        {
          icon: "🔐",
          title: "3.7.1 - 3.7.3 Pemilikan (`chown`, `chgrp`) & Keizinan (`chmod`)",
          desc: "Membaca 10 aksara keizinan (contoh: `-rwxr-xr--`) dan menukarnya dengan mod Simbolik atau Nombor Oktal.",
          bullets: [
            "3 Kategori Pengguna: **u** = User/Owner (Pemilik), **g** = Group (Kumpulan), **o** = Others (Lain-lain), **a** = All (Semua).",
            "3 Jenis Keizinan & Nilai Oktal: **r (Read) = 4**, **w (Write) = 2**, **x (Execute) = 1**, **- (Tiada) = 0**.",
            "Contoh Kiraan Oktal: `rwx` (4+2+1 = **7**), `r-x` (4+0+1 = **5**), `r--` (4+0+0 = **4**). Maka `rwxr-xr--` ialah **`chmod 754 fail.sh`**.",
            "Mod Simbolik: `chmod u+x fail.sh` (tambah execute pada owner), `chmod go-w fail.txt` (buang write daripada group & others).",
            "Tukar Pemilik & Kumpulan: `sudo chown ali:jtmk fail.txt` (tukar pemilik kepada `ali` dan kumpulan kepada `jtmk` serentak) atau `sudo chgrp jtmk fail.txt`."
          ]
        },
        {
          icon: "🛡️",
          title: "3.7.4 & 3.7.5 Keizinan Lalai (`umask`) & Keizinan Khas (SUID, SGID, Sticky Bit)",
          desc: "Bagaimana Linux menentukan keizinan fail baharu dan tiga bit keselamatan lanjutan.",
          bullets: [
            "**Default Permissions & `umask`**: Nilai asas maksimum bagi **Direktori baharu ialah `777`** dan **Fail baharu ialah `666`** (fail biasa tidak diberikan `x` secara automatik). Jika `umask` ialah `022`, maka direktori baharu mendapat `777 - 022 = 755` (`rwxr-xr-x`) dan fail baharu mendapat `666 - 022 = 644` (`rw-r--r--`).",
            "**SUID (Set User ID - Nilai Oktal `4000` / `u+s`)**: Fail dijalankan dengan kuasa pemilik fail (contoh: `/usr/bin/passwd` mempunyai `-rwsr-xr-x` supaya pengguna biasa boleh menukar kata laluan mereka di dalam `/etc/shadow`).",
            "**SGID (Set Group ID - Nilai Oktal `2000` / `g+s`)**: Pada direktori kongsi, semua fail baharu yang dicipta di dalamnya akan mewarisi kumpulan direktori tersebut secara automatik (`drwxrwsr-x`).",
            "**Sticky Bit (Nilai Oktal `1000` / `+t`)**: Dipasang pada direktori kongsi seperti `/tmp` (`drwxrwxrwt` / `chmod 1777`). Semua orang boleh mencipta fail di dalamnya, tetapi **hanya pemilik fail itu sendiri (atau root) boleh memadam failnya!**"
          ]
        }
      ],
      tableTitle: "Jadual Lengkap Nilai Oktal `chmod` & Keizinan Khas",
      tableHeaders: ["Simbol", "Kiraan (4+2+1)", "Nilai Oktal", "Maksud Keizinan"],
      tableRows: [
        ["`---`", "0 + 0 + 0", "`0`", "Tiada sebarang akses"],
        ["`--x`", "0 + 0 + 1", "`1`", "Execute sahaja (Boleh jalankan skrip / masuk direktori)"],
        ["`-w-`", "0 + 2 + 0", "`2`", "Write sahaja"],
        ["`-wx`", "0 + 2 + 1", "`3`", "Write dan Execute"],
        ["`r--`", "4 + 0 + 0", "`4`", "Read sahaja (Baca kandungan sahaja)"],
        ["`r-x`", "4 + 0 + 1", "`5`", "Read dan Execute (Standard untuk kumpulan/awam pada folder & skrip)"],
        ["`rw-`", "4 + 2 + 0", "`6`", "Read dan Write (Standard untuk pemilik pada fail teks biasa)"],
        ["`rwx`", "4 + 2 + 1", "`7`", "Kawalan Penuh: Read, Write dan Execute"],
        ["`SUID / SGID / Sticky`", "4000 / 2000 / 1000", "`4xxx` / `2xxx` / `1xxx`", "Contoh: `chmod 4755` (SUID), `chmod 2775` (SGID), `chmod 1777` (Sticky Bit)"]
      ]
    }
  ],
  labs: [
    {
      id: "lab-3-1",
      title: "Amali 3A: Navigasi FHS, Carian Fail & Pengurusan Direktori Linux",
      subtitle: "Subtopik 3.1, 3.2 & 3.3 — Membina struktur direktori, menyalin, menapis dengan grep dan mencari fail",
      steps: [
        {
          title: "Semak Direktori Semasa & Bina Struktur Direktori Projek",
          desc: "Gunakan `pwd` untuk menyemak lokasi semasa, kemudian bina struktur folder bertingkat `/home/student/projek_pelayan/log` dan `/home/student/projek_pelayan/konfig` menggunakan `mkdir -p`.",
          cmd: "student@ubuntu-svr:~$ pwd\n/home/student\nstudent@ubuntu-svr:~$ mkdir -p projek_pelayan/log projek_pelayan/konfig\nstudent@ubuntu-svr:~$ ls -l projek_pelayan/\ntotal 8\ndrwxr-xr-x 2 student student 4096 Oct 28 10:40 konfig\ndrwxr-xr-x 2 student student 4096 Oct 28 10:40 log",
          why: "Pilihan `-p` menjimatkan masa kerana kita boleh membina direktori induk dan sub-direktori dalam satu baris arahan sahaja."
        },
        {
          title: "Cipta Fail, Salin (`cp`), Alih/Tukar Nama (`mv`) & Semak Jenis Fail (`file`)",
          desc: "Cipta fail konfigurasi menggunakan `touch`, salin `/etc/hosts` ke dalam folder `konfig`, dan semak jenis fail menggunakan arahan `file`.",
          cmd: "student@ubuntu-svr:~$ touch projek_pelayan/konfig/tetapan.conf\nstudent@ubuntu-svr:~$ cp /etc/hosts projek_pelayan/konfig/hosts.bak\nstudent@ubuntu-svr:~$ mv projek_pelayan/konfig/tetapan.conf projek_pelayan/konfig/utama.conf\nstudent@ubuntu-svr:~$ file projek_pelayan/konfig/hosts.bak\nprojek_pelayan/konfig/hosts.bak: ASCII text",
          why: "Menyalin fail konfigurasi asal kepada `.bak` sebelum mengubah suai adalah amalan terbaik pentadbir pelayan."
        },
        {
          title: "Tapis Kandungan Menggunakan `grep` dan Cari Fail Menggunakan `find`",
          desc: "Cari semua baris yang mengandungi perkataan `localhost` di dalam `hosts.bak` beserta nombor baris (`-n`), dan cari semua fail berakhir `.conf` di dalam `projek_pelayan`.",
          cmd: "student@ubuntu-svr:~$ grep -n \"localhost\" projek_pelayan/konfig/hosts.bak\n1:127.0.0.1\tlocalhost\n4:::1     ip6-localhost ip6-loopback\n\nstudent@ubuntu-svr:~$ find projek_pelayan/ -name \"*.conf\"\nprojek_pelayan/konfig/utama.conf",
          why: "`grep -n` dan `find -name` memudahkan pentadbir mengesan tetapan dan lokasi fail dalam ribuan direktori pelayan."
        }
      ]
    },
    {
      id: "lab-3-2",
      title: "Amali 3B: Pengurusan Akaun Pengguna, Kumpulan, Sudoers & Skrip Pentadbiran",
      subtitle: "Subtopik 3.5 & 3.6 — Mencipta akaun staf, kumpulan jabatan, hak sudo dan skrip automasi Bash",
      steps: [
        {
          title: "Bina Kumpulan Jabatan & Akaun Pengguna Baharu",
          desc: "Cipta kumpulan `jtmk`, kemudian cipta pengguna `azrul` dengan direktori home (`-m`), shell `/bin/bash`, dan masukkan ke dalam kumpulan `jtmk`.",
          cmd: "student@ubuntu-svr:~$ sudo groupadd jtmk\nstudent@ubuntu-svr:~$ sudo useradd -m -s /bin/bash -G jtmk azrul\nstudent@ubuntu-svr:~$ sudo passwd azrul\nNew password: ********\nRetype new password: ********\npasswd: password updated successfully",
          why: "Pilihan `-G jtmk` memasukkan pengguna ke dalam kumpulan tambahan `jtmk` supaya beliau mendapat akses kepada semua fail projek jabatan."
        },
        {
          title: "Sahkan Maklumat Pengguna dalam `/etc/passwd`, `/etc/group` & Arahan `id`",
          desc: "Pastikan akaun `azrul` telah didaftarkan dengan betul menggunakan arahan `id` dan `tail`.",
          cmd: "student@ubuntu-svr:~$ id azrul\nuid=1001(azrul) gid=1002(azrul) groups=1002(azrul),1001(jtmk)\n\nstudent@ubuntu-svr:~$ tail -n 1 /etc/passwd\nazrul:x:1001:1002::/home/azrul:/bin/bash",
          why: "Arahan `id` memaparkan UID, GID utama, dan semua kumpulan sekunder dengan jelas."
        },
        {
          title: "Bina Skrip Shell Automasi Semakan Pelayan (`semak_pelayan.sh`)",
          desc: "Cipta sebuah skrip Bash yang memaparkan nama hos, tarikh, penggunaan RAM dan ruang cakera secara automatik.",
          cmd: "student@ubuntu-svr:~$ cat << 'EOF' > semak_pelayan.sh\n#!/bin/bash\necho \"====================================\"\necho \" LAPORAN KESIHATAN PELAYAN LINUX\"\necho \"====================================\"\necho \"Nama Pelayan : $(hostname)\"\necho \"Tarikh Semasa: $(date)\"\necho \"Pengguna     : $USER\"\necho \"------------------------------------\"\ndf -h /\nEOF\n\nstudent@ubuntu-svr:~$ chmod +x semak_pelayan.sh\nstudent@ubuntu-svr:~$ ./semak_pelayan.sh",
          why: "Memberikan `chmod +x` menukar fail teks biasa menjadi program boleh laku (executable script) yang boleh dijadualkan."
        }
      ]
    },
    {
      id: "lab-3-3",
      title: "Amali 3C: Kawalan Pemilikan & Keizinan Fail (`chown`, `chmod`, SGID & Sticky Bit)",
      subtitle: "Subtopik 3.7 — Mengamankan direktori kongsi jabatan supaya hanya ahli kumpulan boleh mengakses",
      steps: [
        {
          title: "Tukar Pemilik & Kumpulan Direktori Kongsi Menggunakan `chown`",
          desc: "Cipta direktori `/srv/kongsi_jtmk` dan tukarkan pemiliknya kepada `azrul` serta kumpulannya kepada `jtmk`.",
          cmd: "student@ubuntu-svr:~$ sudo mkdir -p /srv/kongsi_jtmk\nstudent@ubuntu-svr:~$ sudo chown azrul:jtmk /srv/kongsi_jtmk\nstudent@ubuntu-svr:~$ ls -ld /srv/kongsi_jtmk\ndrwxr-xr-x 2 azrul jtmk 4096 Oct 28 11:00 /srv/kongsi_jtmk",
          why: "Pilihan `ls -ld` digunakan untuk melihat keizinan direktori itu sendiri (bukan isi di dalamnya)."
        },
        {
          title: "Tetapkan Keizinan Oktal `770` & Special Permission (SGID + Sticky Bit `3770`)",
          desc: "Berikan akses penuh (`rwx` = 7) kepada Pemilik dan Kumpulan `jtmk`, sifar akses (`---` = 0) kepada orang luar (Others), serta aktifkan SGID (2) + Sticky Bit (1) = `3770`.",
          cmd: "student@ubuntu-svr:~$ sudo chmod 3770 /srv/kongsi_jtmk\nstudent@ubuntu-svr:~$ ls -ld /srv/kongsi_jtmk\ndrwxrws--T 2 azrul jtmk 4096 Oct 28 11:00 /srv/kongsi_jtmk",
          why: "Dengan `3770`, semua fail baharu di dalam folder ini automatik menjadi milik kumpulan `jtmk` (SGID `s`), dan ahli tidak boleh memadam fail rakan sekerja lain (Sticky Bit `T`/`t`)."
        }
      ]
    }
  ],
  quizzes: [
    {
      q: "Mengikut piawaian Filesystem Hierarchy Standard (FHS) di dalam Linux, direktori manakah yang menyimpan semua fail konfigurasi sistem dan servis pelayan?",
      options: ["/bin", "/etc", "/var", "/home"],
      answer: 1,
      explanation: "Direktori `/etc` (Editable Text Configuration) menyimpan semua fail konfigurasi peringkat sistem seperti `/etc/passwd`, `/etc/fstab`, dan `/etc/ssh/sshd_config`."
    },
    {
      q: "Jika direktori semasa anda ialah `/var/log`, manakah antara berikut merupakan contoh **Absolute Pathname** (Laluan Mutlak)?",
      options: ["apache2/error.log", "../www/html", "/etc/network/interfaces", "./syslog"],
      answer: 2,
      explanation: "Absolute Pathname sentiasa bermula dari puncak Root dengan aksara `/` di hadapan (seperti `/etc/network/interfaces`), manakala yang lain ialah Relative Pathname."
    },
    {
      q: "Apakah arahan terbaik untuk memantau baris-baris terkini fail log `/var/log/syslog` secara masa nyata (live streaming) ketika mengesan ralat pelayan?",
      options: ["head -n 10 /var/log/syslog", "tail -f /var/log/syslog", "cat /var/log/syslog", "file /var/log/syslog"],
      answer: 1,
      explanation: "Arahan `tail -f` (follow) memaparkan baris terakhir fail dan terus mengemas kini skrin secara langsung setiap kali baris log baharu ditulis oleh sistem."
    },
    {
      q: "Anda ingin mencari semua baris yang mengandungi perkataan `error` tanpa mengira huruf besar atau kecil (`ERROR`, `Error`, `error`) di dalam fail `pelayan.log`. Arahan manakah yang tepat?",
      options: [
        "grep -v \"error\" pelayan.log",
        "grep -i \"error\" pelayan.log",
        "find pelayan.log -name \"error\"",
        "locate -c \"error\" pelayan.log"
      ],
      answer: 1,
      explanation: "Pilihan `-i` (ignore-case) pada arahan `grep` mengarahkan carian mengabaikan perbezaan huruf besar dan huruf kecil."
    },
    {
      q: "Di dalam penyunting teks `vi` atau `vim`, apakah urutan kekunci yang betul untuk **menyimpan perubahan dan terus keluar** dari penyunting?",
      options: [
        "Tekan Ctrl + O kemudian Ctrl + X",
        "Tekan Esc, taip `:wq` dan tekan Enter",
        "Tekan Esc, taip `:q!` dan tekan Enter",
        "Tekan Alt + F4"
      ],
      answer: 1,
      explanation: "Dalam `vi`/`vim`, menekan `Esc` membawa anda ke Command Mode, dan `:wq` bermaksud Write (simpan) diikuti Quit (keluar). `:q!` pula keluar tanpa menyimpan."
    },
    {
      q: "Di dalam fail manakah Linux menyimpan kata laluan pengguna yang telah disulitkan (hashed password) supaya tidak boleh dibaca oleh pengguna biasa?",
      options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/sudoers"],
      answer: 1,
      explanation: "Walaupun `/etc/passwd` menyimpan maklumat akaun pengguna, kata laluan sebenar yang telah di-hash disimpan di dalam `/etc/shadow` yang hanya boleh dibaca oleh `root`."
    },
    {
      q: "Berapakah nilai Oktal bagi keizinan fail `-rwxr-x---` apabila ditukar menggunakan arahan `chmod`?",
      options: ["chmod 755", "chmod 750", "chmod 644", "chmod 700"],
      answer: 1,
      explanation: "Pemilik `rwx` = 4+2+1 (7), Kumpulan `r-x` = 4+0+1 (5), Lain-lain `---` = 0. Maka jawapannya ialah `750`."
    },
    {
      q: "Apakah arahan yang betul untuk menukar pemilik fail `data.sql` kepada pengguna `aina` dan kumpulannya kepada `dbadmin` secara serentak?",
      options: [
        "chmod aina:dbadmin data.sql",
        "chown aina:dbadmin data.sql",
        "usermod -G dbadmin aina data.sql",
        "chgrp aina data.sql"
      ],
      answer: 1,
      explanation: "Sintaks `chown pemilik:kumpulan nama_fail` menukar kedua-dua pemilik (owner) dan kumpulan (group) fail tersebut dalam satu arahan."
    },
    {
      q: "Apakah fungsi keizinan khas **Sticky Bit** (`chmod 1777` atau `+t`) yang biasanya ditetapkan pada direktori `/tmp`?",
      options: [
        "Menyulitkan semua fail di dalam direktori secara automatik",
        "Membenarkan semua pengguna mencipta fail di dalamnya, tetapi hanya pemilik fail (atau root) boleh memadam fail miliknya",
        "Menjalankan semua fail teks sebagai pengguna root",
        "Menghalang sebarang fail baharu daripada dicipta"
      ],
      answer: 1,
      explanation: "Sticky Bit (`t` pada hujung `drwxrwxrwt`) menghalang pengguna daripada memadam atau menamakan semula fail milik pengguna lain di dalam direktori kongsi."
    },
    {
      q: "Mengapakah pentadbir wajib menggunakan arahan `visudo` apabila ingin mengubah suai fail konfigurasi `/etc/sudoers`?",
      options: [
        "Kerana `visudo` mempunyai antara muka grafik warna-warni",
        "Kerana `visudo` mengunci fail daripada penyuntingan serentak dan menyemak ralat sintaks sebelum menyimpan",
        "Kerana penyunting `nano` dan `vim` tidak boleh membaca teks ASCII",
        "Kerana `visudo` memadamkan semua akaun pengguna biasa"
      ],
      answer: 1,
      explanation: "Jika terdapat ralat sintaks dalam `/etc/sudoers`, perintah `sudo` akan lumpuh sepenuhnya. `visudo` menyemak sintaks secara automatik sebelum membenarkan fail disimpan."
    }
  ]
});
