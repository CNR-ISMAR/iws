from __future__ import absolute_import, unicode_literals
from celery import shared_task, Task
from iws.celeryapp import app

# @shared_task(base=Task)
@app.task
def localtestcommand(arg):
    print(arg)

@app.on_after_configure.connect
def localcrontest(sender, **kwargs):
    sender.add_periodic_task(5.0, localtestcommand.s('openistorm.tasks.localtestcommand TASK'), name='add every 30 seconds')