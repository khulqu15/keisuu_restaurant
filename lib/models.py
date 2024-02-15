import enum

from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField('作成日', auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField('更新日', auto_now=True, null=True, blank=True)

    class Meta:
        abstract = True


class Choosable(enum.Enum):
    @classmethod
    def choices(cls):
        return [(m.name, m.value) for m in cls]
        
    @classmethod
    def contains(cls, val):
        return val in [m.name for m in cls]