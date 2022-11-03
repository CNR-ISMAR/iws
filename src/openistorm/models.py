# -*- coding: utf-8 -*-
from django.contrib.gis.db import models


class FailedTask(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=125)
    full_name = models.TextField()
    args = models.TextField(null=True, blank=True)
    kwargs = models.TextField(null=True, blank=True)
    exception_class = models.TextField()
    exception_msg = models.TextField()
    traceback = models.TextField(null=True, blank=True)
    celery_task_id = models.CharField(max_length=36)
    failures = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ('-updated_at',)

    def __unicode__(self):
        return '%s %s [%s]' % (self.name, self.args, self.exception_class)