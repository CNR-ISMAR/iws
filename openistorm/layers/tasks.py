from __future__ import absolute_import, unicode_literals
from celery import shared_task, Task
# from djangoapp.celery import app


@shared_task(base=Task)
# @app.task
def testcommand(arg):
    print(arg)
    # print('CIAOOOOOOOOOOOOOO')
