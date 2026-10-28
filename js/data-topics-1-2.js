/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION (ENGLISH EDITION)
   COMPLETE DATA FOR TOPIC 1.0 & TOPIC 2.0 (EVERY SUBTOPIC COVERED INDIVIDUALLY)
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push(
  // ========================================================================
  // TOPIC 1.0: SERVER DISTRIBUTION IN A NETWORK
  // ========================================================================
  {
    id: "topik-1",
    code: "TOPIC 1.0",
    shortTitle: "Server Distribution in a Network",
    title: "1.0 Server Distribution in a Network",
    clo: "CLO 1 (P3, PLO3)",
    slt: "5 Hours (4 Hours F2F Practical + 1 Hour Independent Learning)",
    summary: "Master physical server infrastructure (Server Room & Server Rack), modern Virtualization & Cloud Computing technologies, setting up Linux and Windows Server in a virtual environment, and configuring network interfaces, remote access (SSH & Remote Desktop), and secure file transfer.",
    heroStats: [
      { percent: "1.1", title: "Virtual Server Setup", desc: "1.1.1 Server Room/Rack, 1.1.2 Virtualization/Cloud, 1.1.3 VM Setup" },
      { percent: "1.2", title: "Networking & Remote", desc: "1.2.1 NICs, 1.2.2 SSH & RDP, 1.2.3 File Transfer" }
    ],
    notes: [
      {
        code: "1.1.1",
        subtopic: "1.1",
        title: "1.1.1 Display Server Component (a. Server Room, b. Server Rack)",
        subtitle: "Physical data center environment standards and 19-inch EIA-310 server rack architecture",
        concept: "A **Server Room (Data Center)** is a specialized, climate-controlled, and highly secure facility designed to house mission-critical enterprise servers, storage systems, and networking hardware. Inside the server room, equipment is organized vertically inside standardized **Server Racks** to maximize floor space, optimize airflow cooling, and simplify cable management.",
        features: [
          {
            icon: "🏢",
            title: "a. Server Room (Physical Infrastructure & Controls)",
            desc: "Engineered to guarantee 99.99% uptime by controlling temperature, humidity, power continuity, fire hazards, and physical access.",
            bullets: [
              "**Precision HVAC Cooling (Hot Aisle / Cold Aisle)**: Maintains temperature between **18°C–22°C (64°F–72°F)** and relative humidity between **40%–60%** to prevent electrostatic discharge (ESD) and thermal throttling.",
              "**Redundant Power (UPS & Backup Generators)**: Uninterruptible Power Supply (UPS) units provide instant battery power during outages while diesel generators spin up.",
              "**Clean Agent Fire Suppression (FM-200 / Novec 1230)**: Extinguishes fires using non-conductive gas without damaging sensitive electronics (unlike water sprinklers).",
              "**Physical Security & Raised Flooring**: Biometric/RFID access control, 24/7 CCTV surveillance, and antistatic raised floors for under-floor cold air distribution and structured cabling."
            ]
          },
          {
            icon: "🗄️",
            title: "b. Server Rack (Standardized Mounting Enclosure)",
            desc: "A standardized 19-inch wide metal frame used to mount servers, switches, routers, patch panels, and UPS units vertically.",
            bullets: [
              "**Rack Unit ('U' Measurement)**: Server height is measured in **Rack Units (U)** where **1U = 1.75 inches (44.45 mm)**. Standard enterprise cabinets are **42U** or **48U** tall.",
              "**Server Form Factors**: Rack-mount servers (1U, 2U, 4U), Blade enclosures (high-density modular servers sharing power/cooling), and Tower servers.",
              "**Essential Rack Accessories**: Patch Panels, Top-of-Rack (ToR) Network Switches, **KVM Switch** (Keyboard, Video, Mouse console), **PDU** (Power Distribution Unit), Blank Filler Panels, and Cable Management Arms."
            ]
          }
        ],
        tableTitle: "Standard Rack Unit (U) Dimensions & Typical Server Hardware",
        tableHeaders: ["Rack Size", "Height (Inches / mm)", "Typical Enterprise Equipment Mounted"],
        tableRows: [
          ["1U", "1.75 in (44.45 mm)", "24/48-Port Network Switches, Patch Panels, Hardware Firewalls, Compact Web Servers"],
          ["2U", "3.50 in (88.90 mm)", "General-Purpose Application & Database Servers with 8–12 hot-swap RAID drive bays"],
          ["4U", "7.00 in (177.80 mm)", "High-Capacity Storage Servers (NAS/SAN), GPU/AI Servers, Enterprise Virtualization Hosts"],
          ["42U", "73.50 in (~1.87 m)", "Full-height standard enterprise server rack cabinet in data centers"]
        ]
      },
      {
        code: "1.1.2",
        subtopic: "1.1",
        title: "1.1.2 Trace the Server Technology (a. Virtualization, b. Cloud Computing)",
        subtitle: "How hypervisors abstract physical hardware into Virtual Machines (VMs) and power the Cloud",
        concept: "Traditionally, running one operating system per physical server left 80% of CPU and RAM idle. **Virtualization** solves this by using a **Hypervisor** to partition one physical server into multiple isolated **Virtual Machines (VMs)**. **Cloud Computing** scales virtualization over the internet, delivering compute, storage, and networking as on-demand utility services.",
        features: [
          {
            icon: "🖥️",
            title: "a. Virtualization (Hypervisor Architecture)",
            desc: "Abstracts physical CPU, RAM, storage, and NICs into virtual hardware assigned to independent Guest OS instances.",
            bullets: [
              "**Type 1 Hypervisor (Bare-Metal)**: Installed directly on physical server hardware without a host OS. Examples: **VMware ESXi, Microsoft Hyper-V, Proxmox VE, Linux KVM, Citrix XenServer**.",
              "**Type 2 Hypervisor (Hosted)**: Runs as an application on top of a conventional Host OS (Windows/macOS/Linux). Examples: **Oracle VM VirtualBox, VMware Workstation Pro/Player**.",
              "**Key Benefits**: Hardware consolidation, lower power/cooling costs, instant **Snapshots & Live Migration**, and fault isolation between VMs."
            ]
          },
          {
            icon: "☁️",
            title: "b. Cloud Computing (Service & Deployment Models)",
            desc: "On-demand delivery of IT infrastructure over the network with pay-as-you-go pricing and elastic scalability.",
            bullets: [
              "**IaaS (Infrastructure as a Service)**: Rent virtual servers, storage, and networking while you manage the OS & apps (e.g., **AWS EC2, Microsoft Azure VMs, Google Compute Engine**).",
              "**PaaS (Platform as a Service)**: Cloud provider manages hardware and OS runtime; developers only deploy code (e.g., **Google App Engine, Azure App Service, Heroku**).",
              "**SaaS (Software as a Service)**: Complete cloud-hosted applications accessed via browser (e.g., **Google Workspace, Microsoft 365, Salesforce**).",
              "**Deployment Models**: **Public Cloud**, **Private Cloud** (on-premises OpenStack/VMware), **Hybrid Cloud** (combining local + public cloud), and **Community Cloud**."
            ]
          }
        ],
        tableTitle: "Comparison: Type 1 (Bare-Metal) vs Type 2 (Hosted) Hypervisors",
        tableHeaders: ["Criterion", "Type 1 Hypervisor (Bare-Metal)", "Type 2 Hypervisor (Hosted)"],
        tableRows: [
          ["Installation Layer", "Directly on physical server hardware", "On top of a Host OS (Windows 11, macOS, Ubuntu Desktop)"],
          ["Performance & Overhead", "Near-native speed, minimal latency overhead", "Moderate (shares CPU/RAM with the underlying Host OS)"],
          ["Leading Examples", "VMware ESXi, Proxmox VE, Microsoft Hyper-V Server", "Oracle VM VirtualBox, VMware Workstation"],
          ["Best Use Case", "Enterprise Production Data Centers & Cloud Providers", "Lab Training, Software Testing & Classroom Environments"]
        ]
      },
      {
        code: "1.1.3",
        subtopic: "1.1",
        title: "1.1.3 Display Linux & Windows Server in Virtual Environment",
        subtitle: "Provisioning virtual hardware resources, ISO installation media, and virtual network modes",
        concept: "In **DFK40063**, administrators deploy both **Linux Server** (e.g., Ubuntu Server / Debian / Rocky Linux) and **Windows Server** (e.g., Windows Server 2019 / 2022) inside a virtual environment. Proper allocation of vCPU, RAM, Virtual Disk, and Virtual Network Adapters ensures smooth operation without freezing the host workstation.",
        features: [
          {
            icon: "🐧",
            title: "Linux Server Virtual Machine Setup",
            desc: "Lightweight, open-source, highly stable, and typically deployed headless (CLI-only) in production to conserve system resources.",
            bullets: [
              "**Recommended Lab VM Specs (CLI)**: 1–2 vCPUs, **2 GB RAM**, **20 GB Dynamically Allocated Virtual Disk** (`.vdi` or `.vmdk`).",
              "**Recommended Lab VM Specs (With Desktop GUI)**: 2 vCPUs, **4 GB RAM**, **25 GB Virtual Disk**.",
              "**Installation Highlights**: Configure system locale, static IP or DHCP on `enp0s3`/`enp0s8`, disk partitioning (LVM/ext4), create regular sudo user, and enable `OpenSSH Server`."
            ]
          },
          {
            icon: "🪟",
            title: "Windows Server Virtual Machine Setup",
            desc: "Enterprise server OS from Microsoft featuring Active Directory, Server Manager GUI, and PowerShell automation.",
            bullets: [
              "**Installation Options**: **Server Core** (minimal CLI-only interface for low attack surface) vs **Server with Desktop Experience** (Full GUI — used in our lab).",
              "**Recommended Lab VM Specs (Desktop Experience)**: 2 vCPUs, **4 GB – 8 GB RAM**, **40 GB – 60 GB Virtual Disk**.",
              "**Virtual Network Modes**: Use **Adapter 1 (NAT)** for internet package updates and **Adapter 2 (Host-Only or Internal Network)** so your Host PC, Linux VM, and Windows VM can communicate on a private subnet (`192.168.56.0/24`)."
            ]
          }
        ],
        tableTitle: "Virtual Machine Network Adapter Modes Explained",
        tableHeaders: ["Network Mode", "VM ↔ Internet", "Host PC ↔ VM", "VM ↔ VM", "Primary Lab Purpose"],
        tableRows: [
          ["NAT", "Yes", "No (unless Port Forwarding)", "No", "Downloading OS updates (`apt update`) from the internet"],
          ["Bridged Adapter", "Yes", "Yes", "Yes (Same physical LAN)", "Exposing VM as a real machine on the physical classroom LAN"],
          ["Host-Only Adapter", "No", "Yes", "Yes", "Testing SSH, RDP, and Ping between Student PC, Linux VM & Windows VM"],
          ["Internal Network", "No", "No", "Yes", "Isolated Active Directory & DHCP testing between Server VM & Client VM"]
        ]
      },
      {
        code: "1.2.1",
        subtopic: "1.2",
        title: "1.2.1 Trace Network Interfaces on Both Linux and Windows Server",
        subtitle: "Inspecting NIC status, MAC addresses, IPv4/IPv6 addressing, Default Gateways, and DNS",
        concept: "Every server relies on its **Network Interface Card (NIC)** to serve clients. Unlike client PCs that use dynamic IPs, production servers require a **Static IP Address**, **Subnet Mask**, **Default Gateway**, and **DNS Server** so client machines can reliably locate them.",
        features: [
          {
            icon: "🖧",
            title: "Tracing Network Interfaces on Linux Server",
            desc: "Modern Linux distributions use Predictable Network Interface Names such as `enp0s3`, `enp0s8`, `ens33`, or `eth0`, plus `lo` for Loopback (`127.0.0.1`).",
            bullets: [
              "**View IP & MAC Addresses**: `ip addr show` (or `ip a`) — replaces the legacy `ifconfig` command from `net-tools`.",
              "**View Routing Table & Default Gateway**: `ip route show` (or `ip r`).",
              "**Static IP Configuration Files**: `/etc/netplan/*.yaml` (Ubuntu Server), `/etc/network/interfaces` (Debian), or `nmcli` / `nmtui` (RHEL/Rocky Linux).",
              "**Test Connectivity & DNS**: `ping -c 4 <IP>`, `traceroute <IP>`, `dig` or `nslookup`."
            ]
          },
          {
            icon: "🌐",
            title: "Tracing Network Interfaces on Windows Server",
            desc: "Managed via GUI (`ncpa.cpl` / Server Manager) or command line (`cmd.exe` / PowerShell).",
            bullets: [
              "**View Detailed NIC Configuration (CLI)**: `ipconfig /all` displays Host Name, Physical (MAC) Address, IPv4 Address, Subnet Mask, Default Gateway, DHCP status, and DNS Servers.",
              "**PowerShell Equivalent**: `Get-NetIPConfiguration` or `Get-NetIPAddress`.",
              "**GUI Configuration Path**: `Server Manager` -> `Local Server` -> Click Ethernet link (or press `Win + R` -> `ncpa.cpl`) -> Right-click adapter -> `Properties` -> `Internet Protocol Version 4 (TCP/IPv4)`."
            ]
          }
        ],
        tableTitle: "Essential Network Diagnostic Commands: Linux vs Windows Server",
        tableHeaders: ["Diagnostic Task", "Linux Server Command", "Windows Server Command"],
        tableRows: [
          ["Display IP, Subnet & MAC Address", "`ip addr` / `ip a` / `ifconfig`", "`ipconfig` / `ipconfig /all`"],
          ["Test Host Reachability (ICMP)", "`ping -c 4 192.168.56.102`", "`ping 192.168.56.101`"],
          ["Trace Packet Route Hops", "`traceroute` / `tracepath`", "`tracert`"],
          ["Display Default Gateway / Routes", "`ip route` / `route -n`", "`route print`"],
          ["Check Listening TCP/UDP Ports", "`ss -tulnp` / `netstat -tulnp`", "`netstat -ano`"],
          ["Query DNS Resolution", "`nslookup` / `dig`", "`nslookup`"]
        ]
      },
      {
        code: "1.2.2",
        subtopic: "1.2",
        title: "1.2.2 Display Remote Access to Servers (a. Secure Shell (SSH), b. Remote Desktop)",
        subtitle: "Encrypted remote administration protocols for headless Linux servers and graphical Windows servers",
        concept: "Because physical servers are locked inside cold, noisy data centers, system administrators manage them remotely over the network. Remote management must always use **encrypted protocols** so credentials and administrative commands cannot be intercepted by attackers.",
        features: [
          {
            icon: "🔐",
            title: "a. Secure Shell (SSH) — TCP Port 22",
            desc: "The industry-standard cryptographic network protocol for secure remote command-line login and command execution.",
            bullets: [
              "**Replaces Insecure Telnet (Port 23)**: Telnet transmits usernames and passwords in unencrypted plain text; SSH encrypts the entire session using public-key cryptography.",
              "**Server Daemon on Linux**: Provided by the `openssh-server` package (`sshd` service), configured in `/etc/ssh/sshd_config`.",
              "**Connecting via CLI**: `ssh username@server_ip` (e.g., `ssh student@192.168.56.101`).",
              "**Popular SSH Clients**: OpenSSH Client (built into Linux, macOS & modern Windows PowerShell), **PuTTY**, and **MobaXterm**."
            ]
          },
          {
            icon: "🖥️",
            title: "b. Remote Desktop Protocol (RDP) — TCP/UDP Port 3389",
            desc: "Microsoft's proprietary protocol that provides a full graphical desktop session to a remote Windows Server.",
            bullets: [
              "**Default Port**: Listens on **TCP/UDP Port 3389**.",
              "**Enabling RDP on Windows Server**: `Server Manager` -> `Local Server` -> Click `Disabled` next to **Remote Desktop** -> Select *Allow remote connections to this computer* -> Keep *Network Level Authentication (NLA)* checked for security.",
              "**RDP Clients**: **Remote Desktop Connection (`mstsc.exe`)** on Windows, and **Remmina** or **FreeRDP** on Linux."
            ]
          }
        ]
      },
      {
        code: "1.2.3",
        subtopic: "1.2",
        title: "1.2.3 Display File Transfer Features on Both Linux and Windows Server",
        subtitle: "Transferring configuration files, web assets, and backups securely across the network",
        concept: "Administrators routinely upload deployment packages, scripts, and patches to servers or download log files and backups. Both Linux and Windows Server support encrypted CLI and GUI file transfer mechanisms.",
        features: [
          {
            icon: "📦",
            title: "Secure SSH-Based File Transfer (SCP & SFTP — Port 22)",
            desc: "Uses the existing SSH service on TCP Port 22 without requiring a separate FTP server installation.",
            bullets: [
              "**SCP (Secure Copy Protocol)**: Fast non-interactive command-line copy.",
              "• Upload local file to server: `scp report.txt student@192.168.56.101:/home/student/`",
              "• Download file from server: `scp student@192.168.56.101:/var/log/syslog ./`",
              "**SFTP (SSH File Transfer Protocol)**: Interactive file transfer session (`sftp user@ip` with commands `put`, `get`, `ls`) or graphical drag-and-drop clients like **WinSCP** and **FileZilla**."
            ]
          },
          {
            icon: "🔄",
            title: "FTP / FTPS (Port 20/21) & SMB/CIFS File Sharing (Port 445)",
            desc: "Dedicated file transfer servers and cross-platform network folder sharing.",
            bullets: [
              "**FTP (File Transfer Protocol)**: Uses Port 21 (Control) and Port 20 (Data). Standard FTP is unencrypted; production servers use **FTPS (FTP over SSL/TLS)**. Daemons: `vsftpd` (Linux) and **IIS FTP Server** (Windows).",
              "**SMB / CIFS (Server Message Block — Port 445)**: Native Windows file sharing (`\\\\192.168.56.102\\SharedFolder`) and supported on Linux via the **Samba (`smbd`)** service."
            ]
          }
        ],
        tableTitle: "Summary of Server Remote Access & File Transfer Protocols",
        tableHeaders: ["Protocol", "Default Port", "Encryption", "Primary Purpose"],
        tableRows: [
          ["SSH (Secure Shell)", "TCP 22", "Yes (Strong Encryption)", "Remote CLI administration for Linux & Windows Server"],
          ["SCP / SFTP", "TCP 22", "Yes (Runs over SSH)", "Secure file upload/download via CLI (`scp`) or GUI (WinSCP/FileZilla)"],
          ["RDP (Remote Desktop)", "TCP/UDP 3389", "Yes (TLS / NLA)", "Remote Graphical User Interface (GUI) control of Windows Server"],
          ["FTP / FTPS", "TCP 20 & 21", "FTPS only (FTP is plain text)", "Bulk web & file hosting transfer (`vsftpd` / IIS FTP)"],
          ["SMB / CIFS (Samba)", "TCP 445", "Yes (SMB 3.0+)", "Network Shared Folders (`\\\\Server\\Share`) across Windows & Linux"]
        ]
      }
    ],
    labs: [
      {
        id: "lab-1-1",
        title: "Lab 1A: Virtual Machine Network Setup & Tracing Network Interfaces",
        subtitle: "Covers 1.1.3 & 1.2.1 — Configuring Host-Only networking and verifying static IP addresses on Linux & Windows",
        steps: [
          {
            title: "Configure Virtual Network Adapters in Hypervisor (VirtualBox)",
            desc: "In VirtualBox Settings -> Network for both Ubuntu Server and Windows Server VMs: set **Adapter 1** to `NAT` (for internet access) and **Adapter 2** to `Host-Only Adapter` (`vboxnet0`) so the Host PC, Linux VM, and Windows VM share the `192.168.56.0/24` network.",
            cmd: "# Recommended Lab IP Addressing Plan:\n# Host-Only Subnet : 192.168.56.0/24 (Mask: 255.255.255.0)\n# Host PC IP       : 192.168.56.1\n# Linux Server IP  : 192.168.56.101\n# Windows Server IP: 192.168.56.102",
            why: "Using a Dual-NIC setup (NAT + Host-Only) allows your VMs to download packages from the internet while maintaining a dedicated static private network for SSH, RDP, and Active Directory labs."
          },
          {
            title: "Trace Network Interfaces & IP Address on Linux Server",
            desc: "Log in to your Linux Server terminal and execute `ip a` and `ip route` to inspect active network interfaces, MAC addresses, and IPv4 configuration.",
            cmd: "student@ubuntu-svr:~$ ip a\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3\n3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 192.168.56.101/24 brd 192.168.56.255 scope global enp0s8",
            why: "Verifying that the interface state is `UP` and holds the expected IPv4 address (`192.168.56.101/24`) is the first step in network troubleshooting."
          },
          {
            title: "Trace Network Interfaces on Windows Server & Test ICMP Ping",
            desc: "Open Command Prompt on Windows Server, inspect the network configuration using `ipconfig /all`, and verify bidirectional connectivity with the Linux Server using `ping`.",
            cmd: "C:\\Users\\Administrator> ipconfig /all\nEthernet adapter Ethernet 2:\n   Physical Address. . . . . . . . . : 08-00-27-9A-BC-02\n   IPv4 Address. . . . . . . . . . . : 192.168.56.102(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n\nC:\\Users\\Administrator> ping 192.168.56.101\nReply from 192.168.56.101: bytes=32 time<1ms TTL=64",
            why: "Receiving ICMP Echo Replies (`TTL=64`) confirms that Layer 1–3 networking between Windows Server and Linux Server is working properly."
          }
        ]
      },
      {
        id: "lab-1-2",
        title: "Lab 1B: Remote Access (SSH & RDP) and Secure File Transfer (SCP)",
        subtitle: "Covers 1.2.2 & 1.2.3 — Connecting remotely to Linux via SSH, Windows via RDP, and transferring files",
        steps: [
          {
            title: "Install & Verify OpenSSH Server on Linux",
            desc: "Install the `openssh-server` package on Ubuntu Server and check that the `ssh` daemon is active and listening on TCP Port 22.",
            cmd: "student@ubuntu-svr:~$ sudo apt update && sudo apt install openssh-server -y\nstudent@ubuntu-svr:~$ sudo systemctl status ssh\n● ssh.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/ssh.service; enabled)\n     Active: active (running)",
            why: "The `sshd` service must be enabled and running on the server before any remote SSH or SFTP/SCP client can connect."
          },
          {
            title: "Connect to Linux Server Remotely via SSH",
            desc: "From your Windows Host PC (or Windows Server PowerShell/PuTTY), initiate an encrypted SSH session to the Linux Server.",
            cmd: "PS C:\\Users\\Administrator> ssh student@192.168.56.101\nThe authenticity of host '192.168.56.101' can't be established.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nstudent@192.168.56.101's password: ********\nWelcome to Ubuntu 22.04 LTS!\nstudent@ubuntu-svr:~$",
            why: "Accepting the host key fingerprint on first login saves the server's public key to `~/.ssh/known_hosts` to protect against future Man-in-the-Middle attacks."
          },
          {
            title: "Transfer Files Between Windows and Linux Using SCP",
            desc: "Use the `scp` command (or WinSCP GUI) to securely upload a file (`server_config.txt`) from Windows to the Linux `/home/student/` directory over Port 22.",
            cmd: "PS C:\\Users\\Administrator> scp server_config.txt student@192.168.56.101:/home/student/\nstudent@192.168.56.101's password: ********\nserver_config.txt                         100%   24KB   6.2MB/s   00:00",
            why: "`scp` encrypts file transfers over SSH without requiring additional FTP setup."
          },
          {
            title: "Enable & Test Remote Desktop (RDP) on Windows Server",
            desc: "In Windows Server: Open `Server Manager` -> `Local Server` -> Click `Disabled` next to `Remote Desktop` -> Choose `Allow remote connections to this computer` -> Click OK. Then launch `mstsc` from the Host PC.",
            cmd: "# On Host PC (Press Win + R):\nmstsc /v:192.168.56.102\n# Log in using Administrator credentials",
            why: "Enabling Remote Desktop automatically configures Windows Defender Firewall to allow incoming RDP connections on TCP port 3389."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "What is the standard height measurement of 1 Rack Unit (1U) in an EIA-310 compliant 19-inch server rack?",
        options: ["1.00 inch (25.4 mm)", "1.75 inches (44.45 mm)", "2.50 inches (63.5 mm)", "3.50 inches (88.9 mm)"],
        answer: 1,
        explanation: "One Rack Unit (1U) is internationally standardized at 1.75 inches (44.45 mm) high. A standard 42U rack can hold forty-two 1U devices."
      },
      {
        q: "Which of the following is a Type 1 (Bare-Metal) Hypervisor that installs directly onto physical server hardware without a host operating system?",
        options: ["Oracle VM VirtualBox", "VMware Workstation Player", "VMware ESXi / Proxmox VE", "Docker Desktop for Windows"],
        answer: 2,
        explanation: "VMware ESXi, Proxmox VE, and Microsoft Hyper-V Server are Type 1 Bare-Metal Hypervisors that run directly on the server hardware."
      },
      {
        q: "In which Cloud Computing service model does the cloud provider manage the physical hardware and virtualization layer, while you (the customer) manage the Operating System, runtime, and applications?",
        options: ["SaaS (Software as a Service)", "IaaS (Infrastructure as a Service)", "PaaS (Platform as a Service)", "FaaS (Function as a Service)"],
        answer: 1,
        explanation: "IaaS (e.g., AWS EC2, Azure VMs) provides virtualized computing infrastructure where the customer retains full control over the Guest OS and installed services."
      },
      {
        q: "Which VirtualBox network mode allows direct network communication between the Host PC and all Guest VMs, as well as VM-to-VM communication, without exposing the VMs to the external LAN/Internet?",
        options: ["NAT", "Host-Only Adapter", "Internal Network", "Bridged Adapter"],
        answer: 1,
        explanation: "Host-Only Adapter creates a virtual switch shared exclusively between the Host OS and attached Virtual Machines."
      },
      {
        q: "Which command is used on modern Linux servers to display all network interfaces along with their MAC addresses and IPv4/IPv6 addresses?",
        options: ["ipconfig /all", "ip addr show (or ip a)", "netstat -rn", "route print"],
        answer: 1,
        explanation: "`ip addr show` (or `ip a`) from the `iproute2` suite is the standard modern Linux command for inspecting network interfaces and IP addresses."
      },
      {
        q: "What are the default TCP port numbers for Secure Shell (SSH) and Remote Desktop Protocol (RDP)?",
        options: ["SSH: Port 21, RDP: Port 80", "SSH: Port 22, RDP: Port 3389", "SSH: Port 23, RDP: Port 443", "SSH: Port 25, RDP: Port 8080"],
        answer: 1,
        explanation: "SSH listens on TCP Port 22 by default, while Microsoft Remote Desktop Protocol (RDP) listens on TCP/UDP Port 3389."
      },
      {
        q: "Why should administrators always use SSH instead of Telnet when managing servers remotely?",
        options: [
          "Telnet only works over fiber-optic cables",
          "SSH encrypts all authentication credentials and session traffic, whereas Telnet sends passwords in plain text",
          "Telnet requires a graphical desktop environment",
          "SSH does not require an IP address to connect"
        ],
        answer: 1,
        explanation: "Telnet (Port 23) sends all traffic in unencrypted plain text, making administrator passwords vulnerable to packet sniffing. SSH (Port 22) provides end-to-end encryption."
      },
      {
        q: "Which command securely copies a local file named `backup.sql` to the `/tmp` directory of a remote Linux server (`192.168.56.101`) over SSH?",
        options: [
          "ssh backup.sql admin@192.168.56.101/tmp",
          "scp backup.sql admin@192.168.56.101:/tmp/",
          "ftp put backup.sql 192.168.56.101",
          "cp -r backup.sql //192.168.56.101/tmp"
        ],
        answer: 1,
        explanation: "The `scp` (Secure Copy) syntax is `scp <source_file> <user>@<remote_host>:<destination_path>`."
      }
    ]
  },

  // ========================================================================
  // TOPIC 2.0: DESKTOP ENVIRONMENT AND SHELLS
  // ========================================================================
  {
    id: "topik-2",
    code: "TOPIC 2.0",
    shortTitle: "Desktop Environment & Shells",
    title: "2.0 Desktop Environment and Shells",
    clo: "CLO 1 (P3, PLO3)",
    slt: "6 Hours (4 Hours F2F Practical + 2 Hours Independent Learning)",
    summary: "Explore Graphical User Interface (GUI) architecture in Linux and Windows (Windowing Systems, Window Managers, Desktop Environments) and master Command Line Interface (CLI) Shells, Startup Environmental Files, Shell Metacharacters, Variables, and Aliases.",
    heroStats: [
      { percent: "2.1", title: "Desktop Environments", desc: "2.1.1 Windowing System, 2.1.2 WM & DE, 2.1.3 DE Features" },
      { percent: "2.2", title: "Shells & CLI", desc: "2.2.1 CLI, 2.2.2 Shell Types, 2.2.3 Env Files, 2.2.4 Metachar, 2.2.5 Vars" }
    ],
    notes: [
      {
        code: "2.1.1",
        subtopic: "2.1",
        title: "2.1.1 Display the Windowing System",
        subtitle: "The foundational display server protocol layer in Linux (X11 & Wayland) and Windows (DWM)",
        concept: "Before any icons, windows, or menus can appear on a screen, the operating system needs a **Windowing System (Display Server)**. It is the low-level software layer that communicates between the OS Kernel/Graphics Hardware (GPU) and graphical applications, handling screen drawing and input from the mouse and keyboard.",
        features: [
          {
            icon: "🖼️",
            title: "X Window System (X11 / X.Org)",
            desc: "The classic, network-transparent windowing system used on Unix and Linux systems since 1984.",
            bullets: [
              "**Client-Server Architecture**: The **X Server** manages the local display, keyboard, and mouse, while GUI applications act as **X Clients** requesting the server to draw windows.",
              "**Network Transparency (X11 Forwarding)**: Because of its client-server design, you can run a GUI app on a remote Linux server and display its window on your local PC over SSH (`ssh -X user@ip`)."
            ]
          },
          {
            icon: "⚡",
            title: "Wayland & Windows DWM",
            desc: "Modern display architectures designed for enhanced security, smoother rendering, and lower latency.",
            bullets: [
              "**Wayland (Modern Linux Standard)**: Combines the Display Server and Compositor into one step. Isolates each window for better security (preventing one app from snooping on another's keystrokes). Default on Ubuntu 22.04+ and RHEL 9.",
              "**Windows Desktop Window Manager (`dwm.exe`)**: The integrated hardware-accelerated compositing windowing system built directly into Microsoft Windows Server (Desktop Experience)."
            ]
          }
        ]
      },
      {
        code: "2.1.2",
        subtopic: "2.1",
        title: "2.1.2 Display Window Manager and Desktop Environment",
        subtitle: "Understanding the difference between a Window Manager (WM) and a complete Desktop Environment (DE)",
        concept: "In Linux, the GUI is completely modular. The **Window Manager (WM)** only controls window placement, borders, title bars, and resizing. A **Desktop Environment (DE)** bundles a Window Manager together with a complete suite of panels, system settings, file managers, icons, and default utilities.",
        features: [
          {
            icon: "📐",
            title: "Window Managers (Stacking, Tiling & Compositing)",
            desc: "Controls how application windows look, move, resize, overlap, or tile on screen.",
            bullets: [
              "**Stacking / Compositing WMs**: Allow windows to overlap freely like floating sheets of paper with 3D shadows and animations (e.g., **Mutter** in GNOME, **KWin** in KDE, **Xfwm4** in XFCE, **Openbox**).",
              "**Tiling WMs**: Automatically arrange windows in a non-overlapping grid for keyboard power-users (e.g., **i3wm**, **Sway**, **AwesomeWM**)."
            ]
          },
          {
            icon: "🖥️",
            title: "Popular Desktop Environments (Linux & Windows)",
            desc: "Complete graphical workspaces tailored for different hardware capacities and workflows.",
            bullets: [
              "**GNOME**: Default on Ubuntu Desktop & Red Hat Enterprise Linux (RHEL). Modern, clean workflow centered on the *Activities Overview*.",
              "**KDE Plasma**: Feature-rich, highly customizable desktop with a layout familiar to Windows users.",
              "**XFCE / LXQt / MATE**: Lightweight desktop environments consuming very little RAM/CPU — ideal if a server requires a GUI.",
              "**Windows Server Desktop Experience**: Provides the full Windows Start Menu, Taskbar, File Explorer, and Server Manager GUI."
            ]
          }
        ],
        tableTitle: "Comparison of Major Desktop Environments",
        tableHeaders: ["Desktop Environment", "Window Manager", "Graphics Toolkit", "Default File Manager", "RAM Footprint"],
        tableRows: [
          ["GNOME", "Mutter", "GTK (GIMP Toolkit)", "Nautilus (GNOME Files)", "Medium–High (~800 MB)"],
          ["KDE Plasma", "KWin", "Qt Framework", "Dolphin", "Medium (~600 MB)"],
          ["XFCE", "Xfwm4", "GTK", "Thunar", "Low (~350 MB — Best for Servers)"],
          ["Windows Desktop Experience", "DWM.exe", "Win32 / WinUI", "File Explorer (`explorer.exe`)", "High (~1.5 GB – 2 GB)"]
        ]
      },
      {
        code: "2.1.3",
        subtopic: "2.1",
        title: "2.1.3 Show the Desktop Environment Components and Features",
        subtitle: "Core graphical components that make up a complete desktop session",
        concept: "Every full Desktop Environment consists of standardized components working together from the moment the login screen appears until the user launches system utilities.",
        features: [
          {
            icon: "🔑",
            title: "Display Manager, Panels & Menus",
            desc: "Session login authentication and primary workspace navigation.",
            bullets: [
              "**Display Manager (Graphical Login Screen)**: Authenticates username/password and starts the desktop session. Examples: **GDM** (GNOME), **SDDM** (KDE), **LightDM** (XFCE), and **Windows LogonUI**.",
              "**Desktop Panel / Taskbar & System Tray**: Houses the Application Launcher/Start Menu, active window switcher, network indicator, volume, notifications, and clock.",
              "**Virtual Workspaces / Virtual Desktops**: Allows administrators to group open windows across multiple virtual screens (e.g., Workspace 1 for Monitoring, Workspace 2 for Configuration)."
            ]
          },
          {
            icon: "🗂️",
            title: "File Manager, Control Center & System Utilities",
            desc: "Built-in applications bundled with the Desktop Environment.",
            bullets: [
              "**Graphical File Manager**: Browse folders, view icons, mount drives, and modify permissions (Nautilus, Dolphin, Thunar, Windows File Explorer).",
              "**System Settings / Control Center**: Unified GUI for configuring displays, network interfaces, users, printers, and power settings.",
              "**Terminal Emulator App**: Allows running CLI commands inside a GUI window (*GNOME Terminal*, *Konsole*, *Windows Terminal*)."
            ]
          }
        ]
      },
      {
        code: "2.2.1",
        subtopic: "2.2",
        title: "2.2.1 Explain Shells and Command Line Interface (CLI)",
        subtitle: "How the Shell interprets user commands for the OS Kernel and why server admins prefer CLI",
        concept: "The **Kernel** is the core of the operating system that manages hardware (CPU, RAM, Disk, NIC), while the **Shell** is the outer layer (like a seashell around a pearl) that acts as a **Command Interpreter**. When you type a command in the **Command Line Interface (CLI)**, the Shell parses your text, resolves variables/wildcards, and instructs the Kernel via system calls to execute the program.",
        features: [
          {
            icon: "🐚",
            title: "Architecture: User -> Shell (CLI) -> Kernel -> Hardware",
            desc: "Understanding the anatomy of a CLI prompt and command syntax.",
            bullets: [
              "**Standard Linux Prompt**: `username@hostname:current_directory$` (e.g., `student@ubuntu-svr:~$`).",
              "**Prompt Privilege Indicator**: Ends with **`$`** for a standard user, and **`#`** for the `root` superuser (`root@ubuntu-svr:~#`).",
              "**Command Anatomy**: `command [options/flags] [arguments]` — e.g., `ls -la /etc` where `ls` is the command, `-la` are options, and `/etc` is the argument."
            ]
          },
          {
            icon: "🚀",
            title: "Why Server Administrators Prefer CLI Over GUI",
            desc: "Four critical advantages of CLI in enterprise server administration.",
            bullets: [
              "**1. Minimal Resource Usage**: Running headless (CLI-only) saves gigabytes of RAM and CPU cycles for actual server workloads.",
              "**2. Speed & Automation**: Repetitive tasks across 100 servers can be automated in seconds using Shell Scripts.",
              "**3. Low-Bandwidth Remote Access**: SSH requires tiny text packets, working reliably even over slow or unstable network links.",
              "**4. Smaller Attack Surface**: Fewer graphical packages mean fewer security vulnerabilities and fewer reboots."
            ]
          }
        ]
      },
      {
        code: "2.2.2",
        subtopic: "2.2",
        title: "2.2.2 Explain Types of Shell",
        subtitle: "Comparing Bourne Shell (sh), Bash, Zsh, Csh/Tcsh, Ksh, Command Prompt, and PowerShell",
        concept: "Linux and Windows support multiple shell interpreters. Each shell offers its own scripting syntax, keyboard shortcuts, command history, and tab-completion features.",
        features: [
          {
            icon: "🐧",
            title: "Unix & Linux Shells (`/etc/shells`)",
            desc: "You can check your active shell with `echo $SHELL` and view all installed valid shells in `/etc/shells`.",
            bullets: [
              "**`sh` (Bourne Shell — `/bin/sh`)**: The original Unix shell written by Stephen Bourne in 1979. Fast and portable for system boot scripts.",
              "**`bash` (Bourne Again Shell — `/bin/bash`)**: The **default standard shell** on most Linux distributions (Ubuntu, Debian, RHEL). Combines `sh` compatibility with command history, aliases, and brace expansion.",
              "**`zsh` (Z Shell — `/bin/zsh`)**: Advanced interactive shell with smart spelling correction, themes (Oh-My-Zsh), and powerful tab completion.",
              "**`csh` / `tcsh` (C Shell)**: Uses syntax modeled after the C programming language.",
              "**`ksh` (Korn Shell) & `fish` (Friendly Interactive Shell)**: Enterprise Unix scripting shell (`ksh`) and modern user-friendly autosuggesting shell (`fish`)."
            ]
          },
          {
            icon: "🪟",
            title: "Windows Server Shells",
            desc: "Command interpreters available on Microsoft Windows Server.",
            bullets: [
              "**Command Prompt (`cmd.exe`)**: Legacy MS-DOS based text shell supporting batch scripts (`.bat` / `.cmd`) and classic utilities (`ipconfig`, `netstat`, `ping`).",
              "**Windows PowerShell (`powershell.exe` / `pwsh`)**: Modern object-oriented shell and scripting language built on .NET. Uses structured **Verb-Noun cmdlets** (e.g., `Get-Service`, `New-ADUser`, `Restart-Computer`)."
            ]
          }
        ],
        tableTitle: "Comparison of Major Shells in Linux & Windows Server",
        tableHeaders: ["Shell Name", "Executable Path", "Key Characteristics & Primary Usage"],
        tableRows: [
          ["Bourne Shell (`sh`)", "`/bin/sh`", "Original POSIX standard shell; lightweight and used for portable system scripts"],
          ["Bourne Again Shell (`bash`)", "`/bin/bash`", "Default Linux shell; supports tab-completion, `history`, arrays, and rich scripting"],
          ["Z Shell (`zsh`)", "`/bin/zsh`", "Highly customizable interactive shell with plugin ecosystems and smart completion"],
          ["C Shell (`csh` / `tcsh`)", "`/bin/csh`", "C-like scripting syntax (`if/foreach`) popular in legacy BSD/engineering environments"],
          ["Windows PowerShell", "`powershell.exe`", "Passes full .NET objects down the pipeline; essential for Active Directory automation"]
        ]
      },
      {
        code: "2.2.3",
        subtopic: "2.2",
        title: "2.2.3 Explain the Shell Environmental Files",
        subtitle: "System-wide and user-specific configuration files executed at login and shell startup",
        concept: "When a user logs into a Linux server or opens a new terminal window, Bash automatically reads **Shell Environmental Startup Files** to configure environment variables (`PATH`), command prompt appearance (`PS1`), `umask`, and custom `alias` definitions. These files are divided into **Global System-Wide Files** (in `/etc/`) and **User-Specific Personal Files** (hidden dot-files in `~/`).",
        features: [
          {
            icon: "🌍",
            title: "Global System-Wide Startup Files (`/etc/`)",
            desc: "Configured by the `root` administrator and applied to ALL users on the server.",
            bullets: [
              "**`/etc/profile`**: Executed automatically for every user during a **Login Shell** (e.g., logging in via SSH or local TTY console). Sets global environment variables (`PATH`, `USER`, `HOSTNAME`) and runs scripts inside `/etc/profile.d/*.sh`.",
              "**`/etc/bash.bashrc` (or `/etc/bashrc`)**: Executed for system-wide **Interactive Non-Login Shells** (e.g., opening a new terminal tab inside a desktop session).",
              "**`/etc/environment`**: Stores system-wide static environment variables read by PAM during login."
            ]
          },
          {
            icon: "👤",
            title: "User-Specific Personal Startup Files (`~/` Home Directory)",
            desc: "Hidden files (starting with `.`, viewed with `ls -a ~`) that customize only that individual user's environment.",
            bullets: [
              "**`~/.bash_profile` / `~/.bash_login` / `~/.profile`**: Read right after `/etc/profile` during a **Login Shell**. Usually sources `~/.bashrc`.",
              "**`~/.bashrc`**: The **most commonly edited file** for storing personal `alias` shortcuts, shell functions, and custom prompt colors. Apply changes immediately without logging out using `source ~/.bashrc` (or `. ~/.bashrc`).",
              "**`~/.bash_logout`**: Executed automatically when the user exits a login shell (often used to clear the terminal screen or clean temporary files)."
            ]
          }
        ],
        tableTitle: "Execution Order of Bash Environmental Startup Files",
        tableHeaders: ["File Path", "Scope", "When It Is Executed", "Typical Contents"],
        tableRows: [
          ["`/etc/profile`", "Global (All Users)", "Login Shell (SSH / Console Login)", "Global `$PATH`, `umask`, `/etc/profile.d/` scripts"],
          ["`~/.bash_profile` or `~/.profile`", "User-Specific", "Login Shell (Right after `/etc/profile`)", "User-specific login variables; calls `~/.bashrc`"],
          ["`~/.bashrc`", "User-Specific", "Every new Interactive Shell window", "Personal `alias` definitions, functions, `PS1` prompt"],
          ["`~/.bash_logout`", "User-Specific", "Upon logging out (`exit` / `logout`)", "Cleanup commands (`clear`, removing temp files)"]
        ]
      },
      {
        code: "2.2.4",
        subtopic: "2.2",
        title: "2.2.4 Explain the Shell Metacharacters",
        subtitle: "Special characters interpreted by the shell for I/O redirection, piping, wildcards, and command chaining",
        concept: "**Shell Metacharacters** are keyboard symbols that have special operational meaning to the shell rather than acting as literal text. They allow administrators to chain commands, redirect output to files, pipe data between utilities, and match filename patterns.",
        features: [
          {
            icon: "🔀",
            title: "I/O Redirection & Piping (`>`, `>>`, `<`, `2>`, `|`)",
            desc: "Controlling Standard Input (`stdin` = 0), Standard Output (`stdout` = 1), and Standard Error (`stderr` = 2).",
            bullets: [
              "**`>` (Redirect Output — Overwrite)**: Sends command output into a file, **overwriting** existing content (`ls -la > files.txt`).",
              "**`>>` (Redirect Output — Append)**: Appends command output to the **bottom** of an existing file without deleting prior lines (`date >> audit.log`).",
              "**`<` (Redirect Input)**: Feeds file content as input to a command (`sort < names.txt`).",
              "**`2>` (Redirect Standard Error)**: Sends error messages to a file (`find / -name secret 2> errors.txt` or discard with `2> /dev/null`).",
              "**`|` (Pipe)**: Sends the `stdout` of the left command directly as the `stdin` of the right command (`ps aux | grep sshd`)."
            ]
          },
          {
            icon: "⚡",
            title: "Command Chaining, Wildcards & Quoting (`;`, `&&`, `||`, `&`, `*`, `?`, `' '`, `\" \"`)",
            desc: "Controlling execution logic and escaping special characters.",
            bullets: [
              "**`;` (Sequential Separator)**: Runs multiple commands one after another regardless of whether the previous succeeded (`cd /tmp ; ls -l`).",
              "**`&&` (Logical AND)**: Runs the second command **ONLY IF** the first command succeeds with exit code 0 (`sudo apt update && sudo apt upgrade -y`).",
              "**`||` (Logical OR)**: Runs the second command **ONLY IF** the first command fails (`ping -c 1 10.0.0.1 || echo 'Host Down'`).",
              "**`&` (Background Job)**: Runs the command in the background (`sleep 300 &`).",
              "**Quoting Rules**: Single quotes `' '` treat everything literally (even `$VAR`); Double quotes `\" \"` preserve spaces but allow variable expansion (`$VAR`); Backslash `\\` escapes a single character."
            ]
          }
        ],
        tableTitle: "Complete Reference Table of Linux Shell Metacharacters",
        tableHeaders: ["Symbol", "Metacharacter Name", "Behavior & Practical Example"],
        tableRows: [
          ["`|`", "Pipe", "Passes output of Command 1 as input to Command 2: `cat /etc/passwd | grep root`"],
          ["`>`", "Output Redirect (Overwrite)", "Creates or overwrites file with output: `hostname > server.txt`"],
          ["`>>`", "Output Redirect (Append)", "Adds output to the end of file: `uptime >> server.txt`"],
          ["`2>`", "Error Redirect", "Redirects `stderr` error messages to a file: `ls /root 2> err.log`"],
          ["`;`", "Command Separator", "Runs commands sequentially unconditionally: `pwd ; whoami`"],
          ["`&&`", "Logical AND", "Runs second command only if first succeeds: `mkdir test && cd test`"],
          ["`&`", "Background Operator", "Executes process asynchronously in background: `./backup.sh &`"],
          ["`*` / `?` / `[]`", "Filename Wildcards", "`*` = 0 or more chars, `?` = single char, `[a-z]` = character range"],
          ["`$` / `$()`", "Variable / Command Substitution", "Expands variable (`$USER`) or embeds command output (`$(date)`)"]
        ]
      },
      {
        code: "2.2.5",
        subtopic: "2.2",
        title: "2.2.5 Display Shell and Command Line Variables and Aliases",
        subtitle: "Creating local and environment variables, inspecting system variables, and defining command aliases",
        concept: "**Variables** store dynamic configuration values in memory (such as the current username, home directory, or binary search paths). **Aliases** allow administrators to define custom shorthand keywords for long or frequently used commands.",
        features: [
          {
            icon: "📦",
            title: "Shell Variables vs Environment Variables",
            desc: "Important syntax rule in Bash: NEVER put spaces around the `=` sign when assigning a variable!",
            bullets: [
              "**Create Local Shell Variable**: `COURSE=\"DFK40063\"` (Accessible only inside the current shell session via `echo $COURSE`).",
              "**Promote to Environment Variable (`export`)**: `export COURSE=\"DFK40063\"` (Passed down to child processes and scripts).",
              "**View Variables**: `env` or `printenv` lists exported environment variables; `set` lists all shell variables and functions; `unset COURSE` deletes a variable.",
              "**Built-in System Variables**: `$USER` (current user), `$HOME` (home directory), `$PWD` (working directory), `$SHELL` (login shell), `$PATH` (colon-separated directories searched for commands), `$PS1` (prompt format)."
            ]
          },
          {
            icon: "🏷️",
            title: "Creating & Managing Command Line Aliases",
            desc: "Save time and prevent destructive accidents using custom command shortcuts.",
            bullets: [
              "**View All Active Aliases**: Type `alias` with no arguments.",
              "**Create Temporary Alias**: `alias ll='ls -la --color=auto'` or safety alias `alias rm='rm -i'`.",
              "**Remove an Alias**: `unalias ll`.",
              "**Make Aliases Permanent**: Add the `alias name='command'` line to `~/.bashrc` and run `source ~/.bashrc`."
            ]
          }
        ]
      }
    ],
    labs: [
      {
        id: "lab-2-1",
        title: "Lab 2A: Exploring Shells, Environmental Files, Variables & Aliases",
        subtitle: "Covers 2.2.1, 2.2.2, 2.2.3 & 2.2.5 — Inspecting shells, exporting variables, and configuring persistent aliases in ~/.bashrc",
        steps: [
          {
            title: "Inspect Active Shell & Available System Shells",
            desc: "Check your current login shell using the `$SHELL` environment variable and list all valid shells installed on the server from `/etc/shells`.",
            cmd: "student@ubuntu-svr:~$ echo $SHELL\n/bin/bash\n\nstudent@ubuntu-svr:~$ cat /etc/shells\n/bin/sh\n/bin/bash\n/usr/bin/bash\n/bin/rbash\n/bin/dash",
            why: "Knowing which shell is active ensures you use compatible scripting syntax and startup files."
          },
          {
            title: "Create Local Variables & Export Environment Variables",
            desc: "Assign a variable `SERVER_ROLE` without spaces around `=`, display it with `echo`, export it using `export`, and verify with `printenv`.",
            cmd: "student@ubuntu-svr:~$ SERVER_ROLE=\"Primary-Web-Server\"\nstudent@ubuntu-svr:~$ echo \"Role: $SERVER_ROLE\"\nRole: Primary-Web-Server\n\nstudent@ubuntu-svr:~$ export SERVER_ROLE\nstudent@ubuntu-svr:~$ printenv | grep SERVER_ROLE\nSERVER_ROLE=Primary-Web-Server",
            why: "Exporting a variable makes it available to child scripts and subshells spawned from the current terminal."
          },
          {
            title: "Create Command Aliases & Persist Them in `~/.bashrc`",
            desc: "Define a custom alias `myip` and `ll`, append it to `~/.bashrc` so it survives reboots, and reload the file with `source`.",
            cmd: "student@ubuntu-svr:~$ alias ll='ls -la'\nstudent@ubuntu-svr:~$ echo \"alias ll='ls -la'\" >> ~/.bashrc\nstudent@ubuntu-svr:~$ source ~/.bashrc\nstudent@ubuntu-svr:~$ alias\nalias la='ls -a'\nalias ll='ls -la'",
            why: "Aliases created directly at the prompt disappear when you close the terminal unless they are saved inside `~/.bashrc`."
          }
        ]
      },
      {
        id: "lab-2-2",
        title: "Lab 2B: Mastering Shell Metacharacters (Redirection, Pipes & Chaining)",
        subtitle: "Covers 2.2.4 — Using >, >>, |, ; and && to automate log filtering and report generation",
        steps: [
          {
            title: "Generate a System Audit File Using `>` (Overwrite) and `>>` (Append)",
            desc: "Create a new report header using `>` and append the current date and logged-in user using `>>`.",
            cmd: "student@ubuntu-svr:~$ echo \"=== SERVER AUDIT LOG ===\" > audit.txt\nstudent@ubuntu-svr:~$ date >> audit.txt\nstudent@ubuntu-svr:~$ whoami >> audit.txt\nstudent@ubuntu-svr:~$ cat audit.txt\n=== SERVER AUDIT LOG ===\nWed Oct 28 11:00:00 +08 2026\nstudent",
            why: "Using `>` on the first line initializes a clean file, while `>>` on subsequent commands appends lines without erasing previous data."
          },
          {
            title: "Filter Command Output Using Pipes (`|`) and Logical AND (`&&`)",
            desc: "Pipe the contents of `/etc/passwd` into `grep` to find accounts using `/bin/bash`, and chain directory creation with `&&`.",
            cmd: "student@ubuntu-svr:~$ cat /etc/passwd | grep /bin/bash\nroot:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Pelajar DFK40063,,,:/home/student:/bin/bash\n\nstudent@ubuntu-svr:~$ mkdir -p /tmp/test_dir && cd /tmp/test_dir && pwd\n/tmp/test_dir",
            why: "`|` connects single-purpose Unix tools into a processing pipeline, while `&&` prevents subsequent commands from running if an earlier step fails."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Which layer in a Linux GUI system is responsible for drawing pixels on the screen and handling mouse/keyboard input (examples: X11 / X.Org and Wayland)?",
        options: ["The Command Line Interpreter", "The Windowing System (Display Server)", "The Bootloader (GRUB)", "The Cron Scheduler"],
        answer: 1,
        explanation: "The Windowing System (X11 or Wayland) is the core display server protocol that manages graphics rendering and input devices."
      },
      {
        q: "Which Linux Desktop Environment is specifically known for being lightweight and low on RAM consumption, making it suitable for servers that require a GUI?",
        options: ["GNOME 45 Full", "KDE Plasma Ultimate", "XFCE / LXQt", "Windows Aero"],
        answer: 2,
        explanation: "XFCE and LXQt are lightweight desktop environments that use minimal RAM and CPU resources compared to GNOME or KDE Plasma."
      },
      {
        q: "What is the primary role of a 'Shell' in both Linux and Windows operating systems?",
        options: [
          "To physically cool the server rack",
          "To act as a command interpreter between the user and the OS Kernel",
          "To replace the physical hard disk drive",
          "To assign MAC addresses to network switches"
        ],
        answer: 1,
        explanation: "The Shell interprets commands typed by the user (or read from a script) and translates them into system calls for the OS Kernel."
      },
      {
        q: "Which user-specific environmental file in a user's home directory is the best place to save custom `alias` definitions so they load in every new interactive Bash terminal?",
        options: ["~/.bash_logout", "~/.bashrc", "/etc/hostname", "/etc/fstab"],
        answer: 1,
        explanation: "`~/.bashrc` is executed every time an interactive non-login Bash shell is started, making it the standard file for personal aliases and functions."
      },
      {
        q: "What is the difference between the `>` and `>>` redirection metacharacters in Linux?",
        options: [
          "`>` deletes the file, while `>>` renames the file",
          "`>` overwrites existing file contents, while `>>` appends new output to the end of the file",
          "`>` redirects standard input, while `>>` redirects standard error",
          "There is no difference between them"
        ],
        answer: 1,
        explanation: "`>` overwrites the target file from the beginning, whereas `>>` preserves existing content and appends new output at the bottom."
      },
      {
        q: "In the command `ps aux | grep apache2`, what does the pipe metacharacter (`|`) do?",
        options: [
          "Saves the output of `ps aux` into a file named `grep`",
          "Sends the Standard Output (`stdout`) of `ps aux` as Standard Input (`stdin`) to `grep apache2`",
          "Runs both commands only if the first command fails",
          "Terminates the `apache2` service"
        ],
        answer: 1,
        explanation: "The pipe (`|`) channels the output stream of the left-hand command directly into the input stream of the right-hand command."
      },
      {
        q: "Which of the following is the CORRECT syntax to assign a shell variable in Bash?",
        options: [
          "DEPT = \"JTMK\"",
          "DEPT=\"JTMK\"",
          "set $DEPT = \"JTMK\"",
          "var DEPT: \"JTMK\""
        ],
        answer: 1,
        explanation: "Bash variable assignment does not permit spaces before or after the `=` sign (`DEPT=\"JTMK\"`)."
      },
      {
        q: "Which command removes a previously defined alias named `ll` from the current shell session?",
        options: ["rm alias ll", "unalias ll", "delete ll", "alias --off ll"],
        answer: 1,
        explanation: "The `unalias <alias_name>` builtin command removes an alias definition from the active shell session."
      }
    ]
  }
);
