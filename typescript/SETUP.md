# Setup – TypeScript

One-time, about 10 minutes, longer if Homebrew is not installed yet.
At the end, the Session 1 example runs.
You need exactly one tool: **Node.js**. It comes with `npm`, which installs
all packages.

## 1. Open a terminal

| System  | How                                                          |
| ------- | ------------------------------------------------------------ |
| macOS   | `Cmd + Space`, type "Terminal", Enter                        |
| Windows | Start menu, type "Terminal", Enter (opens PowerShell)        |
| Linux   | Your distribution's terminal app, often `Ctrl + Alt + T`     |

Type or paste all commands below into it and press Enter.
After each installation, **close and reopen** the terminal.

## 2. Check the package manager

We install everything through a package manager: **Homebrew** on macOS and
Linux, **winget** on Windows. First check whether it is already there.

**macOS and Linux**

```bash
brew --version
```

If that prints a version number, continue with step 3. Otherwise install Homebrew:

- Linux only, install the base tools first:
  Debian/Ubuntu `sudo apt-get install build-essential procps curl file git`,
  Fedora `sudo dnf group install development-tools && sudo dnf install procps-ng curl file`
- Then on macOS and Linux:

  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

  The installer explains what it does and asks for your password.
  At the end it shows two or three commands under **"Next steps"** – run
  exactly those, then reopen the terminal and check `brew --version` again.

**Windows**

```powershell
winget --version
```

Usually preinstalled on Windows 10 and 11. If not: install "App Installer"
from the Microsoft Store.

## 3. Check Node.js

```bash
node -v
npm -v
```

| Result                                                      | What to do                                                                                                                                                                              |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node` at least `v24.22.1` **and** `npm` at least `11.10.0` | nothing, continue with step 4                                                                                                                                                           |
| older version                                               | update: `brew upgrade node` or `winget upgrade --id=OpenJS.NodeJS.LTS -e`; if you installed Node some other way (e.g. the nodejs.org installer or nvm), update it the same way you installed it |
| error, command unknown                                      | install, see below                                                                                                                                                                      |

**Install – macOS and Linux**

```bash
brew install node
```

**Install – Windows**

```powershell
winget install --id=OpenJS.NodeJS.LTS -e
```

Reopen the terminal and check `node -v` and `npm -v` again.

## 4. Change into the `typescript` folder

Download and unpack the course folder. Then type `cd ` in the terminal
(with a trailing space), drag the `typescript` folder from Finder or Explorer
into the terminal and press Enter.

Check that you are in the right place – you should see `package.json`,
among other things:

```bash
ls
```

## 5. Install packages

```bash
npm ci
```

Installs exactly the versions from `package-lock.json`.

## 6. Add your API key

In the `typescript` folder, create a file `.env` with your key
(replace `sk-ant-...` with the real key):

**macOS and Linux**

```bash
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env
```

**Windows**

```powershell
Set-Content .env 'ANTHROPIC_API_KEY=sk-ant-...'
```

Never share or upload the `.env` file.

## 7. Try it out

```bash
npx tsx --env-file=.env session-01/agent.ts
```

The agent should reply briefly that it cannot book a hairdresser appointment,
and write a short poem instead. Then everything is ready.

## If something goes wrong

| Message                                                   | Fix                                                                                                                                                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command not found` / "is not recognized as the name …"   | Close and reopen the terminal. If that does not help, restart the computer.                                                                                                                                         |
| `brew` unknown after installation                         | The "Next steps" are still missing. macOS: `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`, Linux: `echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc`, then reopen the terminal. |
| Windows: "running scripts is disabled on this system"     | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once and confirm with `Y`.                                                                                                                                 |
| `EBADDEVENGINES`                                          | Node.js or npm is too old, see step 3.                                                                                                                                                                              |
| `node -v` still shows the old version after the update    | Node is installed twice (e.g. nvm and Homebrew). `which -a node` shows all copies. Talk to us.                                                                                                                      |
| `npm ci` reports a missing `package-lock.json`            | You are not in the `typescript` folder, repeat step 4.                                                                                                                                                              |
| `authentication_error` / `invalid x-api-key`              | Check the key in `.env`: no quotes around the key, no spaces.                                                                                                                                                       |

**Editor:** If you use an editor such as VS Code, open the `typescript` folder
as a whole, not individual files. Then it finds the installed packages.

## Why package managers?

Other routes work too: the installer from nodejs.org, or version managers such
as nvm, fnm or Volta. We recommend Homebrew and winget because they verify what
they download, update and uninstall with a single command, and everyone in the
course takes the same route – which makes helping each other much easier.
