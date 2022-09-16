FROM python:3.10.2-buster

RUN echo "deb http://deb.debian.org/debian/ bullseye main contrib non-free" | tee /etc/apt/sources.list.d/debian.list
RUN apt-get update -y && apt-get upgrade -y

RUN apt install -y latexmk
RUN pip install sphinx sphinx-rtd-theme

RUN mkdir -p /usr/src/doc
WORKDIR /usr/src/doc
COPY ./docs /usr/src/doc/
COPY --chmod=+x ./update_docs.sh /usr/src/doc/

ENTRYPOINT ["/bin/bash", "/usr/src/doc/update_docs.sh"]

