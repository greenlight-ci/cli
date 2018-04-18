SOURCES = node9-linux-x64 node9-linux-x86 node9-macos-x64 node9-macos-x86 node9-win-x64 node9-win-x86

%:
	npx pkg app/index.js --targets $@ --output bin/$(subst node9-,,$@)

.PHONY: clean all

all: clean $(SOURCES)

clean:
	rm -rf bin
