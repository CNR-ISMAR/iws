#!/usr/bin/python27
#from https://gist.github.com/BrunoCaimar/cdb960f1ed0b6cb1d398c84337b4dda9

def set_proxy():
    proxies = urllib.getproxies()
    http_proxy = proxies.get('http')
    https_proxy = proxies.get('https')

    Utils.logs("Proxies: {0}".format(proxies))

    if http_proxy is not None and http_proxy != "":
        Utils.logs("Configurando http proxy: {0}".format(http_proxy))
        os.environ["HTTP_PROXY"] = http_proxy

    if https_proxy is not None and https_proxy != "":
        Utils.logs("Configurando https proxy: {0}".format(https_proxy))
        os.environ["HTTPS_PROXY"] = https_proxy

