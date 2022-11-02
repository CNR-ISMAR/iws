.. _layer-info:

Layer Information
=================

| In this section you will learn more about layers. In the :ref:`finding-layers` section we explain how to find layers, now we want to go more in depth showing you how to explore detailed information about that.
| From the layers list page, click on the layer you are interested in. The *Layer Page* will open.

.. figure:: img/layer_info.png
    :align: center

    *Layer Information*

As shown in the picture above, the *Layer Page* is divided into three main sections:

1. the *Layer Preview* section, under the title
2. the *Tabs* section, under the layer preview
3. the *Tools* section, on the right side of the page

Layer Preview
-------------

The *Layer Preview* shows the layer in a map with very basic functionalities like :

 1. the *Base Map Switcher* that allows you to change the base map;
 2. the *Print* tool to print the preview.
 3. the *Zoom in/out* tool to enlarge and decrease the view;
 4. the *Query Objects* tool to retrieve information about the map objects by clicking on the map;


.. figure:: img/layer_preview.png
    :align: center

    *Layer Preview*



Tabs Sections
-------------

The *Layer Page* shows you some tabs sections containing different information about the layer:

* The tab *Info* is active by default. This tab section shows some layer metadata such as its title, the abstract, date of publication etc. The metadata also indicates the layer owner, what are the topic categories the layer belongs to and which regions are affected.

  .. figure:: img/layer_info_tab.png
      :align: center

      *Layer Info tab*

* The *Attributes* tab shows the data structure behind the layer. All the attributes are listed and for each of them some statistics (e.g. the range of values) are estimated (if possible).

  .. figure:: img/layer_attributes_tab.png
      :align: center

      *Layer Attributes tab*

* The *Share* tab provides the links for the layer to share through social media or email.

* You can *Rate* the layer through the *Rating system*.

* In the *Comments* tab section you can post your comment. Click on :guilabel:`Add Comment`, insert your comment and click :guilabel:`Submit Comment` to post it.

  .. figure:: img/layer_comments.png
      :align: center

      *Layer Comments*

  Your comment will be added next to the last already existing comment. If you want to remove it click on the red :guilabel:`Delete` button.


Layer Tools
-----------

In the right side of the *Layer Page* there are some buttons and information that can help you to manage your layer. This paragraph will cover only those tools which show layers information. The *Editing Tools* will be explored in the :ref:`layer-editing` section.

* through the :guilabel:`Download Layer` button you can download your layer with some options, see :ref:`layer-download`;
* the :guilabel:`Metadata Detail` button to see the layer metadata, see :ref:`layer-metadata` to read more;
* the :guilabel:`Editing Tools` button allows you to access to many editing tools. Those functionalities will be explained in the :ref:`layer-editing` section;
* the :guilabel:`View Layer` button opens the layer loaded in a map, see the :ref:`map-info` for more details;
* the :guilabel:`Download Metadata` button allows you to download the layer metadata in various formats;
* the *Legend* shows what the symbols and styles on the map are referring to;
* in the *Map using this layer* section all the map which uses the layer are listed;
* in the *Create a map using this layer*, the :guilabel:`Create a Map` button allows you to create a map from scratch using the layer;
* the *Styles* section shows all the styles associated with the layer. Click on the checkbox corresponding to one of the styles listed to apply it the preview;

  .. figure:: img/layer_preview_change_style.png
      :align: center

      *Change the Layer Style in preview*

* in the *Refresh Attributes and Statistics of this layer* section the :guilabel:`Refresh Attributes and Statistics` allows GeoNode to refresh the list of available Layer Attributes. If the option 'WPS_ENABLED' has been also set on the backend, it will recalculate their statistics too;
* in the *Clear the Server Cache of this layer* section the :guilabel:`Empty Tiled-Layer Cache` allows to wipe the tile-cache of this layer;
* the *About* section shows you the layer *Owner*, the *Contact* user and the *Metadata Author*.
