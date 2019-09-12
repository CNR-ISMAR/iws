from __future__ import absolute_import, unicode_literals
from celery import shared_task, Task
from iws.celeryapp import app
# from .models import FailedTask
from django.db import connection
import json, datetime
from .layers.models import ImageLayer
from .layers.utils import NCToImg




class BaseTask(Task):
    def on_success(self, retval, task_id, args, kwargs):
        connection.close()
        # print("on_success")
    def on_failure(self, exc, task_id, args, kwargs, traceback):
        print("on_failure")
        print(
            (exc, task_id, args, kwargs, traceback)
        )
        self.save_failed_task(exc, task_id, args, kwargs, traceback)
        super(BaseTask, self).on_failure(exc, task_id, args, kwargs, traceback)
    def save_failed_task(self, exc, task_id, args, kwargs, traceback, model_instance=None):
        print(str(traceback).strip())
        from .models import FailedTask
        """
        :type exc: Exception
        """
        task = FailedTask()
        task.celery_task_id = task_id
        task.full_name = self.name
        task.name = self.name.split('.')[-1]
        task.exception_class = exc.__class__.__name__
        task.exception_msg = str(exc).strip()
        task.traceback = str(traceback).strip()
        task.updated_at = datetime.datetime.now()
        if args:
            task.args = json.dumps(list(args))
        if kwargs:
            task.kwargs = json.dumps(kwargs)
        # Find if task with same args, name and exception already exists
        # If it do, update failures count and last updated_at
        #: :type: FailedTask
        existing_task = FailedTask.objects.filter(
            args=task.args,
            kwargs=task.kwargs,
            full_name=task.full_name,
            exception_class=task.exception_class,
            exception_msg=task.exception_msg,
        )
        print("existing_task")
        print(existing_task)
        if len(existing_task):
            existing_task = existing_task[0]
            existing_task.failures += 1
            existing_task.updated_at = task.updated_at
            existing_task.save(force_update=True,
                               update_fields=('updated_at', 'failures'))
        else:
            task.save(force_insert=True)

        connection.close()

@app.task(base=BaseTask)
def import_waves(args):
    if ImageLayer.objects.filter(created_at__gte=datetime.datetime.combine(datetime.datetime.now(), datetime.time.min)).count() == 0:
        print('ILL TRY NOW')
        NCToImg(**args)
    else:
        print('DONE FOR TODAY')

@app.on_after_configure.connect
def localcrontest(sender, **kwargs):
    sender.add_periodic_task(1200.0, import_waves.s({}), name='add every 60 seconds')
