/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION
   SIMULATOR TERMINAL LINUX INTERAKTIF & MISI AMALI (BERFEST EDITION)
   ========================================================================== */

window.LinuxSimulator = (function () {
  // Virtual state
  let state = {
    user: "student",
    host: "ubuntu-svr",
    cwd: "/home/student",
    umask: "0022",
    aliases: {
      ll: "ls -la",
      la: "ls -a"
    },
    env: {
      USER: "student",
      HOME: "/home/student",
      SHELL: "/bin/bash",
      PATH: "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
      HOSTNAME: "ubuntu-svr"
    },
    users: [
      { name: "root", uid: 0, gid: 0, home: "/root", shell: "/bin/bash", groups: ["root"] },
      { name: "student", uid: 1000, gid: 1000, home: "/home/student", shell: "/bin/bash", groups: ["student", "sudo"] }
    ],
    groups: [
      { name: "root", gid: 0, members: ["root"] },
      { name: "sudo", gid: 27, members: ["student"] },
      { name: "student", gid: 1000, members: ["student"] }
    ],
    processes: [
      { pid: 1, user: "root", cpu: "0.0", mem: "0.2", cmd: "/sbin/init" },
      { pid: 512, user: "root", cpu: "0.1", mem: "0.4", cmd: "/usr/sbin/sshd -D" },
      { pid: 840, user: "www-data", cpu: "0.2", mem: "1.1", cmd: "/usr/sbin/apache2 -k start" },
      { pid: 1420, user: "student", cpu: "0.0", mem: "0.3", cmd: "-bash" },
      { pid: 4821, user: "student", cpu: "94.5", mem: "2.0", cmd: "/usr/bin/python3 hung_script.py" }
    ],
    fs: {}
  };

  function initDefaultFS() {
    state.fs = {
      "/": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/bin": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/sbin": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/etc": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/etc/hostname": { type: "file", perm: "-rw-r--r--", owner: "root", group: "root", size: 11, content: "ubuntu-svr" },
      "/etc/hosts": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 186,
        content: "127.0.0.1\tlocalhost\n127.0.1.1\tubuntu-svr.jtmk.local\tubuntu-svr\n192.168.56.101\tubuntu-svr\n192.168.56.102\twin-svr-dc01"
      },
      "/etc/passwd": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 420,
        content: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nsshd:x:110:65534::/run/sshd:/usr/sbin/nologin\nstudent:x:1000:1000:Pelajar DFK40063,,,:/home/student:/bin/bash"
      },
      "/etc/group": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 210,
        content: "root:x:0:\nsudo:x:27:student\nstudent:x:1000:"
      },
      "/etc/shadow": {
        type: "file",
        perm: "-rw-r-----",
        owner: "root",
        group: "shadow",
        size: 310,
        content: "root:$6$xyz123hashedpassword:19600:0:99999:7:::\nstudent:$6$abc987hashedpassword:19600:0:99999:7:::"
      },
      "/home": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/home/student": { type: "dir", perm: "drwxr-xr-x", owner: "student", group: "student", size: 4096 },
      "/home/student/.bashrc": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "student",
        group: "student",
        size: 165,
        content: "# ~/.bashrc: executed by bash(1) for non-login shells.\nalias ll='ls -la'\nalias la='ls -a'"
      },
      "/home/student/nota_server.txt": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "student",
        group: "student",
        size: 245,
        content: "Kursus: DFK40063 Server Administration\nTopik 1: Server Distribution in a Network\nTopik 2: Desktop Environment & Shells\nTopik 3: Linux Server Administration\nTopik 4: Windows Server Administration\nTopik 5: Risk Management & Maintenance"
      },
      "/home/student/semak.sh": {
        type: "file",
        perm: "-rw-r--r--",
        owner: "student",
        group: "student",
        size: 98,
        content: "#!/bin/bash\necho 'Status Pelayan: AKTIF'\nhostname -I"
      },
      "/var": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/var/log": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/var/log/syslog": {
        type: "file",
        perm: "-rw-r-----",
        owner: "root",
        group: "adm",
        size: 512,
        content: "Oct 28 08:00:01 ubuntu-svr systemd[1]: Started OpenBSD Secure Shell server.\nOct 28 08:15:22 ubuntu-svr sshd[512]: Accepted password for student from 192.168.56.1 port 52104 ssh2\nOct 28 09:02:10 ubuntu-svr kernel: [UFW BLOCK] SRC=10.0.2.99 DST=192.168.56.101\nOct 28 09:40:00 ubuntu-svr apache2[840]: ERROR: MaxRequestWorkers reached on server\nOct 28 10:05:11 ubuntu-svr cron[910]: (root) CMD (run-parts /etc/cron.hourly)"
      },
      "/var/backups": { type: "dir", perm: "drwxr-xr-x", owner: "root", group: "root", size: 4096 },
      "/tmp": { type: "dir", perm: "drwxrwxrwt", owner: "root", group: "root", size: 4096 },
      "/root": { type: "dir", perm: "drwx------", owner: "root", group: "root", size: 4096 }
    };
  }

  initDefaultFS();

  // Guided Missions for Students
  const missions = [
    {
      id: "m1",
      topic: "Topik 1 & 2",
      title: "Misi 1: Semak IP & Pemboleh Ubah Shell",
      desc: "Jalankan arahan `ip a` untuk melihat alamat IP pelayan, atau `echo $SHELL` untuk melihat shell semasa.",
      hintCmd: "ip a",
      done: false,
      check: (cmd) => cmd.startsWith("ip a") || cmd.startsWith("ifconfig") || cmd.includes("$SHELL")
    },
    {
      id: "m2",
      topic: "Topik 3.1 & 3.2",
      title: "Misi 2: Tapis Fail Log dengan `grep`",
      desc: "Cari perkataan `ERROR` di dalam `/var/log/syslog` menggunakan arahan `grep -i error /var/log/syslog`.",
      hintCmd: "grep -i error /var/log/syslog",
      done: false,
      check: (cmd) => cmd.includes("grep") && cmd.includes("syslog")
    },
    {
      id: "m3",
      topic: "Topik 3.3",
      title: "Misi 3: Bina Direktori & Fail Projek",
      desc: "Cipta sebuah direktori baharu dengan `mkdir projek_jtmk` atau fail baharu dengan `touch ujian.txt`.",
      hintCmd: "mkdir projek_jtmk",
      done: false,
      check: (cmd) => cmd.includes("mkdir ") || cmd.includes("touch ")
    },
    {
      id: "m4",
      topic: "Topik 3.5",
      title: "Misi 4: Bina Akaun Pengguna Linux",
      desc: "Cipta akaun pengguna baharu (contoh: `sudo useradd -m azrul`) dan semak `/etc/passwd`.",
      hintCmd: "sudo useradd -m azrul",
      done: false,
      check: (cmd) => cmd.includes("useradd ") || cmd.includes("adduser ")
    },
    {
      id: "m5",
      topic: "Topik 3.7",
      title: "Misi 5: Tukar Keizinan Fail (`chmod`)",
      desc: "Berikan keizinan boleh laku (`chmod 755 semak.sh` atau `chmod +x semak.sh`) kepada skrip.",
      hintCmd: "chmod 755 semak.sh",
      done: false,
      check: (cmd) => cmd.includes("chmod ")
    },
    {
      id: "m6",
      topic: "Topik 5.1 & 5.2",
      title: "Misi 6: Backup `tar` & Tamatkan Proses `kill`",
      desc: "Buat backup `sudo tar -czvf backup.tar.gz /etc` ATAU matikan proses tergantung PID 4821 dengan `kill -9 4821`.",
      hintCmd: "kill -9 4821",
      done: false,
      check: (cmd) => cmd.includes("tar ") || cmd.includes("kill ")
    }
  ];

  function resolvePath(inputPath) {
    if (!inputPath || inputPath === "~") return state.env.HOME;
    if (inputPath.startsWith("~/")) return state.env.HOME + inputPath.slice(1);
    let target = inputPath.startsWith("/") ? inputPath : (state.cwd === "/" ? "/" + inputPath : state.cwd + "/" + inputPath);
    const parts = target.split("/").filter(Boolean);
    const stack = [];
    for (const p of parts) {
      if (p === ".") continue;
      if (p === "..") stack.pop();
      else stack.push(p);
    }
    return "/" + stack.join("/");
  }

  function octalToSym(octalStr, isDir) {
    const map = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
    const clean = octalStr.length === 4 ? octalStr.slice(1) : octalStr;
    if (!/^[0-7]{3}$/.test(clean)) return null;
    const prefix = isDir ? "d" : "-";
    let sym = prefix + map[parseInt(clean[0])] + map[parseInt(clean[1])] + map[parseInt(clean[2])];
    if (octalStr.length === 4) {
      const sp = parseInt(octalStr[0]);
      const chars = sym.split("");
      if (sp & 4) chars[3] = chars[3] === "x" ? "s" : "S";
      if (sp & 2) chars[6] = chars[6] === "x" ? "s" : "S";
      if (sp & 1) chars[9] = chars[9] === "x" ? "t" : "T";
      sym = chars.join("");
    }
    return sym;
  }

  function executeSingle(rawCmd) {
    let cmdLine = rawCmd.trim();
    if (!cmdLine) return "";

    // Expand simple variables
    cmdLine = cmdLine.replace(/\$(\w+)/g, (_, v) => state.env[v] || "");

    let isSudo = false;
    if (cmdLine.startsWith("sudo ")) {
      isSudo = true;
      cmdLine = cmdLine.replace(/^sudo\s+/, "").trim();
    }

    const parts = cmdLine.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const tokens = parts.map(t => t.replace(/^['"]|['"]$/g, ""));
    let cmd = tokens[0];
    let args = tokens.slice(1);

    // Check aliases
    if (state.aliases[cmd]) {
      const expanded = state.aliases[cmd].split(/\s+/);
      cmd = expanded[0];
      args = expanded.slice(1).concat(args);
    }

    switch (cmd) {
      case "help":
        return [
          "=== PANDUAN ARAHAN SIMULATOR LINUX DFK40063 ===",
          "Navigasi & FHS : pwd, ls [-la], cd <dir>, file <fail>",
          "Baca & Cari    : cat, head, tail, grep [-in] <corak> <fail>, find, locate",
          "Urus Fail      : touch <fail>, mkdir [-p] <dir>, cp, mv, rm [-rf], rmdir",
          "Shell & Var    : echo, export, printenv, alias, unalias",
          "Pengguna & Sudo: whoami, id, sudo useradd -m <nama>, passwd, groupadd, su",
          "Keizinan       : chmod <oktal/+x> <fail>, chown <user:group> <fail>, umask",
          "Rangkaian      : ip a, ifconfig, ping <ip>, ssh <user@ip>",
          "Backup & Sistem: tar -czvf <arkib.tar.gz> <dir>, ps aux, lsof, parted -l, kill -9 <PID>, clear, reset"
        ].join("\n");

      case "pwd":
        return state.cwd;

      case "whoami":
        return isSudo ? "root" : state.user;

      case "hostname":
        return args.includes("-I") ? "192.168.56.101 10.0.2.15" : state.host;

      case "date":
        return new Date().toString();

      case "uname":
        return args.includes("-a")
          ? "Linux ubuntu-svr 5.15.0-88-generic #98-Ubuntu SMP x86_64 GNU/Linux"
          : "Linux";

      case "id": {
        const targetName = args[0] || state.user;
        const u = state.users.find(x => x.name === targetName);
        if (!u) return `id: '${targetName}': no such user`;
        const grpStr = u.groups.map((g, idx) => `${u.gid + idx}(${g})`).join(",");
        return `uid=${u.uid}(${u.name}) gid=${u.gid}(${u.name}) groups=${grpStr}`;
      }

      case "cd": {
        const dest = resolvePath(args[0] || "~");
        if (!state.fs[dest]) return `bash: cd: ${args[0]}: No such file or directory`;
        if (state.fs[dest].type !== "dir") return `bash: cd: ${args[0]}: Not a directory`;
        state.cwd = dest;
        state.env.PWD = dest;
        return "";
      }

      case "ls": {
        let showAll = false;
        let showLong = false;
        let targetArg = null;
        for (const a of args) {
          if (a.startsWith("-")) {
            if (a.includes("a")) showAll = true;
            if (a.includes("l")) showLong = true;
          } else {
            targetArg = a;
          }
        }
        const dirPath = resolvePath(targetArg || state.cwd);
        const node = state.fs[dirPath];
        if (!node) return `ls: cannot access '${targetArg}': No such file or directory`;
        if (node.type === "file") {
          const base = dirPath.split("/").pop();
          return showLong ? `${node.perm} 1 ${node.owner} ${node.group} ${node.size} Oct 28 10:30 ${base}` : base;
        }
        const prefix = dirPath === "/" ? "/" : dirPath + "/";
        const children = Object.keys(state.fs)
          .filter(k => k !== dirPath && k.startsWith(prefix))
          .map(k => k.slice(prefix.length))
          .filter(rest => !rest.includes("/"));

        let list = showAll ? [".", "..", ...children] : children.filter(c => !c.startsWith("."));
        if (!showLong) return list.join("  ");
        const lines = [`total ${list.length * 4}`];
        for (const name of list) {
          if (name === "." || name === "..") {
            lines.push(`drwxr-xr-x 2 ${node.owner} ${node.group} 4096 Oct 28 10:00 ${name}`);
          } else {
            const cNode = state.fs[prefix + name];
            lines.push(`${cNode.perm} 1 ${cNode.owner} ${cNode.group} ${String(cNode.size).padStart(4, " ")} Oct 28 10:30 ${name}`);
          }
        }
        return lines.join("\n");
      }

      case "file": {
        if (!args[0]) return "Usage: file <filename>";
        const p = resolvePath(args[0]);
        const n = state.fs[p];
        if (!n) return `${args[0]}: cannot open (No such file or directory)`;
        if (n.type === "dir") return `${args[0]}: directory`;
        if (args[0].endsWith(".sh")) return `${args[0]}: Bourne-Again shell script, ASCII text executable`;
        if (args[0].endsWith(".tar.gz")) return `${args[0]}: gzip compressed data, from Unix`;
        return `${args[0]}: ASCII text`;
      }

      case "cat":
      case "more":
      case "less": {
        if (!args[0]) return `Usage: ${cmd} <filename>`;
        const p = resolvePath(args[0]);
        const n = state.fs[p];
        if (!n) return `${cmd}: ${args[0]}: No such file or directory`;
        if (n.type === "dir") return `${cmd}: ${args[0]}: Is a directory`;
        if (p === "/etc/shadow" && !isSudo && state.user !== "root") {
          return `${cmd}: /etc/shadow: Permission denied (Gunakan 'sudo cat /etc/shadow')`;
        }
        return n.content || "";
      }

      case "head":
      case "tail": {
        let count = 5;
        let fileArg = args[args.length - 1];
        const nIdx = args.indexOf("-n");
        if (nIdx !== -1 && args[nIdx + 1]) count = parseInt(args[nIdx + 1]) || 5;
        const p = resolvePath(fileArg);
        const n = state.fs[p];
        if (!n || n.type !== "file") return `${cmd}: cannot open '${fileArg}' for reading: No such file`;
        const lines = (n.content || "").split("\n");
        return cmd === "head" ? lines.slice(0, count).join("\n") : lines.slice(-count).join("\n");
      }

      case "grep": {
        let ignoreCase = false;
        let lineNum = false;
        const cleanArgs = [];
        for (const a of args) {
          if (a.startsWith("-")) {
            if (a.includes("i")) ignoreCase = true;
            if (a.includes("n")) lineNum = true;
          } else {
            cleanArgs.push(a);
          }
        }
        if (cleanArgs.length < 2) return "Usage: grep [options] <pattern> <filename>";
        const pattern = cleanArgs[0];
        const p = resolvePath(cleanArgs[1]);
        const n = state.fs[p];
        if (!n || n.type !== "file") return `grep: ${cleanArgs[1]}: No such file or directory`;
        const regex = new RegExp(pattern, ignoreCase ? "i" : "");
        const lines = (n.content || "").split("\n");
        const matched = [];
        lines.forEach((line, idx) => {
          if (regex.test(line)) {
            matched.push(lineNum ? `${idx + 1}:${line}` : line);
          }
        });
        return matched.join("\n") || "(Tiada baris yang sepadan ditemui)";
      }

      case "touch": {
        if (!args[0]) return "touch: missing file operand";
        const p = resolvePath(args[0]);
        if (!state.fs[p]) {
          state.fs[p] = {
            type: "file",
            perm: "-rw-r--r--",
            owner: isSudo ? "root" : state.user,
            group: isSudo ? "root" : state.user,
            size: 0,
            content: ""
          };
        }
        return `Fail '${args[0]}' berjaya dicipta / dikemas kini.`;
      }

      case "mkdir": {
        const dirArgs = args.filter(a => !a.startsWith("-"));
        if (!dirArgs.length) return "mkdir: missing operand";
        for (const d of dirArgs) {
          const p = resolvePath(d);
          const segments = p.split("/").filter(Boolean);
          let curr = "";
          for (const seg of segments) {
            curr += "/" + seg;
            if (!state.fs[curr]) {
              state.fs[curr] = {
                type: "dir",
                perm: "drwxr-xr-x",
                owner: isSudo ? "root" : state.user,
                group: isSudo ? "root" : state.user,
                size: 4096
              };
            }
          }
        }
        return `Direktori '${dirArgs.join(", ")}' berjaya dicipta.`;
      }

      case "cp": {
        const clean = args.filter(a => !a.startsWith("-"));
        if (clean.length < 2) return "cp: missing file operand";
        const src = resolvePath(clean[0]);
        let dst = resolvePath(clean[1]);
        if (!state.fs[src]) return `cp: cannot stat '${clean[0]}': No such file or directory`;
        if (state.fs[dst] && state.fs[dst].type === "dir") {
          dst = (dst === "/" ? "/" : dst + "/") + src.split("/").pop();
        }
        state.fs[dst] = JSON.parse(JSON.stringify(state.fs[src]));
        return `Disalin '${clean[0]}' -> '${dst}'`;
      }

      case "mv": {
        const clean = args.filter(a => !a.startsWith("-"));
        if (clean.length < 2) return "mv: missing file operand";
        const src = resolvePath(clean[0]);
        let dst = resolvePath(clean[1]);
        if (!state.fs[src]) return `mv: cannot stat '${clean[0]}': No such file or directory`;
        if (state.fs[dst] && state.fs[dst].type === "dir") {
          dst = (dst === "/" ? "/" : dst + "/") + src.split("/").pop();
        }
        state.fs[dst] = state.fs[src];
        delete state.fs[src];
        return `Dialihkan/Ditukar nama '${clean[0]}' -> '${dst}'`;
      }

      case "rm":
      case "rmdir": {
        const clean = args.filter(a => !a.startsWith("-"));
        if (!clean.length) return `${cmd}: missing operand`;
        const target = resolvePath(clean[0]);
        if (!state.fs[target]) return `${cmd}: cannot remove '${clean[0]}': No such file or directory`;
        delete state.fs[target];
        Object.keys(state.fs).forEach(k => {
          if (k.startsWith(target + "/")) delete state.fs[k];
        });
        return `'${clean[0]}' telah dipadam.`;
      }

      case "find":
      case "locate": {
        const term = args[args.length - 1].replace(/\*/g, "");
        const matches = Object.keys(state.fs).filter(k => k.toLowerCase().includes(term.toLowerCase()));
        return matches.join("\n") || "(Tiada fail ditemui)";
      }

      case "echo":
        return args.join(" ");

      case "printenv":
      case "env":
        return Object.entries(state.env).map(([k, v]) => `${k}=${v}`).join("\n");

      case "export": {
        if (!args[0]) return Object.entries(state.env).map(([k, v]) => `declare -x ${k}="${v}"`).join("\n");
        const [k, v] = args[0].split("=");
        if (k && v !== undefined) state.env[k] = v;
        return `Pemboleh ubah persekitaran '${k}' ditetapkan.`;
      }

      case "alias": {
        if (!args.length) {
          return Object.entries(state.aliases).map(([k, v]) => `alias ${k}='${v}'`).join("\n");
        }
        const joined = args.join(" ");
        const [name, val] = joined.split("=");
        if (name && val) {
          state.aliases[name.trim()] = val.replace(/^['"]|['"]$/g, "");
          return `Alias '${name.trim()}' berjaya ditambah.`;
        }
        return "";
      }

      case "unalias": {
        if (args[0] && state.aliases[args[0]]) {
          delete state.aliases[args[0]];
          return `Alias '${args[0]}' telah dibuang.`;
        }
        return `bash: unalias: ${args[0] || ""}: not found`;
      }

      case "useradd":
      case "adduser": {
        if (!isSudo && state.user !== "root") return "useradd: Permission denied. (Sila guna 'sudo useradd ...')";
        const username = args[args.length - 1];
        if (!username || username.startsWith("-")) return "Usage: sudo useradd [-m] <username>";
        if (state.users.some(u => u.name === username)) return `useradd: user '${username}' already exists`;
        const newUid = 1000 + state.users.length;
        state.users.push({ name: username, uid: newUid, gid: newUid, home: `/home/${username}`, shell: "/bin/bash", groups: [username] });
        state.fs[`/home/${username}`] = { type: "dir", perm: "drwxr-xr-x", owner: username, group: username, size: 4096 };
        state.fs["/etc/passwd"].content += `\n${username}:x:${newUid}:${newUid}:Pengguna Baharu:/home/${username}:/bin/bash`;
        state.fs["/etc/group"].content += `\n${username}:x:${newUid}:`;
        return `Akaun pengguna '${username}' (UID=${newUid}) dan direktori '/home/${username}' berjaya dicipta!`;
      }

      case "groupadd": {
        if (!isSudo && state.user !== "root") return "groupadd: Permission denied. (Sila guna 'sudo groupadd ...')";
        const gname = args[args.length - 1];
        if (!gname) return "Usage: sudo groupadd <group_name>";
        const newGid = 1000 + state.groups.length;
        state.groups.push({ name: gname, gid: newGid, members: [] });
        state.fs["/etc/group"].content += `\n${gname}:x:${newGid}:`;
        return `Kumpulan '${gname}' (GID=${newGid}) berjaya dicipta di dalam /etc/group.`;
      }

      case "passwd": {
        const targetUser = args[0] || state.user;
        return `passwd: password for '${targetUser}' updated successfully (Disimpan secara hash di dalam /etc/shadow).`;
      }

      case "chmod": {
        if (args.length < 2) return "Usage: chmod <mode> <file>";
        const mode = args[0];
        const target = resolvePath(args[1]);
        const node = state.fs[target];
        if (!node) return `chmod: cannot access '${args[1]}': No such file or directory`;
        if (/^[0-7]{3,4}$/.test(mode)) {
          const newSym = octalToSym(mode, node.type === "dir");
          if (newSym) node.perm = newSym;
        } else if (mode.includes("+x")) {
          const chars = node.perm.split("");
          chars[3] = "x";
          chars[6] = "x";
          chars[9] = "x";
          node.perm = chars.join("");
        } else if (mode.includes("-w")) {
          const chars = node.perm.split("");
          chars[5] = "-";
          chars[8] = "-";
          node.perm = chars.join("");
        }
        return `Keizinan '${args[1]}' dikemas kini kepada ${node.perm} (${mode}).`;
      }

      case "chown":
      case "chgrp": {
        if (args.length < 2) return `Usage: ${cmd} <owner[:group]> <file>`;
        const target = resolvePath(args[1]);
        const node = state.fs[target];
        if (!node) return `${cmd}: cannot access '${args[1]}': No such file or directory`;
        if (cmd === "chown") {
          const [o, g] = args[0].split(":");
          if (o) node.owner = o;
          if (g) node.group = g;
        } else {
          node.group = args[0];
        }
        return `Pemilikan '${args[1]}' ditukar kepada ${node.owner}:${node.group}.`;
      }

      case "umask":
        if (args[0]) state.umask = args[0].padStart(4, "0");
        return state.umask;

      case "ip":
      case "ifconfig":
        return [
          "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN",
          "    inet 127.0.0.1/8 scope host lo",
          "2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP",
          "    link/ether 08:00:27:4a:9c:11 brd ff:ff:ff:ff:ff:ff",
          "    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3",
          "3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP",
          "    link/ether 08:00:27:8b:20:55 brd ff:ff:ff:ff:ff:ff",
          "    inet 192.168.56.101/24 brd 192.168.56.255 scope global enp0s8"
        ].join("\n");

      case "ping": {
        const host = args[args.length - 1] || "192.168.56.102";
        return [
          `PING ${host} (${host}) 56(84) bytes of data.`,
          `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.42 ms`,
          `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.38 ms`,
          `--- ${host} ping statistics ---`,
          `2 packets transmitted, 2 received, 0% packet loss, time 1002ms`
        ].join("\n");
      }

      case "tar": {
        const archiveName = args.find(a => a.endsWith(".tar") || a.endsWith(".tar.gz") || a.endsWith(".tgz")) || "backup.tar.gz";
        const destPath = resolvePath(archiveName);
        state.fs[destPath] = {
          type: "file",
          perm: "-rw-r--r--",
          owner: isSudo ? "root" : state.user,
          group: isSudo ? "root" : state.user,
          size: 184320,
          content: "[BINARY GZIP TAR ARCHIVE DATA]"
        };
        return `tar: Mencipta arkib termampat '${archiveName}'...\n/etc/passwd\n/etc/group\n/etc/hosts\nSandaran berjaya disimpan di: ${destPath} (180 KB)`;
      }

      case "dump":
        return "DUMP: Date of this level 0 dump: Wed Oct 28 2026\nDUMP: Dumping /dev/sda1 (/home) to backup.dump\nDUMP: DUMP IS DONE (100% berjaya)";

      case "ps": {
        const header = "USER       PID %CPU %MEM COMMAND";
        const rows = state.processes.map(p => `${p.user.padEnd(9)} ${String(p.pid).padStart(4)} ${p.cpu.padStart(4)} ${p.mem.padStart(4)} ${p.cmd}`);
        return [header, ...rows].join("\n");
      }

      case "lsof":
        return [
          "COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",
          "sshd      512     root    3u  IPv4  18492      0t0  TCP *:22 (LISTEN)",
          "apache2   840 www-data    4u  IPv4  20114      0t0  TCP *:80 (LISTEN)",
          "python3  4821  student    3r   REG    8,1     4096  992 /home/student/hung_script.py"
        ].join("\n");

      case "ntop":
      case "top":
        return [
          "=== LAPORAN PEMANTAUAN RANGKAIAN & PROSES (NTOP / TOP) ===",
          "Antara Muka Aktif: enp0s8 (IP: 192.168.56.101) | Trafik Masuk: 1.4 Mbps | Trafik Keluar: 820 Kbps",
          "Protokol Utama   : SSH (Port 22) - 45% | HTTP (Port 80) - 40% | DNS (Port 53) - 15%",
          "Amaran Prestasi  : Proses PID 4821 (hung_script.py) menggunakan 94.5% CPU! Gunakan 'kill -9 4821'."
        ].join("\n");

      case "parted":
        return [
          "Model: ATA VBOX HARDDISK (scsi)",
          "Disk /dev/sda: 26.8GB",
          "Sector size (logical/physical): 512B/512B",
          "Partition Table: gpt",
          "Number  Start   End     Size    File system  Name  Flags",
          " 1      1049kB  538MB   537MB   fat32              boot, esp",
          " 2      538MB   26.8GB  26.3GB  ext4"
        ].join("\n");

      case "kill": {
        const pidArg = parseInt(args[args.length - 1]);
        if (!pidArg) return "Usage: kill [-9] <PID>";
        const idx = state.processes.findIndex(p => p.pid === pidArg);
        if (idx === -1) return `bash: kill: (${pidArg}) - No such process`;
        const removed = state.processes.splice(idx, 1)[0];
        return `[1]+  Killed                  ${removed.cmd} (PID ${removed.pid} berjaya ditamatkan!)`;
      }

      case "df":
        return [
          "Filesystem      Size  Used Avail Use% Mounted on",
          "/dev/sda2        25G  6.4G   18G  27% /",
          "tmpfs           2.0G     0  2.0G   0% /dev/shm",
          "/dev/sda1       511M  6.1M  505M   2% /boot/efi"
        ].join("\n");

      default:
        if (cmd && cmd.includes("=")) {
          const [k, v] = cmdLine.split("=");
          state.env[k.trim()] = v.replace(/^['"]|['"]$/g, "");
          return `Pemboleh ubah '${k.trim()}' disimpan.`;
        }
        return `bash: ${cmd}: command not found (Taip 'help' untuk melihat senarai arahan yang disokong)`;
    }
  }

  function runCommand(fullInput) {
    const trimmed = fullInput.trim();
    if (!trimmed) return { output: "", missionUnlocked: null };

    // Check missions
    let unlocked = null;
    missions.forEach(m => {
      if (!m.done && m.check(trimmed)) {
        m.done = true;
        unlocked = m;
      }
    });

    if (trimmed === "clear") {
      return { clear: true, output: "", missionUnlocked: unlocked };
    }
    if (trimmed === "reset") {
      initDefaultFS();
      state.cwd = "/home/student";
      return { output: "Sistem fail maya Linux telah ditetapkan semula (Reset) kepada keadaan asal.", missionUnlocked: unlocked };
    }

    // Handle Pipe `|`
    if (trimmed.includes("|")) {
      const pipeParts = trimmed.split("|").map(s => s.trim());
      let currentOut = executeSingle(pipeParts[0]);
      for (let i = 1; i < pipeParts.length; i++) {
        const nextCmd = pipeParts[i];
        if (nextCmd.startsWith("grep ")) {
          const pat = nextCmd.replace(/^grep\s+(-[a-z]+\s+)?/i, "").replace(/['"]/g, "").trim();
          const regex = new RegExp(pat, "i");
          currentOut = currentOut.split("\n").filter(l => regex.test(l)).join("\n");
        } else if (nextCmd.startsWith("head")) {
          currentOut = currentOut.split("\n").slice(0, 5).join("\n");
        } else if (nextCmd.startsWith("tail")) {
          currentOut = currentOut.split("\n").slice(-5).join("\n");
        }
      }
      return { output: currentOut, missionUnlocked: unlocked };
    }

    // Handle Output Redirection `>` or `>>`
    if (trimmed.includes(">")) {
      const isAppend = trimmed.includes(">>");
      const [leftCmd, rightFile] = trimmed.split(isAppend ? ">>" : ">").map(s => s.trim());
      const outText = executeSingle(leftCmd);
      const filePath = resolvePath(rightFile);
      if (isAppend && state.fs[filePath]) {
        state.fs[filePath].content = (state.fs[filePath].content ? state.fs[filePath].content + "\n" : "") + outText;
      } else {
        state.fs[filePath] = {
          type: "file",
          perm: "-rw-r--r--",
          owner: state.user,
          group: state.user,
          size: outText.length,
          content: outText
        };
      }
      return { output: `Output disimpan ke dalam '${rightFile}'.`, missionUnlocked: unlocked };
    }

    return { output: executeSingle(trimmed), missionUnlocked: unlocked };
  }

  function getPrompt() {
    const shortDir = state.cwd === state.env.HOME ? "~" : state.cwd;
    return `${state.user}@${state.host}:${shortDir}$`;
  }

  return {
    runCommand,
    getPrompt,
    getMissions: () => missions
  };
})();
