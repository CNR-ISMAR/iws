# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2017 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

import os
from celery import Celery

from django.conf import settings
from celery import shared_task, Task

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iws.settings')

app = Celery('iws', broker="amqp://guest:guest@rabbitmq:5672/")

# Using a string here means the worker will not have to
# pickle the object when using Windows.
# app.config_from_object('django.conf:settings')


# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace="CELERY")

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS, force=True)

@app.task(bind=True)
def debug_task(self):
    print("Request: {!r}".format(self.request))


# @app.task(base=Task)
# def testcommand(arg):
#     print(arg)
#
# @app.on_after_configure.connect
# def crontest(sender, **kwargs):
#     sender.add_periodic_task(30.0, testcommand.s('testcommand TASK'), name='add every 30 seconds')
