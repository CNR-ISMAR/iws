from geonode_mapstore_client.templatetags.get_menu_json import (
    register,
    _is_mobile_device,
)


@register.simple_tag(takes_context=True)
def get_base_left_topbar_menu(context):

    is_mobile = _is_mobile_device(context)

    return [
        {
            "label": "Geoportal",
            "type": "dropdown",
            "items": [
                {
                    "type": "link",
                    "href": "/catalogue/#/search/?f=dataset",
                    "label": "Datasets",
                },
                {
                    "type": "link",
                    "href": "/catalogue/#/search/?f=document",
                    "label": "Documents",
                },
                {
                    "type": "link",
                    "href": "/services/?limit=5",
                    "label": "Remote Services",
                }
                if not is_mobile
                else None,
                {"type": "link", "href": "/catalogue/#/search/?f=map", "label": "Maps"},
                {
                    "type": "link",
                    "href": "/catalogue/#/search/?f=geostory",
                    "label": "GeoStories",
                },
                {
                    "type": "link",
                    "href": "/catalogue/#/search/?f=dashboard",
                    "label": "Dashboards",
                },
                {
                    "type": "link",
                    "href": "/catalogue/#/search/?f=featured",
                    "label": "Featured",
                },
            ],
        },
    ]
