/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION (ENGLISH EDITION)
   COMPLETE DATA FOR TOPIC 4.0 (WINDOWS SERVER) & TOPIC 5.0 (RISK MGMT & MAINTENANCE)
   EVERY SINGLE SUBTOPIC COVERED INDIVIDUALLY
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push(
  // ========================================================================
  // TOPIC 4.0: WINDOWS SERVER ADMINISTRATION
  // ========================================================================
  {
    id: "topik-4",
    code: "TOPIC 4.0",
    shortTitle: "Windows Server Administration",
    title: "4.0 Windows Server Administration",
    clo: "CLO 1, CLO 2 & CLO 3",
    slt: "23 Hours (Active Directory, DNS/DHCP/IIS, AD Users/Groups & File Sharing Permissions)",
    summary: "Master enterprise Windows Server administration: Active Directory Domain Services (4.1.1 Domain, Forest, OUs), core server roles (4.1.2 DNS, DHCP, IIS), building and managing Active Directory User Accounts, Properties, Account Policies, and Security/Distribution Groups (4.2.1–4.2.4), and configuring Windows File Management, Shared Folders, Mapped Network Drives, UNC paths, and Share/NTFS Permissions (4.3.1–4.3.5).",
    heroStats: [
      { percent: "4.1-4.2", title: "AD DS, Roles & Accounts", desc: "4.1.1 AD DS, 4.1.2 DNS/DHCP/IIS, 4.2.1–4.2.4 AD Users & Groups" },
      { percent: "4.3", title: "File Sharing & Access", desc: "4.3.1–4.3.5 Shared Folders, UNC, Mapped Drives & Share Permissions" }
    ],
    hasInteractiveSim: "windows-share-sim",
    notes: [
      // ====================================================================
      // SUBTOPIC 4.1: TRACE WINDOWS SERVER ROLE AND FEATURE
      // ====================================================================
      {
        code: "4.1.1",
        subtopic: "4.1",
        title: "4.1.1 Display Active Directory (AD) and Its Role in Windows Server (a. Domain, b. Forest, c. OUs)",
        subtitle: "Centralized directory architecture: Domain Controllers, Domains, Trees, Forests, and Organizational Units",
        concept: "**Active Directory Domain Services (AD DS)** is the core directory service in Windows Server that stores information about network objects (users, groups, computers, printers, shared folders) inside a centralized database (**`C:\\Windows\\NTDS\\ntds.dit`**) on a server promoted to a **Domain Controller (DC)**. It provides centralized authentication (Kerberos Single Sign-On) and Group Policy management across the enterprise.",
        features: [
          {
            icon: "🏛️",
            title: "a. Domain (Active Directory Domain)",
            desc: "A logical administrative group of network objects (users, computers, devices) that share the same Active Directory database and security policies.",
            bullets: [
              "**DNS Namespace Identity**: Identified by a DNS domain name such as `politeknik.edu.my` or `jtmk.local`.",
              "**Domain Controller (DC)**: The Windows Server running AD DS that authenticates domain logins and replicates directory changes to other DCs in the domain.",
              "**Centralized Roaming Login**: Any domain user can log in from any domain-joined workstation using a single set of credentials."
            ]
          },
          {
            icon: "🌲",
            title: "b. Forest (Top-Level Security Boundary)",
            desc: "A collection of one or more Active Directory **Domain Trees** that share a common directory Schema, Configuration, Global Catalog, and automatic two-way transitive **Trust Relationships**.",
            bullets: [
              "**Domain Tree**: A hierarchy of domains sharing a contiguous DNS namespace (e.g., root `politeknik.edu.my` with child domain `jtmk.politeknik.edu.my`).",
              "**Forest**: The highest logical container and **ultimate security boundary** in Active Directory. It can unite multiple distinct domain trees (e.g., `politeknik.edu.my` and `kolejkomuniti.edu.my`)."
            ]
          },
          {
            icon: "🗂️",
            title: "c. Organizational Units (OUs)",
            desc: "Logical subdivision containers created inside a Domain to organize users, groups, and computers by department, job function, or geographic branch.",
            bullets: [
              "**Examples**: `OU=JTMK`, `OU=Lecturers`, `OU=Students`, `OU=Lab_Computers`, `OU=HR_Department`.",
              "**Purpose 1 (Group Policy Deployment)**: Administrators link **Group Policy Objects (GPOs)** directly to OUs to enforce settings on specific departments.",
              "**Purpose 2 (Delegation of Control)**: Allows granting limited administrative rights (such as resetting passwords) over a single OU to a junior technician without making them a full Domain Admin."
            ]
          }
        ],
        tableTitle: "Summary of Active Directory Logical Components (Subtopic 4.1.1)",
        tableHeaders: ["AD Component", "Hierarchy Level", "Core Role & Administrative Purpose"],
        tableRows: [
          ["Forest", "Highest Level (Security Boundary)", "Collection of one or more Domain Trees sharing a common Schema & Global Catalog"],
          ["Domain", "Core Administrative Unit", "Boundary for the `ntds.dit` database, account policies, and Domain Controller replication"],
          ["Organizational Unit (OU)", "Container Inside a Domain", "Organizes objects by department/location for linking **GPOs** and **Delegating Control**"],
          ["Leaf Objects", "Individual Items in an OU", "User Accounts, Security/Distribution Groups, Computer Accounts, Shared Printers"]
        ]
      },
      {
        code: "4.1.2",
        subtopic: "4.1",
        title: "4.1.2 Trace Various Roles and Features in Windows Server (a. DNS, b. DHCP, c. IIS)",
        subtitle: "Core network infrastructure services managed through Windows Server Manager",
        concept: "In Windows Server, a **Server Role** is a primary duty performed by the server (such as AD DS, DNS, DHCP, or IIS Web Server), whereas a **Feature** is a supporting tool or subsystem (such as Windows Server Backup, BitLocker, or Group Policy Management).",
        features: [
          {
            icon: "🌐",
            title: "a. Domain Name System (DNS) — Port UDP/TCP 53",
            desc: "Resolves human-friendly hostnames (e.g., `portal.jtmk.local`) into computer IP addresses (`192.168.56.102`) and vice versa.",
            bullets: [
              "**Forward Lookup Zone**: Resolves **Hostname -> IP Address**. Key record types: **A** (IPv4 host), **AAAA** (IPv6 host), **CNAME** (Alias), **MX** (Mail Exchange), **SRV** (Service location record — **mandatory for locating Active Directory Domain Controllers!**).",
              "**Reverse Lookup Zone**: Resolves **IP Address -> Hostname** using **PTR (Pointer)** records.",
              "**Management Console**: `DNS Manager` (`dnsmgmt.msc`)."
            ]
          },
          {
            icon: "📡",
            title: "b. Dynamic Host Configuration Protocol (DHCP) — Port UDP 67/68",
            desc: "Automatically leases IPv4 addresses, Subnet Masks, Default Gateways, and DNS Server settings to client computers on the network.",
            bullets: [
              "**The 4-Step DORA Process**: **D**iscover (Client broadcasts to find a DHCP server) -> **O**ffer (Server offers an IP lease) -> **R**equest (Client requests the offered IP) -> **A**cknowledge (Server confirms lease & options).",
              "**DHCP Scope**: The pool/range of IP addresses available for lease (e.g., `192.168.56.150` – `192.168.56.240`).",
              "**Exclusions & Reservations**: *Exclusion Range* prevents static server IPs from being handed out; *Reservation* permanently binds a specific IP to a device's MAC address (e.g., a network printer).",
              "**Management Console**: `DHCP Manager` (`dhcpmgmt.msc`)."
            ]
          },
          {
            icon: "🕸️",
            title: "c. Internet Information Services (IIS) — Port TCP 80 / 443",
            desc: "Microsoft's extensible enterprise Web Server and FTP Server role built into Windows Server.",
            bullets: [
              "**Web Hosting**: Hosts static HTML/CSS/JS websites and dynamic ASP.NET, .NET Core, or PHP web applications over HTTP (Port 80) and HTTPS (Port 443).",
              "**Default Web Root Directory**: **`C:\\inetpub\\wwwroot`**.",
              "**Application Pools**: Isolates different websites into separate worker processes (`w3wp.exe`) so a crash in one site does not affect others.",
              "**Management Console**: `Internet Information Services (IIS) Manager` (`inetmgr`)."
            ]
          }
        ],
        tableTitle: "Comparison of DNS, DHCP, and IIS Roles in Windows Server",
        tableHeaders: ["Server Role", "Default Port(s)", "MMC Console Command", "Primary Network Function"],
        tableRows: [
          ["DNS Server", "UDP/TCP 53", "`dnsmgmt.msc`", "Translates domain/host names to IP addresses (A, AAAA, CNAME, PTR, SRV)"],
          ["DHCP Server", "UDP 67 (Server) / 68 (Client)", "`dhcpmgmt.msc`", "Dynamically assigns IP addresses, Subnet Mask, Gateway & DNS via DORA"],
          ["IIS Web Server", "TCP 80 (HTTP) / 443 (HTTPS)", "`inetmgr`", "Hosts intranet and public websites from `C:\\inetpub\\wwwroot`"]
        ]
      },

      // ====================================================================
      // SUBTOPIC 4.2: CONSTRUCT USER ACCOUNTS AND GROUPS
      // ====================================================================
      {
        code: "4.2.1",
        subtopic: "4.2",
        title: "4.2.1 Build User Accounts in Active Directory",
        subtitle: "Creating domain user accounts via Active Directory Users and Computers (dsa.msc), ADAC, and PowerShell",
        concept: "Unlike local user accounts (managed in `lusrmgr.msc` on standalone machines), **Active Directory Domain User Accounts** are created on a Domain Controller and stored in AD DS (`ntds.dit`), allowing users to log into any domain-joined computer on the network.",
        features: [
          {
            icon: "👤",
            title: "Creating Users in Active Directory Users and Computers (`dsa.msc`)",
            desc: "Step-by-step process and the 4 password options presented during user creation.",
            bullets: [
              "**Step 1**: Open `Server Manager` -> `Tools` -> **Active Directory Users and Computers (`dsa.msc`)**.",
              "**Step 2**: Right-click the target Organizational Unit (e.g., `OU=JTMK`) -> **New -> User**.",
              "**Step 3**: Enter *First name*, *Last name*, and **User logon name** (e.g., `azrul@jtmk.local`), then click Next.",
              "**Step 4 (Four Password Checkboxes)**:",
              "1. **User must change password at next logon**: Forces the user to create a private password on first login.",
              "2. **User cannot change password**: Used for shared kiosk or lab accounts.",
              "3. **Password never expires**: Used for service accounts (must be protected with strong passwords).",
              "4. **Account is disabled**: Pre-creates an account for a future employee or suspends an employee on leave."
            ]
          },
          {
            icon: "⚡",
            title: "Creating Domain Users with User Templates & PowerShell",
            desc: "Rapidly provisioning multiple accounts with consistent settings.",
            bullets: [
              "**Copy Template Account**: Right-click an existing user in `dsa.msc` -> **Copy...** to inherit group memberships, department attributes, and profile paths automatically.",
              "**PowerShell Cmdlet**: `New-ADUser -Name \"Azrulnizam\" -SamAccountName \"azrul\" -UserPrincipalName \"azrul@jtmk.local\" -Path \"OU=JTMK,DC=jtmk,DC=local\" -Enabled $true`"
            ]
          }
        ]
      },
      {
        code: "4.2.2",
        subtopic: "4.2",
        title: "4.2.2 Build User Properties and Attributes",
        subtitle: "Configuring General, Address, Account (Logon Hours & Log On To), Profile, Organization, and Member Of tabs",
        concept: "After creating a domain user account in `dsa.msc`, right-clicking the user and selecting **Properties** opens a multi-tab dialog that stores rich organizational metadata and login restrictions.",
        features: [
          {
            icon: "🪪",
            title: "General, Address, Organization & Telephones Tabs",
            desc: "Populating searchable directory attributes in the Global Catalog.",
            bullets: [
              "**General Tab**: First name, Last name, Display name, Description, Office location, Telephone number, E-mail address, and Web page.",
              "**Address Tab**: Street address, P.O. Box, City, State/Province, Zip/Postal Code, and Country/Region.",
              "**Organization Tab**: **Job Title**, **Department** (e.g., `JTMK`), **Company**, and **Manager** (links the employee to their supervisor in the organizational chart)."
            ]
          },
          {
            icon: "🔐",
            title: "Account Tab, Profile Tab & Member Of Tab",
            desc: "Controlling when and where the user can log on, plus roaming profiles and group memberships.",
            bullets: [
              "**Account Tab**:",
              "• **Logon Hours...**: Restricts the exact days of the week and hours of the day the user is permitted to log in (e.g., Monday–Friday, 8:00 AM – 5:00 PM).",
              "• **Log On To...**: Restricts which specific client computer hostnames (workstations) the user is allowed to log into.",
              "• **Account Expires**: Sets an automatic expiration date for temporary contractors or interns.",
              "**Profile Tab**: Configures a **Roaming User Profile path** (`\\\\Svr01\\Profiles\\%username%`) so the user's desktop follows them to any PC, and a **Home Folder** mapped automatically to a drive letter (`H:`).",
              "**Member Of Tab**: Displays and manages all Active Directory Groups the user belongs to."
            ]
          }
        ]
      },
      {
        code: "4.2.3",
        subtopic: "4.2",
        title: "4.2.3 Trace User Account Policies",
        subtitle: "Enforcing Password Policy, Account Lockout Policy, and Kerberos Policy via Group Policy Management",
        concept: "**User Account Policies** protect the Active Directory domain against weak passwords and automated brute-force hacking attacks. In an AD domain, Account Policies are configured inside the **Default Domain Policy** using the **Group Policy Management Console (`gpmc.msc`)** under: `Computer Configuration -> Policies -> Windows Settings -> Security Settings -> Account Policies`.",
        features: [
          {
            icon: "🔑",
            title: "1. Password Policy (6 Settings)",
            desc: "Enforces strong, regularly rotated user passwords across the domain.",
            bullets: [
              "**Enforce password history**: Remembers up to 24 previous passwords so users cannot reuse old passwords.",
              "**Maximum password age**: Days before a password expires and must be changed (default: 42 days).",
              "**Minimum password age**: Minimum days (e.g., 1 day) a user must wait before changing their password again (so they cannot immediately cycle back to an old password).",
              "**Minimum password length**: Minimum character count (e.g., 8 or 12 characters).",
              "**Password must meet complexity requirements**: Requires at least 3 of 4 character types: Uppercase (`A-Z`), Lowercase (`a-z`), Digits (`0-9`), and Special Symbols (`!@#$%`), and must not contain the user's name.",
              "**Store passwords using reversible encryption**: Always kept **Disabled** for security."
            ]
          },
          {
            icon: "🛡️",
            title: "2. Account Lockout Policy (3 Settings) & 3. Kerberos Policy",
            desc: "Stops brute-force password guessing attacks automatically.",
            bullets: [
              "**Account lockout threshold**: Number of failed login attempts allowed before locking the account (e.g., **5 invalid logon attempts**).",
              "**Account lockout duration**: How many minutes a locked account remains locked before automatically unlocking (e.g., **30 minutes**, or `0` requiring an administrator to unlock it manually).",
              "**Reset account lockout counter after**: Minutes after a failed attempt before the failed counter resets to zero.",
              "**Kerberos Policy**: Controls ticket lifetimes and maximum clock skew tolerance (default 5 minutes) for domain authentication."
            ]
          }
        ]
      },
      {
        code: "4.2.4",
        subtopic: "4.2",
        title: "4.2.4 Trace Security Groups and Distribution Groups",
        subtitle: "Comparing Group Types (Security vs Distribution) and Group Scopes (Domain Local, Global, Universal - AGDLP)",
        concept: "Assigning permissions to individual users one-by-one is unmanageable in large organizations. Instead, administrators place users into **Groups**. Active Directory defines **2 Group Types** and **3 Group Scopes**.",
        features: [
          {
            icon: "🛡️",
            title: "Two Group Types: Security Groups vs Distribution Groups",
            desc: "Understanding which group type can be assigned permissions on files and folders.",
            bullets: [
              "**1. Security Group**: Assigned a unique **Security Identifier (SID)**. Used to **grant or deny access permissions (ACLs)** on Shared Folders, NTFS files, Printers, and Group Policy filters. Can *also* be used as an email list.",
              "**2. Distribution Group**: Does **NOT** have a Security Identifier (SID). Used **exclusively for email distribution lists** (e.g., in Microsoft Exchange). **Cannot** be used to assign file or folder permissions!"
            ]
          },
          {
            icon: "🌐",
            title: "Three Group Scopes & The Microsoft AGDLP Best Practice",
            desc: "How Domain Local, Global, and Universal groups work together.",
            bullets: [
              "**Global Group**: Organizes users from the **same domain** who share similar job roles (e.g., `G_Lecturers`, `G_Students`).",
              "**Domain Local Group**: Used to assign direct access permissions to **resources located in that domain** (e.g., `DL_Share_ReadWrite`).",
              "**Universal Group**: Can contain users and groups from **any domain across the entire Forest**.",
              "**AGDLP Best Practice Rule**: Put user **A**ccounts -> into **G**lobal Groups -> nest into **D**omain **L**ocal Groups -> assign **P**ermissions on the resource!"
            ]
          }
        ],
        tableTitle: "Comparison: Security Group vs Distribution Group in Active Directory",
        tableHeaders: ["Feature", "Security Group", "Distribution Group"],
        tableRows: [
          ["Has Security Identifier (SID)?", "**Yes**", "**No**"],
          ["Can Assign File/Folder Permissions?", "**Yes (Used in Share & NTFS ACLs)**", "**No (Cannot appear in permission lists)**"],
          ["Can Be Used for Email Lists?", "Yes (if mail-enabled)", "Yes (Primary purpose)"],
          ["Typical Example", "`G_JTMK_Lecturers`, `Domain Admins`", "`All_Campus_Staff_Newsletter`"]
        ]
      },

      // ====================================================================
      // SUBTOPIC 4.3: CONSTRUCT FILE MANAGEMENT AND SHARING IN WINDOWS SERVER
      // ====================================================================
      {
        code: "4.3.1",
        subtopic: "4.3",
        title: "4.3.1 Explain Different File Sharing Methods in Windows (a. Shared Folder, b. Mapped Network Drives, c. UNC)",
        subtitle: "How Windows Server publishes folders over SMB and how clients connect to them",
        concept: "Windows Server uses the **Server Message Block (SMB / CIFS)** protocol (TCP Port 445) to share directories over the network. Clients access these shared resources using either **UNC paths** or **Mapped Network Drives**.",
        features: [
          {
            icon: "📂",
            title: "a. Shared Folder & b. Mapped Network Drives",
            desc: "Publishing folders on the server and mounting them as local drive letters on client PCs.",
            bullets: [
              "**a. Shared Folder**: A directory on Windows Server exposed to network users via File Explorer (*Sharing / Advanced Sharing*) or *Server Manager -> File and Storage Services -> Shares*.",
              "**b. Mapped Network Drive**: Connects a remote network Shared Folder to a **local drive letter** (such as **`Z:`** or **`M:`**) on the client computer so it appears directly under *This PC* in File Explorer.",
              "• Created via GUI: *File Explorer -> This PC -> Map network drive*.",
              "• Created via CLI: `net use Z: \\\\SVR-DC01\\CourseNotes /persistent:yes`."
            ]
          },
          {
            icon: "🔗",
            title: "c. Universal Naming Convention (UNC) & Hidden Shares (`$`)",
            desc: "The standardized network path format used across Windows and Samba networks.",
            bullets: [
              "**UNC Syntax**: **`\\\\ServerName\\ShareName\\Subfolder\\File.ext`** or **`\\\\IP_Address\\ShareName`**.",
              "**Examples**: `\\\\SVR-DC01\\CourseNotes` or `\\\\192.168.56.102\\JTMK_Data`.",
              "**Hidden Shares (`$` Suffix)**: Appending a dollar sign **`$`** to the end of a Share Name (e.g., **`\\\\SVR-DC01\\Payroll$`**) creates a **Hidden Share**. It does not appear when users browse the server in Network Explorer, and can only be opened by typing the exact UNC path! (Windows also creates default administrative hidden shares like `C$`, `ADMIN$`, and `IPC$`)."
            ]
          }
        ]
      },
      {
        code: "4.3.2",
        subtopic: "4.3",
        title: "4.3.2 Construct Shared Folders in Windows Server",
        subtitle: "Three methods to create Shared Folders: File Explorer Advanced Sharing, Server Manager, and CLI (net share / PowerShell)",
        concept: "Administrators can create and publish Shared Folders in Windows Server using three official tools depending on whether they are configuring a single folder or managing enterprise file shares.",
        features: [
          {
            icon: "🪟",
            title: "Method 1: File Explorer (Advanced Sharing) & Method 2: Server Manager",
            desc: "Graphical procedures for creating a Shared Folder.",
            bullets: [
              "**Method 1 (Advanced Sharing in File Explorer)**:",
              "1. Create a folder (e.g., `C:\\JTMK_Share`), right-click it -> **Properties** -> **Sharing** tab.",
              "2. Click **Advanced Sharing...** -> Check **Share this folder**.",
              "3. Set the **Share name**, simultaneous user limit, and click **Permissions** to assign group access.",
              "**Method 2 (Server Manager — SMB Share Wizard)**:",
              "1. Open `Server Manager` -> **File and Storage Services -> Shares**.",
              "2. Click **Tasks -> New Share...** -> Choose **SMB Share - Quick** -> Select server & path -> Configure *Access-based enumeration* (hides files a user doesn't have permission to read) -> Set permissions -> Create."
            ]
          },
          {
            icon: "💻",
            title: "Method 3: Command Prompt (`net share`) & PowerShell (`New-SmbShare`)",
            desc: "Fast command-line creation and inspection of shared folders.",
            bullets: [
              "**View All Active Shares**: `net share` or `Get-SmbShare`.",
              "**Create Share via `net share`**: `net share JTMK_Share=C:\\JTMK_Share /GRANT:G_Lecturers,FULL /GRANT:G_Students,READ`",
              "**Create Share via PowerShell**: `New-SmbShare -Name \"JTMK_Share\" -Path \"C:\\JTMK_Share\" -FullAccess \"G_Lecturers\" -ReadAccess \"G_Students\"`"
            ]
          }
        ]
      },
      {
        code: "4.3.3",
        subtopic: "4.3",
        title: "4.3.3 Construct Permissions for Shared Folders to Control Access",
        subtitle: "How Share Permissions and NTFS Permissions work together (The 'Most Restrictive' & 'Explicit Deny' Rules)",
        concept: "When securing a Shared Folder in Windows Server, two independent permission layers apply: **Share Permissions** (configured on the *Sharing* tab, applying only over the network) and **NTFS Permissions** (configured on the *Security* tab, applying both locally and over the network). Try our **Interactive Windows Permission Simulator** in the Simulator tab!",
        features: [
          {
            icon: "⚖️",
            title: "The Three Golden Rules of Windows Share + NTFS Permissions",
            desc: "How Windows calculates a user's actual Effective Permission when accessing a shared folder.",
            bullets: [
              "**Rule 1 (Cumulative Within a Layer)**: If a user belongs to multiple groups, their permissions within Share (or within NTFS) are **combined (additive)** — e.g., Group A (`Read`) + Group B (`Change`) = `Change`.",
              "**Rule 2 (Explicit Deny Overrides Allow)**: An explicit **Deny** permission ALWAYS overrides any **Allow** permission.",
              "**Rule 3 (Share vs NTFS = MOST RESTRICTIVE Wins!)**: When comparing the resulting **Share Permission** against the resulting **NTFS Permission**, the **MORE RESTRICTIVE** permission becomes the final **Effective Permission**! (Example: Share = `Full Control` + NTFS = `Read` -> Effective Permission is **`Read`**)."
            ]
          },
          {
            icon: "🛡️",
            title: "Enterprise Best Practice for Configuring Shared Folder Access",
            desc: "Why leaving `Everyone = Read` on Share Permissions causes headaches.",
            bullets: [
              "**Best Practice**: Remove `Everyone` from Share Permissions, grant **`Authenticated Users = Full Control` (or `Change`)** at the Share level, and then use granular **NTFS Security Permissions** on the *Security* tab to control fine-grained access per subfolder and department group."
            ]
          }
        ],
        tableTitle: "Effective Permission Calculation Matrix (Share Permission vs NTFS Permission)",
        tableHeaders: ["Scenario", "Share Permission", "NTFS Permission", "Final Effective Permission", "Rule Applied"],
        tableRows: [
          ["Case 1", "Full Control", "Read & Execute", "**Read & Execute**", "Most Restrictive between Share & NTFS wins"],
          ["Case 2", "Read", "Full Control", "**Read**", "Blocked from writing by Share `Read` limit"],
          ["Case 3", "Change", "Modify", "**Change / Modify**", "Both layers allow reading, writing, modifying & deleting"],
          ["Case 4", "Full Control (Allow)", "Write (Deny)", "**Write Denied**", "Explicit Deny always overrides Allow"]
        ]
      },
      {
        code: "4.3.4",
        subtopic: "4.3",
        title: "4.3.4 Display Share File Permissions (a. Read, b. Write, c. Change, d. Full Control)",
        subtitle: "Exact capabilities granted by each permission level in Windows file sharing",
        concept: "Administrators must know the exact difference between **Read**, **Write**, **Change (Modify)**, and **Full Control** so they can grant users the minimum access needed to perform their duties.",
        features: [
          {
            icon: "📖",
            title: "a. Read & b. Write Permissions",
            desc: "Basic viewing vs creating new content.",
            bullets: [
              "**a. Read**: Allows users to **view folder names and filenames**, **open and read file contents**, and **execute program files**. Users *cannot* create, modify, or delete anything.",
              "**b. Write (NTFS / SMB)**: Allows users to **create new files and subfolders** inside the directory and **append/write data** to existing files, but does *not* allow deleting files."
            ]
          },
          {
            icon: "✏️",
            title: "c. Change (Modify) & d. Full Control Permissions",
            desc: "Full editing capabilities vs administrative ownership control.",
            bullets: [
              "**c. Change (Share) / Modify (NTFS)**: Includes everything in *Read* and *Write* **PLUS** the ability to **modify existing files and DELETE files and subfolders**.",
              "**d. Full Control**: Includes everything in *Change / Modify* **PLUS** the administrative right to **change file/folder permissions (ACLs)** and **take ownership** of NTFS files."
            ]
          }
        ],
        tableTitle: "Capabilities of Read, Write, Change, and Full Control Permissions",
        tableHeaders: ["Action Permitted", "a. Read", "b. Write", "c. Change / Modify", "d. Full Control"],
        tableRows: [
          ["View filenames & read file data", "✅ Yes", "❌ (Needs Read)", "✅ Yes", "✅ Yes"],
          ["Create new files & folders / Save edits", "❌ No", "✅ Yes", "✅ Yes", "✅ Yes"],
          ["Delete existing files & subfolders", "❌ No", "❌ No", "✅ Yes", "✅ Yes"],
          ["Change Permissions (ACL) & Take Ownership", "❌ No", "❌ No", "❌ No", "✅ Yes"]
        ]
      },
      {
        code: "4.3.5",
        subtopic: "4.3",
        title: "4.3.5 Construct Share Permissions for Specific Users or Groups",
        subtitle: "Assigning departmental role-based access (Lecturers vs Students) to a Windows Server Shared Folder",
        concept: "In a real organization or polytechnic environment, shared folders must never be left open to `Everyone` with full write access. Instead, administrators construct tailored Share and NTFS permissions for specific **Security Groups** (such as `G_Lecturers` and `G_Students`) or specific individual accounts.",
        features: [
          {
            icon: "👥",
            title: "Step-by-Step: Assigning Permissions to Specific Groups",
            desc: "Securing `C:\\CourseMaterials` so Lecturers can edit/upload and Students can only read/download.",
            bullets: [
              "**Step 1**: Right-click `C:\\CourseMaterials` -> **Properties** -> **Sharing** tab -> **Advanced Sharing** -> **Permissions**.",
              "**Step 2**: Select the default **`Everyone`** group and click **Remove**.",
              "**Step 3**: Click **Add...** -> Type **`G_Lecturers`** -> Click **Check Names** -> Click OK. Check **Allow** for **Change** and **Read**.",
              "**Step 4**: Click **Add...** -> Type **`G_Students`** -> Click OK. Check **Allow** for **Read** only.",
              "**Step 5**: Click **Add...** -> Type **`Administrators`** -> Check **Allow** for **Full Control**. Repeat matching permissions on the **Security (NTFS)** tab and click **Apply**."
            ]
          }
        ]
      }
    ],
    labs: [
      {
        id: "lab-4-1",
        title: "Lab 4A: Installing Active Directory (AD DS), DNS & Building OUs, Users and Groups",
        subtitle: "Covers 4.1.1, 4.1.2 & 4.2.1–4.2.4 — Promoting Windows Server to a Domain Controller and managing AD objects",
        steps: [
          {
            title: "Install Active Directory Domain Services (AD DS) & DNS Server Roles",
            desc: "In Windows Server Manager, click `Manage` -> `Add Roles and Features` -> select `Active Directory Domain Services` and `DNS Server`, or run the following PowerShell command as Administrator:",
            cmd: "PS C:\\Users\\Administrator> Install-WindowsFeature AD-Domain-Services, DNS -IncludeManagementTools\n\nSuccess Restart Needed Exit Code      Feature Result\n------- -------------- ---------      --------------\nTrue    No             Success        {Active Directory Domain Services, DNS Server}",
            why: "Installing the AD DS binaries and DNS Server prepares the server to be promoted to a Domain Controller."
          },
          {
            title: "Promote Server to a Domain Controller (Create New Forest `jtmk.local`)",
            desc: "Click the yellow notification flag in Server Manager -> `Promote this server to a domain controller` -> Select `Add a new forest` -> Root domain name: `jtmk.local` -> Set DSRM password -> Install.",
            cmd: "# Or execute via PowerShell:\nPS C:\\Users\\Administrator> Install-ADDSForest -DomainName \"jtmk.local\" -InstallDns",
            why: "Promoting the server creates the `jtmk.local` Forest and Domain, initializes the `ntds.dit` database, and configures DNS SRV records."
          },
          {
            title: "Create Organizational Unit (`OU=JTMK`), Security Groups & Domain Users",
            desc: "Open `Active Directory Users and Computers` (`dsa.msc`). Create an OU named `JTMK`, two Global Security Groups (`G_Lecturers` and `G_Students`), and user accounts with configured Logon Hours and Department attributes.",
            cmd: "# PowerShell Active Directory Module Equivalent:\nNew-ADOrganizationalUnit -Name \"JTMK\" -Path \"DC=jtmk,DC=local\"\nNew-ADGroup -Name \"G_Lecturers\" -GroupScope Global -GroupCategory Security -Path \"OU=JTMK,DC=jtmk,DC=local\"\nNew-ADGroup -Name \"G_Students\" -GroupScope Global -GroupCategory Security -Path \"OU=JTMK,DC=jtmk,DC=local\"\nNew-ADUser -Name \"Azrulnizam\" -SamAccountName \"azrul\" -UserPrincipalName \"azrul@jtmk.local\" -Department \"JTMK\" -Path \"OU=JTMK,DC=jtmk,DC=local\" -Enabled $true\nAdd-ADGroupMember -Identity \"G_Lecturers\" -Members \"azrul\"",
            why: "Organizing accounts inside `OU=JTMK` and assigning them to Security Groups enables clean role-based access control and Group Policy management."
          }
        ]
      },
      {
        id: "lab-4-2",
        title: "Lab 4B: Constructing Shared Folders, Group Permissions, UNC Access & Mapped Drives",
        subtitle: "Covers 4.3.1–4.3.5 — Creating a departmental shared folder, assigning group permissions, and mapping drive Z:",
        steps: [
          {
            title: "Create Directory & Configure Specific Group Share Permissions",
            desc: "Create `C:\\CourseNotes` on Windows Server and share it as `CourseNotes`, granting `Administrators = Full Control`, `G_Lecturers = Change`, and `G_Students = Read`.",
            cmd: "C:\\Users\\Administrator> mkdir C:\\CourseNotes\nC:\\Users\\Administrator> net share CourseNotes=C:\\CourseNotes /GRANT:Administrators,FULL /GRANT:G_Lecturers,CHANGE /GRANT:G_Students,READ\nCourseNotes was shared successfully.",
            why: "Granting `Change` to Lecturers and `Read` to Students ensures students can view and download learning materials without accidentally modifying or deleting them."
          },
          {
            title: "Verify NTFS Permissions & Map Network Drive (`Z:`) via UNC Path",
            desc: "From a client workstation, test accessing the share via its UNC path (`\\\\192.168.56.102\\CourseNotes`) and map it persistently to drive letter `Z:`.",
            cmd: "C:\\Users\\Student> net use Z: \\\\192.168.56.102\\CourseNotes /persistent:yes\nThe command completed successfully.\n\nC:\\Users\\Student> dir Z:\\",
            why: "`/persistent:yes` reconnects the mapped `Z:` drive automatically every time the user logs into Windows."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "In Active Directory Domain Services (AD DS), which logical component acts as the top-level **security boundary** and can contain one or more Domain Trees?",
        options: ["Organizational Unit (OU)", "Forest", "Site", "Workgroup"],
        answer: 1,
        explanation: "A Forest is the highest level in Active Directory hierarchy, representing the ultimate security boundary and sharing a common Schema and Global Catalog."
      },
      {
        q: "What are the two main reasons administrators create **Organizational Units (OUs)** inside an Active Directory Domain?",
        options: [
          "To increase CPU clock speed and format hard disks",
          "To link Group Policy Objects (GPOs) to specific departments and to delegate administrative control",
          "To replace the DNS and DHCP server roles",
          "To disable network encryption"
        ],
        answer: 1,
        explanation: "OUs are designed to organize objects logically so administrators can apply targeted Group Policies (GPOs) and delegate specific administrative tasks to departmental staff."
      },
      {
        q: "What is the 4-step communication sequence used by a DHCP Client and DHCP Server to automatically lease an IP address?",
        options: [
          "SYN -> SYN-ACK -> ACK -> FIN",
          "DORA (Discover -> Offer -> Request -> Acknowledge)",
          "PING -> PONG -> LEASE -> RENEW",
          "GET -> POST -> PUT -> DELETE"
        ],
        answer: 1,
        explanation: "DHCP IP address allocation follows the DORA process: DHCP Discover, DHCP Offer, DHCP Request, and DHCP Acknowledge."
      },
      {
        q: "In Windows DNS Server, which resource record in a Forward Lookup Zone maps a hostname to a 32-bit IPv4 address?",
        options: ["MX Record", "A (Host) Record", "PTR (Pointer) Record", "CNAME Record"],
        answer: 1,
        explanation: "An `A` record maps a hostname to an IPv4 address (`AAAA` maps to IPv6, `PTR` is used in Reverse Lookup Zones, and `MX` specifies mail servers)."
      },
      {
        q: "What is the critical difference between a **Security Group** and a **Distribution Group** in Active Directory?",
        options: [
          "Security Groups have a Security Identifier (SID) and can be assigned permissions on shared folders, whereas Distribution Groups are only for email lists",
          "Distribution Groups can only contain computer accounts",
          "Security Groups cannot contain more than 5 users",
          "Distribution Groups are used to configure Windows Firewall"
        ],
        answer: 0,
        explanation: "Only Security Groups have a SID and can be added to Access Control Lists (ACLs) to control permissions on files, shared folders, and printers."
      },
      {
        q: "Which of the following is a valid **Universal Naming Convention (UNC)** path to access a shared folder named `LabFiles` on a server named `WIN-SVR01`?",
        options: [
          "http://WIN-SVR01/LabFiles",
          "\\\\WIN-SVR01\\LabFiles",
          "C:\\WIN-SVR01\\LabFiles",
          "//WIN-SVR01:LabFiles"
        ],
        answer: 1,
        explanation: "A standard Windows UNC path always starts with two backslashes followed by the server name (or IP) and share name: `\\\\ServerName\\ShareName`."
      },
      {
        q: "How do you configure a Windows Shared Folder as a **Hidden Share** so it does not appear when users browse the server in Network Explorer?",
        options: [
          "Start the share name with a dot (`.`)",
          "Append a dollar sign (`$`) to the end of the Share Name (e.g., `AdminData$`)",
          "Rename the folder using all lowercase letters",
          "Turn off the DNS Server role"
        ],
        answer: 1,
        explanation: "Adding a `$` suffix to the Share Name (e.g., `\\\\SVR01\\Secret$`) hides the share from network browsing while still allowing direct UNC access."
      },
      {
        q: "A user is granted **Share Permission = Full Control**, and **NTFS Security Permission = Read** on a shared folder. When the user connects to the folder over the network via UNC, what is their **Effective Permission**?",
        options: ["Full Control", "Change / Modify", "Read only", "No Access"],
        answer: 2,
        explanation: "When combining Share Permissions and NTFS Permissions for network access, the **Most Restrictive** permission wins — therefore the user gets **Read** only."
      }
    ]
  },

  // ========================================================================
  // TOPIC 5.0: RISK MANAGEMENT AND MAINTENANCE OF SERVER
  // ========================================================================
  {
    id: "topik-5",
    code: "TOPIC 5.0",
    shortTitle: "Risk Management & Maintenance",
    title: "5.0 Risk Management and Maintenance of Server",
    clo: "CLO 2 & CLO 3 (A3, PLO11 - Ethics & Responsibility)",
    slt: "16 Hours (Backup & Disaster Recovery Procedures + Linux & Windows System Reporting)",
    summary: "Execute server risk management and disaster recovery procedures: identifying critical backup data (5.1.1), backup hardware media (5.1.2), recovery frequency metrics RPO/RTO (5.1.3), comparing Full, Differential, Incremental, and Imaging backups (5.1.4), performing backup/restore with tar, dump, and Windows Server Backup (5.1.5), and generating system health reports in Linux (5.2.1 ps, lsof, ntop, parted; 5.2.2 kill) and Windows Server (5.2.3 Task Manager, Performance Monitor, Resource Monitor, Reliability Monitor).",
    heroStats: [
      { percent: "5.1", title: "Risk Mgmt & Server Backup", desc: "5.1.1–5.1.5 Data, Hardware, Full/Diff/Inc/Image, tar, dump, WSB" },
      { percent: "5.2", title: "System Reports & Monitoring", desc: "5.2.1 ps/lsof/ntop/parted, 5.2.2 kill, 5.2.3 Windows Monitors" }
    ],
    hasInteractiveSim: "backup-strategy-sim",
    notes: [
      // ====================================================================
      // SUBTOPIC 5.1: PERFORM RISK MANAGEMENT PROCEDURES FOR PROTECTING SERVERS
      // ====================================================================
      {
        code: "5.1.1",
        subtopic: "5.1",
        title: "5.1.1 Display the Data That Needs to Be Backed Up",
        subtitle: "Prioritizing critical server configurations, databases, user directories, and system state data",
        concept: "Servers face constant risks including hardware disk failure, ransomware cyberattacks, power surges, natural disasters, and human error. A disciplined **Risk Management & Backup Plan** begins by identifying which server data is irreplaceable and must be backed up regularly.",
        features: [
          {
            icon: "💎",
            title: "Critical Data Categories on Linux & Windows Servers",
            desc: "What every system administrator must include in the backup scope.",
            bullets: [
              "**1. System & Service Configuration Files**: The `/etc` directory on Linux, and **System State Data** on Windows Server (which includes the **Active Directory database `ntds.dit`, SYSVOL, Registry, Boot Files, and Certificate Services**).",
              "**2. Application & Database Data**: Production SQL databases (`/var/lib/mysql`, `/var/lib/postgresql`, Microsoft SQL Server `.mdf`/`.ldf`) and Web Root directories (`/var/www`, `C:\\inetpub\\wwwroot`).",
              "**3. User & Departmental Files**: User home directories (`/home`, `/root`) and enterprise Shared Folders (`/srv`, `C:\\Shares`).",
              "**4. Security & Audit Logs**: `/var/log` and Windows Event Logs (`.evtx`) required for legal compliance and forensic investigation."
            ]
          },
          {
            icon: "🚫",
            title: "What Should Be Excluded from Regular File Backups",
            desc: "Saving storage space by skipping temporary and virtual kernel filesystems.",
            bullets: [
              "Exclude `/tmp`, `/proc`, `/sys`, `/dev`, `/run`, swap files, and browser caches."
            ]
          }
        ]
      },
      {
        code: "5.1.2",
        subtopic: "5.1",
        title: "5.1.2 Display the Hardware Used for the Backup Process",
        subtitle: "Evaluating Magnetic Tape (LTO), NAS, SAN, RAID Arrays, External Drives, and Cloud Storage",
        concept: "Storing a backup on the exact same physical hard drive as the production OS is useless if that drive dies! Administrators select dedicated **Backup Storage Hardware** based on capacity, speed, durability, and the industry-standard **3-2-1 Backup Rule** (**3** copies of data, on **2** different media types, with **1** copy stored off-site).",
        features: [
          {
            icon: "💽",
            title: "Local & Network Backup Hardware (DAS, NAS, SAN, RAID)",
            desc: "High-speed disk-based backup targets for rapid daily restores.",
            bullets: [
              "**External HDD / SSD & RDX Removable Cartridges**: Direct-Attached Storage (DAS) via USB 3.2 / eSATA for small standalone servers.",
              "**NAS (Network Attached Storage)**: Dedicated file-level storage appliance accessed over Ethernet via NFS or SMB/CIFS.",
              "**SAN (Storage Area Network)**: High-speed block-level enterprise storage using Fibre Channel or iSCSI.",
              "**RAID (Redundant Array of Independent Disks)**: Protects against physical disk failure using disk mirroring (**RAID 1**), striping with parity (**RAID 5 / RAID 6**), or **RAID 10**. *(Note: RAID provides hardware fault tolerance, NOT protection against accidental file deletion or ransomware!)*"
            ]
          },
          {
            icon: "📼",
            title: "Archival Tape Drives (LTO) & Off-Site Cloud Backup",
            desc: "Long-term archival retention and disaster-proof off-site storage.",
            bullets: [
              "**Magnetic Tape Drives & Autoloaders (LTO Ultrium)**: Lowest cost per Terabyte, air-gapped immunity against online ransomware, and 30-year archival shelf life (`/dev/st0` in Linux).",
              "**Cloud Backup Storage**: Amazon S3 / Glacier, Microsoft Azure Backup, Google Cloud Storage for automated geographic redundancy."
            ]
          }
        ],
        tableTitle: "Comparison of Server Backup Hardware Media (Subtopic 5.1.2)",
        tableHeaders: ["Backup Hardware", "Restore Speed", "Cost per TB", "Best Use Case"],
        tableRows: [
          ["External SSD / HDD (DAS)", "Fast", "Low–Medium", "Quick local backups for single small servers"],
          ["NAS / SAN (with RAID)", "Very Fast (LAN)", "Medium–High", "Centralized nightly backups for multiple virtual & physical servers"],
          ["LTO Magnetic Tape Drive", "Slow (Sequential)", "Lowest (Bulk)", "Long-term archival compliance & offline air-gapped ransomware protection"],
          ["Cloud Storage (S3 / Azure)", "Depends on Internet BW", "Pay-as-you-go", "Off-site disaster recovery (survives fire/flood at main building)"]
        ]
      },
      {
        code: "5.1.3",
        subtopic: "5.1",
        title: "5.1.3 Display the Frequency for Data to Be Recovered (RPO & RTO)",
        subtitle: "Determining backup schedules based on Recovery Point Objective (RPO) and Recovery Time Objective (RTO)",
        concept: "How often should a server be backed up — every 15 minutes, every night, or once a week? In enterprise risk management, backup frequency is governed by two critical metrics: **RPO (Recovery Point Objective)** and **RTO (Recovery Time Objective)**.",
        features: [
          {
            icon: "⏱️",
            title: "RPO vs RTO Explained Clearly",
            desc: "Measuring acceptable data loss (time) vs acceptable downtime (recovery speed).",
            bullets: [
              "**RPO (Recovery Point Objective — 'How much data can we afford to lose?')**: The maximum age of files that must be recovered from backup for normal operations to resume. *Example*: If a bank sets **RPO = 1 hour**, backups must run **at least every 1 hour**.",
              "**RTO (Recovery Time Objective — 'How fast must the server be back online?')**: The maximum tolerable length of time a server can remain down after a failure before causing severe business damage."
            ]
          },
          {
            icon: "📅",
            title: "Standard Enterprise Backup Rotation Schedules",
            desc: "Aligning backup frequency with how rapidly data changes.",
            bullets: [
              "**High-Transaction Databases (Banking / E-Commerce)**: Continuous replication + Hourly transaction log backups.",
              "**Departmental File & Active Directory Servers**: **Weekly Full Backup** (Sunday 1:00 AM) + **Daily Differential or Incremental Backup** (Monday–Saturday 11:00 PM).",
              "**Grandfather-Father-Son (GFS) Rotation**: Keeps Daily (*Son*), Weekly (*Father*), and Monthly (*Grandfather*) backup sets."
            ]
          }
        ]
      },
      {
        code: "5.1.4",
        subtopic: "5.1",
        title: "5.1.4 Display the Various Types of Backups (a. Full, b. Differential, c. Incremental, d. Imaging)",
        subtitle: "Comprehensive comparison of backup speed, storage footprint, Archive Bit behavior, and restore complexity",
        concept: "Understanding the exact mechanics of **Full**, **Differential**, **Incremental**, and **Imaging** backups is one of the most important topics in **DFK40063** (heavily tested in quizzes, case studies, and final exams). Test different crash scenarios interactively in the **Simulator Tab**!",
        features: [
          {
            icon: "📦",
            title: "a. Full Backup & d. Imaging Backup",
            desc: "Complete self-contained copies of selected data or entire disks.",
            bullets: [
              "**a. Full Backup**: Backs up **100% of all selected files and folders**, regardless of whether they changed since the last backup, and **clears (resets) the Archive Bit**. *Pros*: **Fastest and simplest Restore (requires only 1 backup set)**. *Cons*: Slowest backup time and consumes the most storage space.",
              "**d. Imaging / Bare-Metal Backup**: Captures a block-level snapshot of the **entire hard disk** (including boot sectors, partition table, OS, installed applications, settings, and data) as a single image file. Allows restoring a dead server onto a brand-new blank hard drive in minutes."
            ]
          },
          {
            icon: "📈",
            title: "b. Differential Backup vs c. Incremental Backup",
            desc: "Fast daily backups that run on weekdays after a Sunday Full Backup.",
            bullets: [
              "**b. Differential Backup (Cumulative since last Full)**: Backs up all files that have changed **SINCE THE LAST FULL BACKUP**. It **DOES NOT clear the Archive Bit**, so each day's Differential file grows larger as the week progresses. **To Restore**: You need **ONLY 2 SETS** — **(1) The last Full Backup + (2) The latest Differential Backup**.",
              "**c. Incremental Backup (Changes since ANY last backup)**: Backs up only files that have changed **SINCE THE MOST RECENT BACKUP OF ANY TYPE (Full or previous Incremental)** and **clears the Archive Bit**. *Pros*: **Fastest backup time & smallest storage size**. *Cons*: **Slowest Restore** — you must restore **(1) The last Full Backup + (2) EVERY single Incremental Backup in chronological order** up to the day of failure!"
            ]
          }
        ],
        tableTitle: "Master Comparison Table: Full vs Differential vs Incremental vs Imaging Backup",
        tableHeaders: ["Criterion", "a. Full Backup", "b. Differential Backup", "c. Incremental Backup", "d. Imaging Backup"],
        tableRows: [
          ["What Is Backed Up?", "All selected files & folders", "All changes since **last Full Backup**", "Only changes since **last backup (Full or Inc)**", "Entire disk (OS, boot sector, apps & data)"],
          ["Backup Speed", "Slow", "Moderate (grows slower each day)", "**Fastest**", "Slow"],
          ["Storage Space Used", "Largest", "Medium (Cumulative)", "**Smallest (Most storage-efficient)**", "Large (Full disk image)"],
          ["Restore Speed", "**Fastest (1 Set)**", "Fast (**Always 2 Sets**: Full + Latest Diff)", "Slowest (Full + **Every** Incremental in order)", "Fastest for full OS bare-metal recovery"],
          ["Clears Archive Bit?", "Yes (Clears bit)", "**No (Does NOT clear bit)**", "Yes (Clears bit)", "N/A (Block-level snapshot)"]
        ]
      },
      {
        code: "5.1.5",
        subtopic: "5.1",
        title: "5.1.5 Construct Simple Backup and Restore Files in Linux and Windows Server (a. Tar, b. Dump, c. Windows Server Backup)",
        subtitle: "Hands-on commands and tools for archiving and restoring server data on both platforms",
        concept: "Administrators must be able to execute practical backup and restore operations using native Linux command-line utilities (`tar` and `dump`/`restore`) as well as Microsoft's built-in **Windows Server Backup (`wbadmin`)** feature.",
        features: [
          {
            icon: "🐧",
            title: "a. Linux `tar` (Tape Archive) & b. Linux `dump` / `restore`",
            desc: "Standard Linux utilities for file/directory archiving and filesystem-level incremental backups.",
            bullets: [
              "**a. `tar` (Tape Archive)**: Combines multiple files/directories into a single archive (`.tar`) and optionally compresses it with `gzip` (`.tar.gz` / `.tgz`), `bzip2` (`.tar.bz2`), or `xz` (`.tar.xz`).",
              "• **Create Compressed Backup (`-czvf`)**: **`sudo tar -czvf /var/backups/etc_backup.tar.gz /etc`** (`-c` = create, `-z` = gzip, `-v` = verbose, `-f` = file).",
              "• **List Contents Without Extracting (`-tzvf`)**: `tar -tzvf /var/backups/etc_backup.tar.gz`.",
              "• **Restore / Extract Archive (`-xzvf`)**: **`sudo tar -xzvf /var/backups/etc_backup.tar.gz -C /tmp/restore`** (`-x` = extract, `-C` = target folder).",
              "**b. `dump` and `restore`**: Filesystem-level backup tools for `ext2/ext3/ext4` supporting backup levels **`0` (Full Backup)** through **`1–9` (Incremental/Differential levels)** tracked in `/etc/dumpdates`.",
              "• **Backup with `dump`**: `sudo dump -0uf /var/backups/home_full.dump /home` (`-0` = Level 0 Full, `-u` = update `/etc/dumpdates`, `-f` = output file).",
              "• **Restore with `restore`**: `sudo restore -rf /var/backups/home_full.dump` (or `restore -if` for interactive restore)."
            ]
          },
          {
            icon: "🪟",
            title: "c. Windows Server Backup (`wbadmin.msc` & `wbadmin` CLI)",
            desc: "Built-in feature in Windows Server for backing up Volumes, System State, and Bare-Metal Recovery.",
            bullets: [
              "**Installation**: `Server Manager` -> `Add Roles and Features` -> `Features` -> Check **Windows Server Backup** -> Install (or `Install-WindowsFeature Windows-Server-Backup` in PowerShell).",
              "**GUI Backup (`wbadmin.msc`)**: Open `Tools -> Windows Server Backup` -> Click **Local Backup** -> Choose **Backup Schedule...** (automated daily backups) or **Backup Once...** (immediate backup) -> Select *Full Server* or *Custom (System State / specific volumes)* -> Select destination disk or network share.",
              "**GUI Restore**: Click **Recover...** in the Actions pane -> Select backup date -> Choose *Files and folders*, *Volumes*, or *System State*.",
              "**CLI Backup Command**: `wbadmin start backup -backupTarget:E: -include:C:\\Shares -quiet`"
            ]
          }
        ]
      },

      // ====================================================================
      // SUBTOPIC 5.2: PERFORM SYSTEM REPORT IN LINUX AND WINDOWS SERVER
      // ====================================================================
      {
        code: "5.2.1",
        subtopic: "5.2",
        title: "5.2.1 Display System Report in Linux Server (a. `ps`, b. `lsof`, c. `ntop`, d. `parted`)",
        subtitle: "Inspecting active processes, open files/network sockets, live network traffic, and disk partition tables",
        concept: "Proactive server maintenance requires generating system reports to monitor CPU/RAM processes, open files and network ports, bandwidth consumption, and storage partition health.",
        features: [
          {
            icon: "⚙️",
            title: "a. Process Status (`ps`) & b. List Open Files (`lsof`)",
            desc: "Auditing running processes and the files or network ports they hold open.",
            bullets: [
              "**a. `ps` (Process Status)**: Captures a snapshot of currently running processes.",
              "• **`ps aux`** (BSD syntax) or **`ps -ef`** (System V syntax): Lists **all processes from all users**, displaying `USER`, **`PID` (Process ID)**, `%CPU`, `%MEM`, `STAT`, `START`, and `COMMAND`.",
              "**b. `lsof` (List Open Files)**: Because everything in Linux is a file (including network sockets, pipes, and devices), `lsof` reveals which processes are using which files or ports!",
              "• **`sudo lsof -i`** (or **`sudo lsof -i :22`**): Lists all open network connections or shows which process is listening on TCP port 22.",
              "• **`lsof -u student`**: Lists all files opened by user `student`; **`lsof /var/log/syslog`** shows which process is writing to a file."
            ]
          },
          {
            icon: "📊",
            title: "c. `ntop` (Network Top) & d. `parted` (Partition Editor Report)",
            desc: "Monitoring network traffic protocols and reporting hard disk partition structures.",
            bullets: [
              "**c. `ntop` / `ntopng` (Network Top)**: Monitors live network traffic and bandwidth usage in real time, categorizing traffic by IP address, MAC address, throughput, and application protocol (HTTP, SSH, DNS, SMB) via a web dashboard (`http://server-ip:3000`) or terminal (`top`/`htop` for CPU/RAM).",
              "**d. `parted` (GNU Partition Editor)**: Generates detailed storage reports showing all attached disks (`/dev/sda`, `/dev/sdb`), total disk size, sector sizes, **Partition Table type (`gpt` vs `msdos`/MBR)**, filesystem type (`ext4`, `xfs`, `fat32`), and boot flags.",
              "• **Report Command**: **`sudo parted -l`** (lists partition layout for all block devices)."
            ]
          }
        ],
        tableTitle: "Summary of Linux System Reporting Utilities (Subtopic 5.2.1)",
        tableHeaders: ["Utility", "Full Name", "Key Command Syntax", "Information Reported"],
        tableRows: [
          ["`ps`", "Process Status", "`ps aux` or `ps -ef`", "Running processes, Owner, **PID**, `%CPU`, `%MEM`, Command path"],
          ["`lsof`", "List Open Files", "`sudo lsof -i :80` / `lsof -u user`", "Open files, locked directories, and active TCP/UDP network sockets"],
          ["`ntop`", "Network Top", "`ntop` / `ntopng`", "Real-time network bandwidth usage, active hosts, and protocol breakdown"],
          ["`parted`", "Partition Editor", "`sudo parted -l`", "Disk model, capacity, GPT/MBR partition table, and filesystem layout"]
        ]
      },
      {
        code: "5.2.2",
        subtopic: "5.2",
        title: "5.2.2 Trace Terminate Process Using `kill`",
        subtitle: "Identifying runaway or hung processes by PID and terminating them using kill signals (SIGTERM vs SIGKILL)",
        concept: "When a server process freezes (becomes unresponsive) or consumes 100% CPU, administrators locate its **PID (Process ID)** using `ps aux`, `pgrep`, or `top`, and send a termination signal using the **`kill`** command.",
        features: [
          {
            icon: "🛑",
            title: "Important `kill` Signals (`-1`, `-15`, `-9`)",
            desc: "Syntax: `kill [signal] <PID>` (use `kill -l` to list all 64 Linux signals).",
            bullets: [
              "**1. `kill <PID>` or `kill -15 <PID>` (`SIGTERM` — Signal 15, Default)**: Sends a polite **graceful termination** request. Allows the process to save open files, close database connections cleanly, and exit safely.",
              "**2. `kill -9 <PID>` (`SIGKILL` — Signal 9, Force Kill)**: Immediately **forces the Linux Kernel to terminate the process** without cleanup. Use `kill -9` when a hung process ignores a standard `kill -15`!",
              "**3. `kill -1 <PID>` (`SIGHUP` — Signal 1, Hangup/Reload)**: Instructs a daemon to reload its configuration file without stopping the service."
            ]
          },
          {
            icon: "⚡",
            title: "Killing Processes by Name (`killall` & `pkill`)",
            desc: "Convenient alternatives when you know the process name.",
            bullets: [
              "**`sudo killall apache2`**: Terminates all processes named `apache2`.",
              "**`sudo pkill -9 python3`**: Force-kills processes matching the pattern `python3`."
            ]
          }
        ]
      },
      {
        code: "5.2.3",
        subtopic: "5.2",
        title: "5.2.3 Display System Report in Windows Server Using Built-in Tools",
        subtitle: "Mastering (a) Task Manager, (b) Performance Monitor, (c) Resource Monitor, and (d) Reliability Monitor",
        concept: "Windows Server includes four powerful built-in graphical diagnostic and reporting tools. Each tool serves a distinct purpose ranging from instant process control to long-term performance counter logging and historical stability scoring.",
        features: [
          {
            icon: "📊",
            title: "a. Task Manager (`taskmgr`) & c. Resource Monitor (`resmon`)",
            desc: "Real-time live monitoring of applications, services, hardware usage, and file/network locks.",
            bullets: [
              "**a. Task Manager (`taskmgr.exe` / `Ctrl + Shift + Esc`)**:",
              "• Provides a quick real-time overview across tabs: **Processes** (CPU/Memory/Disk/Network usage per app & *End Task* button), **Performance** (live utilization graphs), **Users** (active RDP/local sessions), **Details** (PID & priority), and **Services** (start/stop Windows services).",
              "**c. Resource Monitor (`resmon.exe`)**:",
              "• Provides **deep, granular real-time diagnostics** across 4 tabs: **CPU** (per-core usage & *Associated Handles* to see which process locked a file), **Memory** (Hard Faults/sec & physical RAM allocation), **Disk** (read/write bytes/sec per file & queue length), and **Network** (TCP connections & **Listening Ports** with Firewall status)."
            ]
          },
          {
            icon: "🩺",
            title: "b. Performance Monitor (`perfmon`) & d. Reliability Monitor (`perfmon /rel`)",
            desc: "Scheduled metric logging, threshold alerts, and chronological system stability history.",
            bullets: [
              "**b. Performance Monitor (`perfmon.exe`)**:",
              "• Enterprise analysis tool using thousands of **Performance Counters** (e.g., *Processor: % Processor Time*, *Memory: Available MBytes*, *PhysicalDisk: Avg. Disk Queue Length*).",
              "• Features **Data Collector Sets** to record baseline performance logs over days/weeks, generate System Diagnostics reports, and trigger automated **Performance Alerts** when thresholds are exceeded.",
              "**d. Reliability Monitor (`perfmon /rel` or search *View reliability history*)**:",
              "• Tracks system stability on a **day-by-day calendar timeline** and calculates a **System Stability Index score from `1` (least stable) to `10` (most stable)**.",
              "• Highlights **Application Failures (crashes)**, **Windows Failures (BSODs)**, **Miscellaneous Failures**, **Warnings**, and **Informational events** (such as driver or Windows Update installations) so admins can see exactly what change caused a server to become unstable!"
            ]
          }
        ],
        tableTitle: "Comparison of the 4 Windows Server Built-in Reporting Tools (Subtopic 5.2.3)",
        tableHeaders: ["Built-in Tool", "Run Command", "Primary Purpose & Unique Feature"],
        tableRows: [
          ["a. Task Manager", "`taskmgr`", "Quick live overview of running apps, CPU/RAM/Disk/NIC % & ending hung tasks"],
          ["b. Performance Monitor", "`perfmon`", "Tracks specific **Performance Counters** & records long-term **Data Collector Sets / Alerts**"],
          ["c. Resource Monitor", "`resmon`", "Deep real-time inspection of per-process Disk I/O, Locked File Handles & Listening TCP Ports"],
          ["d. Reliability Monitor", "`perfmon /rel`", "Displays **Stability Index (1–10)** timeline correlating crashes with software/driver updates"]
        ]
      }
    ],
    labs: [
      {
        id: "lab-5-1",
        title: "Lab 5A: Server Backup & Restore Using `tar`, `dump`, and Windows Server Backup",
        subtitle: "Covers 5.1.1–5.1.5 — Creating compressed archives, verifying integrity, and restoring lost configuration files",
        steps: [
          {
            title: "Create a Full Compressed Backup of `/etc` Using `tar -czvf`",
            desc: "Create a dedicated backup directory `/var/backups/server` and archive the entire `/etc` configuration folder into a gzip-compressed `.tar.gz` file.",
            cmd: "student@ubuntu-svr:~$ sudo mkdir -p /var/backups/server\nstudent@ubuntu-svr:~$ sudo tar -czvf /var/backups/server/etc_full_backup.tar.gz /etc\ntar: Removing leading `/' from member names\n/etc/\n/etc/passwd\n/etc/group\n/etc/hosts\n...\nstudent@ubuntu-svr:~$ ls -lh /var/backups/server/\n-rw-r--r-- 1 root root 1.8M Oct 28 11:30 etc_full_backup.tar.gz",
            why: "`-c` creates the archive, `-z` compresses it with gzip, `-v` lists processed files, and `-f` specifies the output archive filename."
          },
          {
            title: "Verify Archive Contents & Restore (`tar -xzvf`) to a Recovery Directory",
            desc: "Inspect the archive contents with `tar -tzvf` and extract the files into `/tmp/recovery_test` using the `-C` flag.",
            cmd: "student@ubuntu-svr:~$ tar -tzvf /var/backups/server/etc_full_backup.tar.gz | head -n 5\nstudent@ubuntu-svr:~$ mkdir -p /tmp/recovery_test\nstudent@ubuntu-svr:~$ sudo tar -xzvf /var/backups/server/etc_full_backup.tar.gz -C /tmp/recovery_test\nstudent@ubuntu-svr:~$ ls -l /tmp/recovery_test/etc/hosts",
            why: "Extracting to a staging directory (`/tmp/recovery_test`) allows you to inspect and copy back individual damaged files safely."
          },
          {
            title: "Perform Filesystem Backup with `dump` & Windows Server Backup (`wbadmin`)",
            desc: "Run a Level 0 full backup of `/home` using `dump` on Linux, and execute a volume backup on Windows Server using `wbadmin`.",
            cmd: "# On Linux Server (Level 0 Full Dump):\nstudent@ubuntu-svr:~$ sudo dump -0uf /var/backups/server/home_lvl0.dump /home\n\n# On Windows Server (Install & Run Backup):\nPS C:\\Users\\Administrator> Install-WindowsFeature Windows-Server-Backup\nPS C:\\Users\\Administrator> wbadmin start backup -backupTarget:E: -include:C:\\CourseNotes -quiet",
            why: "`dump -0uf` records a full filesystem backup level 0 in `/etc/dumpdates`, while `wbadmin` creates a shadow-copy volume backup on Windows Server."
          }
        ]
      },
      {
        id: "lab-5-2",
        title: "Lab 5B: Generating System Reports (`ps`, `lsof`, `ntop`, `parted`), Killing Processes & Windows Monitors",
        subtitle: "Covers 5.2.1, 5.2.2 & 5.2.3 — Auditing processes, open ports, disk partitions, and terminating runaway tasks",
        steps: [
          {
            title: "Generate Linux Process (`ps aux`), Open Socket (`lsof`), and Disk Partition (`parted -l`) Reports",
            desc: "Run `ps aux`, `sudo lsof -i :22`, and `sudo parted -l` to inspect active processes, network listeners, and storage layout.",
            cmd: "student@ubuntu-svr:~$ ps aux | head -n 6\nUSER       PID %CPU %MEM COMMAND\nroot         1  0.0  0.2 /sbin/init\nroot       512  0.1  0.4 /usr/sbin/sshd -D\nstudent   4821 94.5  2.0 /usr/bin/python3 hung_script.py\n\nstudent@ubuntu-svr:~$ sudo lsof -i :22\nCOMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd    512 root    3u  IPv4  18492      0t0  TCP *:22 (LISTEN)\n\nstudent@ubuntu-svr:~$ sudo parted -l\nModel: ATA VBOX HARDDISK (scsi)\nDisk /dev/sda: 26.8GB\nPartition Table: gpt",
            why: "Notice in `ps aux` that PID `4821` (`hung_script.py`) is consuming 94.5% of the server's CPU!"
          },
          {
            title: "Terminate the Hung Process Using `kill -9`",
            desc: "Use `kill -9 4821` (`SIGKILL`) to immediately stop the runaway process and verify with `ps aux` that it is gone.",
            cmd: "student@ubuntu-svr:~$ kill -9 4821\n[1]+  Killed                  /usr/bin/python3 hung_script.py\nstudent@ubuntu-svr:~$ ps aux | grep 4821",
            why: "`kill -9` sends `SIGKILL` directly from the Kernel to immediately reclaim CPU and memory from an unresponsive process."
          },
          {
            title: "Launch the 4 Built-in System Reporting Tools on Windows Server",
            desc: "On Windows Server, press `Win + R` or use PowerShell to launch Task Manager, Performance Monitor, Resource Monitor, and Reliability Monitor.",
            cmd: "# Launch each Windows Server monitoring tool from Run / PowerShell:\ntaskmgr          # a. Task Manager\nperfmon          # b. Performance Monitor (Counters & Data Collector Sets)\nresmon           # c. Resource Monitor (Live CPU, RAM, Disk I/O & Listening Ports)\nperfmon /rel     # d. Reliability Monitor (1-10 System Stability Index Timeline)",
            why: "Combining `resmon` (real-time resource locks), `perfmon` (counter logs), and `perfmon /rel` (stability history) provides 360-degree visibility into Windows Server health."
          }
        ]
      }
    ],
    quizzes: [
      {
        q: "Which backup type copies ONLY files that have changed since the most recent backup of ANY type (Full or Incremental), clears the Archive Bit, and uses the least amount of storage space?",
        options: ["Full Backup", "Differential Backup", "Incremental Backup", "Imaging Backup"],
        answer: 2,
        explanation: "An Incremental Backup copies only data modified since the last backup of any kind and clears the archive bit, making it the fastest to back up and smallest in size."
      },
      {
        q: "A company runs a **Full Backup every Sunday**, and a **Differential Backup every night from Monday to Friday**. If the server hard drive fails on Thursday morning, how many backup sets are required to restore all data?",
        options: [
          "1 set only (Wednesday's Differential Backup)",
          "2 sets only (Sunday's Full Backup + Wednesday's Differential Backup)",
          "4 sets (Sunday Full + Monday, Tuesday, and Wednesday Differential Backups)",
          "All 7 sets from the entire week"
        ],
        answer: 1,
        explanation: "Because Differential Backups are cumulative since the last Full Backup, Wednesday's Differential already includes Monday, Tuesday, and Wednesday changes. Only 2 sets are needed: Sunday Full + Wednesday Differential."
      },
      {
        q: "Which `tar` command correctly creates a gzip-compressed archive named `etc_backup.tar.gz` containing the `/etc` directory?",
        options: [
          "tar -xzvf etc_backup.tar.gz /etc",
          "tar -czvf etc_backup.tar.gz /etc",
          "tar -tzvf etc_backup.tar.gz /etc",
          "dump -0uf etc_backup.tar.gz /etc"
        ],
        answer: 1,
        explanation: "In `tar`, `-c` creates a new archive, `-z` compresses it with gzip, `-v` shows verbose progress, and `-f` specifies the archive filename (`-x` is for extracting, `-t` is for listing)."
      },
      {
        q: "Which Linux command lists all open files, directories, and active network sockets/ports held by running processes?",
        options: ["parted -l", "lsof", "mkdir -p", "chmod"],
        answer: 1,
        explanation: "`lsof` stands for *List Open Files* and reports all files and network ports currently opened by processes on the server."
      },
      {
        q: "What is the primary purpose of the `parted` command in Linux server maintenance?",
        options: [
          "To display and manage hard disk partition tables (GPT/MBR) and storage capacities",
          "To change user passwords in `/etc/shadow`",
          "To monitor live HTTP web traffic",
          "To compile C programs"
        ],
        answer: 0,
        explanation: "GNU `parted` (`sudo parted -l`) reports disk geometry, partition table types (`gpt` or `msdos`), and partition sizes/filesystems."
      },
      {
        q: "An unresponsive process with PID `4821` ignores the standard `kill 4821` (`SIGTERM`) command. Which command forces the Linux Kernel to terminate PID `4821` immediately?",
        options: ["kill -1 4821", "kill -9 4821", "ps aux 4821", "lsof -k 4821"],
        answer: 1,
        explanation: "`kill -9 <PID>` sends Signal 9 (`SIGKILL`), which forces the Kernel to immediately terminate the process."
      },
      {
        q: "In Windows Server, which built-in tool displays a **System Stability Index score from 1 to 10** along with a daily timeline of application crashes, Windows failures, and software updates?",
        options: ["Task Manager", "Reliability Monitor (`perfmon /rel`)", "Disk Cleanup", "DHCP Manager"],
        answer: 1,
        explanation: "Reliability Monitor (`perfmon /rel`) tracks system stability history on a daily calendar and calculates a Stability Index from 1 to 10."
      },
      {
        q: "Which Windows Server built-in tool allows administrators to configure **Performance Counters** and **Data Collector Sets** to record long-term hardware performance logs and trigger automated threshold alerts?",
        options: ["Performance Monitor (`perfmon`)", "Windows Notepad", "Active Directory Sites and Services", "Character Map"],
        answer: 0,
        explanation: "Performance Monitor (`perfmon.exe`) provides Performance Counters, Data Collector Sets, and Alerts for scheduled performance logging and analysis."
      }
    ]
  }
);
