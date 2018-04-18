.PHONY: clean all install uninstall

SOURCES = node9-linux-x64 node9-linux-x86 node9-macos-x64 node9-macos-x86 node9-win-x64 node9-win-x86

%:
	$(eval NAME=$(subst node9-,,$@))
	npx pkg app/index.js --targets $@ --output bin/$(NAME)
	cd bin; tar -zcf $(NAME).tar.gz $(NAME)*; cd ..;

all: clean $(SOURCES)

clean:
	rm -rf bin

install:
	mkdir -p bin
	./.scripts/install.sh
	mkdir -p $(DESTDIR)$(PREFIX)/bin
	install -m 0755 bin/* $(DESTDIR)$(PREFIX)/bin/greenlight

uninstall:
	$(RM) $(DESTDIR)$(PREFIX)/bin/greenlight
