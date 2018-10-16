.PHONY: clean all install uninstall image

SOURCES = node10-linux-x64 node10-linux-x86 node10-macos-x64 node10-macos-x86 node10-win-x64 node10-win-x86

%:
	$(eval NAME=$(subst node9-,,$@))
	npx pkg app/index.js --targets $@ --output bin/$(NAME)
	cd bin; tar -zcf $(NAME).tar.gz $(NAME)*; cd ..;

all: clean $(SOURCES)

clean:
	rm -rf bin

image:
	docker build -t greenlight/cli .
