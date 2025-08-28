#!/bin/bash
clear ; cd "$(dirname "${0}")"

#####################################################################

deps() {
	echo "No deps"
}

run() {
	npx vite
}

########################## HIC SUNT DRACONES ##########################

q() { # quit
	exit 0;
}

function _menu() { # pseudo-private
	while true ; do
		echo -e "Available commands:"
		cat `basename ${0}` | grep -v '^function _' | grep '()\s{' | \
			while read COMMAND ; do echo " - ${COMMAND%%()*}" ; done
		echo ; echo -n ': ' ; read OPTION
		echo ; for COMMAND in ${OPTION} ; do "${COMMAND}" ; echo ; done
	done
}

function _main() { # pseudo-private
	if [ ${#} -eq 0 ] ; then
		echo -e "Usage: ${0} [COMMANDS]\n" ; _menu
	else
		for COMMAND in "${@}" ; do "${COMMAND}" ; echo ; done
	fi
}

_main "${@}"

########################## /HIC SUNT DRACONES ##########################
