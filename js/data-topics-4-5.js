/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION
   DATA TOPIK 4.0 (WINDOWS SERVER) & TOPIK 5.0 (RISK MGMT & MAINTENANCE)
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push(
  // ========================================================================
  // TOPIK 4.0: WINDOWS SERVER ADMINISTRATION
  // ========================================================================
  {
    id: "topik-4",
    code: "TOPIK 4.0",
    shortTitle: "Windows Server Administration",
    title: "4.0 Windows Server Administration",
    clo: "CLO 1, CLO 2 & CLO 3",
    slt: "23 Jam (AD DS, DNS, DHCP, IIS, Akaun Pengguna/Kumpulan & Perkongsian Fail)",
    summary: "Menguasai pentadbiran Windows Server merangkumi seni bina Active Directory (Domain, Forest, OU), pemasangan Roles & Features utama (DNS, DHCP, IIS), pengurusan akaun pengguna & kumpulan keselamatan di dalam Active Directory, serta konfigurasi perkongsian fail (Shared Folder, Mapped Network Drive, UNC & Share Permissions).",
    heroStats: [
      { percent: "4.1-4.2", title: "AD DS, Roles & Users", desc: "Domain, Forest, OU, DNS, DHCP, IIS & AD Users/Groups" },
      { percent: "4.3", title: "File Sharing & Access", desc: "Shared Folder, UNC Path, Mapped Drive & Permissions" }
    ],
    hasInteractiveSim: "windows-share-sim",
    notes: [
      {
        code: "4.1.1",
        subtopic: "4.1",
        title: "Display Active Directory (AD) and Its Role in Windows Server",
        subtitle: "Struktur logik Active Directory Domain Services (AD DS): Domain, Tree, Forest & Organizational Units (OUs)",
        concept: "Dalam rangkaian tanpa pelayan (Workgroup), setiap PC menyimpan akaun pengguna sendiri — sukar diurus jika terdapat 500 komputer. **Active Directory Domain Services (AD DS)** menjadikan Windows Server sebagai **Domain Controller (DC)** yang menyimpan semua akaun pengguna, komputer, dan dasar keselamatan (Group Policy) secara berpusat di dalam satu pangkalan data (`ntds.dit`).",
        features: [
          {
            icon: "🏛️",
            title: "a. Domain (Domain Active Directory)",
            desc: "Unit pentadbiran asas dalam Active Directory yang menghimpunkan objek (pengguna, komputer, pencetak) di bawah satu nama rangkaian dan pangkalan data keselamatan yang sama.",
            bullets: [
              "Contoh nama Domain: `politeknik.edu.my` atau `jtmk.local`.",
              "Pengguna boleh log masuk dari mana-mana PC ahli domain menggunakan satu akaun yang sama (**Single Sign-On / Roaming**).",
              "Setiap Domain dikawal oleh sekurang-kurangnya sebuah pelayan **Domain Controller (DC)**."
            ]
          },
          {
            icon: "🌲",
            title: "b. Forest (Hutan) & Domain Tree (Pokok Domain)",
            desc: "Koleksi satu atau lebih Domain Tree yang berkongsi skema direktori, katalog global (Global Catalog), dan hubungan kepercayaan (Trust Relationship) automatik.",
            bullets: [
              "**Domain Tree**: Sekumpulan domain yang berkongsi ruang nama DNS berterusan (contoh: `politeknik.edu.my` -> `jtmk.politeknik.edu.my`).",
              "**Forest**: Sempadan keselamatan tertinggi (top-level security boundary) dalam Active Directory yang boleh menggabungkan berbilang Domain Tree berbeza (contoh: `politeknik.edu.my` + `kolejkomuniti.edu.my`)."
            ]
          },
          {
            icon: "🗂️",
            title: "c. Organizational Units (OUs / Unit Organisasi)",
            desc: "Bekas logik (container) di dalam sebuah Domain untuk menyusun pengguna, kumpulan, dan komputer mengikut jabatan atau lokasi fizikal.",
            bullets: [
              "Contoh struktur OU: `OU=JTMK`, `OU=JKE`, `OU=Makmal_Pelayan`, `OU=Staf_Pentadbiran`.",
              "**2 Tujuan Utama Membina OU**: (1) Memudahkan penerapan **Group Policy Objects (GPO)** secara khusus mengikut jabatan, dan (2) **Delegation of Control** (memberikan kuasa pentadbiran terhad kepada staf teknikal jabatan tertentu sahaja)."
            ]
          }
        ],
        tableTitle: "Ringkasan Komponen Logik Active Directory (AD DS)",
        tableHeaders: ["Komponen AD", "Aras Hierarki", "Fungsi Utama & Contoh"],
        tableRows: [
          ["Forest", "Aras Tertinggi (Sempadan Keselamatan)", "Menggabungkan semua Domain Tree organisasi; berkongsi Schema & Global Catalog"],
          ["Domain", "Unit Pentadbiran Teras", "Menyimpan pangkalan data pengguna/komputer di dalam Domain Controller (`jtmk.local`)"],
          ["Organizational Unit (OU)", "Sub-bekas di dalam Domain", "Menyusun objek ikut jabatan (`OU=Pensyarah`, `OU=Pelajar`) untuk GPO & delegasi kuasa"],
          ["Objects (Leaf)", "Elemen Individu dalam OU", "Akaun Pengguna (User), Kumpulan (Group), Komputer (Computer), dan Pencetak (Shared Printer)"]
        ]
      },
      {
        code: "4.1.2",
        subtopic: "4.1",
        title: "Trace Various Roles and Features in Windows Server",
        subtitle: "Tiga perkhidmatan rangkaian paling kritikal: DNS, DHCP dan IIS Web Server",
        concept: "Di dalam Windows Server Manager, **Server Role** ialah fungsi utama pelayan (seperti AD DS, DNS, DHCP, IIS), manakala **Feature** ialah perisian sokongan tambahan (seperti Windows Server Backup, .NET Framework, Telnet Client).",
        features: [
          {
            icon: "🌐",
            title: "a. Domain Name System (DNS) - Port UDP/TCP 53",
            desc: "Buku telefon rangkaian yang menterjemahkan nama domain yang mudah diingat manusia kepada alamat IP komputer (dan sebaliknya).",
            bullets: [
              "**Forward Lookup Zone**: Menterjemah Nama Hos -> Alamat IP (menggunakan rekod **A** untuk IPv4, **AAAA** untuk IPv6, **CNAME** untuk alias, **MX** untuk pelayan e-mel).",
              "**Reverse Lookup Zone**: Menterjemah Alamat IP -> Nama Hos (menggunakan rekod **PTR / Pointer**).",
              "**Wajib untuk Active Directory**: Klien Windows mencari lokasi Domain Controller melalui rekod **SRV (Service)** di dalam DNS!"
            ]
          },
          {
            icon: "📡",
            title: "b. Dynamic Host Configuration Protocol (DHCP) - Port UDP 67/68",
            desc: "Mengagihkan alamat IP, Subnet Mask, Default Gateway, dan DNS Server secara automatik kepada komputer klien dalam rangkaian.",
            bullets: [
              "**Proses DORA (4 Langkah DHCP)**: **D**iscover (Klien cari pelayan) -> **O**ffer (Pelayan tawar IP) -> **R**equest (Klien minta IP tersebut) -> **A**cknowledge (Pelayan sahkan sewaan/lease).",
              "**DHCP Scope**: Julat alamat IP yang boleh diagihkan (contoh: `192.168.10.50` – `192.168.10.200`).",
              "**Exclusion & Reservation**: *Exclusion* mengeluarkan IP pelayan daripada diagihkan; *Reservation* mengikat 1 IP tetap kepada MAC Address tertentu (seperti pencetak rangkaian)."
            ]
          },
          {
            icon: "🕸️",
            title: "c. Internet Information Services (IIS) - Port TCP 80 / 443",
            desc: "Peranan pelayan web (Web Server) dan FTP rasmi binaan dalaman Microsoft Windows Server.",
            bullets: [
              "Mengehoskan laman web HTML statik serta aplikasi web dinamik (ASP.NET, PHP).",
              "Direktori akar web lalai (Default Document Root): **`C:\\inetpub\\wwwroot`**.",
              "Diuruskan melalui konsol grafik **IIS Manager (`inetmgr`)**."
            ]
          }
        ]
      },
      {
        code: "4.2.1 - 4.2.4",
        subtopic: "4.2",
        title: "Construct User Accounts and Groups in Active Directory",
        subtitle: "Membina pengguna, menetapkan atribut, dasar akaun (Account Policies) serta Security vs Distribution Groups",
        concept: "Melalui konsol **Active Directory Users and Computers (`dsa.msc`)**, pentadbir boleh mencipta ratusan akaun staf dan pelajar, mengehadkan waktu log masuk, menguatkuasakan kata laluan kukuh, dan mengumpulkan pengguna mengikut fungsi kerja.",
        features: [
          {
            icon: "👤",
            title: "4.2.1 - 4.2.3 Akaun Pengguna, Atribut & Dasar Akaun (Policies)",
            desc: "Mengurus kitar hayat akaun pengguna domain dan keselamatan log masuk.",
            bullets: [
              "Pilihan Semasa Cipta Pengguna: *User must change password at next logon*, *User cannot change password*, *Password never expires*, *Account is disabled*.",
              "Atribut & Properties Pengguna: Tab *General* (nama, e-mel), *Account* (`Logon Hours` untuk hadkan waktu akses & `Log On To` untuk hadkan komputer tertentu), *Profile* (Roaming Profile & Home Folder).",
              "**Password Policy (dalam GPO)**: *Minimum password length*, *Password must meet complexity requirements*, *Maximum password age*.",
              "**Account Lockout Policy**: *Account lockout threshold* (kunci akaun selepas X kali salah kata laluan bagi menghalang serangan Brute Force)."
            ]
          },
          {
            icon: "👥",
            title: "4.2.4 Security Groups vs Distribution Groups & Group Scopes",
            desc: "Perbezaan penting antara dua jenis kumpulan dalam Active Directory.",
            bullets: [
              "**Security Group (Kumpulan Keselamatan)**: Mempunyai **SID (Security Identifier)** — digunakan untuk **memberikan keizinan akses (permissions)** kepada folder kongsi, pencetak, dan GPO.",
              "**Distribution Group (Kumpulan Pengedaran)**: **TIDAK mempunyai SID keselamatan** — hanya digunakan untuk senarai pengedaran e-mel (seperti dalam Microsoft Exchange). Tidak boleh digunakan untuk memberi permission folder!",
              "**3 Skop Kumpulan (Group Scopes)**: *Domain Local* (beri akses kepada sumber tempatan), *Global* (himpunkan pengguna dari domain yang sama), *Universal* (merentas semua domain dalam Forest). Formula emas Microsoft: **AGDLP** (*Accounts -> Global Group -> Domain Local Group -> Permissions*)."
            ]
          }
        ]
      },
      {
        code: "4.3.1 - 4.3.5",
        subtopic: "4.3",
        title: "Construct File Management and Sharing in Windows Server",
        subtitle: "Shared Folder, Mapped Network Drive, UNC Path, serta interaksi antara Share Permissions & NTFS Permissions",
        concept: "Perkongsian fail berpusat membolehkan pengguna menyimpan dokumen kerja di dalam pelayan supaya mudah disandarkan (backup) dan dikongsi mengikut jabatan. Pentadbir wajib memahami cara laluan **UNC** berfungsi dan bagaimana **Share Permissions** bergabung dengan **NTFS Permissions**.",
        features: [
          {
            icon: "📁",
            title: "4.3.1 - 4.3.2 Kaedah Perkongsian Fail: Shared Folder, UNC & Mapped Drive",
            desc: "Tiga konsep utama untuk menyediakan dan mengakses storan rangkaian pada Windows.",
            bullets: [
              "**a. Shared Folder**: Folder pada Windows Server yang dikongsikan melalui rangkaian menggunakan protokol SMB (boleh dikonfigurasi menerusi File Explorer -> *Properties -> Sharing -> Advanced Sharing* atau *Server Manager -> File and Storage Services*).",
              "**b. Universal Naming Convention (UNC)**: Format laluan piawai untuk mengakses sumber rangkaian: **`\\\\NamaPelayan\\NamaShare\\Subfolder`** atau **`\\\\192.168.56.102\\NotaJTMK`**. (Nota: Jika nama share diakhiri dengan tanda **`$`** seperti `\\\\Svr01\\Rahsia$`, ia menjadi **Hidden Share** yang tidak kelihatan apabila pengguna menyemak imbas rangkaian!).",
              "**c. Mapped Network Drive**: Menetapkan satu huruf pemacu tempatan (contoh: pemacu **`Z:`**) kepada laluan UNC (`net use Z: \\\\Svr01\\NotaJTMK`) supaya mudah diakses dalam *This PC*."
            ]
          },
          {
            icon: "🔒",
            title: "4.3.3 - 4.3.5 Share Permissions (Read, Change, Full Control) vs NTFS",
            desc: "Mengawal tahap akses pengguna khusus atau kumpulan keselamatan terhadap folder kongsi.",
            bullets: [
              "**a. Read (Baca)**: Hanya boleh melihat nama fail, membuka fail, dan menjalankan program. Tidak boleh ubah atau padam.",
              "**b. Write / c. Change (Tukar)**: Boleh melakukan semua perkara dalam *Read* **TAMBAH** mencipta fail baharu, mengubah isi fail, dan memadam fail.",
              "**d. Full Control (Kawalan Penuh)**: Boleh melakukan semua perkara dalam *Change* **TAMBAH** menukar keizinan (permissions) dan mengambil pemilikan (ownership) bagi NTFS.",
              "**Peraturan Emas Gabungan Share + NTFS Permission**: Apabila pengguna mengakses melalui rangkaian, keizinan sebenar yang berkuat kuasa ialah **YANG PALING KETAT (Most Restrictive)** antara Share Permission dan NTFS Permission! Selain itu, keizinan **Explicit Deny** sentiasa mengatasi **Allow**."
            ]
          }
        ],
        tableTitle: "Jadual Keputusan: Gabungan Share Permission vs NTFS Permission",
        tableHeaders: ["Senario", "Share Permission", "NTFS Permission", "Keizinan Berkuat Kuasa (Effective Permission)", "Sebab (Peraturan Most Restrictive)"],
        tableRows: [
          ["Senario 1", "Full Control", "Read", "**Read**", "Antara Full Control dan Read, tahap *Read* adalah lebih ketat"],
          ["Senario 2", "Read", "Modify / Full Control", "**Read**", "Disekat oleh Share Permission yang hanya membenarkan *Read*"],
          ["Senario 3", "Change", "Modify", "**Change / Modify**", "Kedua-duanya membenarkan baca, tulis, ubah dan padam"],
          ["Senario 4", "Full Control (Allow)", "Write (Deny)", "**Tiada Akses Write (Denied)**", "Peraturan *Deny* sentiasa mengatasi (*overrides*) sebarang *Allow*"]
        ]
      }
    ],
    labs: [
      {
        id: "lab-4-1",
        title: "Amali 4A: Pemasangan Active Directory (AD DS), DNS & Pembinaan OU/Pengguna",
        subtitle: "Subtopik 4.1 & 4.2 — Menaik taraf Windows Server menjadi Domain Controller dan mengurus pengguna",
        steps: [
          {
            title: "Pasang Role Active Directory Domain Services (AD DS) & DNS",
            desc: "Buka `Server Manager` -> Klik `Manage` -> `Add Roles and Features` -> Pilih `Active Directory Domain Services` dan `DNS Server` -> Klik Install. Atau jalankan arahan PowerShell berikut:",
            cmd: "PS C:\\Users\\Administrator> Install-WindowsFeature AD-Domain-Services, DNS -IncludeManagementTools\n\nSuccess Restart Needed Exit Code      Feature Result\n------- -------------- ---------      --------------\nTrue    No             Success        {Active Directory Domain Services, DNS Server}",
            why: "Memasang AD DS berserta DNS Server menyediakan asas untuk menaik taraf (promote) pelayan kepada Domain Controller."
          },
          {
            title: "Promote Pelayan kepada Domain Controller (Bina Forest Baharu `jtmk.local`)",
            desc: "Klik ikon bendera kuning di Server Manager -> `Promote this server to a domain controller` -> Pilih `Add a new forest` -> Masukkan Root domain name: `jtmk.local` -> Tetapkan kata laluan DSRM -> Klik Install.",
            cmd: "# Atau menggunakan PowerShell:\nPS C:\\Users\\Administrator> Install-ADDSForest -DomainName \"jtmk.local\" -InstallDns",
            why: "Selepas reboot, pelayan kini menjadi Domain Controller utama bagi hutan/domain `jtmk.local`."
          },
          {
            title: "Bina Organizational Unit (OU), Security Group & Akaun Pengguna di `dsa.msc`",
            desc: "Buka `Server Manager` -> `Tools` -> `Active Directory Users and Computers` (`dsa.msc`). Klik kanan `jtmk.local` -> `New` -> `Organizational Unit` (Namakan `JTMK`). Di dalam OU `JTMK`, cipta kumpulan keselamatan `G_Pensyarah` dan pengguna `azrul`.",
            cmd: "# Setara dalam PowerShell Active Directory Module:\nNew-ADOrganizationalUnit -Name \"JTMK\" -Path \"DC=jtmk,DC=local\"\nNew-ADGroup -Name \"G_Pensyarah\" -GroupScope Global -GroupCategory Security -Path \"OU=JTMK,DC=jtmk,DC=local\"\nNew-ADUser -Name \"Azrulnizam\" -SamAccountName \"azrul\" -UserPrincipalName \"azrul@jtmk.local\" -Path \"OU=JTMK,DC=jtmk,DC=local\" -Enabled $true",
            why: "Meletakkan akaun di dalam OU `JTMK` memudahkan pentadbir mengaplikasikan Group Policy dan mengurus kebenaran mengikut kumpulan `G_Pensyarah`."
          }
        ]
      },
      {
        id: "lab-4-2",
        title: "Amali 4B: Konfigurasi Shared Folder, Keizinan Akses & Mapped Network Drive",
        subtitle: "Subtopik 4.3 — Membina folder kongsi jabatan, mengawal Share/NTFS permission dan memetakan pemacu Z:",
        steps: [
          {
            title: "Cipta Folder & Aktifkan Advanced Sharing dengan Keizinan Kumpulan",
            desc: "Cipta folder `C:\\BahanKuliah`. Klik kanan -> `Properties` -> Tab `Sharing` -> `Advanced Sharing` -> Tandakan `Share this folder` -> Klik `Permissions`. Buang `Everyone`, tambah `G_Pensyarah` (Berikan `Change` & `Read`) dan `G_Pelajar` (Berikan `Read` sahaja).",
            cmd: "# Atau menggunakan arahan CLI Windows Server:\nC:\\> mkdir C:\\BahanKuliah\nC:\\> net share BahanKuliah=C:\\BahanKuliah /GRANT:G_Pensyarah,CHANGE /GRANT:G_Pelajar,READ",
            why: "Membuang kumpulan `Everyone` dan menetapkan akses khusus mengikut kumpulan keselamatan memastikan pelajar hanya boleh membaca nota tanpa terpadam fail pensyarah."
          },
          {
            title: "Akses Melalui Laluan UNC & Petakan kepada Mapped Network Drive (`Z:`)",
            desc: "Pada komputer klien, tekan `Win + R` dan uji laluan UNC `\\\\192.168.56.102\\BahanKuliah`, atau petakan secara kekal sebagai pemacu `Z:` menggunakan arahan `net use`.",
            cmd: "C:\\Users\\Pelajar> net use Z: \\\\192.168.56.102\\BahanKuliah /persistent:yes\nThe command completed successfully.",
            why: "Pilihan `/persistent:yes` memastikan pemacu rangkaian `Z:` disambungkan semula secara automatik setiap kali komputer klien dihidupkan."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Di dalam struktur logik Active Directory, komponen manakah yang digunakan sebagai bekas (container) untuk menyusun pengguna mengikut jabatan bagi memudahkan penerapan Group Policy (GPO) dan delegasi kuasa?",
        options: ["Forest", "Organizational Unit (OU)", "Reverse Lookup Zone", "DHCP Scope"],
        answer: 1,
        explanation: "Organizational Unit (OU) ialah bekas logik di dalam domain yang direka khusus untuk menyusun objek mengikut jabatan/cawangan serta memautkan GPO dan Delegation of Control."
      },
      {
        q: "Apakah empat langkah urutan komunikasi antara klien dan pelayan DHCP semasa mendapatkan alamat IP secara automatik?",
        options: [
          "SYN -> SYN-ACK -> ACK -> FIN",
          "DORA (Discover -> Offer -> Request -> Acknowledge)",
          "PING -> PONG -> LEASE -> RELEASE",
          "POST -> GET -> PUT -> DELETE"
        ],
        answer: 1,
        explanation: "Proses penyewaan IP DHCP dikenali sebagai DORA: DHCP Discover, DHCP Offer, DHCP Request, dan DHCP Acknowledge."
      },
      {
        q: "Dalam perkhidmatan DNS Server, rekod manakah yang digunakan di dalam Forward Lookup Zone untuk memetakan nama hos kepada alamat IPv4 (32-bit)?",
        options: ["Rekod MX", "Rekod A (Host)", "Rekod PTR (Pointer)", "Rekod CNAME"],
        answer: 1,
        explanation: "Rekod `A` memetakan nama hos kepada alamat IPv4, manakala `AAAA` untuk IPv6, `PTR` untuk Reverse Lookup, dan `MX` untuk pelayan mel."
      },
      {
        q: "Apakah perbezaan utama antara **Security Group** dengan **Distribution Group** di dalam Active Directory?",
        options: [
          "Security Group boleh digunakan untuk memberikan keizinan akses (permissions) pada folder kongsi, manakala Distribution Group hanya untuk pengedaran e-mel",
          "Distribution Group hanya boleh mengandungi komputer, bukan pengguna",
          "Security Group tidak mempunyai pengenalan keselamatan (SID)",
          "Distribution Group digunakan untuk menyulitkan kata laluan pengguna"
        ],
        answer: 0,
        explanation: "Hanya Security Group mempunyai Security Identifier (SID) yang boleh disenaraikan di dalam Access Control List (ACL) untuk memberi keizinan folder/pencetak."
      },
      {
        q: "Antara berikut, manakah format laluan **Universal Naming Convention (UNC)** yang betul untuk mengakses folder kongsi bernama `DataMakmal` pada pelayan `SVR-JTMK`?",
        options: [
          "http://SVR-JTMK/DataMakmal",
          "\\\\SVR-JTMK\\DataMakmal",
          "C:\\SVR-JTMK\\DataMakmal",
          "//SVR-JTMK:DataMakmal"
        ],
        answer: 1,
        explanation: "Format piawai UNC pada Windows sentiasa bermula dengan dua tanda backslash `\\\\` diikuti nama pelayan (atau IP) dan nama folder kongsi: `\\\\NamaPelayan\\NamaShare`."
      },
      {
        q: "Seorang pengguna diberikan keizinan **Share Permission = Full Control**, tetapi pada tab **NTFS Security** beliau hanya diberikan keizinan **Read**. Apakah keizinan sebenar (Effective Permission) pengguna tersebut apabila mengakses folder itu melalui rangkaian?",
        options: ["Full Control", "Change", "Read sahaja", "Tiada akses langsung"],
        answer: 2,
        explanation: "Apabila Share Permission dan NTFS Permission digabungkan untuk akses rangkaian, keizinan yang paling ketat (Most Restrictive) akan berkuat kuasa — iaitu **Read**."
      },
      {
        q: "Bagaimanakah cara menjadikan sebuah Shared Folder pada Windows Server sebagai **Hidden Share** (tidak dipaparkan apabila pengguna menyemak imbas senarai folder pelayan)?",
        options: [
          "Menukar nama folder kepada huruf besar sepenuhnya",
          "Meletakkan simbol dolar `$` di hujung nama Share (contoh: `Laporan$`)",
          "Meletakkan titik `.` di awal nama Share",
          "Mematikan servis Server di dalam Services.msc"
        ],
        answer: 1,
        explanation: "Di dalam Windows, menambahkan simbol `$` di hujung Share Name (contoh: `\\\\Svr01\\AdminData$`) menyembunyikan folder tersebut daripada paparan pelayaran rangkaian biasa."
      },
      {
        q: "Di manakah lokasi direktori akar lalai (Default Web Root) bagi laman web yang dihoskan menggunakan peranan **Internet Information Services (IIS)** pada Windows Server?",
        options: [
          "/var/www/html",
          "C:\\inetpub\\wwwroot",
          "C:\\Windows\\System32\\iis",
          "C:\\Program Files\\WebServer"
        ],
        answer: 1,
        explanation: "IIS menyimpan fail laman web lalainya di dalam direktori `C:\\inetpub\\wwwroot`."
      }
    ]
  },

  // ========================================================================
  // TOPIK 5.0: RISK MANAGEMENT AND MAINTENANCE OF SERVER
  // ========================================================================
  {
    id: "topik-5",
    code: "TOPIK 5.0",
    shortTitle: "Risk Management & Maintenance",
    title: "5.0 Risk Management and Maintenance of Server",
    clo: "CLO 2 & CLO 3 (A3, PLO11 - Etika & Tanggungjawab)",
    slt: "16 Jam (Prosedur Sandaran/Backup, Pemulihan Bencana & Laporan Pemantauan Sistem)",
    summary: "Melaksanakan prosedur pengurusan risiko bagi melindungi pelayan melalui strategi sandaran data (Full, Differential, Incremental & Imaging Backup), utiliti sandaran Linux & Windows (tar, dump, Windows Server Backup), serta penjanaan laporan kesihatan & pemantauan prestasi sistem (ps, lsof, ntop, parted, kill, Task Manager, Performance/Resource/Reliability Monitor).",
    heroStats: [
      { percent: "5.1", title: "Server Backup & Recovery", desc: "Full/Diff/Incremental, tar, dump & Windows Backup" },
      { percent: "5.2", title: "System Reports & Monitoring", desc: "ps, lsof, ntop, parted, kill & Windows Monitors" }
    ],
    hasInteractiveSim: "backup-strategy-sim",
    notes: [
      {
        code: "5.1.1 - 5.1.3",
        subtopic: "5.1",
        title: "Risk Management Procedures: Data, Hardware & Recovery Frequency",
        subtitle: "Mengenal pasti data kritikal untuk disandarkan, perkakasan storan backup, serta metrik RPO & RTO",
        concept: "Pelayan boleh mengalami kegagalan cakera keras, serangan perisian tebusan (Ransomware), kebakaran, atau kesilapan pentadbir. Prosedur **Risk Management & Backup** memastikan kesinambungan perniagaan (Business Continuity). Amalan terbaik industri ialah **Peraturan Sandaran 3-2-1**: Simpan **3** salinan data, pada **2** jenis media berbeza, dengan **1** salinan berada di luar tapak (Off-site / Cloud).",
        features: [
          {
            icon: "💎",
            title: "5.1.1 Data yang Perlu Disandarkan (What to Backup)",
            desc: "Tidak semua fail sementara perlu disandarkan; fokus kepada data yang tidak boleh diganti jika hilang.",
            bullets: [
              "**Konfigurasi Sistem & Servis**: Direktori `/etc` di Linux, serta **System State & Active Directory (`ntds.dit`, Registry, SYSVOL)** di Windows Server.",
              "**Data Pengguna & Jabatan**: Direktori `/home`, `/srv`, dan folder kongsi (Shared Folders).",
              "**Pangkalan Data & Aplikasi Web**: Fail pangkalan data MySQL/PostgreSQL/SQL Server (`/var/lib/mysql`) dan fail web (`/var/www`, `C:\\inetpub\\wwwroot`).",
              "**Fail Log Keselamatan & Audit**: `/var/log` dan Windows Event Logs untuk siasatan forensik."
            ]
          },
          {
            icon: "💽",
            title: "5.1.2 Perkakasan untuk Proses Backup (Backup Hardware)",
            desc: "Pemilihan media storan bergantung pada kapasiti data, kelajuan pemulihan, dan bajet.",
            bullets: [
              "**External Hard Disk / SSD & RDX Drive**: Mudah alih dan pantas untuk pelayan bersaiz kecil/sederhana.",
              "**NAS (Network Attached Storage) & SAN (Storage Area Network)**: Storan rangkaian berpusat menggunakan tatasusunan cakera **RAID (Redundant Array of Independent Disks)**.",
              "**Magnetic Tape Drive (LTO Ultrium)**: Kos per-Terabyte paling murah dan tahan puluhan tahun untuk arkib jangka panjang (*cold storage*).",
              "**Cloud Backup Storage**: AWS S3, Azure Backup, Google Cloud Storage untuk perlindungan bencana luar tapak (off-site)."
            ]
          },
          {
            icon: "⏱️",
            title: "5.1.3 Kekerapan Sandaran & Pemulihan (RPO & RTO)",
            desc: "Bagaimana menentukan jadual sandaran (harian, mingguan, atau masa nyata).",
            bullets: [
              "**RPO (Recovery Point Objective)**: Berapa banyak tempoh data terkini yang organisasi sanggup hilang? (Contoh: Jika RPO = 1 jam, backup mesti dibuat setiap 1 jam).",
              "**RTO (Recovery Time Objective)**: Berapa cepat pelayan mesti pulih semula selepas lumpuh? (Menentukan sama ada perlu guna Incremental atau Full/Imaging).",
              "**Jadual Tipikal Korporat**: Full Backup setiap malam Ahad + Differential/Incremental setiap malam Isnin–Sabtu."
            ]
          }
        ]
      },
      {
        code: "5.1.4",
        subtopic: "5.1",
        title: "Display the Various Types of Backups",
        subtitle: "Perbandingan mendalam: Full Backup, Differential Backup, Incremental Backup & Imaging Backup",
        concept: "Memilih jenis sandaran yang betul mengimbangkan antara **masa membuat backup**, **saiz ruang storan**, dan **kelajuan memulihkan data (restore)** apabila berlaku kecemasan.",
        features: [
          {
            icon: "📦",
            title: "a. Full Backup & d. Imaging Backup",
            desc: "Menyalin keseluruhan data atau keseluruhan imej cakera sistem.",
            bullets: [
              "**Full Backup (Sandaran Penuh)**: Menyalin **SEMUA fail yang dipilih** tanpa mengira sama ada fail itu berubah atau tidak, dan mengosongkan (clear) *Archive Bit*. Masa backup paling perlahan & saiz paling besar, tetapi **proses Restore paling pantas (hanya perlukan 1 set backup)**.",
              "**Imaging / Bare-Metal Backup**: Menyalin keseluruhan cakera keras termasuk OS, sektor boot, aplikasi, dan data sebagai satu fail imej (contoh: Clonezilla, Windows System Image). Boleh memulihkan pelayan ke perkakasan baharu dengan pantas."
            ]
          },
          {
            icon: "📈",
            title: "b. Differential Backup vs c. Incremental Backup",
            desc: "Menjimatkan masa dan storan pada hari bekerja selepas Full Backup dilakukan.",
            bullets: [
              "**Differential Backup**: Menyalin semua fail yang berubah **SEJAK FULL BACKUP TERAKHIR**. Ia **TIDAK** mengosongkan *Archive Bit* (saiznya makin membesar setiap hari). Untuk **Restore**, anda hanya perlukan **2 set**: (1) *Full Backup terakhir* + (2) *Differential Backup terkini*.",
              "**Incremental Backup**: Menyalin hanya fail yang berubah **SEJAK BACKUP TERAKHIR (sama ada Full atau Incremental sebelumnya)** dan mengosongkan *Archive Bit*. Masa backup **paling pantas & saiz paling kecil**, tetapi untuk **Restore**, anda perlukan *Full Backup terakhir* + **SEMUA set Incremental** mengikut urutan hari!"
            ]
          }
        ],
        tableTitle: "Perbandingan 4 Jenis Sandaran Pelayan (Soalan Kegemaran Peperiksaan & Case Study!)",
        tableHeaders: ["Ciri / Kriteria", "Full Backup", "Differential Backup", "Incremental Backup", "Imaging Backup"],
        tableRows: [
          ["Apa yang Disalin?", "Semua fail terpilih sepenuhnya", "Perubahan sejak **Full Backup** terakhir", "Perubahan sejak **sebarang backup** terakhir", "Keseluruhan OS, partisi boot & data"],
          ["Kelajuan Semasa Backup", "Perlahan", "Sederhana (makin perlahan hujung minggu)", "**Paling Pantas**", "Perlahan"],
          ["Ruang Storan Diperlukan", "Paling Besar", "Sederhana", "**Paling Kecil / Jimat**", "Besar (mengikut saiz cakera)"],
          ["Kelajuan Semasa Restore", "**Paling Pantas (1 Set)**", "Pantas (**2 Set**: Full + Diff terakhir)", "Perlahan (Full + **Semua** Incremental)", "Paling Pantas untuk pulih seluruh OS"],
          ["Status Archive Bit", "Dikosongkan (Reset)", "Kekal (Tidak di-reset)", "Dikosongkan (Reset)", "Tidak berkaitan (Peringkat blok)"]
        ]
      },
      {
        code: "5.1.5",
        subtopic: "5.1",
        title: "Construct Simple Backup and Restore Files in Linux and Windows Server",
        subtitle: "Menggunakan utiliti tar, dump/restore di Linux serta Windows Server Backup (wbadmin)",
        concept: "Pentadbir pelayan perlu mahir mencipta fail arkib termampat dan memulihkannya semula menggunakan arahan baris perintah dan alat grafik.",
        features: [
          {
            icon: "🗜️",
            title: "a. Utiliti `tar` (Tape Archive) & b. `dump` di Linux",
            desc: "Alat standard Linux untuk mengarkibkan dan memampatkan direktori serta sistem fail.",
            bullets: [
              "**`tar` (Tape Archive)**: Menggabungkan banyak fail/folder menjadi satu fail `.tar`, dan dimampatkan dengan `gzip` (`.tar.gz` / `.tgz`) atau `bzip2` (`.tar.bz2`).",
              "Arahan **Backup** dengan `tar`: **`sudo tar -czvf backup_etc.tar.gz /etc`** (`-c` = create, `-z` = gzip, `-v` = verbose, `-f` = filename).",
              "Arahan **Semak Isi** `tar`: `tar -tzvf backup_etc.tar.gz` (`-t` = list).",
              "Arahan **Restore (Ekstrak)** `tar`: **`sudo tar -xzvf backup_etc.tar.gz -C /tmp/pulih`** (`-x` = extract, `-C` = direktori sasaran).",
              "**`dump` & `restore`**: Utiliti sandaran peringkat sistem fail (ext2/ext3/ext4) yang menyokong aras Incremental `0` hingga `9` (`0` = Full backup, `1-9` = Incremental). Contoh: `sudo dump -0uf /backup/home.dump /home` dan dipulihkan dengan `sudo restore -rf /backup/home.dump`."
            ]
          },
          {
            icon: "🛡️",
            title: "c. Windows Server Backup (`wbadmin.msc`)",
            desc: "Ciri (Feature) rasmi terbina dalam Windows Server untuk sandaran berjadual atau sekali jalan (Backup Once).",
            bullets: [
              "Dipasang melalui: `Server Manager` -> `Add Roles and Features` -> `Features` -> **Windows Server Backup** (atau `Install-WindowsFeature Windows-Server-Backup`).",
              "Menyokong *Full Server Backup*, *System State Backup* (penting untuk Active Directory!), *Bare Metal Recovery*, dan *Volume/Folder tertentu*.",
              "Boleh diurus melalui GUI (`wbadmin.msc`) atau CLI (`wbadmin start backup`)."
            ]
          }
        ]
      },
      {
        code: "5.2.1 - 5.2.2",
        subtopic: "5.2",
        title: "Perform System Report & Terminate Process in Linux Server",
        subtitle: "Menjana laporan sistem menggunakan ps, lsof, ntop/top, parted serta menamatkan proses dengan kill",
        concept: "Apabila pelayan menjadi perlahan, ruang cakera penuh, atau terdapat proses yang tergantung (hung/zombie process), pentadbir menggunakan utiliti pemantauan Linux untuk mengenal pasti PID (Process ID) dan memulihkan keadaan.",
        features: [
          {
            icon: "📊",
            title: "5.2.1 Empat Utiliti Laporan Sistem Linux (`ps`, `lsof`, `ntop`, `parted`)",
            desc: "Fungsi khusus setiap arahan mengikut silibus DFK40063.",
            bullets: [
              "**a. `ps` (Process Status)**: Memaparkan tangkapan (snapshot) proses yang sedang berjalan. Arahan popular: **`ps aux`** atau **`ps -ef`** (memaparkan pemilik, **PID**, %CPU, %MEM, dan nama arahan).",
              "**b. `lsof` (List Open Files)**: Kerana di dalam Linux 'semua perkara ialah fail' (termasuk soket rangkaian & peranti), `lsof` memaparkan fail dan port rangkaian yang sedang dibuka oleh proses! Contoh: `sudo lsof -i :22` (semak proses yang guna port 22) atau `lsof -u ali`.",
              "**c. `ntop` / `ntopng` (Network Top) & `top`/`htop`**: `top`/`htop` memantau CPU & RAM secara masa nyata, manakala **`ntop` / `ntopng`** memantau penggunaan trafik rangkaian, lebar jalur (bandwidth), dan protokol secara masa nyata melalui antara muka web/terminal.",
              "**d. `parted` (Disk Partitioning & Reporting Tool)**: Utiliti untuk memaparkan laporan jadual partisi cakera keras (MBR/GPT) dan saiz storan: **`sudo parted -l`** (menyokong cakera besar melebihi 2TB dengan GPT)."
            ]
          },
          {
            icon: "🛑",
            title: "5.2.2 Menamatkan Proses Menggunakan Arahan `kill`",
            desc: "Menghantar isyarat (signal) kepada proses berdasarkan nombor PID yang ditemui melalui `ps aux` atau `top`.",
            bullets: [
              "**`kill <PID>` atau `kill -15 <PID>` (`SIGTERM`)**: Isyarat penamatan sopan (lalai) — meminta proses menyimpan data dan menutup dirinya dengan kemas.",
              "**`kill -9 <PID>` (`SIGKILL`)**: Isyarat bunuh paksa serta-merta oleh Kernel — digunakan apabila proses langsung tidak memberi respons (frozen).",
              "**`kill -1 <PID>` (`SIGHUP`)**: Meminta servis memuat semula (reload) fail konfigurasinya tanpa mematikan servis.",
              "**`killall <nama_proses>` / `pkill <nama>`**: Menamatkan proses berdasarkan nama (contoh: `sudo killall apache2`)."
            ]
          }
        ],
        tableTitle: "Ringkasan Arahan Pemantauan & Penamatan Proses Linux",
        tableHeaders: ["Arahan", "Nama Penuh", "Kegunaan Utama dalam Penyelenggaraan Pelayan"],
        tableRows: [
          ["`ps aux` / `ps -ef`", "Process Status", "Melihat senarai semua proses aktif berserta PID, penggunaan CPU dan RAM"],
          ["`lsof -i`", "List Open Files", "Mengenal pasti fail atau sambungan port rangkaian yang sedang dibuka oleh setiap proses"],
          ["`ntop` / `ntopng`", "Network Top", "Memantau trafik rangkaian, penggunaan jalur lebar mengikut IP dan protokol"],
          ["`sudo parted -l`", "Partition Editor", "Memaparkan laporan struktur partisi cakera keras, saiz sektor dan jenis jadual (GPT/MSDOS)"],
          ["`kill -15 <PID>`", "Terminate Process (SIGTERM)", "Menutup proses secara teratur dan selamat (nilai isyarat lalai 15)"],
          ["`kill -9 <PID>`", "Force Kill Process (SIGKILL)", "Mematikan proses yang degil/tergantung secara paksa serta-merta"]
        ]
      },
      {
        code: "5.2.3",
        subtopic: "5.2",
        title: "Display System Report in Windows Server Using Built-in Tools",
        subtitle: "Task Manager, Performance Monitor, Resource Monitor & Reliability Monitor",
        concept: "Windows Server menyediakan empat alat diagnostik grafik terbina dalam yang saling melengkapi untuk memantau kesihatan perkakasan, mengesan kesesakan prestasi (bottleneck), dan menyemak sejarah kestabilan sistem.",
        features: [
          {
            icon: "📈",
            title: "a. Task Manager & c. Resource Monitor (`resmon`)",
            desc: "Pemantauan masa nyata (real-time) untuk proses, servis, dan penggunaan perkakasan.",
            bullets: [
              "**a. Task Manager (`taskmgr.exe` / `Ctrl+Shift+Esc`)**: Paparan pantas aplikasi/proses yang sedang berjalan, peratusan penggunaan CPU, Memory, Disk, Network, tab *Users* dan tab *Services*. Boleh menamatkan proses (*End Task*).",
              "**c. Resource Monitor (`resmon.exe`)**: Paparan masa nyata yang **jauh lebih terperinci** berbanding Task Manager bagi 4 komponen: **CPU, Memory, Disk, dan Network** (termasuk melihat proses mana yang sedang mengunci sesuatu fail atau port TCP)."
            ]
          },
          {
            icon: "🩺",
            title: "b. Performance Monitor (`perfmon`) & d. Reliability Monitor",
            desc: "Analisis prestasi mendalam berasaskan pembilang (counters) dan rekod sejarah kestabilan sistem.",
            bullets: [
              "**b. Performance Monitor (`perfmon.exe`)**: Menggunakan ratusan **Performance Counters** (contoh: *Processor % Processor Time*, *Memory Available MBytes*) dan **Data Collector Sets** untuk merekodkan log prestasi jangka panjang serta menetapkan amaran (Alerts).",
              "**d. Reliability Monitor (`perfmon /rel`)**: Memaparkan **Indeks Kestabilan Sistem (skor 1 hingga 10)** di atas garis masa mengikut tarikh, merekodkan sebarang kegagalan aplikasi (crashes), kegagalan Windows, dan pemasangan kemas kini."
            ]
          }
        ],
        tableTitle: "Perbandingan 4 Alat Laporan Sistem Windows Server (Subtopik 5.2.3)",
        tableHeaders: ["Alat Terbina Dalam", "Arahan Pintas (Run)", "Fungsi & Kelebihan Utama"],
        tableRows: [
          ["a. Task Manager", "`taskmgr`", "Semakan pantas penggunaan semasa CPU/RAM/Disk/NIC & tamatkan proses (`End Task`)"],
          ["b. Performance Monitor", "`perfmon`", "Merakam graf *Performance Counters* & *Data Collector Sets* untuk analisis trend jangka panjang"],
          ["c. Resource Monitor", "`resmon`", "Analisis masa nyata mendalam mengikut proses bagi CPU, RAM, I/O Cakera & Port Rangkaian"],
          ["d. Reliability Monitor", "`perfmon /rel`", "Melihat skor kestabilan (1–10) dan sejarah ralat/kemalangan perisian mengikut kalendar hari"]
        ]
      }
    ],
    labs: [
      {
        id: "lab-5-1",
        title: "Amali 5A: Prosedur Backup & Restore Fail Konfigurasi Menggunakan `tar` dan `dump`",
        subtitle: "Subtopik 5.1.5 — Mencipta arkib sandaran termampat, menyemak integriti dan memulihkan fail yang terpadam",
        steps: [
          {
            title: "Bina Direktori Sandaran & Lakukan Full Backup Direktori `/etc` dengan `tar`",
            desc: "Cipta folder `/var/backups/pelayan` dan jalankan arahan `tar -czvf` untuk memampatkan keseluruhan konfigurasi `/etc` berserta tarikh.",
            cmd: "student@ubuntu-svr:~$ sudo mkdir -p /var/backups/pelayan\nstudent@ubuntu-svr:~$ sudo tar -czvf /var/backups/pelayan/etc_full_backup.tar.gz /etc\ntar: Removing leading `/' from member names\n/etc/\n/etc/passwd\n/etc/shadow\n/etc/hosts\n...\nstudent@ubuntu-svr:~$ ls -lh /var/backups/pelayan/\n-rw-r--r-- 1 root root 1.8M Oct 28 11:20 etc_full_backup.tar.gz",
            why: "Gabungan pilihan `-czvf` mencipta arkib (`c`), memampatkannya dengan algoritma gzip (`z`) supaya jimat ruang storan, memaparkan senarai fail (`v`), dan menyimpan ke nama fail sasaran (`f`)."
          },
          {
            title: "Simulasi Pemulihan (Restore) Fail daripada Arkib `tar.gz`",
            desc: "Ekstrak semula kandungan arkib `etc_full_backup.tar.gz` ke dalam direktori pemulihan `/tmp/uji_restore` menggunakan pilihan `-xzvf` dan `-C`.",
            cmd: "student@ubuntu-svr:~$ mkdir -p /tmp/uji_restore\nstudent@ubuntu-svr:~$ sudo tar -xzvf /var/backups/pelayan/etc_full_backup.tar.gz -C /tmp/uji_restore\nstudent@ubuntu-svr:~$ ls -l /tmp/uji_restore/etc/hosts\n-rw-r--r-- 1 root root 221 Oct 28 10:00 /tmp/uji_restore/etc/hosts",
            why: "Mengekstrak ke folder sementara (`/tmp/uji_restore`) terlebih dahulu membolehkan pentadbir menyalin hanya fail yang rosak tanpa menulis ganti keseluruhan `/etc`."
          }
        ]
      },
      {
        id: "lab-5-2",
        title: "Amali 5B: Penjanaan Laporan Sistem (`ps`, `lsof`, `parted`) & Penamatan Proses (`kill`)",
        subtitle: "Subtopik 5.2.1 & 5.2.2 — Mengesan proses yang membebankan pelayan dan menamatkannya",
        steps: [
          {
            title: "Jana Laporan Proses (`ps aux`), Fail/Port Terbuka (`lsof`) & Partisi Cakera (`parted`)",
            desc: "Jalankan arahan diagnostik untuk melihat proses aktif, port rangkaian yang sedang mendengar, dan struktur cakera keras pelayan.",
            cmd: "student@ubuntu-svr:~$ ps aux | head -n 6\nUSER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.2 167920 11200 ?        Ss   08:00   0:02 /sbin/init\nroot       612  0.0  0.1  15420  6800 ?        Ss   08:00   0:00 sshd: /usr/sbin/sshd\n\nstudent@ubuntu-svr:~$ sudo lsof -i :22\nCOMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd    612 root    3u  IPv4  18492      0t0  TCP *:ssh (LISTEN)\n\nstudent@ubuntu-svr:~$ sudo parted -l\nModel: ATA VBOX HARDDISK (scsi)\nDisk /dev/sda: 25.0GB\nPartition Table: gpt",
            why: "Ketiga-tiga arahan ini memberikan gambaran menyeluruh tentang kesihatan proses, keselamatan port, dan kapasiti storan pelayan."
          },
          {
            title: "Uji Proses Latar Belakang & Tamatkan Menggunakan `kill`",
            desc: "Mulakan satu proses ujian `sleep 300 &` di latar belakang, cari PID-nya dengan `ps`, dan tamatkan proses tersebut menggunakan `kill -9`.",
            cmd: "student@ubuntu-svr:~$ sleep 300 &\n[1] 4821\nstudent@ubuntu-svr:~$ ps aux | grep sleep\nstudent   4821  0.0  0.0   8076   580 pts/0    S    11:30   0:00 sleep 300\nstudent@ubuntu-svr:~$ kill -9 4821\n[1]+  Killed                  sleep 300",
            why: "Isyarat `-9` (`SIGKILL`) memastikan proses yang tergantung dengan PID `4821` dihentikan serta-merta oleh kernel."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Apakah jenis sandaran (backup) yang menyalin hanya fail yang berubah sejak sandaran terakhir (sama ada Full atau Incremental), mengambil masa paling singkat untuk dibuat, dan menggunakan ruang storan paling kecil?",
        options: ["Full Backup", "Differential Backup", "Incremental Backup", "Bare-Metal Imaging Backup"],
        answer: 2,
        explanation: "Incremental Backup hanya menyalin perubahan sejak sebarang backup terakhir dan mengosongkan archive bit, menjadikannya paling pantas dan paling jimat ruang storan."
      },
      {
        q: "Sebuah syarikat melakukan **Full Backup pada hari Ahad**, dan **Differential Backup pada setiap malam Isnin hingga Jumaat**. Jika pelayan rosak pada pagi Khamis, berapakah set sandaran yang diperlukan untuk memulihkan (restore) semua data?",
        options: [
          "1 set sahaja (Differential hari Rabu)",
          "2 set sahaja (Full Backup hari Ahad + Differential Backup hari Rabu)",
          "4 set (Full Backup Ahad + Differential Isnin, Selasa, dan Rabu)",
          "Semua 7 set sepanjang minggu"
        ],
        answer: 1,
        explanation: "Differential Backup merangkumi semua perubahan kumulatif sejak Full Backup terakhir. Maka anda hanya memerlukan 2 set: Full Backup Ahad + Differential terakhir (Rabu)."
      },
      {
        q: "Antara berikut, arahan manakah yang betul untuk mencipta fail arkib termampat gzip bernama `web_backup.tar.gz` daripada direktori `/var/www/html`?",
        options: [
          "tar -xzvf web_backup.tar.gz /var/www/html",
          "tar -czvf web_backup.tar.gz /var/www/html",
          "dump -r web_backup.tar.gz /var/www/html",
          "gzip -d web_backup.tar.gz /var/www/html"
        ],
        answer: 1,
        explanation: "Pilihan `-c` (create), `-z` (gzip compression), `-v` (verbose), dan `-f` (filename) digunakan untuk mencipta arkib `.tar.gz`, manakala `-x` adalah untuk mengekstrak."
      },
      {
        q: "Arahan Linux manakah yang digunakan untuk memaparkan senarai semua fail dan soket rangkaian (ports) yang sedang dibuka oleh proses-proses aktif di dalam pelayan?",
        options: ["parted -l", "lsof", "mkdir -p", "umask"],
        answer: 1,
        explanation: "`lsof` bermaksud *List Open Files*, digunakan untuk menyemak fail, peranti dan port rangkaian yang sedang dipegang oleh proses."
      },
      {
        q: "Apakah fungsi utiliti `parted` di dalam penyelenggaraan pelayan Linux?",
        options: [
          "Memantau trafik rangkaian mengikut protokol",
          "Memaparkan laporan jadual partisi cakera keras (GPT/MBR) dan menguruskan partisi storan",
          "Menukar kata laluan pengguna Active Directory",
          "Menamatkan proses zombie di dalam memori"
        ],
        answer: 1,
        explanation: "`parted` (Partition Editor) digunakan untuk melihat laporan partisi cakera (`sudo parted -l`) serta mencipta atau mengubah saiz partisi cakera keras."
      },
      {
        q: "Seorang pentadbir mendapati satu proses dengan PID `3045` telah beku (frozen) dan tidak bertindak balas terhadap arahan penutupan biasa (`kill 3045`). Arahan manakah yang memaksa Kernel membunuh proses tersebut serta-merta?",
        options: ["kill -1 3045", "kill -9 3045", "ps -ef 3045", "lsof -k 3045"],
        answer: 1,
        explanation: "`kill -9 <PID>` menghantar isyarat `SIGKILL` terus daripada Kernel untuk mematikan proses serta-merta tanpa boleh diabaikan oleh proses tersebut."
      },
      {
        q: "Di dalam Windows Server, alat terbina dalam manakah yang memaparkan **skor Indeks Kestabilan Sistem (1 hingga 10)** berserta garis masa sejarah kegagalan aplikasi dan kemas kini Windows?",
        options: ["Task Manager", "Reliability Monitor", "Disk Defragmenter", "Active Directory Sites and Services"],
        answer: 1,
        explanation: "Reliability Monitor (`perfmon /rel`) menjejaki sejarah kestabilan sistem dari hari ke hari dan memberikan skor antara 1 (paling tidak stabil) hingga 10 (paling stabil)."
      },
      {
        q: "Jika seorang pentadbir Windows Server ingin merakam data prestasi jangka panjang menggunakan *Performance Counters* dan *Data Collector Sets* serta menetapkan amaran automatik apabila CPU melebihi 90%, alat manakah yang patut digunakan?",
        options: ["Performance Monitor (perfmon)", "Notepad", "Windows Firewall", "Device Manager"],
        answer: 0,
        explanation: "Performance Monitor (`perfmon.exe`) menyediakan *Performance Counters* dan *Data Collector Sets* untuk pemantauan berjadual, log prestasi dan amaran (Alerts)."
      }
    ]
  }
);
