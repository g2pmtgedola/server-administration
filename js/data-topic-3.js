/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION (ENGLISH EDITION)
   COMPLETE DATA FOR TOPIC 3.0: LINUX SERVER ADMINISTRATION (ALL 32 SUBTOPICS)
   ========================================================================== */

window.COURSE_TOPICS = window.COURSE_TOPICS || [];

window.COURSE_TOPICS.push({
  id: "topik-3",
  code: "TOPIC 3.0",
  shortTitle: "Linux Server Administration",
  title: "3.0 Linux Server Administration",
  clo: "CLO 1, CLO 2 & CLO 3",
  slt: "36 Hours (Core Module — FHS, Viewing Files, File Mgmt, Editors, Users/Groups, Sudo & Permissions)",
  summary: "Master every aspect of Linux Server Administration: Filesystem Hierarchy Standard (FHS 3.1.1–3.1.3), viewing directories and files via GUI & CLI (3.2.1–3.2.7), file and directory lifecycle management (3.3.1–3.3.5), graphical & text editors (3.4.1–3.4.3), user and group administration (3.5.1–3.5.5), root privileges & shell scripting (3.6.1–3.6.4), and ownership/permission security (3.7.1–3.7.5).",
  heroStats: [
    { percent: "3.1-3.4", title: "FHS, File Mgmt & Editors", desc: "FHS /, ls, grep, touch, mkdir, rm, cp, mv, find, nano & vim" },
    { percent: "3.5-3.7", title: "Users, Sudo & Permissions", desc: "useradd, /etc/passwd, visudo, Shell Script, chmod & SUID" }
  ],
  hasInteractiveSim: "linux-chmod-fhs",
  notes: [
    // ======================================================================
    // SUBTOPIC 3.1: CONSTRUCT FILESYSTEM HIERARCHY STANDARD (FHS)
    // ======================================================================
    {
      code: "3.1.1",
      subtopic: "3.1",
      title: "3.1.1 Explain the Filesystem Hierarchy Standard (FHS)",
      subtitle: "The inverted single-tree file organization standard maintained by the Linux Foundation",
      concept: "Unlike Microsoft Windows, which separates storage by drive letters (`C:\\`, `D:\\`, `E:\\`), Linux organizes all disks, partitions, devices, and directories under a **single inverted tree structure** starting at the **Root Directory (`/`)**. The **Filesystem Hierarchy Standard (FHS)** is the official specification maintained by the Linux Foundation that defines the directory names, locations, and purposes across all Linux distributions.",
      features: [
        {
          icon: "🌳",
          title: "Why FHS Matters in Server Administration",
          desc: "Predictability and standardization across Ubuntu, Debian, Red Hat (RHEL), Rocky Linux, and SUSE.",
          bullets: [
            "**Single Root (`/`) Tree**: Every hard drive or network share is *mounted* into a subdirectory under `/` (e.g., `/mnt`, `/home`, `/var`).",
            "**Software & Script Compatibility**: Because FHS guarantees that system configurations live in `/etc` and core binaries live in `/bin`, software packages and admin scripts work across different Linux distributions.",
            "**Separation of Static vs Variable Data**: Separates read-only OS binaries (`/usr`, `/bin`) from variable log/database data (`/var`) and user files (`/home`) so they can be placed on separate disk partitions."
          ]
        },
        {
          icon: "⚖️",
          title: "FHS Data Classification Matrix",
          desc: "FHS categorizes directories along two axes: Shareable vs. Unshareable, and Static vs. Variable.",
          bullets: [
            "**Static Data**: Files that do not change without administrator intervention (e.g., `/bin`, `/sbin`, `/usr`, `/boot`).",
            "**Variable Data**: Files that change continuously during server operation (e.g., `/var/log`, `/var/spool/mail`, `/tmp`, `/proc`).",
            "**Case Sensitivity**: Linux filesystems (`ext4`, `xfs`) are strictly **case-sensitive** (`/etc/Hosts` and `/etc/hosts` are two completely different files!)."
          ]
        }
      ]
    },
    {
      code: "3.1.2",
      subtopic: "3.1",
      title: "3.1.2 Explain the Linux Directories Defined by the FHS",
      subtitle: "Detailed breakdown of every standard top-level directory under Root (/)",
      concept: "Every top-level directory under `/` serves a dedicated system role. A server administrator must know immediately where to find configuration files (`/etc`), server logs (`/var/log`), device nodes (`/dev`), and user folders (`/home`).",
      features: [
        {
          icon: "⚙️",
          title: "Core System, Configuration & Binary Directories",
          desc: "Directories essential for booting, running commands, and configuring the server.",
          bullets: [
            "**`/` (Root)**: Topmost parent directory of the entire Linux filesystem.",
            "**`/bin` (Essential User Binaries)**: Essential command-line utilities needed in single-user mode (`ls`, `cp`, `mv`, `rm`, `cat`, `bash`).",
            "**`/sbin` (System Binaries)**: Essential administrative commands reserved for the `root` superuser (`fdisk`, `mkfs`, `iptables`, `reboot`, `ip`).",
            "**`/etc` (Editable Text Configuration)**: Contains **all system-wide and service configuration files** (`/etc/passwd`, `/etc/fstab`, `/etc/hosts`, `/etc/ssh/sshd_config`).",
            "**`/boot` (Boot Loader Files)**: Holds the Linux Kernel (`vmlinuz`), initial RAM disk (`initrd`/`initramfs`), and GRUB bootloader files.",
            "**`/lib` & `/lib64`**: Shared library files required by binaries in `/bin` and `/sbin`."
          ]
        },
        {
          icon: "📂",
          title: "User, Variable, Device & Runtime Directories",
          desc: "Directories for users, active services, hardware devices, and temporary files.",
          bullets: [
            "**`/home`**: Personal directories for regular users (`/home/student`, `/home/ali`).",
            "**`/root`**: Personal home directory exclusively for the **`root` superuser** (separate from `/home`).",
            "**`/var` (Variable Data)**: Files that grow dynamically: `/var/log` (system logs), `/var/www` (web server files), `/var/lib/mysql` (databases).",
            "**`/usr` (Unix System Resources)**: Installed user applications, libraries, and documentation (`/usr/bin`, `/usr/sbin`, `/usr/local`).",
            "**`/dev` (Device Files)**: Represents hardware devices as files (`/dev/sda` = first hard disk, `/dev/null` = black hole).",
            "**`/proc` & `/sys`**: Virtual in-memory filesystems exposing live Kernel, CPU, RAM (`/proc/cpuinfo`, `/proc/meminfo`), and running process states.",
            "**`/tmp` (Temporary Files)**, **`/opt` (Optional 3rd-party software)**, **`/srv` (Service data)**, **`/mnt` & `/media` (Mount points)**."
          ]
        }
      ],
      tableTitle: "Complete FHS Directory Quick-Reference Table",
      tableHeaders: ["Directory", "Full Name", "Purpose & Key Examples"],
      tableRows: [
        ["`/`", "Root Directory", "Starting point of the entire Linux directory tree"],
        ["`/bin`", "Essential User Binaries", "Core commands for all users (`ls`, `cp`, `mkdir`, `bash`, `grep`)"],
        ["`/sbin`", "System Binaries", "System administration commands for `root` (`fsck`, `reboot`, `parted`)"],
        ["`/etc`", "Configuration Files", "System & server config files (`/etc/passwd`, `/etc/shadow`, `/etc/sudoers`)"],
        ["`/home`", "User Home Directories", "Personal folders for regular users (`/home/student`)"],
        ["`/root`", "Root Home Directory", "Home folder for the `root` superuser (UID 0)"],
        ["`/var`", "Variable Files", "Logs (`/var/log`), Web root (`/var/www`), Mail spools, Databases"],
        ["`/usr`", "Unix System Resources", "Secondary hierarchy for user programs (`/usr/bin`, `/usr/local`)"],
        ["`/boot`", "Boot Files", "Linux Kernel image (`vmlinuz`) and GRUB2 boot configuration"],
        ["`/dev`", "Device Nodes", "Hardware interfaces (`/dev/sda`, `/dev/tty`, `/dev/urandom`)"],
        ["`/proc`", "Process Information", "Virtual filesystem showing live Kernel & process info (`/proc/meminfo`)"],
        ["`/tmp`", "Temporary Files", "World-writable temporary space (protected by Sticky Bit `1777`)"],
        ["`/opt`", "Optional Software", "Third-party add-on packages (`/opt/lampp`, `/opt/google`)"]
      ]
    },
    {
      code: "3.1.3",
      subtopic: "3.1",
      title: "3.1.3 Show the Relative and Absolute Pathnames",
      subtitle: "Navigating the Linux filesystem using Absolute Paths (starting from /) vs Relative Paths",
      concept: "A **Pathname** specifies the exact address of a file or directory in the filesystem tree. Linux supports two ways to write a path: **Absolute Pathnames** (which always start from the Root `/`) and **Relative Pathnames** (which start from your current working directory).",
      features: [
        {
          icon: "📍",
          title: "Absolute Pathname (Full Path from Root `/`)",
          desc: "Always begins with a leading forward slash `/` and works identically regardless of your current directory.",
          bullets: [
            "**Rule**: Starts with **`/`**.",
            "**Examples**: `/etc/network/interfaces`, `/var/log/syslog`, `/home/student/report.txt`.",
            "**When to Use**: Inside shell scripts, cron jobs, and configuration files where the current working directory cannot be assumed."
          ]
        },
        {
          icon: "🧭",
          title: "Relative Pathname & Special Directory Shortcuts",
          desc: "Calculated relative to your current working directory (`pwd`) and **never** starts with a leading `/`.",
          bullets: [
            "**Rule**: Does **NOT** start with `/`.",
            "**Example**: If your current directory (`pwd`) is `/var`, typing `cd log/apache2` takes you to `/var/log/apache2`.",
            "**`.` (Single Dot)**: Refers to the **current working directory** (e.g., `./script.sh` runs `script.sh` in the current folder).",
            "**`..` (Double Dot)**: Refers to the **parent directory** one level up (e.g., `cd ..` or `cp ../config.txt .`).",
            "**`~` (Tilde)**: Shortcut for the current user's **home directory** (`/home/username`).",
            "**`-` (Hyphen)**: Shortcut for the **previous working directory** (`cd -` switches back to where you just were)."
          ]
        }
      ],
      tableTitle: "Comparison: Absolute Pathname vs Relative Pathname (Assuming `pwd` is `/home/student`)",
      tableHeaders: ["Target Location", "Using Absolute Pathname", "Using Relative Pathname"],
      tableRows: [
        ["`/home/student/docs/notes.txt`", "`cat /home/student/docs/notes.txt`", "`cat docs/notes.txt` or `cat ./docs/notes.txt`"],
        ["`/home/ali`", "`cd /home/ali`", "`cd ../ali`"],
        ["`/home` (Parent folder)", "`cd /home`", "`cd ..`"],
        ["`/etc/passwd`", "`cat /etc/passwd`", "`cat ../../etc/passwd`"]
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.2: DISPLAY LINUX DIRECTORY STRUCTURE TO VIEW FILES
    // ======================================================================
    {
      code: "3.2.1",
      subtopic: "3.2",
      title: "3.2.1 Display the Directory Structure Using File Manager",
      subtitle: "Browsing the FHS tree graphically using Nautilus (GNOME Files), Dolphin, or Thunar",
      concept: "When a Linux server has a Desktop Environment installed, administrators can visually explore the directory tree using a graphical **File Manager**. Understanding how graphical file managers map to the underlying FHS structure bridges GUI and CLI concepts.",
      features: [
        {
          icon: "🗂️",
          title: "Navigating FHS in Graphical File Managers",
          desc: "How to view Root (`/`), Home (`~`), and mounted drives in Nautilus, Dolphin, or Thunar.",
          bullets: [
            "**Home View (`~`)**: By default, opening the File Manager displays the user's `/home/username` folders (*Desktop, Documents, Downloads*).",
            "**Viewing Root (`/`)**: Click **Other Locations -> Computer** (in GNOME Files/Nautilus) or press **`Ctrl + L`** to type `/etc` or `/var/log` directly in the location address bar.",
            "**Tree / List View Toggle**: Switch from Icon Grid to **List View (`Ctrl + 1`)** to expand sub-folders in a hierarchical tree and view Size, Type, and Modified Date columns."
          ]
        },
        {
          icon: "👁️",
          title: "Showing Hidden Files & Bookmarking Server Paths",
          desc: "Essential graphical file manager shortcuts for server administration.",
          bullets: [
            "**Toggle Hidden Dot-Files (`Ctrl + H`)**: Files starting with a dot (such as `.bashrc`, `.ssh`, `.profile`) are hidden by default. Press **`Ctrl + H`** to show/hide them.",
            "**Open in Terminal**: Right-click inside any folder in the File Manager and select **Open in Terminal** to launch a CLI shell directly at that path."
          ]
        }
      ]
    },
    {
      code: "3.2.2",
      subtopic: "3.2",
      title: "3.2.2 Display Filenames and File Types Using File Manager",
      subtitle: "Identifying standard files, directories, symbolic links, and MIME types in the GUI",
      concept: "Unlike Windows, which relies heavily on 3-letter file extensions (`.exe`, `.txt`, `.bat`), Linux determines a file's type by inspecting its internal **inode metadata and magic header bytes (MIME type)**. Graphical file managers display icons, badges, and a Properties dialog for every file type.",
      features: [
        {
          icon: "🏷️",
          title: "Seven File Types in Linux & Their Visual Indicators",
          desc: "In Linux, 'Everything is a File' — including folders, hard disks, and network sockets.",
          bullets: [
            "**1. Regular File (`-`)**: Text files, scripts, binaries, images, or archives.",
            "**2. Directory (`d`)**: Displayed as folder icons containing other files.",
            "**3. Symbolic Link (`l`)**: Shortcut pointing to another file/directory (shown with a curved arrow badge on the icon).",
            "**4. Block Device (`b`) & 5. Character Device (`c`)**: Disk drives (`/dev/sda`) and serial/terminal devices (`/dev/tty`).",
            "**6. Named Pipe (`p`) & 7. Socket (`s`)**: Inter-process communication files."
          ]
        },
        {
          icon: "🔍",
          title: "Inspecting File Properties in the File Manager",
          desc: "Right-clicking any file and selecting **Properties** (or pressing `Alt + Enter`) reveals:",
          bullets: [
            "**Basic Tab**: Exact filename, MIME File Type (e.g., *Plain text document*, *Shell script*), exact size in bytes, parent folder path, and Last Accessed/Modified timestamps.",
            "**Permissions Tab**: Owner, Group, Read/Write access dropdowns, and the **Allow executing file as program** checkbox."
          ]
        }
      ]
    },
    {
      code: "3.2.3",
      subtopic: "3.2",
      title: "3.2.3 Construct Command `cd` and `pwd`",
      subtitle: "Checking your current working directory and moving across the Linux directory tree in CLI",
      concept: "When working in the Command Line Interface (CLI), `pwd` tells you **where you are right now**, and `cd` moves you **to any destination directory** using either absolute or relative pathnames.",
      features: [
        {
          icon: "📍",
          title: "`pwd` (Print Working Directory)",
          desc: "Displays the full absolute path of your current location starting from `/`.",
          bullets: [
            "**`pwd`**: Prints the current path (e.g., `/home/student`).",
            "**`pwd -P`**: Prints the physical path by resolving all symbolic links (e.g., if `/bin` is a symlink to `/usr/bin`, `pwd -P` outputs `/usr/bin`)."
          ]
        },
        {
          icon: "🚀",
          title: "`cd` (Change Directory) — All Variations",
          desc: "Essential navigation patterns every server administrator uses hundreds of times a day.",
          bullets: [
            "**`cd /var/log`**: Jump directly to `/var/log` using an **Absolute Path**.",
            "**`cd apache2`**: Move into the `apache2` subfolder inside your current directory (**Relative Path**).",
            "**`cd ..`**: Move **up one level** to the parent directory (`cd ../..` moves up two levels).",
            "**`cd` or `cd ~`**: Immediately return to your own **Home Directory** (`/home/student`).",
            "**`cd -`**: Toggle back to your **previous working directory**."
          ]
        }
      ]
    },
    {
      code: "3.2.4",
      subtopic: "3.2",
      title: "3.2.4 Construct Command `ls` and `file` to View Filenames and File Types",
      subtitle: "Listing directory contents with detailed metadata and inspecting true file types via CLI",
      concept: "The `ls` command lists files and directories along with their permissions, ownership, size, and timestamps. The `file` command reads a file's internal magic bytes to reveal what kind of data it actually contains, even if the file has no extension.",
      features: [
        {
          icon: "📋",
          title: "Mastering `ls` (List Directory Contents)",
          desc: "Combining flags with `ls` reveals hidden files, human-readable sizes, and sorting.",
          bullets: [
            "**`ls`**: Basic alphabetical list of visible files in the current directory.",
            "**`ls -a` (All)**: Includes **hidden files** that start with a dot (`.` and `..`, `.bashrc`).",
            "**`ls -l` (Long Listing)**: Displays 7 columns: *File Type & Permissions*, *Link Count*, *Owner*, *Group*, *Size in Bytes*, *Modification Timestamp*, and *Filename*.",
            "**`ls -lh` (Human-Readable)**: Displays file sizes in `K` (KB), `M` (MB), and `G` (GB).",
            "**`ls -F` (Classify)**: Appends `/` to directories, `*` to executables, and `@` to symbolic links.",
            "**`ls -ld /etc`**: Inspects the properties of the `/etc` directory itself rather than listing its contents."
          ]
        },
        {
          icon: "🧬",
          title: "Mastering `file` (Determine True File Type)",
          desc: "Never trust a filename extension on Linux — verify it with the `file` utility!",
          bullets: [
            "**Syntax**: `file <filename>` (or `file *` to inspect all files in a folder).",
            "**Example 1**: `file /etc/passwd` -> `/etc/passwd: ASCII text`.",
            "**Example 2**: `file /bin/ls` -> `/bin/ls: ELF 64-bit LSB pie executable, x86-64`.",
            "**Example 3**: `file /var/log` -> `/var/log: directory`."
          ]
        }
      ],
      tableTitle: "Understanding the 1st Character of `ls -l` Output (File Type Indicator)",
      tableHeaders: ["1st Character", "Example `ls -l` Permission String", "File Type Meaning"],
      tableRows: [
        ["`-`", "`-rw-r--r--`", "Regular File (text, script, binary, archive, image)"],
        ["`d`", "`drwxr-xr-x`", "Directory (folder)"],
        ["`l`", "`lrwxrwxrwx`", "Symbolic Link (soft link shortcut)"],
        ["`b`", "`brw-rw----`", "Block Device file (e.g., hard drive `/dev/sda`)"],
        ["`c`", "`crw-rw-rw-`", "Character Device file (e.g., terminal `/dev/tty`, `/dev/null`)"]
      ]
    },
    {
      code: "3.2.5",
      subtopic: "3.2",
      title: "3.2.5 Display Wildcards to Specify Multiple Filenames",
      subtitle: "Using file globbing patterns (*, ?, [ ]) to match multiple files in a single command",
      concept: "**Wildcards (File Globbing)** are pattern-matching symbols expanded by the Shell before executing a command. They allow administrators to list, copy, move, or delete dozens of matching files at once without typing each filename individually.",
      features: [
        {
          icon: "✳️",
          title: "The Three Core Wildcards (`*`, `?`, `[ ]`)",
          desc: "How each wildcard matches characters in filenames.",
          bullets: [
            "**`*` (Asterisk)**: Matches **zero or more** of ANY characters.",
            "• `ls *.conf` -> Matches all files ending with `.conf` (`sshd.conf`, `a.conf`, `.conf`).",
            "• `ls report*` -> Matches `report`, `report1.txt`, `report_2026.pdf`.",
            "**`?` (Question Mark)**: Matches **exactly one** single character at that position.",
            "• `ls lab?.txt` -> Matches `lab1.txt` and `labA.txt`, but **NOT** `lab10.txt` or `lab.txt`.",
            "**`[ ]` (Square Brackets — Character Class / Range)**: Matches **any single character** enclosed inside the brackets.",
            "• `ls file[123].txt` or `ls file[1-3].txt` -> Matches `file1.txt`, `file2.txt`, `file3.txt`.",
            "• `ls [!0-9]*` -> Matches files that do **NOT** start with a number."
          ]
        },
        {
          icon: "🪄",
          title: "Brace Expansion (`{ }`) Bonus Tip",
          desc: "Generates arbitrary string combinations when creating multiple files or directories.",
          bullets: [
            "**Example**: `touch server_{web,db,mail}.log` automatically creates `server_web.log`, `server_db.log`, and `server_mail.log` in one command!"
          ]
        }
      ],
      tableTitle: "Wildcard Pattern Matching Examples",
      tableHeaders: ["Wildcard Pattern", "What It Matches", "Example Matching Filenames"],
      tableRows: [
        ["`*.log`", "Any filename ending with `.log`", "`syslog.log`, `auth.log`, `a.log`"],
        ["`host?`", "`host` followed by exactly 1 character", "`hosts`, `host1`, `hostA` (NOT `host` or `host12`)"],
        ["`chap[1-4].md`", "`chap` followed by digit 1, 2, 3, or 4", "`chap1.md`, `chap2.md`, `chap3.md`, `chap4.md`"],
        ["`[a-z]*[0-9]`", "Starts with lowercase letter and ends with a digit", "`server1`, `node9`, `ubuntu22`"]
      ]
    },
    {
      code: "3.2.6",
      subtopic: "3.2",
      title: "3.2.6 Display Command `cat`, `more`, `less`, `head` and `tail`",
      subtitle: "Five essential CLI utilities for viewing and inspecting the contents of text and log files",
      concept: "Server administrators inspect configuration files and system logs constantly. Instead of opening a heavy editor, Linux provides five fast read-only viewers tailored for short files (`cat`), paged reading (`more`, `less`), file beginnings (`head`), and live log endings (`tail`).",
      features: [
        {
          icon: "📄",
          title: "Full & Paged Viewers: `cat`, `more`, and `less`",
          desc: "Reading entire files or scrolling page-by-page through large configuration files.",
          bullets: [
            "**`cat` (Concatenate)**: Dumps the entire file to the screen at once (`cat /etc/hosts`). Use **`cat -n /etc/passwd`** to display line numbers alongside every line!",
            "**`more`**: Classic pager that displays one screen at a time. Press **`Space`** for next page, **`Enter`** for next line, and **`q`** to quit.",
            "**`less` (The Superior Pager)**: Improvement over `more` ('*less is more*'). Allows scrolling **both Down and Up** using Arrow keys / `PageUp` / `PageDown`, searching text forward with **`/keyword`**, jumping to the end with **`G`**, and quitting with **`q`**."
          ]
        },
        {
          icon: "🔭",
          title: "Top & Bottom Viewers: `head` and `tail`",
          desc: "Viewing only the first N lines or the last N lines of a file.",
          bullets: [
            "**`head`**: Displays the **first 10 lines** of a file by default. Use **`head -n 5 /etc/passwd`** to view only the top 5 lines.",
            "**`tail`**: Displays the **last 10 lines** of a file by default. Use **`tail -n 20 /var/log/syslog`** to see the 20 most recent log entries.",
            "**`tail -f` (Follow Live Mode)**: `sudo tail -f /var/log/syslog` keeps the file open and **streams new log lines in real time** as events happen on the server (press `Ctrl + C` to stop)."
          ]
        }
      ],
      tableTitle: "Summary of Linux Text File Viewing Commands (Subtopic 3.2.6)",
      tableHeaders: ["Command", "Default Behavior", "Most Useful Flag / Shortcut"],
      tableRows: [
        ["`cat file.txt`", "Prints entire file content immediately", "`cat -n file.txt` (Number all output lines)"],
        ["`more file.txt`", "Paginates forward screen-by-screen", "`Space` (next page), `Enter` (next line), `q` (quit)"],
        ["`less file.txt`", "Interactive bidirectional pager & search", "`Up/Down` arrows, `/pattern` (search), `q` (quit)"],
        ["`head file.txt`", "Prints the first 10 lines of the file", "`head -n 5 file.txt` (Prints first 5 lines)"],
        ["`tail file.txt`", "Prints the last 10 lines of the file", "`tail -n 15` (Last 15 lines) / `tail -f` (Live follow)"]
      ]
    },
    {
      code: "3.2.7",
      subtopic: "3.2",
      title: "3.2.7 Display Command `grep` to Search for Regular Expressions in File",
      subtitle: "Filtering lines in files and command output using Global Regular Expression Print (grep)",
      concept: "Searching manually through a 50,000-line server log file is impossible. **`grep` (Global Regular Expression Print)** scans one or more files line-by-line and prints only the lines that match a specified text string or **Regular Expression (Regex)** pattern.",
      features: [
        {
          icon: "🎯",
          title: "Essential `grep` Command Options",
          desc: "Syntax: `grep [options] \"pattern\" filename`",
          bullets: [
            "**`grep \"root\" /etc/passwd`**: Prints every line containing `root` (case-sensitive).",
            "**`grep -i \"error\" /var/log/syslog`**: **`-i` (Ignore-case)** matches `error`, `ERROR`, and `Error`.",
            "**`grep -n \"sshd\" /var/log/syslog`**: **`-n` (Line Number)** prefixes each matching line with its exact line number.",
            "**`grep -v \"^#\" /etc/ssh/sshd_config`**: **`-v` (Invert match)** prints lines that do **NOT** match the pattern (great for hiding comment lines starting with `#`!).",
            "**`grep -c \"Failed\" /var/log/auth.log`**: **`-c` (Count)** prints only the total number of matching lines.",
            "**`grep -r \"Listen\" /etc/apache2/`**: **`-r` (Recursive)** searches inside all files across a directory tree."
          ]
        },
        {
          icon: "🧩",
          title: "Regular Expression (Regex) Anchors in `grep`",
          desc: "Matching patterns based on line position or character sets.",
          bullets: [
            "**`^` (Caret — Start of Line)**: `grep \"^root\" /etc/passwd` matches lines that **begin** with `root`.",
            "**`$` (Dollar — End of Line)**: `grep \"bash$\" /etc/passwd` matches lines that **end** with `bash`.",
            "**`.` (Dot — Any Single Character)**: `grep \"r..t\" /etc/passwd` matches `root`, `r00t`, `rent`.",
            "**`^$` (Empty Lines)**: `grep -v \"^$\" file.conf` strips out blank lines."
          ]
        }
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.3: TRACE FILE AND DIRECTORY MANAGEMENT IN LINUX SYSTEM
    // ======================================================================
    {
      code: "3.3.1",
      subtopic: "3.3",
      title: "3.3.1 Explain the Process to Manage Files and Directories",
      subtitle: "Overview of (a) Create and delete file, (b) Copy, rename and move file, (c) Search file",
      concept: "Effective server administration requires a structured workflow for managing the lifecycle of files and directories: creating organized folder hierarchies, duplicating configuration backups before editing, renaming/moving assets, safely deleting obsolete data, and locating files across the filesystem.",
      features: [
        {
          icon: "🔄",
          title: "a. Create & Delete vs b. Copy, Rename & Move",
          desc: "How Linux handles file creation, inode pointers, copying, moving, and permanent deletion.",
          bullets: [
            "**a. Create & Delete Process**: Creating a file allocates an **inode** (metadata structure) and directory entry (`touch`, `cat >`, `mkdir`). Deleting a file (`rm`, `rmdir`) unlinks the filename from its inode — **in Linux CLI, `rm` deletes permanently without a Recycle Bin!**",
            "**b. Copy, Rename & Move Process**: Copying (`cp`) creates a brand-new independent file with a new inode. Moving or Renaming (`mv`) within the same filesystem simply updates the directory name pointer instantaneously!"
          ]
        },
        {
          icon: "🔎",
          title: "c. Search File Process (Indexed vs Live Walk)",
          desc: "Choosing the right search strategy on a production server.",
          bullets: [
            "**Database Indexed Search (`locate`)**: Queries a pre-built nightly index database (`mlocate.db`) for instant results.",
            "**Real-Time Filesystem Search (`find`)**: Walks the live directory tree to match files by name, type, owner, size, permissions, or modification time."
          ]
        }
      ]
    },
    {
      code: "3.3.2",
      subtopic: "3.3",
      title: "3.3.2 Construct Command `touch`, `cat` and `mkdir` to Create New Files and Directories",
      subtitle: "Creating empty files, quick text files, single folders, and nested directory trees",
      concept: "Linux provides three rapid commands for creating new filesystem objects directly from the terminal: `touch` for empty files/timestamps, `cat >` for quick text files, and `mkdir` for directories.",
      features: [
        {
          icon: "📄",
          title: "Creating Files with `touch` and `cat`",
          desc: "Two fast ways to create new files without launching a full text editor.",
          bullets: [
            "**`touch index.html`**: Creates a new 0-byte empty file named `index.html` (if the file already exists, `touch` updates its access and modification timestamps without changing its content).",
            "**`touch file1.txt file2.txt file3.txt`**: Creates multiple empty files at once.",
            "**`cat > welcome.txt`**: Creates `welcome.txt` and reads lines typed from the keyboard until you press **`Ctrl + D`** (End-of-File) on a new line."
          ]
        },
        {
          icon: "📁",
          title: "Creating Directories with `mkdir`",
          desc: "Building single directories or multi-level parent/child directory trees.",
          bullets: [
            "**`mkdir backups`**: Creates a new directory named `backups` in the current directory.",
            "**`mkdir -p /srv/company/hr/2026/reports`**: The **`-p` (parents)** flag automatically creates all missing parent directories along the path in one step and does not throw an error if the directory already exists!"
          ]
        }
      ]
    },
    {
      code: "3.3.3",
      subtopic: "3.3",
      title: "3.3.3 Construct Command `rm`, `rmdir` and `rm -rf` to Remove Files and Directories",
      subtitle: "Safely deleting files, empty directories, and recursive directory trees in Linux",
      concept: "Deleting files and directories on a server requires precision. Linux separates the removal of empty folders (`rmdir`) from the removal of files and populated directory trees (`rm`).",
      features: [
        {
          icon: "🗑️",
          title: "`rm` (Remove Files) & `rmdir` (Remove Empty Directories)",
          desc: "Standard removal commands with built-in safety checks.",
          bullets: [
            "**`rm old_note.txt`**: Deletes a single file.",
            "**`rm -i *.txt`**: The **`-i` (interactive)** flag prompts `rm: remove regular file? (y/n)` before deleting each file.",
            "**`rmdir temp_folder`**: Deletes `temp_folder` **ONLY IF it is completely empty**. If it contains any files, `rmdir` safely refuses with `Directory not empty`."
          ]
        },
        {
          icon: "⚠️",
          title: "Recursive & Forced Deletion (`rm -r` and `rm -rf`)",
          desc: "Removing non-empty directories and all their contents.",
          bullets: [
            "**`rm -r project_old/`**: **`-r` (recursive)** deletes the directory and everything inside it.",
            "**`rm -rf project_old/`**: Combines **`-r` (recursive)** and **`-f` (force — never prompt, ignore nonexistent files)**. Immediately wipes the directory tree without confirmation.",
            "**Critical Safety Rule (CLO 3 Ethics)**: Always double-check your path before running `sudo rm -rf`! Running `sudo rm -rf /` or `sudo rm -rf /*` will destroy the entire server operating system."
          ]
        }
      ]
    },
    {
      code: "3.3.4",
      subtopic: "3.3",
      title: "3.3.4 Construct Command `cp` and `mv` to Copy, Rename and Move Files and Directories",
      subtitle: "Duplicating files/folders with cp and renaming or relocating items with mv",
      concept: "The `cp` command duplicates files and directories while leaving the original intact. The `mv` command serves a dual role in Linux: it both **moves** files/directories to a new location and **renames** them.",
      features: [
        {
          icon: "📋",
          title: "Copying Files & Directories with `cp`",
          desc: "Syntax: `cp [options] <source> <destination>`",
          bullets: [
            "**Copy a File**: `cp /etc/hosts /home/student/hosts.bak`",
            "**Copy a Whole Directory (`-r` / `-R` Recursive)**: **`cp -r /var/www/html /var/backups/html_copy`** (Omitting `-r` when copying a directory results in an error!).",
            "**Preserve Attributes (`-p` or `-a` Archive)**: `sudo cp -a /etc/ssh /var/backups/` preserves original ownership, permissions, and timestamps."
          ]
        },
        {
          icon: "🚚",
          title: "Renaming & Moving with `mv`",
          desc: "Syntax: `mv [options] <source> <destination>`",
          bullets: [
            "**1. Rename a File or Directory (Same folder)**: `mv draft.txt final_report.txt` or `mv old_folder new_folder`.",
            "**2. Move to Another Directory (Keep name)**: `mv final_report.txt /home/student/docs/`.",
            "**3. Move AND Rename Simultaneously**: `mv final_report.txt /var/backups/report_oct.txt`."
          ]
        }
      ]
    },
    {
      code: "3.3.5",
      subtopic: "3.3",
      title: "3.3.5 Construct Command `find` and `locate` to Search Files and Directories",
      subtitle: "Locating files rapidly using the mlocate database or live multi-criteria find expressions",
      concept: "When you need to locate a configuration file, find all files owned by a specific user, or hunt down huge log files filling up the disk, Linux provides `locate` (instant database lookup) and `find` (real-time search engine).",
      features: [
        {
          icon: "⚡",
          title: "`locate` (Fast Database-Indexed Search)",
          desc: "Searches a pre-indexed database (`/var/lib/mlocate/mlocate.db`) updated daily by cron.",
          bullets: [
            "**Search by Filename Substring**: `locate sshd_config` or case-insensitive `locate -i network`.",
            "**Update the Database Manually**: If you just created a file seconds ago, run **`sudo updatedb`** first so `locate` can find it immediately."
          ]
        },
        {
          icon: "🕵️",
          title: "`find` (Real-Time Live Filesystem Search)",
          desc: "Syntax: `find <starting_directory> <criteria> [action]`",
          bullets: [
            "**Search by Filename (`-name` / `-iname`)**: `find /etc -name \"*.conf\"` (use `-iname` for case-insensitive).",
            "**Search by Object Type (`-type`)**: `find /var -type d` (directories only) or `find /home -type f` (regular files only).",
            "**Search by Owner or Permission**: `find /home -user student` or `find / -perm 4755 2>/dev/null` (find SUID binaries).",
            "**Search by File Size or Age**: `find /var/log -size +50M` (files larger than 50 Megabytes) or `find /tmp -mtime -7` (modified in the last 7 days)."
          ]
        }
      ],
      tableTitle: "Summary of File Management & Search Commands (Subtopic 3.3)",
      tableHeaders: ["Task", "Command Syntax", "Key Option / Note"],
      tableRows: [
        ["Create empty file", "`touch filename.txt`", "Updates timestamp if file already exists"],
        ["Create nested directories", "`mkdir -p dir1/dir2/dir3`", "`-p` creates parent folders automatically"],
        ["Copy directory recursively", "`cp -r src_dir/ dest_dir/`", "`-r` is mandatory for copying directories"],
        ["Rename or Move file/folder", "`mv source destination`", "Works for both files and directories without `-r`"],
        ["Delete empty directory", "`rmdir folder_name`", "Fails safely if directory is not empty"],
        ["Force delete folder tree", "`rm -rf folder_name`", "`-r` recursive, `-f` force without confirmation"],
        ["Fast indexed file search", "`locate filename`", "Run `sudo updatedb` to refresh index"],
        ["Live search by name/size", "`find /etc -name \"*.conf\"`", "Searches the live disk in real time"]
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.4: DISPLAY MULTIPLE GRAPHICAL AND TEXT EDITORS IN LINUX
    // ======================================================================
    {
      code: "3.4.1",
      subtopic: "3.4",
      title: "3.4.1 Display Various Types of Graphical and Text Editors",
      subtitle: "Comparing CLI terminal editors (Nano, Vi/Vim, Emacs) and GUI desktop editors (Gedit, Kate)",
      concept: "In Linux, almost all system and service configurations are stored as plain ASCII/UTF-8 text files. Editors are divided into **Graphical Text Editors** (requiring a desktop GUI) and **Console/Terminal Text Editors** (which run directly inside an SSH terminal session).",
      features: [
        {
          icon: "🖥️",
          title: "Graphical (GUI) Text Editors",
          desc: "Point-and-click editors with mouse support, menus, and multi-tab windows.",
          bullets: [
            "**Gedit (`gedit`)**: Default graphical text editor for the GNOME Desktop Environment.",
            "**Kate / KWrite**: Feature-packed graphical editors for the KDE Plasma Desktop.",
            "**Mousepad / Pluma / FeatherPad**: Lightweight GUI editors for XFCE, MATE, and LXQt."
          ]
        },
        {
          icon: "⌨️",
          title: "Command-Line (CLI) Text Editors",
          desc: "Essential for headless servers and remote SSH administration.",
          bullets: [
            "**GNU Nano (`nano`)**: Beginner-friendly, modeless terminal editor displaying helpful shortcut hints (`^O` Save, `^X` Exit) at the bottom of the screen.",
            "**Vi / Vim (`vi` / `vim` — Vi Improved)**: The universal modal text editor guaranteed to be pre-installed on virtually every Unix and Linux server worldwide.",
            "**Emacs / Micro / Joe**: Alternative terminal text editors."
          ]
        }
      ]
    },
    {
      code: "3.4.2",
      subtopic: "3.4",
      title: "3.4.2 Trace Graphical Editor to Create and Modify File",
      subtitle: "Step-by-step workflow for creating, editing, and saving files using Gedit / GUI Editors",
      concept: "When working on a Linux workstation or server with a Desktop Environment, graphical editors like **Gedit** provide syntax highlighting for shell scripts, configuration files, and HTML/PHP code.",
      features: [
        {
          icon: "📝",
          title: "Creating & Modifying Files in Gedit",
          desc: "Launching from the Application Menu or directly from the terminal.",
          bullets: [
            "**Step 1 (Launch)**: Open GNOME Application Menu -> **Text Editor (Gedit)**, or run `gedit notes.txt &` in the terminal (the `&` keeps the terminal free).",
            "**Step 2 (Edit & Syntax Highlighting)**: Type or modify content. Enable line numbers via *Preferences -> View -> Display line numbers*.",
            "**Step 3 (Save & Close)**: Press **`Ctrl + S`** to save (`Ctrl + Shift + S` for Save As) and **`Ctrl + Q`** (or `Ctrl + W`) to close."
          ]
        },
        {
          icon: "🔐",
          title: "Editing Root-Owned System Files Safely",
          desc: "Instead of running a full GUI app as root, use `sudoedit` or the `admin://` URI in GNOME.",
          bullets: [
            "**Using `admin://` in Gedit**: Run `gedit admin:///etc/hosts` to trigger a Polkit password prompt and safely edit a system configuration file graphically."
          ]
        }
      ]
    },
    {
      code: "3.4.3",
      subtopic: "3.4",
      title: "3.4.3 Trace Text Editor to Create and Modify File (Nano & Vi/Vim)",
      subtitle: "Mastering terminal file editing in GNU Nano and the 3 modes of Vi/Vim",
      concept: "Because production Linux servers rarely have a GUI installed, every student and system administrator must be able to create, edit, save, and exit files using **Nano** and **Vi/Vim** over SSH.",
      features: [
        {
          icon: "🟢",
          title: "Workflow in GNU Nano (`nano filename`)",
          desc: "Note: In Nano's bottom bar, the caret symbol `^` means the **`Ctrl`** key, and `M-` means the **`Alt`** key.",
          bullets: [
            "**1. Open / Create File**: `nano /home/student/server.conf`",
            "**2. Type & Edit**: Use arrow keys to move the cursor and type directly.",
            "**3. Search & Replace**: Press **`Ctrl + W`** (Where Is) to search, or **`Ctrl + \\`** to search and replace.",
            "**4. Cut & Paste Line**: Press **`Ctrl + K`** to cut the current line, and **`Ctrl + U`** to paste.",
            "**5. Save & Exit**: Press **`Ctrl + O`** (WriteOut) -> press **`Enter`** to confirm filename -> press **`Ctrl + X`** to exit."
          ]
        },
        {
          icon: "🟠",
          title: "Workflow in Vi / Vim (`vim filename` — 3 Modes)",
          desc: "Vim operates in three distinct modes: **Normal (Command) Mode**, **Insert Mode**, and **Last-Line (Ex) Mode**.",
          bullets: [
            "**Mode 1: Normal / Command Mode (Default on startup)**: Press **`Esc`** at any time to return here. Navigation & shortcuts: `dd` (delete current line), `yy` (yank/copy line), `p` (paste), `u` (undo), `/word` (search).",
            "**Mode 2: Insert Mode (Typing text)**: From Normal Mode, press **`i`** (insert at cursor), **`a`** (append after cursor), or **`o`** (open new line below) — `-- INSERT --` appears at the bottom. Type your text, then press **`Esc`** when finished.",
            "**Mode 3: Last-Line / Ex Mode (Saving & Exiting)**: From Normal Mode, type a colon **`:`** followed by:",
            "• **`:w`** + Enter = Save (Write) file.",
            "• **`:wq`** (or **`:x`** or **`ZZ`**) + Enter = **Save and Quit**.",
            "• **`:q!`** + Enter = **Force Quit WITHOUT saving changes**."
          ]
        }
      ],
      tableTitle: "Essential Keyboard Shortcuts: GNU Nano vs Vi/Vim",
      tableHeaders: ["Operation", "GNU Nano Shortcut", "Vi / Vim Command Sequence"],
      tableRows: [
        ["Start typing / inserting text", "Type immediately upon opening", "Press `i` (Insert) or `o` (New line)"],
        ["Return to Command Mode", "Not applicable (Modeless)", "Press `Esc` key"],
        ["Save changes (Write)", "`Ctrl + O`, then press `Enter`", "`Esc`, then type `:w` and press `Enter`"],
        ["Save and Exit", "`Ctrl + O`, `Enter`, then `Ctrl + X`", "`Esc`, then type `:wq` and press `Enter`"],
        ["Exit WITHOUT Saving", "`Ctrl + X`, then press `N`", "`Esc`, then type `:q!` and press `Enter`"],
        ["Delete entire current line", "`Ctrl + K`", "In Normal Mode (`Esc`), press `dd`"],
        ["Search for a word", "`Ctrl + W`, type word, `Enter`", "In Normal Mode (`Esc`), type `/word` and `Enter`"]
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.5: CONSTRUCT USER AND GROUP ACCOUNTS IN LINUX
    // ======================================================================
    {
      code: "3.5.1",
      subtopic: "3.5",
      title: "3.5.1 Explain User and Group Accounts in Linux",
      subtitle: "UID, GID, Account Types (Root, System, Regular) and Primary vs Supplementary Groups",
      concept: "Linux is a multi-user operating system where access to every file and process is governed by numeric IDs: **UID (User ID)** and **GID (Group ID)**. Grouping users by department or role (`developers`, `hr`, `admins`) allows administrators to manage security permissions efficiently.",
      features: [
        {
          icon: "🪪",
          title: "Three Categories of Linux User Accounts",
          desc: "Classified by their numeric UID range.",
          bullets: [
            "**1. Root User (Superuser)**: Always assigned **UID = 0** and **GID = 0**. Has unrestricted administrative control over the kernel and all files.",
            "**2. System / Service Accounts (UID 1 – 999)**: Non-human accounts created for background daemons (`www-data`, `mysql`, `sshd`, `nobody`). Their shell is set to `/usr/sbin/nologin` or `/bin/false` to prevent interactive login.",
            "**3. Regular Users (UID 1000+)**: Standard human user accounts starting at **UID = 1000** (e.g., `student` = 1000, `azrul` = 1001)."
          ]
        },
        {
          icon: "👥",
          title: "Primary Group vs Supplementary (Secondary) Groups",
          desc: "How user group membership works in Linux.",
          bullets: [
            "**Primary Group**: Every user belongs to **exactly one** Primary Group (recorded as the 4th field in `/etc/passwd`). When a user creates a new file, its group ownership defaults to their Primary Group.",
            "**Supplementary / Secondary Groups**: A user can belong to multiple additional groups (recorded in `/etc/group`), such as `sudo`, `docker`, or `jtmk`, to gain shared access to resources."
          ]
        }
      ]
    },
    {
      code: "3.5.2",
      subtopic: "3.5",
      title: "3.5.2 Explain the Configuration Files to Manage User and Group Accounts",
      subtitle: "Deep dive into /etc/passwd, /etc/shadow, /etc/group, and /etc/gshadow",
      concept: "Linux stores all local user and group account definitions in plain text files inside the `/etc` directory. Understanding the colon-separated (`:`) fields of these files is essential for troubleshooting login and permission issues.",
      features: [
        {
          icon: "📖",
          title: "`/etc/passwd` (User Account Info) & `/etc/shadow` (Encrypted Passwords)",
          desc: "Why account details and password hashes are split into two separate files.",
          bullets: [
            "**`/etc/passwd` (World-readable `-rw-r--r--`)**: Contains **7 colon-separated fields** per user: `username:x:UID:GID:GECOS_comment:home_directory:login_shell`.",
            "**`/etc/shadow` (Root-only `-rw-r-----`)**: Stores the **salted cryptographic password hash** (`$6$` SHA-512 or `$y$` yescrypt) and password aging policies (last changed date, minimum/maximum password age, warning period). A `!` or `*` in the password field means the account is locked."
          ]
        },
        {
          icon: "🗂️",
          title: "`/etc/group` (Group Definitions) & `/etc/skel` (Skeleton Template)",
          desc: "How groups and new user home directories are structured.",
          bullets: [
            "**`/etc/group` (`-rw-r--r--`)**: Contains **4 colon-separated fields**: `group_name:x:GID:user1,user2`.",
            "**`/etc/gshadow`**: Stores encrypted group passwords and group administrators.",
            "**`/etc/skel`**: Template directory containing default files (`.bashrc`, `.profile`, `.bash_logout`) automatically copied into every newly created user's `/home/username` directory."
          ]
        }
      ],
      tableTitle: "Breakdown of the 7 Fields in `/etc/passwd`",
      tableHeaders: ["Field #", "Example (`azrul:x:1001:1001:Azrul JTMK:/home/azrul:/bin/bash`)", "Description"],
      tableRows: [
        ["Field 1", "`azrul`", "Unique login username"],
        ["Field 2", "`x`", "Placeholder indicating the encrypted password is stored in `/etc/shadow`"],
        ["Field 3", "`1001`", "UID (User ID number: `0` = root, `1–999` = system, `1000+` = regular user)"],
        ["Field 4", "`1001`", "GID (Primary Group ID number)"],
        ["Field 5", "`Azrul JTMK`", "GECOS comment field (Full name, department, phone/office)"],
        ["Field 6", "`/home/azrul`", "Absolute path to the user's Home Directory"],
        ["Field 7", "`/bin/bash`", "Default Login Shell (`/usr/sbin/nologin` blocks interactive login)"]
      ]
    },
    {
      code: "3.5.3",
      subtopic: "3.5",
      title: "3.5.3 Trace Graphical Utilities to Manage Users and Groups",
      subtitle: "Managing accounts via GNOME Settings (Users), GNOME System Tools, or Webmin / Cockpit",
      concept: "On Linux systems running a Desktop Environment or web-based admin console, administrators can create users, toggle administrator privileges, and manage groups through graphical interfaces.",
      features: [
        {
          icon: "🖥️",
          title: "GNOME Settings -> Users & `users-admin` Utility",
          desc: "Step-by-step graphical user management on Ubuntu/RHEL Desktop.",
          bullets: [
            "**Step 1**: Open **Settings -> Users** and click the **Unlock** button in the top-right corner (enter your `sudo` password).",
            "**Step 2**: Click **Add User...**, choose Account Type (**Standard** vs **Administrator**), enter Full Name and Username, and either set a password now or allow the user to set one at next login.",
            "**Advanced GUI (`gnome-system-tools` / `users-admin`)**: Provides a **Manage Groups** dialog to create groups, change GIDs, and check/uncheck group members graphically."
          ]
        },
        {
          icon: "🌐",
          title: "Web-Based Server GUI: Cockpit (`:9090`) & Webmin (`:10000`)",
          desc: "Modern browser-based graphical utilities used on headless Linux servers.",
          bullets: [
            "**Cockpit**: Built into RHEL/Ubuntu Server (`https://server-ip:9090`). The **Accounts** tab allows creating users, locking accounts, adding SSH public keys, and assigning `Server Administrator` (`sudo`) roles."
          ]
        }
      ]
    },
    {
      code: "3.5.4",
      subtopic: "3.5",
      title: "3.5.4 Trace Command-Line Utilities to Manage Users and Groups",
      subtitle: "Creating, modifying, and deleting users and groups with useradd, usermod, userdel, groupadd, groupmod, groupdel",
      concept: "Command-line utilities are the fastest and most scriptable way to manage accounts on a Linux server. All account management commands require `root` or `sudo` privileges.",
      features: [
        {
          icon: "👤",
          title: "User Account Commands: `useradd`, `adduser`, `usermod`, `userdel`",
          desc: "Full lifecycle management of user accounts.",
          bullets: [
            "**Create User (`useradd`)**: `sudo useradd -m -s /bin/bash -c \"Staff JTMK\" -G jtmk azrul`",
            "• `-m`: Creates the home directory `/home/azrul` and copies `/etc/skel`.",
            "• `-s /bin/bash`: Sets the default login shell.",
            "• `-c`: Sets the GECOS comment/full name.",
            "• `-g`: Sets Primary Group; `-G`: Sets Supplementary Groups.",
            "**Interactive Alternative (`adduser`)**: On Ubuntu/Debian, `sudo adduser azrul` interactively prompts for password and full name while automatically creating the home folder.",
            "**Modify User (`usermod`)**:",
            "• Add user to supplementary group: **`sudo usermod -aG sudo azrul`** (Always include `-a` append so existing groups aren't overwritten!).",
            "• Change username: `sudo usermod -l newname oldname`; Lock account: `sudo usermod -L azrul`.",
            "**Delete User (`userdel`)**: `sudo userdel azrul` (deletes user but keeps `/home/azrul`) or **`sudo userdel -r azrul`** (deletes user AND removes `/home/azrul` + mail spool)."
          ]
        },
        {
          icon: "👥",
          title: "Group & Inspection Commands: `groupadd`, `groupmod`, `groupdel`, `id`",
          desc: "Creating, renaming, and deleting groups and verifying membership.",
          bullets: [
            "**Create Group**: `sudo groupadd jtmk` (or `sudo groupadd -g 2050 jtmk` to specify GID).",
            "**Rename Group**: `sudo groupmod -n it_dept jtmk`.",
            "**Delete Group**: `sudo groupdel it_dept`.",
            "**Verify User & Group IDs**: `id azrul` or `groups azrul`."
          ]
        }
      ]
    },
    {
      code: "3.5.5",
      subtopic: "3.5",
      title: "3.5.5 Trace Command to Assign and Modify Password to the Users",
      subtitle: "Setting passwords, locking/unlocking accounts, and enforcing password aging with passwd & chage",
      concept: "A newly created account created with `useradd` remains locked until a password is assigned. Administrators use `passwd` to set or reset passwords and `chage` to configure password expiration policies.",
      features: [
        {
          icon: "🔑",
          title: "Assigning & Locking Passwords with `passwd`",
          desc: "Regular users can run `passwd` to change their own password; `root`/`sudo` can reset any user's password without knowing the old one.",
          bullets: [
            "**Set / Reset User Password**: `sudo passwd azrul` (Prompts to type and retype the new password; characters are hidden for security).",
            "**Lock User Account**: `sudo passwd -l azrul` (Places `!` in `/etc/shadow` to disable password login).",
            "**Unlock User Account**: `sudo passwd -u azrul`.",
            "**Force Password Change on Next Login**: `sudo passwd -e azrul` (Expires current password immediately).",
            "**Check Password Status**: `sudo passwd -S azrul`."
          ]
        },
        {
          icon: "⏳",
          title: "Password Aging Policies with `chage`",
          desc: "Enforcing security compliance for maximum password lifetime.",
          bullets: [
            "**View Aging Policy**: `sudo chage -l azrul`.",
            "**Set Maximum Password Age (e.g., 90 days)**: `sudo chage -M 90 azrul`.",
            "**Set Account Expiration Date**: `sudo chage -E 2026-12-31 azrul`."
          ]
        }
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.6: DISPLAY ADMINISTRATOR PRIVILEGES TASKS IN LINUX
    // ======================================================================
    {
      code: "3.6.1",
      subtopic: "3.6",
      title: "3.6.1 Display the Root User and Common User",
      subtitle: "Comparing superuser (root) capabilities against standard user restrictions and ethical best practices",
      concept: "Linux enforces strict privilege separation between the **`root` superuser (UID 0)** and **common (regular) users (UID 1000+)**. In accordance with **CLO 3 (Ethical Server Administration)**, administrators follow the **Principle of Least Privilege**: log in as a regular user and elevate privileges only when necessary.",
      features: [
        {
          icon: "👑",
          title: "The Root User (`root` — UID 0)",
          desc: "Unrestricted administrative account capable of modifying any file or kernel parameter.",
          bullets: [
            "**Visual Indicator**: Shell prompt ends with **`#`** (`root@ubuntu-svr:~#`) and home directory is `/root`.",
            "**Capabilities**: Can read/write any file regardless of permissions, install/remove system software (`apt`/`dnf`), manage users, format disks (`mkfs`), bind privileged network ports (`< 1024`), and shut down the server.",
            "**Security Risk**: A single typo running as `root` can permanently destroy the OS, and shared `root` logins leave no individual accountability trail."
          ]
        },
        {
          icon: "🛡️",
          title: "Common (Regular) User & Switching Privilege (`su` vs `sudo`)",
          desc: "Safe day-to-day operation with auditable privilege elevation.",
          bullets: [
            "**Visual Indicator**: Shell prompt ends with **`$`** (`student@ubuntu-svr:~$`) and write access is restricted to `/home/username` and `/tmp`.",
            "**`su -` (Switch User)**: Switches the entire shell session to `root` (requires knowing the `root` password).",
            "**`sudo <command>` (Superuser Do)**: Executes a single command with `root` privileges using the **user's own password**, logging who ran what command and when inside `/var/log/auth.log`!"
          ]
        }
      ],
      tableTitle: "Comparison: Root User vs Common Regular User in Linux",
      tableHeaders: ["Attribute", "Root User (Superuser)", "Common User (Regular Account)"],
      tableRows: [
        ["UID & GID", "`UID = 0`, `GID = 0`", "`UID >= 1000`, `GID >= 1000`"],
        ["Default Home Directory", "`/root`", "`/home/<username>`"],
        ["Shell Prompt Symbol", "Hash `#` (`root@svr:~#`)", "Dollar `$` (`user@svr:~$`)"],
        ["Filesystem Access", "Full Read/Write access to entire `/` tree", "Restricted to own `/home/user` and `/tmp`"],
        ["System Configuration", "Can edit `/etc`, manage services & users", "Cannot modify `/etc` or install packages without `sudo`"]
      ]
    },
    {
      code: "3.6.2",
      subtopic: "3.6",
      title: "3.6.2 Display Graphical Utilities to Assign Root Privileges to Regular Users",
      subtitle: "Granting Administrator (sudo/wheel) rights via GNOME Settings, Users-Admin, and Polkit",
      concept: "In graphical Linux environments, assigning root privileges to a trusted regular user simply adds their account to the system's administrative group (`sudo` on Ubuntu/Debian or `wheel` on RHEL/Rocky Linux) and uses **Polkit (`pkexec`)** for graphical password prompts.",
      features: [
        {
          icon: "🖥️",
          title: "Assigning Administrator Role in GNOME Settings",
          desc: "How to elevate a regular user to Administrator graphically.",
          bullets: [
            "**Step 1**: Open **Settings -> Users** and click **Unlock** (authenticate with an existing administrator password).",
            "**Step 2**: Select the target user account.",
            "**Step 3**: Toggle **Account Type** from *Standard* to **Administrator** (or toggle the *Administrator* switch on).",
            "**Behind the Scenes**: This graphical switch automatically adds the user to the `sudo` (or `wheel`) supplementary group in `/etc/group`."
          ]
        },
        {
          icon: "🔐",
          title: "Polkit (PolicyKit) Graphical Privilege Prompts",
          desc: "Whenever an Administrator user performs a privileged action in the GUI (such as installing packages or changing network settings), Polkit pops up an authentication dialog verifying their password."
        }
      ]
    },
    {
      code: "3.6.3",
      subtopic: "3.6",
      title: "3.6.3 Trace Command Line Utilities to Modify the Configuration File (`/etc/sudoers` & `visudo`)",
      subtitle: "Granting granular root privileges via usermod -aG sudo and editing /etc/sudoers safely with visudo",
      concept: "All `sudo` permissions are controlled by the configuration file **`/etc/sudoers`** (and drop-in files inside `/etc/sudoers.d/`). Administrators **must always use the `sudo visudo` command** to edit `/etc/sudoers` because `visudo` locks the file against concurrent edits and validates syntax before saving — preventing a typo from locking everyone out of root access!",
      features: [
        {
          icon: "⚡",
          title: "Method 1: Add User to the `sudo` / `wheel` Group",
          desc: "The fastest command-line method to grant full `sudo` privileges.",
          bullets: [
            "**On Ubuntu / Debian**: `sudo usermod -aG sudo azrul` (or `sudo gpasswd -a azrul sudo`).",
            "**On RHEL / CentOS / Rocky**: `sudo usermod -aG wheel azrul`.",
            "**Verify**: Run `groups azrul` or switch to the user (`su - azrul`) and test `sudo whoami` (which outputs `root`)."
          ]
        },
        {
          icon: "📝",
          title: "Method 2: Granular Rules in `/etc/sudoers` via `sudo visudo`",
          desc: "Understanding the `/etc/sudoers` rule syntax: `WHO  WHERE=(AS_WHOM)  WHAT_COMMANDS`",
          bullets: [
            "**Full Root Access for a User**: `azrul ALL=(ALL:ALL) ALL`",
            "**Full Root Access for a Group (`%` prefix)**: `%sudo ALL=(ALL:ALL) ALL`",
            "**Least-Privilege Specific Command Delegation**: Allow junior admin `ali` to only restart Apache and view logs:",
            "`ali ALL=(ALL) /bin/systemctl restart apache2, /usr/bin/tail /var/log/syslog`"
          ]
        }
      ]
    },
    {
      code: "3.6.4",
      subtopic: "3.6",
      title: "3.6.4 Trace Basic Shell Script for Common Administrative Task",
      subtitle: "Writing, making executable (chmod +x), and running Bash scripts (#!/bin/bash) for server automation",
      concept: "Instead of typing 10 commands manually every morning to check disk space, memory, and backups, administrators write a **Shell Script (`.sh`)**. A shell script is a plain text file starting with the **Shebang (`#!/bin/bash`)** line, containing variables, commands, conditionals, or loops.",
      features: [
        {
          icon: "📜",
          title: "Anatomy of an Administrative Bash Script",
          desc: "The four steps to build and run a shell script on a Linux server.",
          bullets: [
            "**1. The Shebang Line (`#!/bin/bash`)**: Must be on **Line 1**. Tells the Linux Kernel to execute the file using `/bin/bash`.",
            "**2. Comments (`#`)**: Any line starting with `#` explains what the script does for future administrators.",
            "**3. Variables, Command Substitution & Logic**: Use `$VAR` and `$(command)` (e.g., `TODAY=$(date +%F)`).",
            "**4. Grant Execute Permission & Run**: Run **`chmod +x backup_script.sh`** once, then execute it with **`./backup_script.sh`**."
          ]
        },
        {
          icon: "⏰",
          title: "Scheduling Autonomous Scripts with Cron (`crontab -e`)",
          desc: "Automating scripts to run unattended at scheduled times (CLO 3 Autonomous Server Functions).",
          bullets: [
            "**Cron Syntax (5 Stars)**: `Minute(0-59)  Hour(0-23)  DayOfMonth(1-31)  Month(1-12)  DayOfWeek(0-7)  /path/to/script.sh`",
            "**Example (Run daily at 2:00 AM)**: `0 2 * * * /usr/local/bin/daily_backup.sh`"
          ]
        }
      ]
    },

    // ======================================================================
    // SUBTOPIC 3.7: TRACE FILE AND DIRECTORY PERMISSIONS IN LINUX SYSTEM
    // ======================================================================
    {
      code: "3.7.1",
      subtopic: "3.7",
      title: "3.7.1 Explain File and Directory Ownership and Permissions",
      subtitle: "Decoding the 10-character permission string (-rwxr-xr--), 3 user classes (u, g, o), and r/w/x effects",
      concept: "Every file and directory in Linux is owned by a specific **User (Owner `u`)** and **Group (`g`)**, and has three sets of permissions (**Read `r`**, **Write `w`**, **Execute `x`**) assigned to **Owner (`u`)**, **Group (`g`)**, and **Others (`o`)**.",
      features: [
        {
          icon: "🔍",
          title: "Decoding the 10 Characters of `ls -l` (`-rwxr-xr--`)",
          desc: "Breaking down `- rwx r-x r-- 1 azrul jtmk` character by character.",
          bullets: [
            "**Character 1 (`-` or `d`)**: File type (`-` = Regular File, `d` = Directory, `l` = Symbolic Link).",
            "**Characters 2–4 (`rwx` — Owner/User `u`)**: Permissions for the file owner (`azrul`).",
            "**Characters 5–7 (`r-x` — Group `g`)**: Permissions for members of the file's group (`jtmk`).",
            "**Characters 8–10 (`r--` — Others `o`)**: Permissions for everyone else on the system."
          ]
        },
        {
          icon: "⚖️",
          title: "How `r`, `w`, `x` Differ Between Regular Files vs Directories",
          desc: "Crucial concept for exams and real-world troubleshooting!",
          bullets: [
            "**Read (`r` = 4)**: On a **File**, allows reading its contents (`cat`). On a **Directory**, allows listing filenames inside it (`ls`).",
            "**Write (`w` = 2)**: On a **File**, allows modifying its contents. On a **Directory**, allows **creating, renaming, or deleting files** inside that folder (requires `x` as well).",
            "**Execute (`x` = 1)**: On a **File**, allows running it as a program/script (`./script.sh`). On a **Directory**, allows **entering (`cd`) and accessing files** inside that directory!"
          ]
        }
      ]
    },
    {
      code: "3.7.2",
      subtopic: "3.7",
      title: "3.7.2 Construct Command `chown` and `chgrp` to Modify Ownership",
      subtitle: "Changing file and directory owner and group assignments recursively",
      concept: "When files are created by `root` or transferred between departments, administrators use `chown` (Change Owner) and `chgrp` (Change Group) to assign ownership to the appropriate user and group.",
      features: [
        {
          icon: "👤",
          title: "Using `chown` (Change Owner & Group)",
          desc: "Requires `sudo` privileges to change ownership of files.",
          bullets: [
            "**Change Owner Only**: `sudo chown azrul report.txt`",
            "**Change Owner AND Group Simultaneously**: **`sudo chown azrul:jtmk report.txt`**",
            "**Change Group Only via `chown`**: `sudo chown :jtmk report.txt`",
            "**Recursive Ownership Change (`-R`)**: **`sudo chown -R www-data:www-data /var/www/html`** (applies to the folder and all files/subfolders inside)."
          ]
        },
        {
          icon: "👥",
          title: "Using `chgrp` (Change Group Ownership)",
          desc: "Dedicated utility for changing the group affiliation of a file or directory.",
          bullets: [
            "**Change Group of a File**: `sudo chgrp jtmk shared_doc.txt`",
            "**Recursive Group Change (`-R`)**: `sudo chgrp -R jtmk /srv/shared_folder`"
          ]
        }
      ]
    },
    {
      code: "3.7.3",
      subtopic: "3.7",
      title: "3.7.3 Construct Command `chmod` to Modify the Permissions",
      subtitle: "Changing permissions using Symbolic Mode (u/g/o/a, +/-/=) and Octal Numeric Mode (0–7)",
      concept: "The **`chmod` (Change Mode)** command modifies the Read, Write, and Execute permissions of files and directories. It supports two syntaxes: **Symbolic Mode** (letters and operators) and **Octal Numeric Mode** (3-digit numbers derived from `4 + 2 + 1`). Try our live **Interactive `chmod` Calculator** in the Simulator tab!",
      features: [
        {
          icon: "🔢",
          title: "Octal Numeric Mode (`4` = Read, `2` = Write, `1` = Execute, `0` = None)",
          desc: "Sum the numbers (`4 + 2 + 1`) for Owner, Group, and Others independently.",
          bullets: [
            "**`7`** (`4+2+1` = `rwx`), **`6`** (`4+2+0` = `rw-`), **`5`** (`4+0+1` = `r-x`), **`4`** (`4+0+0` = `r--`), **`0`** (`---`).",
            "**`chmod 755 script.sh`** -> `-rwxr-xr-x` (Owner full `7`, Group & Others read+execute `5`).",
            "**`chmod 644 config.txt`** -> `-rw-r--r--` (Owner read+write `6`, Group & Others read-only `4`).",
            "**`chmod 700 secret_key`** -> `-rwx------` (Owner full `7`, zero access for Group & Others).",
            "**`chmod -R 750 /srv/jtmk`** -> Applies `rwxr-x---` recursively."
          ]
        },
        {
          icon: "🔤",
          title: "Symbolic Mode (`[ugoa][+-=][rwx]`)",
          desc: "Add (`+`), remove (`-`), or set exact (`=`) permissions without recalculating all bits.",
          bullets: [
            "**Who**: `u` (user/owner), `g` (group), `o` (others), `a` (all).",
            "**Add Execute to Owner**: `chmod u+x backup.sh` (or `chmod +x backup.sh` for all).",
            "**Remove Write from Group & Others**: `chmod go-w data.txt`.",
            "**Set Exact Permissions**: `chmod u=rwx,g=rx,o= report.sh` (same as `chmod 750`)."
          ]
        }
      ],
      tableTitle: "Complete Octal Permission Reference Table (Subtopic 3.7.3)",
      tableHeaders: ["Octal Digit", "Binary", "Symbolic", "Permission Breakdown (`4 + 2 + 1`)"],
      tableRows: [
        ["`0`", "`000`", "`---`", "No permissions (0)"],
        ["`1`", "`001`", "`--x`", "Execute only (1)"],
        ["`2`", "`010`", "`-w-`", "Write only (2)"],
        ["`3`", "`011`", "`-wx`", "Write (2) + Execute (1) = 3"],
        ["`4`", "`100`", "`r--`", "Read only (4)"],
        ["`5`", "`101`", "`r-x`", "Read (4) + Execute (1) = 5"],
        ["`6`", "`110`", "`rw-`", "Read (4) + Write (2) = 6"],
        ["`7`", "`111`", "`rwx`", "Read (4) + Write (2) + Execute (1) = 7 (Full Access)"]
      ]
    },
    {
      code: "3.7.4",
      subtopic: "3.7",
      title: "3.7.4 Trace the Default Permissions Created on Files and Directories (`umask`)",
      subtitle: "How Linux calculates initial permissions for newly created files (base 666) and directories (base 777)",
      concept: "When you create a brand-new file with `touch` or a folder with `mkdir`, how does Linux decide its default permissions? The system subtracts the **User File-Creation Mode Mask (`umask`)** from the maximum base permissions: **`777` for Directories** and **`666` for Regular Files** (new regular files are never granted execute `x` by default for security).",
      features: [
        {
          icon: "🧮",
          title: "Calculating Default Permissions with `umask`",
          desc: "Standard default `umask` on most Linux servers is **`0022`** (or `022`).",
          bullets: [
            "**Formula for New Directories**: Base **`777`** minus `umask 022` = **`755` (`drwxr-xr-x`)**.",
            "**Formula for New Regular Files**: Base **`666`** minus `umask 022` = **`644` (`-rw-r--r--`)**.",
            "**Stricter `umask 027` Example**: New Directory = `777 - 027 = 750` (`drwxr-x---`); New File = `666 - 027 = 640` (`-rw-r-----`).",
            "**View or Change `umask`**: Type `umask` to view current mask (e.g., `0022`), `umask -S` for symbolic view, or `umask 027` to set a stricter mask."
          ]
        }
      ]
    },
    {
      code: "3.7.5",
      subtopic: "3.7",
      title: "3.7.5 Construct Special File and Directory Permissions (SUID, SGID & Sticky Bit)",
      subtitle: "Advanced 4th-digit octal permissions: SetUID (4000), SetGID (2000), and Sticky Bit (1000)",
      concept: "Beyond standard `rwx` permissions, Linux provides three **Special Permissions** represented by a leading 4th octal digit (`4`, `2`, `1`) that solve critical multi-user administration challenges.",
      features: [
        {
          icon: "🚀",
          title: "1. SUID (Set User ID — Octal `4000` / Symbolic `u+s`)",
          desc: "When set on an executable binary, the program runs with the privileges of the **file owner** (e.g., `root`) rather than the user who ran it.",
          bullets: [
            "**Classic Example (`/usr/bin/passwd`)**: Regular users must update their password in `/etc/shadow` (owned by `root`). Because `/usr/bin/passwd` has SUID (`-rwsr-xr-x`), it temporarily runs as `root` to update the password safely.",
            "**How to Set**: `sudo chmod 4755 program` or `sudo chmod u+s program` (appears as `s` in Owner execute slot: `-rwsr-xr-x`)."
          ]
        },
        {
          icon: "🤝",
          title: "2. SGID (Set Group ID — Octal `2000` / `g+s`) & 3. Sticky Bit (Octal `1000` / `+t`)",
          desc: "Essential special permissions for shared departmental directories and public folders.",
          bullets: [
            "**SGID on a Shared Directory (`2000` / `chmod g+s`)**: Any new file or subfolder created inside the directory **automatically inherits the directory's Group ownership** instead of the user's primary group! (`chmod 2775 /srv/jtmk` -> `drwxrwsr-x`).",
            "**Sticky Bit on a Public Directory (`1000` / `chmod +t`)**: Used on `/tmp` (`drwxrwxrwt` / `chmod 1777`). Allows everyone to create files inside the folder, but **only the file's owner (or `root`) can delete or rename their own files!**"
          ]
        }
      ],
      tableTitle: "Summary of Linux Special Permissions (Subtopic 3.7.5)",
      tableHeaders: ["Special Permission", "Octal Value", "Symbolic Command", "`ls -l` Appearance", "Effect on Files & Directories"],
      tableRows: [
        ["SUID (Set User ID)", "`4xxx` (e.g. `4755`)", "`chmod u+s file`", "`-rwsr-xr-x`", "Executes binary with the permissions of the **File Owner**"],
        ["SGID (Set Group ID)", "`2xxx` (e.g. `2775`)", "`chmod g+s dir`", "`drwxrwsr-x`", "New files inside directory inherit the **Directory's Group**"],
        ["Sticky Bit", "`1xxx` (e.g. `1777`)", "`chmod +t dir`", "`drwxrwxrwt`", "Prevents users from deleting other users' files in a shared folder"]
      ]
    }
  ],
  labs: [
    {
      id: "lab-3-1",
      title: "Lab 3A: FHS Navigation, Viewing Files, Wildcards, `grep` & File Management",
      subtitle: "Covers 3.1, 3.2 & 3.3 — Navigating directories, creating/copying/moving files, filtering logs, and searching",
      steps: [
        {
          title: "Check Current Working Directory & Build Project Hierarchy (`pwd`, `mkdir -p`, `ls -la`)",
          desc: "Verify your location with `pwd`, then create a multi-level server folder structure using `mkdir -p` and inspect it with `ls -la`.",
          cmd: "student@ubuntu-svr:~$ pwd\n/home/student\nstudent@ubuntu-svr:~$ mkdir -p server_admin/{configs,logs,scripts}\nstudent@ubuntu-svr:~$ ls -la server_admin/\ntotal 20\ndrwxr-xr-x 5 student student 4096 Oct 28 11:10 .\ndrwxr-xr-x 4 student student 4096 Oct 28 11:10 ..\ndrwxr-xr-x 2 student student 4096 Oct 28 11:10 configs\ndrwxr-xr-x 2 student student 4096 Oct 28 11:10 logs\ndrwxr-xr-x 2 student student 4096 Oct 28 11:10 scripts",
          why: "Combining `mkdir -p` with brace expansion `{configs,logs,scripts}` builds an entire standardized directory structure in a single command."
        },
        {
          title: "Create, Copy, Move/Rename & Check File Types (`touch`, `cp`, `mv`, `file`)",
          desc: "Create a configuration file with `touch`, copy `/etc/hosts` into `configs/`, rename the file using `mv`, and verify its file type with `file`.",
          cmd: "student@ubuntu-svr:~$ touch server_admin/configs/draft.conf\nstudent@ubuntu-svr:~$ cp /etc/hosts server_admin/configs/hosts.bak\nstudent@ubuntu-svr:~$ mv server_admin/configs/draft.conf server_admin/configs/production.conf\nstudent@ubuntu-svr:~$ file server_admin/configs/hosts.bak\nserver_admin/configs/hosts.bak: ASCII text",
          why: "Backing up original configuration files (`.bak`) before editing and verifying file types prevents accidental corruption."
        },
        {
          title: "View Logs, Filter with `grep`, and Locate Files with `find`",
          desc: "Inspect the last 5 lines of `/var/log/syslog` with `tail`, filter for `error` lines case-insensitively with `grep -in`, and search for all `.conf` files using `find`.",
          cmd: "student@ubuntu-svr:~$ tail -n 5 /var/log/syslog\nstudent@ubuntu-svr:~$ grep -in \"error\" /var/log/syslog\n4:Oct 28 09:40:00 ubuntu-svr apache2[840]: ERROR: MaxRequestWorkers reached on server\n\nstudent@ubuntu-svr:~$ find server_admin/ -name \"*.conf\"\nserver_admin/configs/production.conf",
          why: "`tail`, `grep -in`, and `find` are the core diagnostic triad used daily to troubleshoot Linux servers."
        }
      ]
    },
    {
      id: "lab-3-2",
      title: "Lab 3B: Text Editors (`nano` & `vim`), User/Group Accounts, `sudo` & Shell Scripting",
      subtitle: "Covers 3.4, 3.5 & 3.6 — Creating users/groups, granting sudo privileges, and automating tasks with Bash scripts",
      steps: [
        {
          title: "Create Department Group & New User Account (`groupadd`, `useradd`, `passwd`)",
          desc: "Create a group named `jtmk`, add a new user `azrul` with a home folder (`-m`), `/bin/bash` shell (`-s`), supplementary group `jtmk` (`-G`), and assign a password.",
          cmd: "student@ubuntu-svr:~$ sudo groupadd jtmk\nstudent@ubuntu-svr:~$ sudo useradd -m -s /bin/bash -G jtmk,sudo azrul\nstudent@ubuntu-svr:~$ sudo passwd azrul\nNew password: ********\nRetype new password: ********\npasswd: password updated successfully",
          why: "Adding `azrul` to both `jtmk` and `sudo` grants access to departmental files as well as administrative sudo privileges."
        },
        {
          title: "Verify Account Entries in `/etc/passwd`, `/etc/group` and `id`",
          desc: "Confirm the new user's UID, GID, and group memberships using `id` and `tail`.",
          cmd: "student@ubuntu-svr:~$ id azrul\nuid=1001(azrul) gid=1001(azrul) groups=1001(azrul),27(sudo),1000(jtmk)\n\nstudent@ubuntu-svr:~$ tail -n 1 /etc/passwd\nazrul:x:1001:1001::/home/azrul:/bin/bash",
          why: "Verifying `/etc/passwd` and `id` confirms that the home directory, shell, and supplementary groups were registered properly."
        },
        {
          title: "Write & Execute an Administrative Bash Script (`health_check.sh`)",
          desc: "Using `nano` or `vim` (or `cat << 'EOF'`), create an administrative script starting with `#!/bin/bash`, grant execute permission (`chmod +x`), and run it.",
          cmd: "student@ubuntu-svr:~$ cat << 'EOF' > health_check.sh\n#!/bin/bash\n# DFK40063 Automated Server Health Check Script\necho \"========================================\"\necho \" LINUX SERVER HEALTH REPORT\"\necho \"========================================\"\necho \"Hostname   : $(hostname)\"\necho \"Date       : $(date)\"\necho \"Current Usr: $USER\"\necho \"----------------------------------------\"\ndf -h /\nEOF\n\nstudent@ubuntu-svr:~$ chmod +x health_check.sh\nstudent@ubuntu-svr:~$ ./health_check.sh",
          why: "Every shell script requires `#!/bin/bash` on line 1 and executable permissions (`chmod +x`) to run directly."
        }
      ]
    },
    {
      id: "lab-3-3",
      title: "Lab 3C: File Ownership, Octal/Symbolic `chmod`, `umask` & Special Permissions",
      subtitle: "Covers 3.7.1–3.7.5 — Securing a shared departmental directory with chown, chmod, SGID and Sticky Bit",
      steps: [
        {
          title: "Create Shared Directory & Assign Ownership (`chown` & `chgrp`)",
          desc: "Create `/srv/jtmk_shared` and assign ownership to user `azrul` and group `jtmk`.",
          cmd: "student@ubuntu-svr:~$ sudo mkdir -p /srv/jtmk_shared\nstudent@ubuntu-svr:~$ sudo chown azrul:jtmk /srv/jtmk_shared\nstudent@ubuntu-svr:~$ ls -ld /srv/jtmk_shared\ndrwxr-xr-x 2 azrul jtmk 4096 Oct 28 11:25 /srv/jtmk_shared",
          why: "`ls -ld` inspects the directory's own permissions and ownership rather than its contents."
        },
        {
          title: "Apply Octal Permissions + SGID & Sticky Bit (`chmod 3770`)",
          desc: "Set full `rwx` (`7`) for Owner and Group `jtmk`, zero access (`0`) for Others, plus SGID (`2000`) + Sticky Bit (`1000`) = `3770`.",
          cmd: "student@ubuntu-svr:~$ sudo chmod 3770 /srv/jtmk_shared\nstudent@ubuntu-svr:~$ ls -ld /srv/jtmk_shared\ndrwxrws--T 2 azrul jtmk 4096 Oct 28 11:25 /srv/jtmk_shared\n\nstudent@ubuntu-svr:~$ umask\n0022",
          why: "Mode `3770` ensures only `jtmk` members can enter the folder, all new files inherit the `jtmk` group (SGID `s`), and users cannot delete each other's files (Sticky Bit `T`/`t`)."
        }
      ]
    }
  ],
  quizzes: [
    {
      q: "According to the Linux Filesystem Hierarchy Standard (FHS), which directory stores all system-wide and service configuration files?",
      options: ["/bin", "/etc", "/var", "/opt"],
      answer: 1,
      explanation: "The `/etc` directory stores all editable text configuration files such as `/etc/passwd`, `/etc/hosts`, `/etc/fstab`, and `/etc/ssh/sshd_config`."
    },
    {
      q: "Which of the following is an example of an **Absolute Pathname** in Linux?",
      options: ["../var/log/syslog", "./scripts/backup.sh", "/var/log/apache2/error.log", "docs/report.txt"],
      answer: 2,
      explanation: "An Absolute Pathname always begins from the Root directory with a leading forward slash (`/var/log/apache2/error.log`)."
    },
    {
      q: "Which command inspects a file's internal header (magic bytes) to determine its true file type regardless of its filename extension?",
      options: ["pwd", "file", "mkdir", "touch"],
      answer: 1,
      explanation: "The `file <filename>` command reads the file's header and metadata to report whether it is ASCII text, an ELF executable, a directory, or compressed data."
    },
    {
      q: "Which command is best for monitoring the last lines of `/var/log/syslog` continuously in real time as new log events are written?",
      options: ["head -n 10 /var/log/syslog", "tail -f /var/log/syslog", "cat /var/log/syslog", "more /var/log/syslog"],
      answer: 1,
      explanation: "`tail -f` (follow) outputs the end of the file and streams new lines live as they are appended by the system."
    },
    {
      q: "Which `grep` command searches for the word `failed` inside `/var/log/auth.log` while ignoring uppercase/lowercase differences and displaying line numbers?",
      options: [
        "grep -v \"failed\" /var/log/auth.log",
        "grep -in \"failed\" /var/log/auth.log",
        "find /var/log/auth.log -name \"failed\"",
        "locate -c \"failed\""
      ],
      answer: 1,
      explanation: "In `grep`, `-i` ignores case distinctions and `-n` prefixes each matching line with its line number."
    },
    {
      q: "In the `vi` / `vim` text editor, what is the exact key sequence to **save your changes and exit**?",
      options: [
        "Press Ctrl + O, then Ctrl + X",
        "Press Esc, type `:wq` and press Enter",
        "Press Esc, type `:q!` and press Enter",
        "Press Ctrl + C"
      ],
      answer: 1,
      explanation: "Pressing `Esc` returns Vim to Normal/Command mode, and `:wq` writes (saves) the buffer to disk and quits. (`:q!` quits without saving)."
    },
    {
      q: "Which file in Linux stores the encrypted (hashed) user passwords and is readable only by the `root` user?",
      options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/shells"],
      answer: 1,
      explanation: "`/etc/shadow` stores salted password hashes and password aging rules, protected with strict permissions so regular users cannot read it."
    },
    {
      q: "Why must administrators use the `visudo` utility instead of a plain text editor when modifying `/etc/sudoers`?",
      options: [
        "Because `visudo` automatically restarts the network card",
        "Because `visudo` locks the file against simultaneous edits and checks for syntax errors before saving",
        "Because `/etc/sudoers` is a binary executable file",
        "Because `visudo` deletes all regular user accounts"
      ],
      answer: 1,
      explanation: "A syntax error in `/etc/sudoers` breaks `sudo` across the entire server. `visudo` validates syntax before committing changes."
    },
    {
      q: "What is the Octal value for the permission string `-rwxr-x---`?",
      options: ["755", "750", "644", "770"],
      answer: 1,
      explanation: "Owner `rwx` = 4+2+1 (7), Group `r-x` = 4+0+1 (5), Others `---` = 0. Therefore, the octal mode is `750`."
    },
    {
      q: "If a system's default `umask` is `022`, what will be the default octal permissions for a newly created **regular file** (base `666`) and a newly created **directory** (base `777`)?",
      options: [
        "File: 755, Directory: 777",
        "File: 644 (-rw-r--r--), Directory: 755 (drwxr-xr-x)",
        "File: 600, Directory: 700",
        "File: 666, Directory: 750"
      ],
      answer: 1,
      explanation: "Regular files use base `666` (`666 - 022 = 644`), while directories use base `777` (`777 - 022 = 755`)."
    },
    {
      q: "Which special permission (`chmod 1777` or `+t`), commonly applied to `/tmp`, allows all users to create files in a directory but prevents them from deleting files owned by other users?",
      options: ["SUID (Set User ID)", "SGID (Set Group ID)", "Sticky Bit", "Umask Bit"],
      answer: 2,
      explanation: "The Sticky Bit (`1000` or `+t`, displayed as `t` at the end of `drwxrwxrwt`) restricts file deletion inside a shared directory to the file's owner (or `root`)."
    }
  ]
});
