"""
## Install the Django reverse proxy package: `pip install django-revproxy`

## Enable auth.proxy authentication in Grafana like the following

```
[auth.proxy]
enabled = true
header_name = X-WEBAUTH-USER
header_property = username
auto_sign_up = true
ldap_sync_ttl = 60
whitelist = 127.0.0.1
```

The whitelist parameter can be set if Django and Grafana are in the same host.

After that add this line in the Django project `urls.py`:

```
url(r'^dashboard/(?P<path>.*)$', views.GraphanaProxyView.as_view(), name='graphana-dashboards')
```

"""

from revproxy.views import ProxyView


class GraphanaProxyView(ProxyView):
    upstream = 'http://localhost:3000/'

    def get_proxy_request_headers(self, request):
        headers = super(GraphanaProxyView, self).get_proxy_request_headers(request)
        headers['X-WEBAUTH-USER'] = request.user.username
        return headers
