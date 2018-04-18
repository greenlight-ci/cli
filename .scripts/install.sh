case "$(uname -s)" in
  "Linux" | "GNU"*) os="linux" ;;
  "Darwin") os="macos" ;;
  "CYGWIN"* | "MSYS"* | "MINGW"*) os="win" ;;
  *)
      printf "%s\n" "Unknown OS detected, aborting..." >&2
      printf "%s\n" "Open an issue on GitHub to add support for your OS." >&2
      exit 1
  ;;
esac

case "$(uname -m)" in
  "x86_64") arch="x64" ;;
  "i686"* | "i386"*) arch="x86" ;;
  *)
      printf "%s\n" "Unknown machine architecture detected, aborting..." >&2
      printf "%s\n" "Open an issue on GitHub to add support for your OS." >&2
      exit 1
  ;;
esac

curl -L https://github.com/greenlight/cli/releases/download/v1.10.0/$os-$arch.tar.gz | tar xvzf - -C bin/
