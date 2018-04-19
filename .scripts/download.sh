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

REPO="greenlight/cli"
LATEST_RELEASE=$(curl -L -s -H 'Accept: application/json' https://github.com/$REPO/releases/latest)
LATEST_VERSION=$(echo $LATEST_RELEASE | sed -e 's/.*"tag_name":"\([^"]*\)".*/\1/')
ARTIFACT_URL="https://github.com/$REPO/releases/download/$LATEST_VERSION/$os-$arch.tar.gz"

curl -L $ARTIFACT_URL | tar xvzf - -C bin/
