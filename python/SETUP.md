# Setup – Python

One-time, about 10 minutes, longer if Homebrew is not installed yet.
At the end, the Session 1 example runs.
You need exactly one tool: **uv**. uv installs Python and all packages for
you. An already installed Python does not get in the way.

## 1. Open a terminal

| System  | How                                                      |
| ------- | -------------------------------------------------------- |
| macOS   | `Cmd + Space`, type "Terminal", Enter                    |
| Windows | Start menu, type "Terminal", Enter (opens PowerShell)    |
| Linux   | Your distribution's terminal app, often `Ctrl + Alt + T` |

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

## 3. Check uv

```bash
uv --version
```

| Result                 | What to do                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `0.9.17` or newer      | nothing, continue with step 4                                                                                            |
| older version          | update: `brew upgrade uv` or `winget upgrade --id=astral-sh.uv -e`; if you installed uv some other way: `uv self update` |
| error, command unknown | install, see below                                                                                                       |

**Install – macOS and Linux**

```bash
brew install uv
```

**Install – Windows**

```powershell
winget install --id=astral-sh.uv -e
```

Reopen the terminal and check `uv --version` again.

## 4. Change into the `python` folder

Download and unpack the course folder. Then type `cd ` in the terminal
(with a trailing space), drag the `python` folder from Finder or Explorer into
the terminal and press Enter.

Check that you are in the right place – you should see `pyproject.toml`,
among other things:

```bash
ls
```

## 5. Install packages

```bash
uv sync --locked
```

Installs exactly the versions from `uv.lock` and, the first time, Python as well.
Do not use pip or a Python already on your machine: the packages need
Python 3.11 or newer, and uv brings a matching one.

## 6. Add your API key

In the `python` folder, create a file `.env` with your key
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
uv run --env-file .env session-01/agent.py
```

The agent should reply briefly that it cannot book a hairdresser appointment,
and write a short poem instead. Then everything is ready.

## If something goes wrong

| Message                                                 | Fix                                                                                                                                                                                                                          |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command not found` / "is not recognized as the name …" | Close and reopen the terminal. If that does not help, restart the computer.                                                                                                                                                  |
| `brew` unknown after installation                       | The "Next steps" are still missing. macOS: `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`, Linux: `echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc`, then reopen the terminal. |
| "Failed to parse `pyproject.toml`" mentioning `exclude-newer` | uv is too old, see step 3.                                                                                                                                                                                          |
| `No pyproject.toml found`                               | You are not in the `python` folder, repeat step 4.                                                                                                                                                                           |
| `authentication_error` / `invalid x-api-key`            | Check the key in `.env`: no quotes around the key, no spaces.                                                                                                                                                                |

**Editor:** If you use an editor such as VS Code, open the `python` folder as a
whole and select `.venv` in that folder as the interpreter.

## Why package managers?

Other routes work too: uv's own install script, or Python from python.org or
Anaconda with pip. We recommend Homebrew and winget because they verify what
they download, update and uninstall with a single command, and everyone in the
course takes the same route – which makes helping each other much easier.
