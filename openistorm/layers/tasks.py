from __future__ import absolute_import, unicode_literals
from celery import shared_task, Task
# from djangoapp.celery import app

@shared_task(base=Task)
def testcommand(arg):
    print(arg)

@app.on_after_configure.connect
def crontest(sender, **kwargs):
    sender.add_periodic_task(30.0, testcommand.s('openistorm.layers.tasks.testcommand TASK'), name='add every 30 seconds')