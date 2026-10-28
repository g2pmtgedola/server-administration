/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION
   DATA TOPIK 1.0 & TOPIK 2.0 (LENGKAP MENGIKUT SILIBUS JPPKK)
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push(
  // ========================================================================
  // TOPIK 1.0: SERVER DISTRIBUTION IN A NETWORK
  // ========================================================================
  {
    id: "topik-1",
    code: "TOPIK 1.0",
    shortTitle: "Server Distribution in a Network",
    title: "1.0 Server Distribution in a Network",
    clo: "CLO 1 (P3, PLO3)",
    slt: "5 Jam (4 Jam Amali F2F + 1 Jam Kendiri)",
    summary: "Memahami infrastruktur bilik pelayan (Server Room & Rack), teknologi Virtualization & Cloud Computing, pemasangan pelayan Linux & Windows dalam persekitaran maya, serta konfigurasi rangkaian dan capaian jauh (SSH, RDP & File Transfer).",
    heroStats: [
      { percent: "1.1", title: "Virtual Server Setup", desc: "Server Room, Rack, Virtualization & Cloud" },
      { percent: "1.2", title: "Networking & Remote", desc: "NIC, SSH, Remote Desktop (RDP), FTP/SCP" }
    ],
    notes: [
      {
        code: "1.1.1",
        subtopic: "1.1",
        title: "Display Server Component: Server Room & Server Rack",
        subtitle: "Komponen fizikal bilik pelayan dan struktur rak pelayan berpiawai industri",
        concept: "Bilik Pelayan (Server Room / Data Center) ialah ruang khas berkeselamatan tinggi yang menempatkan perkakasan komputer berprestasi tinggi, peralatan rangkaian, dan storan data organisasi. Analogi mudah: Jika pelayan ialah 'otak' syarikat, maka Server Room ialah 'tempurung kepala dan bilik ICU' yang memastikan suhu, bekalan kuasa, dan keselamatan sentiasa terkawal 24/7.",
        features: [
          {
            icon: "🏢",
            title: "a. Server Room (Bilik Pelayan)",
            desc: "Direka bentuk dengan kawalan persekitaran ketat bagi mengelakkan masa henti (downtime) dan kerosakan perkakasan.",
            bullets: [
              "Sistem HVAC / Precision Air Conditioning: Mengekalkan suhu sekitar 18°C–22°C dan kelembapan 40%–60%.",
              "Bekalan Kuasa Tanpa Gangguan (UPS) & Generator: Menjamin pelayan terus hidup semasa gangguan elektrik.",
              "Pemadam Api Gas Bersih (FM-200 / Novec 1230): Memadam kebakaran tanpa merosakkan litar elektronik (bukan air).",
              "Kawalan Akses Fizikal: Biometrik, kad akses RFID, CCTV 24 jam, dan lantai tinggi (Raised Floor) untuk pengurusan kabel & aliran udara sejuk."
            ]
          },
          {
            icon: "🗄️",
            title: "b. Server Rack (Rak Pelayan)",
            desc: "Kerangka logam piawai (biasanya lebar 19-inci) untuk menyusun pelayan, suis (switch), router, dan UPS secara menegak.",
            bullets: [
              "Unit Ketinggian 'U' (Rack Unit): 1U bersamaan 1.75 inci (44.45 mm). Rak standard biasanya bersaiz 42U atau 48U.",
              "Jenis Pelayan Rak: Rack-mount Server (1U, 2U, 4U), Blade Server (kompak & kongsi kuasa), dan Tower Server.",
              "Komponen Dalam Rak: Patch Panel, Network Switch, KVM Switch (Keyboard, Video, Mouse), PDU (Power Distribution Unit), dan Cable Management Arm."
            ]
          }
        ],
        tableTitle: "Perbandingan Saiz & Kegunaan Unit Rak (Rack Unit - U)",
        tableHeaders: ["Saiz Unit", "Tinggi (Inci / mm)", "Kegunaan Tipikal Dalam Server Rack"],
        tableRows: [
          ["1U", "1.75 in (44.45 mm)", "Network Switch, Patch Panel, Firewall, atau Web Server padat"],
          ["2U", "3.50 in (88.90 mm)", "Pelayan Aplikasi / Pangkalan Data dengan ruang cakera keras (RAID) sederhana"],
          ["4U", "7.00 in (177.8 mm)", "Storage Server berkapasiti besar / Pelayan AI & Virtualization Host"],
          ["42U", "73.5 in (~1.87 m)", "Ketinggian penuh kabinet Server Rack standard di pusat data"]
        ]
      },
      {
        code: "1.1.2",
        subtopic: "1.1",
        title: "Trace the Server Technology: Virtualization & Cloud Computing",
        subtitle: "Evolusi daripada pelayan fizikal tunggal kepada mesin maya (VM) dan awan (Cloud)",
        concept: "Dahulu, 1 pelayan fizikal hanya menjalankan 1 Sistem Pengoperasian (OS) — menyebabkan pembaziran CPU dan RAM. Teknologi Virtualization membolehkan 1 pelayan fizikal dipecahkan kepada banyak Mesin Maya (Virtual Machines / VM) menggunakan perisian Hypervisor. Cloud Computing pula membawa konsep ini ke internet supaya sumber pelayan boleh disewa mengikut keperluan (on-demand).",
        features: [
          {
            icon: "🖥️",
            title: "a. Virtualization (Pemayaan)",
            desc: "Menggunakan lapisan perisian dipanggil Hypervisor untuk mengagihkan CPU, RAM, Storan dan NIC fizikal kepada beberapa VM berasingan.",
            bullets: [
              "Hypervisor Type 1 (Bare-Metal): Dipasang terus atas perkakasan pelayan tanpa OS hos. Contoh: VMware ESXi, Microsoft Hyper-V, Proxmox VE, KVM.",
              "Hypervisor Type 2 (Hosted): Dipasang di atas OS sedia ada (sesuai untuk makmal pembelajaran). Contoh: Oracle VirtualBox, VMware Workstation.",
              "Kelebihan: Jimat kos perkakasan & elektrik, fungsi Snapshot (rollback jika silap konfigurasi), dan pengasingan keselamatan (isolation)."
            ]
          },
          {
            icon: "☁️",
            title: "b. Cloud Computing (Pengkomputeran Awan)",
            desc: "Penyampaian sumber pengkomputeran (pelayan, storan, pangkalan data, rangkaian) melalui internet mengikut model bayar-ikut-guna (Pay-as-you-go).",
            bullets: [
              "IaaS (Infrastructure as a Service): Sewa VM, storan & rangkaian (Anda urus OS & aplikasi). Contoh: AWS EC2, Azure VM, Google Compute Engine.",
              "PaaS (Platform as a Service): Penyedia urus OS & runtime, anda hanya muat naik kod aplikasi. Contoh: Google App Engine, Heroku.",
              "SaaS (Software as a Service): Perisian siap guna melalui pelayar. Contoh: Google Workspace, Microsoft 365.",
              "Model Deployment: Public Cloud, Private Cloud, Hybrid Cloud, dan Community Cloud."
            ]
          }
        ],
        tableTitle: "Perbezaan Hypervisor Type 1 vs Hypervisor Type 2",
        tableHeaders: ["Ciri Perbandingan", "Hypervisor Type 1 (Bare-Metal)", "Hypervisor Type 2 (Hosted)"],
        tableRows: [
          ["Kedudukan Pemasangan", "Terus di atas perkakasan fizikal (Hardware)", "Di atas Host OS (Windows 11 / macOS / Ubuntu Desktop)"],
          ["Prestasi & Overhead", "Sangat tinggi, latensi rendah (Tiada beban Host OS)", "Sederhana (Berkongsi sumber dengan Host OS)"],
          ["Contoh Perisian", "VMware ESXi, Proxmox VE, Microsoft Hyper-V Server", "Oracle VM VirtualBox, VMware Workstation Player/Pro"],
          ["Kegunaan Utama", "Pusat Data & Persekitaran Produksi Korporat", "Makmal Pelajar, Ujian Perisian & Pembangunan"]
        ]
      },
      {
        code: "1.1.3",
        subtopic: "1.1",
        title: "Display Linux & Windows Server in Virtual Environment",
        subtitle: "Keperluan spesifikasi dan mod rangkaian semasa membina VM Linux & Windows Server",
        concept: "Dalam amali DFK40063, kita membina dua pelayan utama di dalam Hypervisor (VirtualBox / VMware): (1) Linux Server (contoh: Ubuntu Server / Debian / Rocky Linux) dan (2) Windows Server (contoh: Windows Server 2019 / 2022). Memahami peruntukan sumber dan mod rangkaian maya adalah kunci supaya kedua-dua pelayan boleh berkomunikasi.",
        features: [
          {
            icon: "🐧",
            title: "Linux Server dalam Persekitaran Maya",
            desc: "Ringan, stabil, sumber terbuka (open-source), dan boleh beroperasi sepenuhnya menggunakan CLI tanpa GUI.",
            bullets: [
              "Spesifikasi Minimum VM (CLI): 1 vCPU, 1 GB – 2 GB RAM, 20 GB Virtual Disk (VDI/VMDK).",
              "Spesifikasi Minimum VM (Dengan Desktop GUI): 2 vCPU, 2 GB – 4 GB RAM, 25 GB Disk.",
              "Kelebihan: Tiada kos lesen, sangat cekap memori, standard industri untuk pelayan Web (Apache/Nginx) & kontena."
            ]
          },
          {
            icon: "🪟",
            title: "Windows Server dalam Persekitaran Maya",
            desc: "Sistem pengoperasian pelayan komersial daripada Microsoft dengan integrasi Active Directory & GUI Server Manager.",
            bullets: [
              "Pilihan Pemasangan: Server Core (CLI sahaja, ringan) atau Server with Desktop Experience (GUI penuh).",
              "Spesifikasi Minimum VM (Desktop Experience): 2 vCPU, 4 GB RAM (Disyorkan), 40 GB – 60 GB Virtual Disk.",
              "Mod Rangkaian VM: NAT (Akses internet sahaja), Bridged Adapter (Satu LAN dengan PC sebenar), Host-Only / Internal Network (Sesuai untuk komunikasi antara VM Linux & Windows)."
            ]
          }
        ],
        tableTitle: "Mod Rangkaian Virtual Machine (VirtualBox / VMware)",
        tableHeaders: ["Mod Rangkaian", "Komunikasi VM ↔ Internet", "Komunikasi Host ↔ VM", "Komunikasi VM ↔ VM", "Kegunaan Dalam Makmal"],
        tableRows: [
          ["NAT", "Ya", "Tidak (Kecuali Port Forwarding)", "Tidak", "Muat turun pakej kemas kini (`apt update`)"],
          ["Bridged Adapter", "Ya", "Ya", "Ya (Dalam LAN sama)", "Menjadikan VM seperti PC sebenar dalam rangkaian makmal"],
          ["Host-Only Adapter", "Tidak", "Ya", "Ya", "Ujian SSH & Remote Desktop antara PC pelajar dengan VM"],
          ["Internal Network", "Tidak", "Tidak", "Ya", "Simulasi rangkaian tertutup AD & DHCP antara VM Server & Client"]
        ]
      },
      {
        code: "1.2.1",
        subtopic: "1.2",
        title: "Trace Network Interfaces on Both Linux and Windows Server",
        subtitle: "Mengenal pasti antara muka rangkaian (NIC), alamat IP, Subnet Mask, Gateway & DNS",
        concept: "Setiap pelayan memerlukan sekurang-kurangnya satu Network Interface Card (NIC) dengan alamat IP statik (Static IP) supaya komputer klien sentiasa tahu ke mana hendak menghantar permintaan. Pentadbir pelayan wajib mahir menyemak status NIC, alamat MAC, IPv4, dan menguji sambungan rangkaian.",
        features: [
          {
            icon: "🖧",
            title: "Antara Muka Rangkaian di Linux Server",
            desc: "Nama antara muka moden menggunakan Predictable Network Interface Names seperti `enp0s3`, `ens33`, atau `eth0`, manakala `lo` ialah Loopback (`127.0.0.1`).",
            bullets: [
              "Semak IP & Status NIC: `ip addr show` atau `ip a` (menggantikan arahan lama `ifconfig`).",
              "Semak Jadual Routing / Gateway: `ip route show` atau `ip r`.",
              "Fail Konfigurasi IP Statik: `/etc/netplan/*.yaml` (Ubuntu) atau `/etc/network/interfaces` (Debian) atau `nmcli` (RHEL/Rocky)."
            ]
          },
          {
            icon: "🌐",
            title: "Antara Muka Rangkaian di Windows Server",
            desc: "Diuruskan melalui Network Connections (`ncpa.cpl`), Server Manager, atau PowerShell / Command Prompt.",
            bullets: [
              "Semak IP Lengkap (CLI): `ipconfig /all` (memaparkan IPv4, Subnet Mask, Default Gateway, MAC Address / Physical Address, dan DNS Server).",
              "Uji Sambungan & Laluan: `ping <IP>`, `tracert <IP>` (Windows) / `traceroute <IP>` (Linux).",
              "Semak Port Aktif: `netstat -tulnp` atau `ss -tulnp` (Linux) / `netstat -ano` (Windows)."
            ]
          }
        ],
        tableTitle: "Perbandingan Arahan Rangkaian Linux vs Windows Server",
        tableHeaders: ["Fungsi / Tujuan", "Arahan di Linux Server", "Arahan di Windows Server"],
        tableRows: [
          ["Papar Alamat IP & MAC Address", "`ip addr` / `ip a` / `ifconfig`", "`ipconfig` / `ipconfig /all`"],
          ["Uji Ketersambungan (ICMP Echo)", "`ping -c 4 192.168.1.10`", "`ping 192.168.1.10`"],
          ["Jejak Laluan Paket (Routing Hop)", "`traceroute` / `tracepath`", "`tracert`"],
          ["Semak Jadual Penghalaan (Gateway)", "`ip route` / `route -n`", "`route print`"],
          ["Uji Resolusi Nama Domain (DNS)", "`nslookup` / `dig`", "`nslookup`"]
        ]
      },
      {
        code: "1.2.2",
        subtopic: "1.2",
        title: "Display Remote Access to Servers: SSH & Remote Desktop",
        subtitle: "Mengurus pelayan dari jauh tanpa perlu berada di dalam bilik pelayan fizikal",
        concept: "Dalam dunia sebenar, pelayan disimpan di dalam Server Room yang sejuk dan berkunci. Pentadbir sistem mengakses pelayan dari meja kerja mereka menggunakan protokol capaian jauh (Remote Access) yang disulitkan (encrypted).",
        features: [
          {
            icon: "🔐",
            title: "a. Secure Shell (SSH) - Port TCP 22",
            desc: "Protokol kriptografi utama untuk mengakses CLI pelayan Linux (dan kini disokong pada Windows Server) secara selamat.",
            bullets: [
              "Menggantikan protokol lama `Telnet` (Port 23) yang menghantar kata laluan dalam bentuk teks biasa (plain text).",
              "Servis Daemon di Linux: `openssh-server` (`sshd`).",
              "Arahan Sambungan: `ssh username@ip_address` (contoh: `ssh admin@192.168.56.101`).",
              "Aplikasi Klien Popular: PuTTY, MobaXterm, Windows Terminal / OpenSSH Client."
            ]
          },
          {
            icon: "🖥️",
            title: "b. Remote Desktop Protocol (RDP) - Port TCP 3389",
            desc: "Protokol ciptaan Microsoft yang membolehkan pentadbir mengawal paparan grafik (GUI) Windows Server dari jauh.",
            bullets: [
              "Menggunakan Port lalai **TCP/UDP 3389**.",
              "Diaktifkan melalui: Server Manager -> Local Server -> Remote Desktop -> *Allow remote connections to this computer*.",
              "Aplikasi Klien di Windows: `mstsc.exe` (Remote Desktop Connection).",
              "Aplikasi Klien di Linux untuk akses RDP: `Remmina` atau `rdesktop` / `xfreerdp`."
            ]
          }
        ]
      },
      {
        code: "1.2.3",
        subtopic: "1.2",
        title: "Display File Transfer Features on Both Linux and Windows Server",
        subtitle: "Kaedah memindahkan fail konfigurasi, skrip, dan sandaran antara komputer pentadbir dan pelayan",
        concept: "Selain mengawal terminal atau skrin pelayan, pentadbir kerap perlu memuat naik (upload) pakej laman web atau memuat turun (download) fail log dan backup. Pemilihan protokol yang selamat amat penting.",
        features: [
          {
            icon: "📂",
            title: "Protokol Pemindahan Fail Selamat (SFTP & SCP)",
            desc: "Berjalan di atas protokol SSH (Port 22) supaya semua fail dan kata laluan disulitkan semasa penghantaran.",
            bullets: [
              "SCP (Secure Copy Protocol): Arahan pantas melalui CLI. Contoh muat naik: `scp backup.tar.gz user@192.168.56.101:/home/user/`.",
              "SFTP (SSH File Transfer Protocol): Sesi pemindahan fail interaktif melalui SSH (`sftp user@ip`) atau menggunakan GUI seperti **WinSCP** dan **FileZilla**."
            ]
          },
          {
            icon: "🔄",
            title: "FTP / FTPS & SMB (Windows File Sharing)",
            desc: "Kaedah pemindahan fail berasaskan perkhidmatan rangkaian khusus atau perkongsian folder.",
            bullets: [
              "FTP (File Transfer Protocol - Port 20 & 21): Pantas tetapi tidak disulitkan kecuali menggunakan FTPS (FTP over SSL/TLS). Servis di Linux: `vsftpd`, di Windows: IIS FTP Server.",
              "SMB / CIFS (Port 445): Digunakan oleh Windows Shared Folder (`\\\\192.168.56.102\\Share`) dan perisian **Samba** di Linux untuk berkongsi fail merentas OS."
            ]
          }
        ]
      }
    ],
    labs: [
      {
        id: "lab-1-1",
        title: "Amali 1A: Penyediaan VM Linux & Windows Server + Rangkaian Host-Only",
        subtitle: "Subtopik 1.1.3 & 1.2.1 — Konfigurasi VirtualBox dan semakan IP statik",
        steps: [
          {
            title: "Konfigurasi Adapter Rangkaian di Hypervisor (VirtualBox)",
            desc: "Buka tetapan (Settings -> Network) bagi kedua-dua VM (Ubuntu Server & Windows Server). Aktifkan Adapter 1 sebagai NAT (untuk akses Internet) dan Adapter 2 sebagai Host-Only Adapter (`vboxnet0`) supaya Host PC, VM Linux, dan VM Windows berada dalam subnet yang sama.",
            cmd: "# Tetapan Rangkaian Cadangan Makmal:\n# Subnet Host-Only: 192.168.56.0/24\n# IP Host PC      : 192.168.56.1\n# IP Linux Server : 192.168.56.101\n# IP Windows Svr  : 192.168.56.102",
            why: "Mengasingkan trafik makmal pada Host-Only Adapter mengelakkan konflik IP dengan rangkaian makmal kolej/politeknik tetapi masih membenarkan SSH & RDP."
          },
          {
            title: "Semak Antara Muka Rangkaian pada Linux Server",
            desc: "Log masuk ke terminal Linux Server dan jalankan arahan `ip a` untuk mengenal pasti nama antara muka rangkaian (contoh: `enp0s8`) dan alamat IP semasa.",
            cmd: "student@ubuntu-svr:~$ ip a\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3\n3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 192.168.56.101/24 brd 192.168.56.255 scope global enp0s8",
            why: "Pentadbir perlu memastikan antara muka berstatus `UP` dan mempunyai alamat IPv4 yang sah sebelum memulakan konfigurasi servis."
          },
          {
            title: "Semak Antara Muka Rangkaian pada Windows Server & Uji Ping",
            desc: "Buka Command Prompt / PowerShell pada Windows Server, semak IP menggunakan `ipconfig /all`, kemudian uji sambungan ke Linux Server menggunakan `ping`.",
            cmd: "C:\\Users\\Administrator> ipconfig\nEthernet adapter Ethernet 2:\n   IPv4 Address. . . . . . . . . . . : 192.168.56.102\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n\nC:\\Users\\Administrator> ping 192.168.56.101\nReply from 192.168.56.101: bytes=32 time<1ms TTL=64",
            why: "Balasan `Reply from ...` membuktikan lapisan fizikal maya dan lapisan rangkaian IP antara kedua-dua pelayan berfungsi dengan sempurna."
          }
        ]
      },
      {
        id: "lab-1-2",
        title: "Amali 1B: Capaian Jauh SSH, Remote Desktop (RDP) & Pemindahan Fail SCP",
        subtitle: "Subtopik 1.2.2 & 1.2.3 — Mengakses pelayan dari jauh dan memindahkan fail",
        steps: [
          {
            title: "Pasang & Aktifkan Servis OpenSSH Server di Linux",
            desc: "Pastikan pakej `openssh-server` telah dipasang dan servis `ssh` sedang aktif berjalan menggunakan arahan `systemctl`.",
            cmd: "student@ubuntu-svr:~$ sudo apt update && sudo apt install openssh-server -y\nstudent@ubuntu-svr:~$ sudo systemctl status ssh\n● ssh.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/ssh.service; enabled)\n     Active: active (running)",
            why: "Tanpa daemon `sshd` yang berstatus `active (running)` pada port 22, sebarang cubaan sambungan SSH dari luar akan ditolak (`Connection refused`)."
          },
          {
            title: "Akses Linux Server melalui SSH dari Windows / Host PC",
            desc: "Buka Command Prompt, PowerShell, atau PuTTY pada komputer hos dan sambung ke Linux Server menggunakan akaun pengguna.",
            cmd: "C:\\Users\\Pelajar> ssh student@192.168.56.101\nThe authenticity of host '192.168.56.101' can't be established.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nstudent@192.168.56.101's password: ********\nWelcome to Ubuntu 22.04 LTS!\nstudent@ubuntu-svr:~$",
            why: "Pada sambungan pertama, SSH akan meminta pengesahan kunci kriptografi (host key fingerprint) bagi mengelakkan serangan Man-in-the-Middle."
          },
          {
            title: "Pindahkan Fail Menggunakan SCP (Secure Copy)",
            desc: "Hantar satu fail laporan (`laporan_pelayan.txt`) dari komputer Windows/Host terus ke direktori `/home/student/` di dalam Linux Server.",
            cmd: "C:\\Users\\Pelajar> scp laporan_pelayan.txt student@192.168.56.101:/home/student/\nstudent@192.168.56.101's password: ********\nlaporan_pelayan.txt                       100%   42KB   8.4MB/s   00:00",
            why: "Arahan `scp` membolehkan pemindahan fail pantas menerusi terowong SSH (Port 22) tanpa perlu memasang pelayan FTP tambahan."
          },
          {
            title: "Aktifkan & Uji Remote Desktop (RDP) pada Windows Server",
            desc: "Di Windows Server: Buka `Server Manager` -> `Local Server` -> klik `Disabled` di sebelah `Remote Desktop` -> Pilih `Allow remote connections to this computer` -> Klik OK. Kemudian buka `mstsc` dari PC Host dan masukkan IP `192.168.56.102`.",
            cmd: "# Di PC Host (Tekan Win + R):\nmstsc /v:192.168.56.102\n# Masukkan Username: Administrator dan Password pelayan",
            why: "RDP membuka port TCP 3389 secara automatik pada Windows Firewall apabila diaktifkan melalui Server Manager."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Berapakah ketinggian standard bagi satu unit rak (1U) dalam spesifikasi Server Rack 19-inci?",
        options: ["1.00 inci (25.4 mm)", "1.75 inci (44.45 mm)", "2.50 inci (63.5 mm)", "3.50 inci (88.9 mm)"],
        answer: 1,
        explanation: "Satu Rack Unit (1U) ditetapkan secara piawai antarabangsa (EIA-310) pada ketinggian 1.75 inci atau 44.45 mm."
      },
      {
        q: "Antara berikut, manakah contoh perisian Hypervisor Type 1 (Bare-Metal) yang dipasang terus di atas perkakasan pelayan fizikal?",
        options: ["Oracle VM VirtualBox", "VMware Workstation Player", "VMware ESXi / Proxmox VE", "Adobe Creative Cloud"],
        answer: 2,
        explanation: "VMware ESXi, Proxmox VE, dan Microsoft Hyper-V Server ialah Hypervisor Type 1 (Bare-Metal) yang berjalan terus atas perkakasan tanpa memerlukan Host OS."
      },
      {
        q: "Apakah model perkhidmatan Cloud Computing di mana pengguna menyewa mesin maya (VM) dan storan, manakala pengguna sendiri bertanggungjawab menguruskan Sistem Pengoperasian (OS) dan aplikasi?",
        options: ["SaaS (Software as a Service)", "IaaS (Infrastructure as a Service)", "PaaS (Platform as a Service)", "DaaS (Desktop as a Service)"],
        answer: 1,
        explanation: "Dalam model IaaS (Infrastructure as a Service) seperti AWS EC2 atau Azure VM, penyedia awan menguruskan perkakasan fizikal & pemayaan, manakala pelanggan menguruskan OS, middleware dan aplikasi."
      },
      {
        q: "Anda mahu VM Linux Server dan VM Windows Server di dalam VirtualBox berkomunikasi sesama sendiri dan dengan PC Host, TETAPI tidak memerlukan capaian ke Internet luar. Mod rangkaian manakah paling sesuai?",
        options: ["NAT (Network Address Translation)", "Host-Only Adapter", " Internal Network sahaja", "Disabled Adapter"],
        answer: 1,
        explanation: "Host-Only Adapter membolehkan komunikasi dua hala antara PC Host dengan semua VM serta antara VM dengan VM tanpa mendedahkan VM kepada rangkaian luar/Internet."
      },
      {
        q: "Arahan manakah digunakan dalam Linux Server moden untuk memaparkan semua antara muka rangkaian berserta alamat IPv4 dan alamat MAC?",
        options: ["ipconfig /all", "ip addr show (atau ip a)", "netstat -rn", "ping localhost"],
        answer: 1,
        explanation: "Arahan `ip addr show` atau singkatannya `ip a` (daripada pakej iproute2) digunakan pada sistem Linux moden untuk memaparkan maklumat NIC, IP dan MAC address."
      },
      {
        q: "Apakah nombor port TCP lalai bagi perkhidmatan Secure Shell (SSH) dan Remote Desktop Protocol (RDP)?",
        options: ["SSH: Port 21, RDP: Port 80", "SSH: Port 22, RDP: Port 3389", "SSH: Port 23, RDP: Port 443", "SSH: Port 8080, RDP: Port 3306"],
        answer: 1,
        explanation: "SSH menggunakan port TCP 22 secara lalai, manakala Microsoft Remote Desktop Protocol (RDP) menggunakan port TCP/UDP 3389."
      },
      {
        q: "Mengapakah penggunaan protokol Telnet (Port 23) tidak lagi digalakkan untuk pentadbiran pelayan berbanding SSH?",
        options: [
          "Telnet memerlukan kad grafik berprestasi tinggi",
          "Telnet menghantar semua data dan kata laluan dalam bentuk teks biasa (plain text) tanpa penyulitan",
          "Telnet hanya boleh digunakan pada sistem pengoperasian Windows",
          "Telnet tidak menyokong rangkaian berasaskan IPv4"
        ],
        answer: 1,
        explanation: "Telnet tidak mempunyai sebarang lapisan penyulitan (encryption). Sesiapa yang memintas trafik rangkaian (packet sniffing) boleh membaca kata laluan pentadbir secara terus."
      },
      {
        q: "Antara berikut, arahan manakah yang betul untuk menyalin fail `konfig.conf` dari komputer tempatan ke direktori `/tmp` di dalam pelayan Linux (`192.168.1.50`) bagi pengguna `admin`?",
        options: [
          "ssh konfig.conf admin@192.168.1.50/tmp",
          "scp konfig.conf admin@192.168.1.50:/tmp/",
          "ftp copy konfig.conf 192.168.1.50",
          "cp -r konfig.conf http://192.168.1.50/tmp"
        ],
        answer: 1,
        explanation: "Sintaks SCP untuk memuat naik fail ialah `scp <fail_sumber> <pengguna>@<ip_pelayan>:<laluan_destinasi>`."
      }
    ]
  },

  // ========================================================================
  // TOPIK 2.0: DESKTOP ENVIRONMENT AND SHELLS
  // ========================================================================
  {
    id: "topik-2",
    code: "TOPIK 2.0",
    shortTitle: "Desktop Environment & Shells",
    title: "2.0 Desktop Environment and Shells",
    clo: "CLO 1 (P3, PLO3)",
    slt: "6 Jam (4 Jam Amali F2F + 2 Jam Kendiri)",
    summary: "Meneroka seni bina sistem tetingkap (Windowing System X11/Wayland), pengurus tetingkap, persekitaran desktop (GNOME, KDE, XFCE, Windows GUI) serta menguasai konsep Shell, pemboleh ubah persekitaran, metacharacters, dan alias dalam CLI.",
    heroStats: [
      { percent: "2.1", title: "Desktop Environments", desc: "X11/Wayland, Window Manager, GNOME, KDE & Windows GUI" },
      { percent: "2.2", title: "Shells & CLI", desc: "Bash/Zsh/PowerShell, Env Files, Metacharacters & Aliases" }
    ],
    notes: [
      {
        code: "2.1.1 - 2.1.3",
        subtopic: "2.1",
        title: "Desktop Environments in Linux and Windows System",
        subtitle: "Sistem Tetingkap (Windowing System), Window Manager, dan Komponen Persekitaran Desktop",
        concept: "Persekitaran grafik (GUI) pada Linux adalah bersifat modular (berlapis), berbeza dengan Windows di mana GUI terikat rapat dengan sistem pengoperasian. Pada Linux, anda boleh memilih sama ada mahu memasang GUI atau tidak, malah boleh menukar jenis Desktop Environment mengikut cita rasa dan spesifikasi RAM pelayan.",
        features: [
          {
            icon: "🪟",
            title: "2.1.1 Windowing System (Sistem Tetingkap)",
            desc: "Lapisan asas yang berkomunikasi dengan kad grafik, skrin, tetikus dan papan kekunci untuk melukis piksel di skrin.",
            bullets: [
              "X Window System (X11 / X.Org): Sistem paparan klasik di Linux yang menggunakan seni bina Client-Server (membolehkan X11 Forwarding melalui SSH).",
              "Wayland: Pengganti moden kepada X11 yang lebih selamat, pantas dan terus berkomunikasi dengan kernel melalui compositor.",
              "Windows DWM (Desktop Window Manager): Sistem paparan bersepadu dalam Microsoft Windows."
            ]
          },
          {
            icon: "📐",
            title: "2.1.2 Window Manager & Desktop Environment",
            desc: "Window Manager mengawal rupa bingkai tetingkap, manakala Desktop Environment (DE) ialah pakej lengkap GUI.",
            bullets: [
              "Window Manager (WM): Mengurus kedudukan, saiz, butang tutup/minimum tetingkap (contoh: Mutter, KWin, Openbox, i3).",
              "GNOME: DE lalai pada Ubuntu & RHEL — moden, minimalis, menggunakan pengurus fail *Nautilus (Files)*.",
              "KDE Plasma: Kaya ciri, rupa mirip Windows, sangat boleh ubah suai, menggunakan pengurus fail *Dolphin*.",
              "XFCE / LXQt: Sangat ringan dan pantas, sesuai untuk pelayan yang mempunyai RAM terhad."
            ]
          },
          {
            icon: "🧭",
            title: "2.1.3 Komponen & Ciri Desktop Environment",
            desc: "Elemen utama yang membentuk pengalaman pengguna pada sistem desktop Linux dan Windows Server (Desktop Experience).",
            bullets: [
              "Display Manager (Login Screen): Skrin log masuk grafik seperti GDM (GNOME), SDDM (KDE), atau LightDM.",
              "Panel / Taskbar & System Tray: Memaparkan menu aplikasi, jam, status rangkaian dan tetingkap aktif.",
              "File Manager (Pengurus Fail Grafik): Nautilus (GNOME), Dolphin (KDE), Thunar (XFCE), dan File Explorer (Windows).",
              "Widget Toolkit: Perpustakaan grafik seperti GTK (digunakan oleh GNOME/XFCE) dan Qt (digunakan oleh KDE)."
            ]
          }
        ],
        tableTitle: "Perbandingan Persekitaran Desktop (DE) Linux & Windows Server",
        tableHeaders: ["Persekitaran Desktop", "Toolkit Grafik", "Window Manager", "File Manager Lalai", "Penggunaan Sumber RAM"],
        tableRows: [
          ["GNOME (Ubuntu / RHEL)", "GTK", "Mutter", "Nautilus (GNOME Files)", "Sederhana – Tinggi (~800MB+)"],
          ["KDE Plasma", "Qt", "KWin", "Dolphin", "Sederhana (~600MB)"],
          ["XFCE", "GTK", "Xfwm4", "Thunar", "Sangat Rendah (~350MB)"],
          ["Windows Desktop Experience", "Win32 / WinUI", "DWM.exe", "File Explorer (`explorer.exe`)", "Tinggi (~1.5GB – 2GB)"]
        ]
      },
      {
        code: "2.2.1 - 2.2.2",
        subtopic: "2.2",
        title: "Explain Shells, CLI and Types of Shell",
        subtitle: "Peranan Shell sebagai penterjemah arahan antara pengguna dengan Kernel OS",
        concept: "Kernel ialah teras Sistem Pengoperasian yang mengawal perkakasan (CPU, RAM, Cakera), tetapi manusia tidak boleh bercakap terus dalam bahasa mesin dengan Kernel. **Shell** ialah program penterjemah (command interpreter) yang menerima arahan teks daripada pengguna di **CLI (Command Line Interface)**, menterjemahkannya, dan meminta Kernel melaksanakannya.",
        features: [
          {
            icon: "💻",
            title: "2.2.1 Shells & Command Line Interface (CLI)",
            desc: "Mengapa pentadbir pelayan profesional lebih memilih CLI berbanding GUI?",
            bullets: [
              "Jimat Sumber Pelayan: Tiada beban RAM/CPU untuk melukis grafik 3D atau tetingkap.",
              "Pantas & Boleh Diautomasikan: Arahan boleh digabungkan dalam skrip (Shell Script / PowerShell Script) untuk mengurus ratusan pelayan serentak.",
              "Capaian Jauh Mudah: Hanya memerlukan sambungan jalur lebar rendah menerusi SSH."
            ]
          },
          {
            icon: "🐚",
            title: "2.2.2 Jenis-jenis Shell (Linux & Windows)",
            desc: "Terdapat pelbagai jenis shell dengan ciri pelengkap automatik (auto-completion) dan sintaks skrip tersendiri.",
            bullets: [
              "`sh` (Bourne Shell): Shell klasik asal Unix (`/bin/sh`).",
              "`bash` (Bourne Again Shell): Shell lalai paling popular di hampir semua distro Linux (`/bin/bash`).",
              "`zsh` (Z Shell) & `fish`: Shell moden dengan ciri auto-cadangan pintar dan tema menarik.",
              "`csh` / `tcsh` (C Shell) & `ksh` (Korn Shell): Shell berasaskan sintaks bahasa C / Unix komersial.",
              "Windows Shells: **Command Prompt (`cmd.exe`)** dan **Windows PowerShell (`powershell.exe` / `pwsh`)** yang berasaskan objek .NET."
            ]
          }
        ],
        tableTitle: "Perbandingan Shell Utama dalam Pentadbiran Pelayan",
        tableHeaders: ["Nama Shell", "Lokasi Lalai / Eksekutif", "Ciri Utama"],
        tableRows: [
          ["Bash (Bourne Again Shell)", "`/bin/bash`", "Piawai de-facto Linux, serasi dengan `sh`, menyokong sejarah arahan (`history`) & skrip mantap"],
          ["Zsh (Z Shell)", "`/bin/zsh`", "Sokongan pemalam (Oh-My-Zsh), pembetulan ejaan & pelengkap Tab pintar"],
          ["Dash / Bourne Shell", "`/bin/sh`", "Sangat ringan dan pantas untuk menjalankan skrip permulaan sistem (boot scripts)"],
          ["Windows PowerShell", "`powershell.exe`", "Menggunakan format *Verb-Noun* (contoh: `Get-Service`, `Stop-Process`) dan memulangkan objek berstruktur"]
        ]
      },
      {
        code: "2.2.3",
        subtopic: "2.2",
        title: "Explain the Shell Environmental Files",
        subtitle: "Fail konfigurasi yang dibaca secara automatik apabila pengguna log masuk atau membuka terminal",
        concept: "Apabila anda membuka terminal Bash atau log masuk melalui SSH, bagaimana sistem tahu warna prompt, laluan arahan (`PATH`), dan alias anda? Jawapannya terletak pada **Shell Environmental Files** (fail permulaan shell). Ia terbahagi kepada dua skop: **Global (Semua Pengguna)** di dalam `/etc/` dan **Tempatan (Pengguna Tertentu)** di dalam direktori rumah `~/`.",
        features: [
          {
            icon: "🌍",
            title: "Fail Persekitaran Global (Semua Pengguna)",
            desc: "Diubah suai oleh pentadbir `root` untuk menetapkan tetapan lalai bagi seluruh pengguna pelayan.",
            bullets: [
              "`/etc/profile`: Dibaca setiap kali mana-mana pengguna melakukan *Login Shell* (contoh: log masuk melalui SSH atau konsol TTY).",
              "`/etc/bash.bashrc` (atau `/etc/bashrc`): Dibaca setiap kali pengguna membuka tetingkap terminal interaktif baharu (*Non-login interactive shell*).",
              "`/etc/environment`: Menyimpan pemboleh ubah persekitaran peringkat sistem."
            ]
          },
          {
            icon: "👤",
            title: "Fail Persekitaran Peribadi (Direktori Home `~`)",
            desc: "Terletak di dalam `/home/username/` (fail tersembunyi bermula dengan titik `.`) untuk tetapan peribadi pengguna tersebut.",
            bullets: [
              "`~/.bash_profile` atau `~/.profile`: Dibaca semasa sesi *Login Shell* pengguna tersebut.",
              "`~/.bashrc`: Fail paling kerap digunakan untuk menyimpan `alias` peribadi, fungsi shell, dan penyesuaian prompt `PS1`.",
              "`~/.bash_logout`: Dijalankan secara automatik apabila pengguna keluar (`exit` / `logout`) daripada sesi login shell (contoh: untuk membersihkan skrin atau fail sementara)."
            ]
          }
        ]
      },
      {
        code: "2.2.4",
        subtopic: "2.2",
        title: "Explain the Shell Metacharacters",
        subtitle: "Aksara khas yang mempunyai makna istimewa kepada Shell untuk paip, aliran semula (redirection) & logik",
        concept: "Dalam CLI, aksara seperti `|`, `>`, `*`, `;`, dan `$` bukan sekadar tanda baca biasa — ia dipanggil **Shell Metacharacters**. Ia membolehkan pentadbir menyambungkan output satu arahan ke arahan lain, menyimpan output ke dalam fail, atau menjalankan beberapa arahan sekali gus.",
        features: [
          {
            icon: "🔀",
            title: "Redirection & Piping (Aliran I/O & Paip)",
            desc: "Mengawal ke mana output arahan dihantar (Standard Output `stdout`, Standard Error `stderr`, Standard Input `stdin`).",
            bullets: [
              "`>` (Output Redirection - Overwrite): Menghantar output arahan ke dalam fail (memadam kandungan asal). Contoh: `ls -l > senarai.txt`.",
              "`>>` (Output Redirection - Append): Menambah output arahan di hujung fail tanpa memadam isi sedia ada. Contoh: `date >> log.txt`.",
              "`<` (Input Redirection): Mengambil input daripada fail. Contoh: `sort < nama.txt`.",
              "`|` (Pipe): Menghantar output arahan di sebelah kiri sebagai input kepada arahan di sebelah kanan. Contoh: `cat /etc/passwd | grep root`."
            ]
          },
          {
            icon: "⚡",
            title: "Wildcards, Penggabung Arahan & Quoting",
            desc: "Aksara khas untuk padanan corak fail dan kawalan aliran pelaksanaan arahan.",
            bullets: [
              "`*` (Asterisk): Padan dengan sifar atau lebih sebarang aksara (`*.conf`).",
              "`?` (Question Mark): Padan dengan tepat satu aksara tunggal (`fail?.txt`).",
              "`;` (Semicolon): Menjalankan arahan secara berurutan tanpa mengira berjaya atau gagal (`cd /tmp ; ls`).",
              "`&&` (Logical AND): Arahan kedua hanya jalan jika arahan pertama BERJAYA (`apt update && apt upgrade`).",
              "`' '` vs `\" \"` vs `\\`: Tanda petikan tunggal `' '` mematikan semua metacharacter, manakala petikan berganda `\" \"` masih membenarkan pengembangan pemboleh ubah `$VAR`."
            ]
          }
        ],
        tableTitle: "Ringkasan Shell Metacharacters Penting (Wajib Ingat untuk Peperiksaan!)",
        tableHeaders: ["Simbol", "Nama Metacharacter", "Fungsi & Contoh Penggunaan"],
        tableRows: [
          ["`|`", "Pipe (Paip)", "Menyambung output arahan pertama ke input arahan kedua: `ps aux | grep ssh`"],
          ["`>`", "Redirect Output (Overwrite)", "Tulis semula output ke dalam fail: `echo 'Helo' > mesej.txt`"],
          ["`>>`", "Redirect Output (Append)", "Tambah output ke baris bawah fail: `echo 'Baris 2' >> mesej.txt`"],
          ["`2>`", "Redirect Standard Error", "Simpan mesej ralat ke dalam fail: `find / -name rahsia 2> ralat.log`"],
          ["`;`", "Command Separator", "Jalankan berbilang arahan berturut-turut: `pwd ; whoami ; date`"],
          ["`&&`", "Logical AND", "Jalankan arahan ke-2 hanya jika arahan ke-1 tiada ralat: `mkdir projek && cd projek`"],
          ["`&`", "Background Execution", "Jalankan proses di latar belakang: `sleep 60 &`"],
          ["`$`", "Variable Expansion", "Memanggil nilai pemboleh ubah: `echo $USER` atau `echo $PATH`"]
        ]
      },
      {
        code: "2.2.5",
        subtopic: "2.2",
        title: "Display Shell and Command Line Variables and Aliases",
        subtitle: "Mencipta pemboleh ubah tempatan/persekitaran serta pintasan arahan menggunakan Alias",
        concept: "**Pemboleh ubah (Variables)** menyimpan data sementara dalam memori shell (seperti nama pengguna, direktori semasa, atau laluan sistem). **Alias** pula membolehkan kita mencipta nama singkatan bagi arahan yang panjang supaya kerja pentadbiran menjadi jauh lebih pantas dan mengelakkan kesilapan taip.",
        features: [
          {
            icon: "📦",
            title: "Pemboleh Ubah Tempatan vs Persekitaran (Environment Variables)",
            desc: "Perhatikan bahawa tiada jarak (space) dibenarkan sebelum dan selepas tanda `=` semasa menetapkan nilai di Linux!",
            bullets: [
              "Cipta Pemboleh Ubah Tempatan: `KOD_KURSUS=\"DFK40063\"` dan papar dengan `echo $KOD_KURSUS`.",
              "Jadikan Environment Variable (diwarisi oleh sub-proses): `export KOD_KURSUS=\"DFK40063\"`.",
              "Senaraikan Semua Environment Variables: `env` atau `printenv`.",
              "Pemboleh Ubah Terbina Dalam Penting: `$USER` (nama pengguna), `$HOME` (direktori rumah), `$PWD` (direktori semasa), `$SHELL` (shell aktif), `$PATH` (senarai direktori binari sistem)."
            ]
          },
          {
            icon: "🚀",
            title: "Membina & Mengurus Aliases",
            desc: "Pintasan arahan sementara (dalam sesi semasa) atau kekal (disimpan dalam `~/.bashrc`).",
            bullets: [
              "Papar semua alias aktif: `alias`",
              "Cipta alias baharu: `alias ll='ls -la --color=auto'` atau `alias kemaskini='sudo apt update && sudo apt upgrade -y'`.",
              "Padam alias: `unalias ll`.",
              "Kekalkan alias selepas reboot: Tambahkan baris `alias` ke dalam fail `~/.bashrc`, kemudian muat semula dengan arahan `source ~/.bashrc`."
            ]
          }
        ]
      }
    ],
    labs: [
      {
        id: "lab-2-1",
        title: "Amali 2A: Eksplorasi Shell, Pemboleh Ubah Persekitaran & Fail ~/.bashrc",
        subtitle: "Subtopik 2.2.2, 2.2.3 & 2.2.5 — Menyemak jenis shell, mencipta pemboleh ubah dan alias kekal",
        steps: [
          {
            title: "Kenal Pasti Shell Semasa & Senarai Shell Dalam Sistem",
            desc: "Semak shell yang sedang aktif digunakan oleh akaun anda serta senarai semua shell yang sah dipasang di dalam pelayan Linux.",
            cmd: "student@ubuntu-svr:~$ echo $SHELL\n/bin/bash\n\nstudent@ubuntu-svr:~$ cat /etc/shells\n/bin/sh\n/bin/bash\n/usr/bin/bash\n/bin/rbash\n/bin/dash",
            why: "Fail `/etc/shells` menyenaraikan semua program shell yang dibenarkan oleh sistem, manakala `$SHELL` memaparkan shell lalai pengguna semasa."
          },
          {
            title: "Cipta Pemboleh Ubah Tempatan & Eksport ke Environment Variable",
            desc: "Tetapkan pemboleh ubah `NAMA_PELAYAN`, paparkan nilainya menggunakan `echo`, dan eksport supaya boleh dibaca oleh skrip/sub-shell.",
            cmd: "student@ubuntu-svr:~$ NAMA_PELAYAN=\"Pelayan-Politeknik-01\"\nstudent@ubuntu-svr:~$ echo \"Selamat datang ke $NAMA_PELAYAN\"\nSelamat datang ke Pelayan-Politeknik-01\n\nstudent@ubuntu-svr:~$ export NAMA_PELAYAN\nstudent@ubuntu-svr:~$ printenv | grep NAMA_PELAYAN\nNAMA_PELAYAN=Pelayan-Politeknik-01",
            why: "Tanpa arahan `export`, pemboleh ubah hanya wujud dalam shell semasa dan tidak akan kelihatan di dalam `printenv` atau skrip anak."
          },
          {
            title: "Bina Alias Pintasan & Simpan Secara Kekal dalam ~/.bashrc",
            desc: "Cipta alias `senarai` untuk `ls -lh` dan `ports` untuk menyemak port rangkaian. Kemudian simpan ke dalam `~/.bashrc`.",
            cmd: "student@ubuntu-svr:~$ alias senarai='ls -la'\nstudent@ubuntu-svr:~$ echo \"alias senarai='ls -la'\" >> ~/.bashrc\nstudent@ubuntu-svr:~$ source ~/.bashrc\nstudent@ubuntu-svr:~$ alias\nalias ll='ls -alF'\nalias senarai='ls -la'",
            why: "Arahan `>> ~/.bashrc` menambah konfigurasi di hujung fail permulaan, dan `source ~/.bashrc` mengaktifkan perubahan serta-merta tanpa perlu log keluar."
          }
        ]
      },
      {
        id: "lab-2-2",
        title: "Amali 2B: Kuasai Shell Metacharacters (Redirection, Pipe & Logical Operators)",
        subtitle: "Subtopik 2.2.4 — Menggabungkan arahan Linux secara pintar menggunakan >, >>, | dan &&",
        steps: [
          {
            title: "Gunakan Output Redirection (`>` dan `>>`) untuk Menjana Fail Laporan",
            desc: "Simpan tarikh semasa dan senarai pengguna ke dalam fail `info_sistem.txt` tanpa membuka penyunting teks.",
            cmd: "student@ubuntu-svr:~$ echo \"=== LAPORAN PELAYAN ===\" > info_sistem.txt\nstudent@ubuntu-svr:~$ date >> info_sistem.txt\nstudent@ubuntu-svr:~$ cat info_sistem.txt\n=== LAPORAN PELAYAN ===\nWed Oct 28 10:30:00 +08 2026",
            why: "Simbol `>` mencipta atau menulis ganti fail pada baris pertama, manakala `>>` menambah tarikh pada baris kedua tanpa memadam tajuk di baris pertama."
          },
          {
            title: "Gunakan Pipe (`|`) untuk Menapis Maklumat Penting",
            desc: "Gabungkan arahan `cat` dan `grep` menggunakan paip `|` untuk mencari baris yang mengandungi perkataan `bash` di dalam `/etc/passwd`.",
            cmd: "student@ubuntu-svr:~$ cat /etc/passwd | grep bash\nroot:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Student Politeknik,,,:/home/student:/bin/bash",
            why: "Paip (`|`) membolehkan kita menapis ribuan baris output kepada hanya baris yang diperlukan dalam sekelip mata."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Apakah peranan utama program 'Shell' dalam seni bina Sistem Pengoperasian Linux dan Windows?",
        options: [
          "Menyejukkan suhu pemproses CPU secara fizikal",
          "Bertindak sebagai penterjemah arahan (command interpreter) antara pengguna dengan Kernel OS",
          "Menggantikan keperluan kad rangkaian (NIC) dalam pelayan",
          "Menyimpan data sandaran di atas pita magnetik"
        ],
        answer: 1,
        explanation: "Shell menerima input arahan daripada pengguna (sama ada secara interaktif atau skrip), menterjemahkannya, dan berhubung dengan Kernel untuk melaksanakan tugasan tersebut."
      },
      {
        q: "Antara berikut, manakah Persekitaran Desktop (Desktop Environment) di Linux yang terkenal kerana paling ringan dan sesuai untuk pelayan berspesifikasi RAM rendah?",
        options: ["GNOME 45", "KDE Plasma Penuh", "XFCE / LXQt", "Windows Aero Desktop"],
        answer: 2,
        explanation: "XFCE dan LXQt direka khusus supaya menggunakan memori RAM dan CPU yang sangat minimum berbanding GNOME atau KDE Plasma."
      },
      {
        q: "Apakah perbezaan antara operator redirection `>` dengan `>>` dalam Bash shell?",
        options: [
          "`>` memadam fail, manakala `>>` menamakan semula fail",
          "`>` menulis ganti (overwrite) kandungan fail, manakala `>>` menambah (append) output di hujung fail sedia ada",
          "`>` digunakan untuk input, manakala `>>` digunakan untuk output",
          "Tiada sebarang perbezaan fungsi antara kedua-duanya"
        ],
        answer: 1,
        explanation: "Operator `>` akan memadam isi asal fail sebelum menulis output baharu, manakala `>>` mengekalkan isi asal dan menambah output baharu di bahagian paling bawah fail."
      },
      {
        q: "Jika seorang pengguna ingin memastikan `alias` yang diciptanya kekal aktif setiap kali dia membuka terminal baharu, di dalam fail manakah alias tersebut patut disimpan?",
        options: ["~/.bash_logout", "~/.bashrc", "/etc/hostname", "/var/log/syslog"],
        answer: 1,
        explanation: "Fail `~/.bashrc` dibaca secara automatik setiap kali pengguna membuka sesi terminal interaktif baharu, menjadikannya tempat terbaik untuk menyimpan alias peribadi."
      },
      {
        q: "Apakah fungsi metacharacter paip `|` dalam arahan `ls -la /etc | grep conf`?",
        options: [
          "Menyimpan output `ls` ke dalam sebuah fail bernama `grep`",
          "Menghantar output daripada arahan `ls -la /etc` sebagai input kepada arahan `grep conf`",
          "Menjalankan kedua-dua arahan hanya jika arahan pertama gagal",
          "Memadam semua fail yang berakhir dengan `.conf`"
        ],
        answer: 1,
        explanation: "Simbol paip (`|`) menyalurkan Standard Output (`stdout`) daripada arahan di sebelah kiri terus menjadi Standard Input (`stdin`) kepada arahan di sebelah kanan."
      },
      {
        q: "Antara berikut, sintaks manakah yang BETUL untuk mencipta pemboleh ubah bernama `JABATAN` dengan nilai `JTMK` di dalam Bash shell?",
        options: [
          "JABATAN = \"JTMK\"",
          "set $JABATAN = JTMK",
          "JABATAN=\"JTMK\"",
          "var JABATAN: JTMK"
        ],
        answer: 2,
        explanation: "Dalam Bash shell, penetapan nilai pemboleh ubah TIDAK BOLEH mempunyai jarak (space) di kiri atau kanan tanda sama dengan (`=`). Sintaks yang betul ialah `JABATAN=\"JTMK\"`."
      },
      {
        q: "Pemboleh ubah persekitaran (Environment Variable) manakah yang menyimpan senarai direktori tempat sistem mencari fail arahan boleh laku (executable binaries)?",
        options: ["$HOME", "$USER", "$PATH", "$SHELL"],
        answer: 2,
        explanation: "`$PATH` menyimpan senarai direktori yang dipisahkan dengan titik bertindih (contoh: `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`) supaya kita boleh menaip `ls` tanpa perlu menaip `/bin/ls`."
      },
      {
        q: "Apakah arahan untuk membuang atau mematikan satu `alias` bernama `cls` yang telah dicipta dalam sesi terminal semasa?",
        options: ["rm alias cls", "delete cls", "unalias cls", "alias --remove cls"],
        answer: 2,
        explanation: "Arahan `unalias <nama_alias>` digunakan untuk memadamkan takrifan alias daripada memori sesi shell semasa."
      }
    ]
  }
);
